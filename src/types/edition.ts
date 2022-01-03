import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { connectionDefinitions, globalIdField } from 'graphql-relay'
import { GraphQLJSON, GraphQLURL } from 'graphql-scalars'
import { TypeNames } from './shared'

/**
 * ```graphql
 * type Edition implements Node {
 *   id: ID!
 *   name: String!
 *   description: String!
 *   audio: URL!
 *   image: URL!
 *   commentWall: URL!
 *   animation: URL!
 *   external: URL!
 *   attributes: JSON!
 * }
 * ```
 */
export const EditionType = new GraphQLObjectType({
  name: TypeNames.Edition,
  fields: () => ({
    id: globalIdField(),
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    audio: {
      type: new GraphQLNonNull(GraphQLURL),
      resolve: (root) => root.audio_url,
    },
    image: {
      type: new GraphQLNonNull(GraphQLURL),
    },
    commentWall: {
      type: new GraphQLNonNull(GraphQLURL),
      resolve: (root) => root.comment_wall_url,
    },
    animation: {
      type: new GraphQLNonNull(GraphQLURL),
      resolve: (root) => root.animation_url,
    },
    external: {
      type: new GraphQLNonNull(GraphQLURL),
      resolve: (root) => root.external_url,
    },
    attributes: {
      type: new GraphQLNonNull(GraphQLJSON),
    },
  }),
})

const { connectionType } = connectionDefinitions({
  nodeType: EditionType,
})

/**
 * ```graphql
 * type EditionEdge {
 *   cursor: String!
 *   node: Edition
 * }
 *
 * type EditionConnection {
 *   edges: [EditionEdge]
 *   pageInfo: PageInfo!
 * }
 * ```
 */
export const EditionConnection = connectionType
