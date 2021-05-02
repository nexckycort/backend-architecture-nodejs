import supertest from 'supertest'

import app from '../../../../src/loaders/server'

describe('Home', () => {
  const endpoint = '/status'
  const request = supertest(app())

  beforeEach(() => {})

  it('Not Found Error', async (done) => {
    const response = await request.get('/endpoint')
    expect(response.status).toBe(404)
    done()
  })

  it('Should send success response', async (done) => {
    const response = await request.get(endpoint)
    expect(response.status).toBe(200)
    done()
  })
})
