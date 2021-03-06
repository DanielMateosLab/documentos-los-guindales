import { ThemeProvider } from "@material-ui/core"
import { render as rtlRender, RenderOptions } from "@testing-library/react"
import theme from "client/theme"
import { RouterContext } from "next/dist/next-server/lib/router-context"

/**
 * Re-usable mockPush that is provided to all the tests.
 * Remember that to assert push calls made with Link you need to do it this way:
 * ```
 * expect(mockPush.mock.calls[0]).toContain("/testedRoute")
 * ```
 */
export const mockPush = jest.fn(async () => false)

type CustomRenderOptions = RenderOptions & {
  pathname?: string
}

/**
 * Custom render function with router, store and material contexts provided.
 * Some useful params can be provided in a config object:
 * @param initialState store initial state
 * @param pathname router pathname
 */
const render = (
  ui: Parameters<typeof rtlRender>[0],
  { pathname = "/", ...renderOptions }: CustomRenderOptions = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
      <RouterContext.Provider
        value={
          {
            pathname,
            push: mockPush,
            prefetch: jest.fn(async () => true),
          } as any
        }
      >
        {children}
      </RouterContext.Provider>
    </ThemeProvider>
  )

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}
export * from "@testing-library/react"
export { render }

/**
 * Calls the provided hook into an empty component and renders it.
 * @param hook hook to be called inside the component
 */
export const callHookInComponent = (hook: Function) => {
  const Component = () => {
    hook()
    return <div />
  }
  render(<Component />)
}
