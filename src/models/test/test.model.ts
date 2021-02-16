export default class TestModel {
  private static instance: TestModel
  private constructor() {}

  public static getInstance(): TestModel {
    if (TestModel.instance === undefined) {
      TestModel.instance = new TestModel()
    }
    return TestModel.instance
  }

  test = (test: string): string => {
    return `test ${test}`
  }
}
