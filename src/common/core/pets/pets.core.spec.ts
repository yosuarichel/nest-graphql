import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PetsCore } from './pets.core';
import { Pet } from '../../../providers/database/pg/models/index.model';
import { PostgresModule } from '../../../providers/index.provider';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '../../../configs/validation';
import common from '../../../configs/common.config';
import db from '../../../configs/db.config';
import fluentd from '../../../configs/fluentd.config';
import minio from '../../../configs/minio.config';
import smtp from '../../../configs/smtp.config';
import queue from '../../../configs/queue.config';
import cache from '../../../configs/cache.config';
import { Pagination } from '../../../constants/enums';

describe('PetsCore', () => {
    let petCore: PetsCore;
    let petModel: typeof Pet;

    const petsData = [
        {
            id: 1,
            name: 'Bear',
            created_at: '2022-07-07T11:13:21+07:00',
            updated_at: '2022-07-10T12:47:47+07:00',
            deleted_at: null,
        },
        {
            id: 2,
            name: 'Dog',
            created_at: '2022-07-07T11:13:21+07:00',
            updated_at: '2022-07-10T12:47:47+07:00',
            deleted_at: null,
        },
    ];
    const findAndCountAllPet = {
        count: petsData.length,
        rows: petsData,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: [`env/.env.development`],
                    load: [common, db, fluentd, minio, smtp, queue, cache],
                    validationSchema,
                }),
                PostgresModule,
                SequelizeModule.forFeature([Pet]),
            ],
            providers: [
                PetsCore,
                {
                    provide: getModelToken(Pet),
                    useValue: {
                        findAndCountAll: jest.fn(() => findAndCountAllPet),
                        findOne: jest.fn(() => petsData[0]),
                        create: jest.fn(() => petsData[0]),
                        remove: jest.fn(),
                    },
                },
            ],
            exports: [SequelizeModule],
        }).compile();

        petCore = module.get<PetsCore>(PetsCore);
        petModel = module.get<typeof Pet>(getModelToken(Pet));
    });

    // afterEach(() => {
    //     jest.resetAllMocks();
    // });

    it('should be defined', () => {
        expect(petCore).toBeDefined();
        expect(petModel).toBeDefined();
    });

    describe('FindAndCountAll', () => {
        it('should return data', async () => {
            const findAndCountAllPet = {
                count: petsData.length,
                rows: petsData,
            };
            const data = await petCore.findAndCountAll();
            expect(data).toEqual(findAndCountAllPet);
        });

        it('should return filtered data with search', async () => {
            const expectedResult = {
                count: 0,
                rows: [],
            };
            const spyCore = jest
                .spyOn(petCore, 'findAndCountAll')
                .mockImplementation(() => Promise.resolve(expectedResult));
            const data = await petCore.findAndCountAll({
                search: 'name',
            });
            expect(spyCore).toBeCalledTimes(1);
            expect(spyCore).toBeCalledWith({
                search: 'name',
            });
            expect(data).toEqual(expectedResult);
        });

        it('should return filtered data with pagination', async () => {
            const spyCore = jest.spyOn(petCore, 'findAndCountAll');
            const data = await petCore.findAndCountAll({
                pagination: Pagination.yes,
            });
            expect(spyCore).toBeCalledTimes(1);
            expect(spyCore).toBeCalledWith({
                pagination: Pagination.yes,
            });
            expect(data).toEqual(findAndCountAllPet);
        });

        it('should return empty data', async () => {
            const expectedResult = {
                count: 0,
                rows: [],
            };
            const spyCore = jest
                .spyOn(petCore, 'findAndCountAll')
                .mockImplementation(() => Promise.resolve(expectedResult));
            const data = await petCore.findAndCountAll();
            expect(spyCore).toBeCalledTimes(1);
            expect(data).toEqual(expectedResult);
        });
    });

    describe('FindOne', () => {
        it('should return data', async () => {
            const spyCore = jest.spyOn(petCore, 'findOne');
            const data = await petCore.findOne({
                id: 2,
            });
            expect(spyCore).toBeCalledTimes(1);
            expect(spyCore).toBeCalledWith({
                id: 2,
            });
            expect(data).toEqual(petsData[0]);
        });

        it('should return null', async () => {
            const expectedResult = null;

            const spyCore = jest
                .spyOn(petCore, 'findOne')
                .mockImplementation(() => expectedResult);
            const data = await petCore.findOne({
                id: 2,
            });
            expect(spyCore).toBeCalledTimes(1);
            expect(spyCore).toBeCalledWith({
                id: 2,
            });
            expect(data).toEqual(expectedResult);
        });
    });

    describe('Create', () => {
        it('should return error', async () => {
            const pet = new petModel();
            pet.id = 1;
            pet.name = 'Bear';
            pet.created_at = '2022-07-07T11:13:21+07:00';
            pet.updated_at = '2022-07-10T12:47:47+07:00';

            const spyCore = jest
                .spyOn(petCore, 'create')
                .mockImplementation(() => {
                    throw new Error('error');
                });
            const data = await petCore.create({
                name: 'Bear',
            });
            console.log('data => ', data);

            expect(spyCore).toBeCalledTimes(1);
            expect(spyCore).toBeCalledWith({
                name: 'Bear',
            });
            expect(spyCore).rejects.toThrow('error');
            expect(data).rejects.toThrow('error');
        });

        it('should create data', async () => {
            const pet = new petModel();
            pet.id = 1;
            pet.name = 'Bear';
            pet.created_at = '2022-07-07T11:13:21+07:00';
            pet.updated_at = '2022-07-10T12:47:47+07:00';

            const spyCore = jest
                .spyOn(petCore, 'create')
                .mockImplementation(() => Promise.resolve(pet.toJSON()));
            const data = await petCore.create({
                name: 'Bear',
            });

            expect(spyCore).toBeCalledTimes(1);
            expect(spyCore).toBeCalledWith({
                name: 'Bear',
            });
            expect(data).toEqual(petsData[0]);
        });
    });
});
