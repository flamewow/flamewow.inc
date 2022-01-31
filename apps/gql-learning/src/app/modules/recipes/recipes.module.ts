
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuisineEntity } from '../../db/entities/cuisine.entity';
import { RecipeEntity } from '../../db/entities/recipe.entity';
import { DateScalar } from '../../core/scalars/date.scalar';
import { AuthModule } from '../auth/auth.module';
import { CuisinesLoader } from './cuisines.loader';
import { CuisinesResolver } from './cuisines.resolver';
import { CuisinesService } from './cuisines.service';
import { RecipesLoader } from './recipes.loader';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [TypeOrmModule.forFeature([CuisineEntity, RecipeEntity]), AuthModule],
  providers: [CuisinesResolver, CuisinesService, CuisinesLoader, RecipesResolver, RecipesService, RecipesLoader, DateScalar],
})
export class RecipesModule {}
