import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PetsService } from '../../service/pets/pets.service';
import { Pet } from '../../../providers/database/pg/models/index.model';
import {
    CreatePetInputDto,
    UpdatePetInputDto,
    FilterPetDto,
    FindAndCountAllPetResponseDto,
} from '../../dto/index.dto';

@Resolver(() => Pet)
export class PetsResolver {
    constructor(private readonly petsService: PetsService) {}

    @Query(() => Pet, { name: 'pet' })
    async findOne(@Args('id', { type: () => Int }) id: number) {
        const pet = await this.petsService.findOne(id);
        return pet;
    }

    @Query(() => FindAndCountAllPetResponseDto, { name: 'pets' })
    async findAndCountAll(@Args() query: FilterPetDto) {
        const pets = await this.petsService.findAndCountAll(query);
        return pets;
    }

    @Mutation(() => Pet)
    createPet(@Args('input') createPetInput: CreatePetInputDto) {
        return this.petsService.create(createPetInput);
    }

    @Mutation(() => Pet)
    updatePet(
        @Args('id', { type: () => Int }) id: number,
        @Args('input') updatePetInput: UpdatePetInputDto,
    ) {
        return this.petsService.update(id, updatePetInput);
    }

    @Mutation(() => String)
    async removePet(@Args('id', { type: () => Int }) id: number) {
        await this.petsService.remove(id);
        return 'success delete pet';
    }
}
