import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions, Op } from 'sequelize';
import { OrderType, Pagination, PetOrderBy } from '../../../constants/enums';
import { IFindAndCountAll } from '../../interfaces/index.interface';
import { Pet } from '../../../providers/database/pg/models/index.model';
import { CreatePagination } from '../../helpers/index.helper';
import { FilterPet } from '../../dto/index.dto';

@Injectable()
export class PetsCore {
    constructor(
        @InjectModel(Pet)
        private readonly PetModel: typeof Pet,
    ) {}

    // create(createPetInput: CreatePetInput) {
    //     return 'This action adds a new pet';
    // }

    async findAndCountAll(
        data: FilterPet,
        options?: FindAndCountOptions,
    ): Promise<IFindAndCountAll<Pet[]>> {
        data.pagination = data.pagination || Pagination.yes;
        data.page = data.page || 1;
        data.row = data.row || 10;
        data.order_by = data.order_by || PetOrderBy.id;
        data.order_type = data.order_type || OrderType.asc;

        const filter: FindAndCountOptions = {
            order: [[data.order_by, data.order_type]],
            where: {},
            ...options,
        };
        if (data.pagination === 'true') {
            const pager = CreatePagination(data.page, data.row);
            Object.assign(filter, { limit: pager.row, offset: pager.page });
        }
        if (data.search) {
            Object.assign(filter.where, {
                name: {
                    [Op.iLike]: `%${data.search}%`,
                },
            });
        }
        return this.PetModel.findAndCountAll(filter);
    }

    async findOne(id: number, options?: FindOptions): Promise<Pet> {
        const pet = await this.PetModel.findOne({
            where: {
                id,
            },
            ...options,
        });
        if (!pet) {
            return null;
        }
        return pet;
    }

    // update(id: number, updatePetInput: UpdatePetInput) {
    //     return `This action updates a #${id} pet`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} pet`;
    // }
}
