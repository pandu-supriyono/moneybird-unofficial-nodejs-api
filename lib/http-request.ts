import axios, { AxiosResponse } from 'axios'
import * as t from 'io-ts'
import { flow, identity, pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import { toDecodingError, toUnauthorized, toUnknownError } from './error'

const decodeReqError = (e: Error) =>
  pipe(
    e,
    O.fromPredicate(axios.isAxiosError),
    O.map((axiosError) => {
      if (axiosError.response) {
        switch (axiosError.response.status) {
          case 401:
            return toUnauthorized()
        }
      }

      return toUnknownError()
    }),
    O.foldW(
      () => toUnknownError(),
      (error) => error
    )
  )

const makeReq = TE.bimap(
  (e: unknown) => {
    const error = e instanceof Error ? e : new Error(String(e))
    return decodeReqError(error)
  },
  (v: AxiosResponse): unknown => v.data
)

export const httpGet = flow(TE.tryCatchK(axios.get, identity), makeReq)

export const decodeResponseBody =
  <A>(decoder: t.Type<A>) =>
  (json: unknown) =>
    pipe(json, decoder.decode, TE.fromEither, TE.mapLeft(toDecodingError))

export const toAuthorizationHeader = (apiKey: string) => 'Bearer ' + apiKey
