import { GraphQLScalarType, Kind } from 'graphql'
import { utils } from 'ethers'

const validate = (value: any) => {
  if (typeof value != 'string') {
    throw new TypeError(`Value is not string: ${value}`)
  }

  if (!utils.isAddress(value)) {
    throw new TypeError(`Value is not a valid address: ${value}`)
  }

  return value
}

export const GraphQLEthereumAddress = new GraphQLScalarType({
  name: 'EthereumAddress',
  description:
    'A field that conforms to the Ethereum address format. https://ethereum.org/en/glossary/#address',
  serialize: validate,
  parseValue: validate,
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `Can only validate strings as Ethereum addresses but got a: ${ast.kind}`,
      )
    }
    return validate(ast.value)
  },
})
