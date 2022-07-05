import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from '../../../providers/database/pg/models/index.model';
import { PetsCore } from '../../core/pets/pets.core';
import { CreatePetInput, UpdatePetInput, FilterPet } from '../../dto/index.dto';

@Injectable()
export class PetsService {
    constructor(private readonly petsCore: PetsCore) {}

    create(createPetInput: CreatePetInput) {
        return 'This action adds a new pet';
    }

    async findAndCountAll(query: FilterPet) {
        const pets = await this.petsCore.findAndCountAll(query);
        return pets;
    }

    async findOne(id: number): Promise<Pet> {
        const pet = await this.petsCore.findOne(id);
        if (!pet) {
            throw new NotFoundException({
                code: 'NOT_FOUND_ERROR',
                message: 'pet not found',
            });
        }
        return pet;
    }

    update(id: number, updatePetInput: UpdatePetInput) {
        return `This action updates a #${id} pet`;
    }

    remove(id: number) {
        return `This action removes a #${id} pet`;
    }
}
