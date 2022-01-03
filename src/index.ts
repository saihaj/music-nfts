import { createServer } from 'graphql-yoga'
import { providers, utils } from 'ethers'
import {
  ArtistCreator__factory,
  Artist__factory,
} from '../types/ethers-contracts'
import { schema } from './schema'
const PROVIDER_HOST =
  'https://mainnet.infura.io/v3/0eca94ece6b0444081c0a98a084fc526'

const ARTIST_CREATOR_ADDRESS = '0x78E3aDc0E811e4f93BD9F1f9389b923c9A3355c2'

// const provider = new providers.InfuraProvider()
// const artistCreator = ArtistCreator__factory.connect(
//   ARTIST_CREATOR_ADDRESS,
//   provider,
// )

// const LOG_ABI = [
//   'event CreatedArtist(uint256 artistId, string name, string symbol, address indexed artistAddress)',
// ]

// const ifaceLog = new utils.Interface(LOG_ABI)

// provider
//   .getLogs({
//     address: ARTIST_CREATOR_ADDRESS,
//     toBlock: 'latest',
//     fromBlock: 13725566, // first block of the contract
//   })
//   .then((a) => {
//     const last = a[a.length - 1]
//     provider.getTransactionReceipt(last.transactionHash).then((b) => {
//       // console.log(ifaceLog.parseLog(b.logs[3]).args.artistId.toString())
//       console.log(ifaceLog.parseLog(b.logs[3]))
//     })
//   })

// artistCreator.artistContracts('1').then((a) => {
//   const artist = Artist__factory.connect(a, provider)
// })
const server = createServer({ schema })

server.start(() => console.log('Server is running on http://localhost:4000'))
