import SimpleSchema from 'simpl-schema'
import { Tracker } from 'meteor/tracker'

export default class SimpleSchemaHelpers {
  static defineField (field, required = true, atts = {}) {
    return Object.assign({}, field, atts, { optional: !required })
  }

  static createSchema (fields, options = {}) {
    const {
      isReactive = false,
      ...opts
    } = options

    if (isReactive) {
      Object.assign(opts, { tracker: Tracker })
    }

    const fieldDefinitions = []
    fields.forEach(({
      field,
      name,
      required,
      atts
    }) => {
      const {
        subFields,
        ...fieldProps
      } = field

      if (Array.isArray(subFields)) {
        const sub = subFields.map(subField => {
          const [k, v] = Object.entries(subField)[0]
          return [`${name}${k}`, v]
        })
        fieldDefinitions.push([
          name,
          SimpleSchemaHelpers.defineField(fieldProps, required, atts)
        ], ...sub)
      } else {
        fieldDefinitions.push([
          name,
          SimpleSchemaHelpers.defineField(fieldProps, required, atts)
        ])
      }
    })

    const schemaDescription = fieldDefinitions.reduce(
      (obj, [k, v]) => ({ ...obj, [k]: v }),
      {}
    )

    return new SimpleSchema(schemaDescription, opts)
  }

  static createValidatorSchema (fields) {
    return SimpleSchemaHelpers.createSchema(fields).validator()
  }

  static assembleSchema (schemas, options = {}) {
    const {
      isReactive = false,
      ...opts
    } = options

    if (isReactive) {
      Object.assign(opts, { tracker: Tracker })
    }

    const simpleSchema = new SimpleSchema(schemas.shift(), opts)
    schemas.forEach(schema => {
      simpleSchema.extend(schema)
    })
    return simpleSchema
  }
}
