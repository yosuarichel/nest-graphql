import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PinoLoggerModule, PostgresModule } from './providers/index.provider';
import { AppConfigModule } from './configs/configuration.module';
import { PetsResolverModule } from './common/resolver/pets/pets.resolver.module';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        AppConfigModule,
        PinoLoggerModule,
        PostgresModule,
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useFactory: (configService: ConfigService) => {
                const commonConfig = configService.get('common');
                return {
                    autoSchemaFile: join(
                        process.cwd(),
                        'src/schemas/schema.gql',
                    ),
                    debug: true,
                    playground: commonConfig.env !== 'production',
                    sortSchema: true,
                    cors: true,
                    csrfPrevention: true,
                    cache: 'bounded',
                };
            },
            inject: [ConfigService],
        }),
        PetsResolverModule,
    ],
    controllers: [],
    providers: [],
})
export class MainModule {}
