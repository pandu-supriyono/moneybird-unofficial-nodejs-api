import { pipe } from 'fp-ts/lib/function'
import { ListAdministrationsCodec } from './codecs'
import { MoneybirdClientConfig } from './config'
import {
  decodeResponseBody,
  httpGet,
  toAuthorizationHeader
} from './http-request'
import * as TE from 'fp-ts/TaskEither'

const baseUrl = 'https://moneybird.com/api/v2'

export const listAllAdministrations = () => (config: MoneybirdClientConfig) =>
  pipe(
    httpGet(`${baseUrl}/administrations.json`, {
      headers: {
        Authorization: toAuthorizationHeader(config.apiKey)
      }
    }),
    TE.chainW(decodeResponseBody(ListAdministrationsCodec))
  )
