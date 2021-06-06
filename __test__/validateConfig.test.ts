import { validateConfig } from "utils/utils"

describe("validateConfig", () => {
  let validateTarget: { [key: string]: any } = {
    TEST_1: "a",
    TEST_2: "b",
  }

  beforeEach(() => {
    validateTarget = {
      TEST_1: "a",
      TEST_2: "b",
    }
  })

  it("should return true", () => {
    validateConfig(validateTarget)
  })

  it("should throw with singular 'variable' word in the message", () => {
    expect.hasAssertions()

    validateTarget.TEST_1 = undefined

    try {
      validateConfig(validateTarget)
    } catch (error) {
      expect(error.message).toEqual("Missing environment variable: TEST_1")
    }
  })

  it("should throw with plural 'variables' word in the message", () => {
    expect.hasAssertions()

    validateTarget.TEST_1 = undefined
    validateTarget.TEST_2 = undefined

    try {
      validateConfig(validateTarget)
    } catch (error) {
      expect(error.message).toEqual(
        "Missing environment variables: TEST_1, TEST_2"
      )
    }
  })
})
