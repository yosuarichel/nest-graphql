import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PetsService } from '../../service/pets/pets.service';
import { Pet } from '../../../providers/database/pg/models/index.model';
import {
    CreatePetInput,
    UpdatePetInput,
    FilterPet,
    FindAndCountAllPetResponse,
} from '../../dto/index.dto';

@Resolver(() => Pet)
export class PetsResolver {
    constructor(private readonly petsService: PetsService) {}

    @Mutation(() => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
        return this.petsService.create(createPetInput);
    }

    @Query(() => FindAndCountAllPetResponse, { name: 'pets' })
    async findAndCountAll(@Args() query: FilterPet) {
        const pets = await this.petsService.findAndCountAll(query);
        return pets;
    }

    @Query(() => Pet, { name: 'pet' })
    async findOne(@Args('id', { type: () => Int }) id: number) {
        const pet = await this.petsService.findOne(id);
        return pet;
    }

    @Mutation(() => Pet)
    updatePet(@Args('updatePetInput') updatePetInput: UpdatePetInput) {
        return this.petsService.update(updatePetInput.id, updatePetInput);
    }

    @Mutation(() => Pet)
    removePet(@Args('id', { type: () => Int }) id: number) {
        return this.petsService.remove(id);
    }
}
