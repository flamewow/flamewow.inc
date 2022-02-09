import { Inject, Logger, Optional } from '@nestjs/common';
import { GraphQLSchemaHost, Plugin } from '@nestjs/graphql';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { GraphQLError } from 'graphql';
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';

export const COMPLEXITY_PLUGIN_PARAMS = 'COMPLEXITY_PLUGIN_PARAMS';

export interface ComplexityPluginParams {
  maxAllowedComplexity: number;
}

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  private logger = new Logger(ComplexityPlugin.name);
  private defaultParams: ComplexityPluginParams = { maxAllowedComplexity: 20 };

  constructor(@Optional() @Inject(COMPLEXITY_PLUGIN_PARAMS) private params: ComplexityPluginParams, private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart(): Promise<GraphQLRequestListener> {
    const { schema } = this.gqlSchemaHost;
    const logger = this.logger;
    const { maxAllowedComplexity } = this.params || this.defaultParams;

    return {
      async didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
        });

        if (complexity >= maxAllowedComplexity) {
          throw new GraphQLError(`Query is too complex: ${complexity}. Maximum allowed complexity: ${maxAllowedComplexity}`);
        }
        logger.debug(`Query Complexity: ${complexity}`);
      },
    };
  }
}
