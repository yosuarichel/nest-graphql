import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {
    FindOptions,
    FindAndCountOptions,
    SaveOptions,
    InstanceUpdateOptions,
    InstanceDestroyOptions,
} from 'sequelize';
import { Pet } from '../../../providers/database/pg/models/index.model';
import { PetsCore } from '../../core/pets/pets.core';
import {
    CreatePetInputDto,
    UpdatePetInputDto,
    FilterPetDto,
    FindAndCountAllPetResponseDto,
} from '../../dto/index.dto';

@Injectable()
export class PetsService {
    constructor(private readonly petsCore: PetsCore) {}

    async create(createPetInput: CreatePetInputDto, options?: SaveOptions) {
        const pet = await this.petsCore.findOne({ name: createPetInput.name });
        if (pet) {
            throw new BadRequestException({
                code: 'ALREADY_EXIST_ERROR',
                message: 'pet already exist',
            });
        }

        const createPet = await this.petsCore.create(createPetInput, options);
        return createPet;
    }

    async findAndCountAll(
        query: FilterPetDto,
        options?: FindAndCountOptions,
    ): Promise<FindAndCountAllPetResponseDto> {
        const pets = await this.petsCore.findAndCountAll(query, options);
        return pets;
    }

    async findOne(id: number, options?: FindOptions): Promise<Pet> {
        const pet = await this.petsCore.findOne({ id }, options);
        if (!pet) {
            throw new NotFoundException({
                code: 'NOT_FOUND_ERROR',
                message: 'pet not found',
            });
        }
        return pet;
    }

    async update(
        id: number,
        updatePetInput: UpdatePetInputDto,
        options?: InstanceUpdateOptions,
    ): Promise<Pet> {
        const pet = await this.petsCore.findOne({ id });
        if (!pet) {
            throw new NotFoundException({
                code: 'NOT_FOUND_ERROR',
                message: 'pet not found',
            });
        }

        return pet.update(updatePetInput, options);
    }

    async remove(id: number, options?: InstanceDestroyOptions): Promise<void> {
        const pet = await this.petsCore.findOne({ id }, options);
        if (!pet) {
            throw new NotFoundException({
                code: 'NOT_FOUND_ERROR',
                message: 'pet not found',
            });
        }

        return pet.destroy();
    }
}
