class TestModel {
  private static _instance: TestModel
  private constructor() {}

  public static get instance(): TestModel {
    if (TestModel._instance === undefined) {
      TestModel._instance = new TestModel()
    }
    return TestModel._instance
  }

  test = (test: string): string => {
    return `test ${test}`
  }
}

export default TestModel.instance
