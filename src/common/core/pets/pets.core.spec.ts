import { Test, TestingModule } from '@nestjs/testing';
import { PetsCore } from './pets.core';

describe('PetsCore', () => {
    let service: PetsCore;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PetsCore],
        }).compile();

        service = module.get<PetsCore>(PetsCore);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
