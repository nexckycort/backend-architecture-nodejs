import jwt from 'jsonwebtoken'
import colors from 'colors'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { SendMailOptions } from 'nodemailer'

import UsersModel from '../../models/users/users.model'
import Logger from '../../helpers/logger'
import { secretKey, urlClient } from '../../config'
import { ReqUser, User } from '../../interfaces/user.interfaces'
import { confirmAccountHtml, confirmAccountText } from '../../helpers/templates/emails/confirmAccount'
import { SendEmail } from '../../handlers/email'

export default class UsersService {
  private static instance: UsersService
  private readonly usersModel!: UsersModel
  private constructor() {
    this.usersModel = UsersModel.getInstance()
  }

  public static getInstance(): UsersService {
    if (UsersService.instance === undefined) {
      UsersService.instance = new UsersService()
    }
    return UsersService.instance
  }

  save = async (reqUser: ReqUser): Promise<User> => {
    try {
      const passwordHash = await bcrypt.hash(reqUser.password, 10)
      reqUser.password = passwordHash

      const hash = crypto.randomBytes(20).toString('hex')

      const url = [urlClient, 'confirmar-cuenta', hash].join('/')
      const optionsEmail: SendMailOptions = {
        to: reqUser.email,
        subject: 'Confirma tu cuenta',
        text: confirmAccountText(url),
        html: confirmAccountHtml(url)
      }

      SendEmail(optionsEmail)

      const user = await this.usersModel.create<User>(reqUser)
      return user
    } catch (error) {
      Logger.error(colors.red('Error UsersService save '), error)
      throw new Error('TECHNICAL ERROR')
    }
  }

  findByEmail = async (email: string): Promise<User | undefined> => {
    try {
      const user = await this.usersModel.findOne<User>({ where: { email } })
      return user
    } catch (error) {
      Logger.error(colors.red('Error UsersService save '), error)
      throw new Error('TECHNICAL ERROR')
    }
  }

  comparePassword = async (passwordToCompare: string, originalPassword: string): Promise<boolean> => {
    try {
      const data = await bcrypt.compare(passwordToCompare, originalPassword)
      return data
    } catch (e) {
      Logger.error(colors.red('Error UsersService comparePassword '), e)
      throw new Error('TECHNICAL ERROR')
    }
  }

  signToken = (data: Record<string, unknown>, expiresIn = '24h'): string => {
    return jwt.sign(data, secretKey, { expiresIn })
  }

  /*
  validateAccountByHash = async (hash: string): Promise<boolean> => {
    try {
      const account = await usersModel.validateAccountByHash(hash)
      if (account === undefined) return false
      return (account === 'A')
    } catch (e) {
      Logger.error(colors.red('Error UsersService validateAccountByHash '), e)
      throw e
    }
  }

  validateAccountByUser = async (user: string): Promise<string | false> => {
    try {
      const email = await usersModel.validateAccountByUser(user)
      if (email === undefined) return false
      return email
    } catch (e) {
      Logger.error(colors.red('Error UsersService validateAccountByUser '), e)
      throw e
    }
  }

  confirmAccount = async (hash: string): Promise<any | false> => {
    try {
      const id = await this.compareHash(hash)
      if (id === undefined) return false
      await usersModel.activeUser(id)
      return true
    } catch (e) {
      Logger.error(colors.red('Error UsersService confirmAccount '), e)
      throw e
    }
  }

  compareHash = async (hash: string): Promise<number | undefined> => {
    try {
      const match = await usersModel.compareHash(hash)
      return match
    } catch (e) {
      Logger.error(colors.red('Error UsersService compareHash '), e)
      throw e
    }
  }

  sendEmailRestorePassword = async (email: string, user: string): Promise<void> => {
    try {
      const hash = crypto.randomBytes(20).toString('hex')

      const oneHour = 3600000
      const data = {
        token: hash,
        expira_token: (Date.now() + oneHour)
      }
      await usersModel.update({ o: data, where: { usuario: user } })
      const url = [urlClient, 'restablecer-contraseña', hash].join('/')
      const optionsEmail: SendMailOptions = {
        to: email,
        subject: 'Restablecer Contraseña Edukar',
        // TODO: restorePasswordText
        text: 'restorePasswordText(url)',
        html: restorePasswordHtml(url)
      }

      SendEmail(optionsEmail)
    } catch (e) {
      Logger.error(colors.red('Error restorePassword save '), e)
      throw new Error('TECHNICAL ERROR')
    }
  }

  validateTokenRestorePassword = async (token: string): Promise<boolean> => {
    try {
      const user = await usersModel.findOne({ where: { token: token } })
      if (user === undefined) return false
      const expiresIn = +user.expira_token - Date.now()
      return expiresIn >= 0
    } catch (e) {
      Logger.error(colors.red('Error UsersService validateAccountByUser '), e)
      throw e
    }
  }

  restorePassword = async (password: string, token: string): Promise<boolean> => {
    try {
      const passwordHash = await bcrypt.hash(password, 10)
      await usersModel.update({ o: { clave: passwordHash, token: null }, where: { token } })
      return true
    } catch (e) {
      Logger.error(colors.red('Error restorePassword validateAccountByUser '), e)
      throw e
    }
  }

  verifyToken = (token: string): any => {
    return jwt.verify(token, secretKey)
  } */
}
