import Home from "pages"
import { render } from "utils/testUtils"

describe("index", () => {
  it("should have a title", () => {
    const { getByText } = render(<Home />)

    const titleElement = getByText(/Salvoconducto/)

    expect(titleElement).toBeDefined()
  })
})
