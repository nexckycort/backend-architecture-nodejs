import bcrypt from 'bcrypt'

export const USER_EMAIL = 'random@test.com'
export const USER_PASSWORD = 'abc123'
export const USER_PASSWORD_HASH = '$2b$10$5EepC5H8P9mQoOjirSxPKOVeM7mBfSk6JqdYDuyHD1PWqKypEDpc2'

export const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare')
