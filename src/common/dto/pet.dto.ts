import {
    ArgsType,
    Field,
    InputType,
    Int,
    ObjectType,
    PartialType,
} from '@nestjs/graphql';
import { OrderType, Pagination, PetOrderBy } from '../../constants/enums';
import { Pet } from '../../providers/database/pg/models/pets.model';

@InputType()
export class CreatePetInput {
    @Field(() => Int)
    exampleField: number;
}

@InputType()
export class UpdatePetInput extends PartialType(CreatePetInput) {
    @Field(() => Int)
    id: number;
}

@ArgsType()
export class FilterPet {
    @Field(() => Pagination, { nullable: true })
    pagination?: Pagination;

    @Field(() => Int, { nullable: true })
    page?: number;

    @Field(() => Int, { nullable: true })
    row?: number;

    @Field(() => PetOrderBy, { nullable: true })
    order_by?: PetOrderBy;

    @Field(() => OrderType, { nullable: true })
    order_type?: OrderType;

    @Field(() => String, { nullable: true })
    search?: string;
}

@ObjectType()
export class FindAndCountAllPetResponse {
    @Field(() => Int, { nullable: false })
    count: number;

    @Field(() => [Pet], { nullable: false })
    rows: Pet[];
}
