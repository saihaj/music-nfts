import { TypeNames } from './types/shared'

export default (obj: any) => {
  const { ArtistType } = require('./types/artist')
  const { ArtistContractType } = require('./types/artist-contract')

  switch (obj.type) {
    case TypeNames.Artist:
      return ArtistType
    case TypeNames.ArtistContract:
      return ArtistContractType
    default:
      throw new Error(`Unknown type: ${JSON.stringify(obj)}`)
  }
}
