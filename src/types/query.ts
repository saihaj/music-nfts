import { GraphQLList, GraphQLObjectType } from 'graphql'
import { NodeField } from '../node'
import { ArtistContractType } from './artist-contract'
import { TypeNames } from './shared'
import { providers } from 'ethers'
import {
  ArtistCreator__factory,
  Artist__factory,
} from '../../types/ethers-contracts'
const ARTIST_CREATOR_ADDRESS = '0x78E3aDc0E811e4f93BD9F1f9389b923c9A3355c2'

const provider = new providers.InfuraProvider()
const artistCreator = ArtistCreator__factory.connect(
  ARTIST_CREATOR_ADDRESS,
  provider,
)

export const QueryType = new GraphQLObjectType({
  name: TypeNames.Query,
  fields: () => ({
    node: NodeField,
    getReleases: {
      type: new GraphQLList(ArtistContractType),
      resolve: async () => {
        const contracts = ArtistCreator__factory.connect(
          ARTIST_CREATOR_ADDRESS,
          provider,
        )
        const releases = []
        for (let i = 0; i < 21; i++) {
          const artistAddr = contracts.artistContracts(i)
          //   const artist = Artist__factory.connect(artistAddr, provider)
          const result = {
            id: i,
            address: artistAddr,
          }
          releases.push(result)
        }

        return releases
      },
    },
  }),
})
