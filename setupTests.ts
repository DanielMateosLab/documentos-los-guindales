// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect"
import { enableFetchMocks } from "jest-fetch-mock"

require("dotenv").config({ path: ".env.local" })

enableFetchMocks()

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = "LoadableComponent"
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})
