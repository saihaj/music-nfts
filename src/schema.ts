import { GraphQLSchema } from 'graphql'
import { QueryType } from './types/query'

export const schema = new GraphQLSchema({ query: QueryType })
