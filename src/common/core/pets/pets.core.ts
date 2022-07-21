import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions, Op, SaveOptions } from 'sequelize';
import { OrderType, Pagination, PetOrderBy } from '../../../constants/enums';
import { IFindAndCountAll, IPet } from '../../interfaces/index.interface';
import { Pet } from '../../../providers/database/pg/models/index.model';
import { CreatePagination } from '../../helpers/index.helper';
import { FilterPetDto, FindOneFilterPetDto } from '../../dto/index.dto';

@Injectable()
export class PetsCore {
    constructor(
        @InjectModel(Pet)
        private readonly PetModel: typeof Pet,
    ) {}

    create(data: IPet, options?: SaveOptions): Promise<Pet> {
        const pet = new Pet();
        pet.name = data.name;

        return pet.save(options);
    }

    async findAndCountAll(
        data?: FilterPetDto,
        options?: FindAndCountOptions,
    ): Promise<IFindAndCountAll<Pet[]>> {
        const filterData: FilterPetDto = {
            pagination: data?.pagination || Pagination.yes,
            page: data?.page || 1,
            row: data?.row || 10,
            order_by: data?.order_by || PetOrderBy.id,
            order_type: data?.order_type || OrderType.asc,
        };

        const filter: FindAndCountOptions = {
            order: [[filterData.order_by, filterData.order_type]],
            where: {},
            ...options,
        };
        if (data?.pagination === 'true') {
            const pager = CreatePagination(filterData.page, filterData.row);
            Object.assign(filter, { limit: pager.row, offset: pager.page });
        }
        if (data?.search) {
            Object.assign(filter.where, {
                name: {
                    [Op.iLike]: `%${data.search}%`,
                },
            });
        }
        return this.PetModel.findAndCountAll(filter);
    }

    async findOne(
        data?: FindOneFilterPetDto,
        options?: FindOptions,
    ): Promise<Pet> {
        const filter: FindOptions = {
            where: {},
            ...options,
        };

        if (data?.id) {
            Object.assign(filter.where, { id: data.id });
        }
        if (data?.name) {
            Object.assign(filter.where, {
                name: {
                    [Op.iLike]: `%${data.name}%`,
                },
            });
        }

        const pet = await this.PetModel.findOne(filter);
        if (!pet) {
            return null;
        }
        return pet;
    }
}
