import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsCoreModule } from '../../core/pets/pets.core.module';
import { PetsCore } from '../../core/pets/pets.core';

@Module({
    imports: [PetsCoreModule],
    providers: [PetsCore, PetsService],
    exports: [PetsService],
})
export class PetsServiceModule {}
