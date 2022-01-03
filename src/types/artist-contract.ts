import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay'
import { providers } from 'ethers'
import { Artist__factory } from '../../types/ethers-contracts'
import { GraphQLEthereumAddress } from '../ethereum-address-scalar'
import { ArtistType } from './artist'
import { TypeNames } from './shared'
import { EditionConnection } from './edition'
import { fetch } from 'undici'

const provider = new providers.InfuraProvider()
/**
 * ```graphql
 * type ArtistContract implements Node {
 *   id: ID!
 *   address: EthereumAddress!
 *   artist: Artist!
 *   totalSupply: Int!
 * }
 * ```
 */
export const ArtistContractType = new GraphQLObjectType({
  name: TypeNames.ArtistContract,
  fields: () => ({
    id: globalIdField(),
    address: {
      type: new GraphQLNonNull(GraphQLEthereumAddress),
    },
    totalSupply: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async ({ address }) => {
        const artistAddress = await address
        const artist = Artist__factory.connect(artistAddress, provider)
        return (await artist.totalSupply()).toString()
      },
    },
    artist: {
      type: new GraphQLNonNull(ArtistType),
      resolve: async ({ address }) => {
        const artistAddress = await address
        const artist = Artist__factory.connect(artistAddress, provider)
        // console.log(
        //   await (
        //     await artist.getTokenIdsOfEdition('1')
        //   ).map((a) => a.toString()),
        // )
        // console.log(await artist.editions('1'))
        return {
          id: artistAddress,
          address: await artist.owner(),
          symbol: await artist.symbol(),
          name: await artist.name(),
        }
      },
    },
    editions: {
      type: EditionConnection,
      args: connectionArgs,
      resolve: async ({ address }, args) => {
        const artistAddress = await address
        const artist = Artist__factory.connect(artistAddress, provider)

        // const totalSupply = (await artist.totalSupply()).toNumber()
        // const owner = await artist.getOwnersOfEdition('1')
        // const editions = []
        // const edition = await artist.tokenURI('1')
        // editions.push({
        //   id: owner[0] + '-' + '1',
        //   ...JSON.parse(await (await fetch(edition)).text()),
        // })
        // console.log(editions)
        // for (let i = 1; i <= totalSupply; i++) {
        //   const edition = await artist.tokenURI(i.toString())
        //   editions.push(JSON.parse(await (await fetch(edition)).text()))
        // }

        // return connectionFromArray(editions, args)
      },
    },
  }),
})

const { connectionType } = connectionDefinitions({
  nodeType: ArtistContractType,
})

/**
 * ```graphql
 * type ArtistContractEdge {
 *   cursor: String!
 *   node: ArtistContract
 * }
 *
 * type ArtistContractConnection {
 *   edges: [ArtistContractEdge]
 *   pageInfo: PageInfo!
 * }
 * ```
 */
export const ArtistContractConnection = connectionType
