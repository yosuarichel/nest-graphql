import { Module } from '@nestjs/common';
import { PetsServiceModule } from '../../service/pets/pets.service.module';
import { PetsResolver } from './pets.resolver';

@Module({
    imports: [PetsServiceModule],
    providers: [PetsResolver],
    exports: [],
})
export class PetsResolverModule {}
