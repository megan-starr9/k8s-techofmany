import { makeSchema } from 'nexus'
import { join } from 'path'

import * as types from "./graphql";

export const schema = makeSchema({
  types, // 1
  outputs: {
    schema: join(__dirname, 'schema.graphql'), // 2
    typegen: join(__dirname, 'nexus-typegen.ts'), // 3
  },
})
