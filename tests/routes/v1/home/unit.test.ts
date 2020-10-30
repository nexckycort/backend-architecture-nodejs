import supertest from 'supertest'

import app from '../../../../src/app'

describe('welcome to api', () => {
  const endpoint = '/'
  const request = supertest(app)

  beforeEach(() => {
  })

  it('Home', async (done) => {
    const response = await request.get(endpoint)
    expect(response.status).toBe(200)
    done()
  })
})
