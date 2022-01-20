import * as E from 'fp-ts/Either'
import { flow, identity } from 'fp-ts/lib/function'
import { getInvoiceByInvoiceId } from '.'
import { MoneybirdClientConfig, verifyConfig } from './config'
import { listAllAdministrations } from './requests'

export default class MoneybirdClient {
  private config: MoneybirdClientConfig

  constructor(config: MoneybirdClientConfig) {
    const validatedConfig = verifyConfig(config)
    if (E.isLeft(validatedConfig)) {
      throw new Error('Invalid config')
    }

    this.config = validatedConfig.right
  }

  public listAllAdministrations() {
    return listAllAdministrations()(this.config)().then(
      flow(E.foldW((error) => new Error(error._tag), identity))
    )
  }

  public getInvoiceByInvoiceId(invoiceId: string, administrationId?: string) {
    return getInvoiceByInvoiceId(administrationId)(invoiceId)(
      this.config
    )().then(flow(flow(E.foldW((error) => new Error(error._tag), identity))))
  }
}
