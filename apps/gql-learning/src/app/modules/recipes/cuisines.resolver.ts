import { CuisineEntity, PaginatedCuisine } from '@gql-learning/db/entities/cuisine.entity';
import { RecipeEntity } from '@gql-learning/db/entities/recipe.entity';
import { PaginationCursorArgs } from '@gql-learning/db/misc/pagination-args';
import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CuisinesService } from './cuisines.service';
import { RecipesLoader } from './recipes.loader';
import { RecipesService } from './recipes.service';

@Resolver(() => CuisineEntity)
@UseGuards(JwtAuthGuard)
export class CuisinesResolver {
  public logger = new Logger(this.constructor.name);

  constructor(private readonly cuisinesService: CuisinesService, private readonly recipesService: RecipesService, private recipesLoader: RecipesLoader) {}

  @Query(() => PaginatedCuisine)
  async cuisines(@Args() pagination: PaginationCursorArgs): Promise<PaginatedCuisine> {
    return this.cuisinesService.paginated(pagination);
  }

  @Mutation(() => CuisineEntity)
  async addCuisine(@Args('name') name: string): Promise<CuisineEntity> {
    const cuisine = await this.cuisinesService.create(name);
    return cuisine;
  }

  @ResolveField(() => [RecipeEntity])
  async recipes(@Args() pagination: PaginationCursorArgs, @Parent() cuisine: CuisineEntity): Promise<RecipeEntity[]> {
    const { uuid } = cuisine;
    const recipes = await this.recipesLoader.batchCuisineRecipes.load(uuid);
    return recipes;
  }
}
