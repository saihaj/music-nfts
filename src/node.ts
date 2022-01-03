import { fromGlobalId, nodeDefinitions } from 'graphql-relay'
import resolveType from './resolveType'

const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId)
    return { id, type }
  },
  (obj) => resolveType(obj),
)

/**
 * ```graphql
 * interface Node {
 *   """
 *   The ID of an object
 *   """
 *   id: ID!
 * }
 * ```
 */
export const NodeInterface = nodeInterface

/**
 * Fetches an object given its ID
 */
export const NodeField = nodeField
