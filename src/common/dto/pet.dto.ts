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
export class CreatePetInputDto {
    @Field(() => String)
    name: string;
}

@InputType()
export class UpdatePetInputDto extends PartialType(CreatePetInputDto) {
    @Field(() => String, { nullable: true })
    name?: string;
}

@ArgsType()
export class FilterPetDto {
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
export class FindAndCountAllPetResponseDto {
    @Field(() => Int, { nullable: false })
    count: number;

    @Field(() => [Pet], { nullable: false })
    rows: Pet[];
}

@ArgsType()
export class FindOneFilterPetDto {
    @Field(() => Int, { nullable: true })
    id?: number;

    @Field(() => String, { nullable: true })
    name?: string;
}
