import { pipe } from 'fp-ts/lib/function'
import { GetInvoiceCodec, ListAdministrationsCodec } from './codecs'
import { MoneybirdClientConfig } from './config'
import * as O from 'fp-ts/Option'
import {
  decodeResponseBody,
  httpGet,
  toAuthorizationHeader
} from './http-request'
import * as TE from 'fp-ts/TaskEither'
import { toEmptyAdministrationId } from './error'

const baseUrl = 'https://moneybird.com/api/v2'

const makeHeader = (config: MoneybirdClientConfig) => ({
  headers: {
    Authorization: toAuthorizationHeader(config.apiKey)
  }
})

export const listAllAdministrations = () => (config: MoneybirdClientConfig) => {
  const header = makeHeader(config)

  return pipe(
    httpGet(`${baseUrl}/administrations.json`, header),
    TE.chainW(decodeResponseBody(ListAdministrationsCodec))
  )
}

export const getInvoiceByInvoiceId =
  (administrationId?: string) =>
  (invoiceId: string) =>
  (config: MoneybirdClientConfig) => {
    const maybeAdministrationId = O.fromNullable(
      administrationId || config.administrationId
    )

    const header = makeHeader(config)

    return pipe(
      maybeAdministrationId,
      TE.fromOption(toEmptyAdministrationId),
      TE.chainW((administrationId) =>
        httpGet(
          `${baseUrl}/${administrationId}/sales_invoices/find_by_invoice_id/${invoiceId}.json`,
          header
        )
      ),
      TE.chainW(decodeResponseBody(GetInvoiceCodec))
    )
  }
