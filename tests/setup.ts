import dotenv from 'dotenv'

if (!process.env.GITLAB) {
  dotenv.config()
}
