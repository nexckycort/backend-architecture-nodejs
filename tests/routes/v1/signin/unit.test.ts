import supertest from 'supertest'

import app from '../../../../src/app'
import {  bcryptCompareSpy, USER_EMAIL, USER_PASSWORD, USER_PASSWORD_HASH } from './mock'

describe('Login basic route', () => {
  const endpoint = '/v1/signin'
  const request = supertest(app)

  beforeEach(() => {
    bcryptCompareSpy.mockClear()
  })

  it('Should send error when empty body is sent', async (done) => {
    const response = await request.post(endpoint)
    expect(response.status).toBe(400)
    expect(bcryptCompareSpy).not.toBeCalled()
    done()
  })

  it('Should send error when email is only sent', async (done) => {
    const response = await request.post(endpoint).send({ email: USER_EMAIL })
    expect(response.status).toBe(400)
    expect(response.body.message).toMatch(/password/)
    expect(bcryptCompareSpy).not.toBeCalled()
    done()
  })

  it('Should send error when password is only sent', async (done) => {
    const response = await request.post(endpoint).send({ password: USER_PASSWORD })
    expect(response.status).toBe(400)
    expect(response.body.message).toMatch(/email/)
    expect(bcryptCompareSpy).not.toBeCalled()
    done()
  })

  it('Should send error when email is not valid format', async (done) => {
    const response = await request.post(endpoint).send({ email: '123' })
    expect(response.status).toBe(400)
    expect(response.body.message).toMatch(/valid email/)
    expect(bcryptCompareSpy).not.toBeCalled()
    done()
  })

  it('Should send error when password is not valid format', async (done) => {
    const response = await request.post(endpoint).send({
      email: '123@abc.com',
      password: '123'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toMatch(/password length/)
    expect(response.body.message).toMatch(/6 char/)
    expect(bcryptCompareSpy).not.toBeCalled()
    done()
  })

  it('Should send error when user not registered for email', async (done) => {
    const response = await request.post(endpoint).send({
      email: '123@abc.com',
      password: '123456',
    })
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/not registered/)
    expect(bcryptCompareSpy).not.toBeCalled()
    done()
  })

  it('Should send error for wrong password', async (done) => {
    const response = await request.post(endpoint).send({
      email: USER_EMAIL,
      password: '123456',
    })
    expect(response.status).toBe(401)
    expect(response.body.message).toMatch(/authentication failure/i)
    expect(bcryptCompareSpy).toBeCalledTimes(1)
    done()
  })

  it('Should send success response for correct credentials', async (done) => {
    const response = await request.post(endpoint).send({
      email: USER_EMAIL,
      password: USER_PASSWORD,
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toMatch(/Success/i)
    expect(response.body.data).toBeDefined()

    expect(response.body.data.user).toHaveProperty('id')

    expect(bcryptCompareSpy).toBeCalledWith(USER_PASSWORD, USER_PASSWORD_HASH)
    done()
  })
})
