import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pet } from '../../../providers/database/pg/models/index.model';
import { PetsCore } from './pets.core';

@Module({
    imports: [SequelizeModule.forFeature([Pet])],
    providers: [PetsCore],
    exports: [SequelizeModule],
})
export class PetsCoreModule {}
