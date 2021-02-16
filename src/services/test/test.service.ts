import colors from 'colors'

import TestModel from 'models/test/test.model'
import Logger from 'helpers/logger'

export default class TestService {
  private static instance: TestService
  private readonly testModel!: TestModel
  private constructor() {
    this.testModel = TestModel.getInstance()
  }

  public static getInstance(): TestService {
    if (TestService.instance === undefined) {
      TestService.instance = new TestService()
    }
    return TestService.instance
  }

  test = (test: string): string => {
    try {
      const result = this.testModel.test(test)
      return result.toUpperCase()
    } catch (error) {
      Logger.error(colors.red('Error TestService test '), error)
      throw new Error('TECHNICAL ERROR')
    }
  }
}
