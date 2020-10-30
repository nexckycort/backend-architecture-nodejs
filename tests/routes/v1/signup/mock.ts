import bcrypt from 'bcrypt';

export const USER_NAME = 'abc'

export const bcryptHashSpy = jest.spyOn(bcrypt, 'hash')
