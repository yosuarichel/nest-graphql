import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HelloResolver } from './resolver/index.resolver';
import { PinoLoggerModule } from './providers/index.provider';
import { AppConfigModule } from './config/configuration.module';

@Module({
    imports: [
        AppConfigModule,
        PinoLoggerModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
            debug: false,
            playground: true,
            sortSchema: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, HelloResolver],
})
export class AppModule {}
