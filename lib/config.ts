import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import { toInvalidConfig } from './error'

const MoneybirdClientConfig = t.intersection([
  t.type({
    apiKey: t.string
  }),
  t.partial({
    administrationId: t.string
  })
])

export type MoneybirdClientConfig = t.TypeOf<typeof MoneybirdClientConfig>

export const verifyConfig = (config: unknown) =>
  pipe(config, MoneybirdClientConfig.decode, E.mapLeft(toInvalidConfig))
