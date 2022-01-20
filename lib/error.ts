import { Errors } from 'io-ts'

export interface InvalidConfig {
  _tag: 'InvalidConfig'
}

export const toInvalidConfig = (): InvalidConfig => ({
  _tag: 'InvalidConfig'
})

export interface DecodingError {
  _tag: 'DecodingError'
  message: string
}

export const toDecodingError = (errors: Errors): DecodingError => ({
  _tag: 'DecodingError',
  message: errors
    .map((error) => error.context.map(({ key }) => key).join('.'))
    .join('\n')
})

export interface Unauthorized {
  _tag: 'Unauthorized'
}

export const toUnauthorized = (): Unauthorized => ({
  _tag: 'Unauthorized'
})

export interface UnknownError {
  _tag: 'UnknownError'
}

export const toUnknownError = (): UnknownError => ({
  _tag: 'UnknownError'
})

export interface EmptyAdministrationId {
  _tag: 'EmptyAdministrationId'
}

export const toEmptyAdministrationId = (): EmptyAdministrationId => ({
  _tag: 'EmptyAdministrationId'
})
