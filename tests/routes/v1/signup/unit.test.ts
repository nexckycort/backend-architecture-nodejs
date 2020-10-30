import supertest from 'supertest'

import { bcryptHashSpy, USER_NAME } from './mock'
import { USER_EMAIL, USER_PASSWORD } from '../signin/mock'
import app from '../../../../src/app'

describe('Signup basic route', () => {
  const endpoint = '/v1/signup'
  const endpointClear = '/v1/test'
  const request = supertest(app)

  const email = 'abc@xyz.com'

  beforeEach(() => {
    bcryptHashSpy.mockClear()
  })

  it('Should send error when empty body is sent', async (done) => {
    const response = await request.post(endpoint)
    expect(response.status).toBe(400)
    expect(bcryptHashSpy).not.toBeCalled()
    done()
  })

  it('Should send error when email is not sent', async (done) => {
    const response = await request.post(endpoint).send({
      name: USER_NAME,
      password: USER_PASSWORD
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toMatch(/email/)
    expect(response.body.message).toMatch(/required/)
    expect(bcryptHashSpy).not.toBeCalled()
    done()
  })

  it('Should send error when password is not sent', async (done) => {
    const response = await request.post(endpoint).send({
      email,
      name: USER_NAME
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toMatch(/password/)
    expect(response.body.message).toMatch(/required/)
    expect(bcryptHashSpy).not.toBeCalled()
    done()
  })

  it('Should send error when name is not sent', async (done) => {
    const response = await request.post(endpoint).send({
      email: email,
      password: USER_PASSWORD
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toMatch(/name/)
    expect(response.body.message).toMatch(/required/)
    expect(bcryptHashSpy).not.toBeCalled()
    done()
  })

  it('Should send error when email is not valid format', async (done) => {
    const response = await request.post(endpoint).send({
      email: 'abc',
      name: USER_NAME,
      password: USER_PASSWORD
    })
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/valid email/)
    expect(bcryptHashSpy).not.toBeCalled()
    done()
  })

  it('Should send error when password is not valid format', async (done) => {
    const response = await request.post(endpoint).send({
      email: email,
      name: USER_NAME,
      password: '123'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toMatch(/password length/)
    expect(response.body.message).toMatch(/6 char/)
    expect(bcryptHashSpy).not.toBeCalled()
    done()
  })

  it('Should send error when user is registered for email', async (done) => {
    const response = await request.post(endpoint).send({
      email: USER_EMAIL,
      name: USER_NAME,
      password: USER_PASSWORD
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toMatch(/already registered/)
    expect(bcryptHashSpy).not.toBeCalled()
    done()
  })

  it('Should send success response for correct data', async (done) => {
    const response = await request.post(endpoint).send({
      email: email,
      name: USER_NAME,
      password: USER_PASSWORD
    })

    expect(response.status).toBe(200)
    expect(response.body.message).toMatch(/Success/i)
    expect(response.body.data).toBeDefined()

    expect(response.body.data.user).toHaveProperty('id')

    expect(bcryptHashSpy).toBeCalledTimes(1)

    expect(bcryptHashSpy).toBeCalledWith(USER_PASSWORD, 10)

    done()
  })

  it('Should delete the test data', async (done) => {
    const response = await request.post(endpointClear).send({
      email: email
    })

    expect(response.status).toBe(200)
    expect(response.body.test).toMatch(/ok/i)
    done()
  })
})
