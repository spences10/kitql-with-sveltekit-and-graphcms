import { KitQLClient } from '@kitql/client'
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_API

export const kitQLClient = new KitQLClient({
  url: GRAPHQL_ENDPOINT as string,
  credentials: 'omit',
  headersContentType: 'application/json',
  logType: ['client', 'server', 'operationAndvariables'],
})
