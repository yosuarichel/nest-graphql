import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PinoLoggerModule } from './providers/index.provider';
import { AppConfigModule } from './configs/configuration.module';
import { PostgresModule } from './providers/database/pg/postgresql.module';
import { PetsResolverModule } from './common/resolver/pets/pets.resolver.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
    imports: [
        AppConfigModule,
        PinoLoggerModule,
        PostgresModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schemas/schema.gql'),
            debug: false,
            playground: true,
            sortSchema: true,
            // formatError: (error: GraphQLError) => {
            //     const graphQLFormattedError: GraphQLFormattedError = {
            //         message:
            //             error?.extensions?.exception?.response?.message ||
            //             error?.message,
            //     };
            //     return graphQLFormattedError;
            // },
        }),
        PetsResolverModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
