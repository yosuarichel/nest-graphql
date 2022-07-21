import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { MainModule } from './main.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Integrations } from '@sentry/tracing';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(MainModule, {
        bodyParser: true,
        bufferLogs: true,
    });

    const commonConfig = app.get(ConfigService).get('common');
    const logger = app.get(Logger);
    const globalPrefixAPI = 'api';

    // Sentry init
    Sentry.init({
        dsn: commonConfig.sentry_url,
        tracesSampleRate: 1.0,
        integrations: [
            new Sentry.Integrations.Http({ tracing: true, breadcrumbs: true }),
            new Integrations.Express({ app: app.getHttpServer() }),
        ],
    });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());

    app.useLogger(logger);
    app.enableCors();
    app.use(morgan('dev'));
    app.use(helmet());
    // if (commonConfig.env === 'production') {
    //     app.use(helmet());
    // }
    app.use(compression());
    app.use(cookieParser());

    app.enableVersioning({
        type: VersioningType.URI,
        prefix: commonConfig.api_version_prefix,
    });
    app.setGlobalPrefix(globalPrefixAPI);
    // app.useGlobalFilters(new HttpExceptionFilter());

    // Sentry error handler
    app.use(Sentry.Handlers.errorHandler());

    // Start the http server
    await app.listen(commonConfig.port, () => {
        logger.log(
            `🚀 API server is running on http://localhost:${commonConfig.port}/${globalPrefixAPI}} (${commonConfig.env})`,
        );
        logger.log(
            `🚀 Graphql server is running on http://localhost:${commonConfig.port}/graphql} (${commonConfig.env})`,
        );
    });
}
bootstrap();
