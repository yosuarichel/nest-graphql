import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bodyParser: true,
        bufferLogs: true,
    });

    const commonConfig = app.get(ConfigService).get('common');
    const logger = app.get(Logger);
    const globalPrefixAPI = 'api';

    app.useLogger(logger);
    app.enableCors();
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(compression());
    app.use(cookieParser());

    app.enableVersioning({
        type: VersioningType.URI,
        prefix: commonConfig.api_version_prefix,
    });
    app.setGlobalPrefix(globalPrefixAPI);

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
