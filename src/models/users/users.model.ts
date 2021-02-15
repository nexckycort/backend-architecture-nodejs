import MasterServices from '../../models/master.models'

const table = 'public.users'
export default class UsersModel extends MasterServices {
  private static instance: UsersModel
  private constructor() {
    super(table)
  }

  public static getInstance(): UsersModel {
    if (UsersModel.instance === undefined) {
      UsersModel.instance = new UsersModel()
    }
    return UsersModel.instance
  }
}
