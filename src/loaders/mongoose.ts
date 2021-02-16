import mongoose from 'mongoose'

import { mongodbUri } from 'config'

export default async (): Promise<any> => {
  const connection = await mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  return connection.connection.db
}
