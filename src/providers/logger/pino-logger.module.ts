import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
    imports: [
        LoggerModule.forRootAsync({
            useFactory: async (config: ConfigService) => {
                const commonConfig = config.get('common');
                return {
                    pinoHttp:
                        commonConfig.env === 'production'
                            ? {}
                            : {
                                  transport: {
                                      target: 'pino-pretty',
                                      options: {
                                          colorize: true,
                                          levelFirst: true,
                                          translateTime:
                                              'UTC:mm/dd/yyyy, h:MM:ss TT Z',
                                      },
                                  },
                              },
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class PinoLoggerModule {}
