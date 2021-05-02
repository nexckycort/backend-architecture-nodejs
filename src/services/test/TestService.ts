import colors from 'colors'

import { TestModel } from 'models/index'
import Logger from 'helpers/logger'

class TestService {
  private static _instance: TestService
  private readonly testModel!: typeof TestModel
  private constructor() {
    this.testModel = TestModel
  }

  public static get instance(): TestService {
    if (TestService._instance === undefined) {
      TestService._instance = new TestService()
    }
    return TestService._instance
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

export default TestService.instance
