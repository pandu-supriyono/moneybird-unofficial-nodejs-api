import * as t from 'io-ts'

const nullOrString = t.union([t.string, t.null])

export const ListAdministrationsCodec = t.array(
  t.type({
    id: t.string,
    name: t.string,
    language: t.string,
    country: t.string,
    time_zone: t.string
  })
)

// const GetInvoiceCodec = t.type({
//   id: t.string,
//   administration_id: t.string,
//   contact_id: t.string,
//   contact: t.type({
//     id: t.string,
//     administration_id: t.string,
//     company_name: t.string,
//     firstname: nullOrString,
//     lastname: nullOrString,
//   })
// })
