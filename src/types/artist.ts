import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { GraphQLEthereumAddress } from '../ethereum-address-scalar'
import { TypeNames } from './shared'

/**
 * ```graphql
 * type Artist implements Node {
 *   id: ID!
 *   name: String!
 *   symbol: String!
 *   address: EthereumAddress!
 * }
 * ```
 */
export const ArtistType = new GraphQLObjectType({
  name: TypeNames.Artist,
  fields: () => ({
    id: globalIdField(),
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    symbol: {
      type: new GraphQLNonNull(GraphQLString),
    },
    address: {
      type: new GraphQLNonNull(GraphQLEthereumAddress),
    },
  }),
})
