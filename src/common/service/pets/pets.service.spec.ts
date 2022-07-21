import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { PetsService } from './pets.service';
import { Pet } from '../../../providers/database/pg/models/index.model';
import { PostgresModule } from '../../../providers/index.provider';
import { validationSchema } from '../../../configs/validation';
import common from '../../../configs/common.config';
import db from '../../../configs/db.config';
import fluentd from '../../../configs/fluentd.config';
import minio from '../../../configs/minio.config';
import smtp from '../../../configs/smtp.config';
import queue from '../../../configs/queue.config';
import cache from '../../../configs/cache.config';
import { Pagination } from '../../../constants/enums';
import { PetsCoreModule } from '../../core/pets/pets.core.module';
import { PetsCore } from '../../core/pets/pets.core';
import { NotFoundException } from '@nestjs/common';

describe('PetsService', () => {
    let service: PetsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PetsCoreModule,
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: [`env/.env.development`],
                    load: [common, db, fluentd, minio, smtp, queue, cache],
                    validationSchema,
                }),
                PostgresModule,
                SequelizeModule.forFeature([Pet]),
            ],
            providers: [PetsCore, PetsService],
        }).compile();

        service = module.get<PetsService>(PetsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('FindOne', () => {
        it('should return data', async () => {
            const expectedResult = new Pet({
                id: 1,
                name: 'Beer',
                created_at: '2022-07-07T11:13:21+07:00',
                updated_at: '2022-07-10T12:47:47+07:00',
                deleted_at: null,
            });

            const spy = jest
                .spyOn(service, 'findOne')
                .mockImplementation(() => Promise.resolve(expectedResult));

            const data = await service.findOne(1);

            expect(data).toEqual(expectedResult);

            spy.mockRestore();
        });

        it('should return not found error', async () => {
            const spy = jest
                .spyOn(service, 'findOne')
                .mockImplementation(() => {
                    return Promise.reject(
                        new NotFoundException({
                            code: 'NOT_FOUND_ERROR',
                            message: 'pet not found',
                        }),
                    );
                });
            jest.spyOn(console, 'error');

            const data = await service.findOne(2);

            expect(data).rejects.toThrowError('pet not found');

            spy.mockRestore();
        });
    });
});
