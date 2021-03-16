import Home, { event } from "pages"
import { render, screen } from "utils/testUtils"
import { formatDate } from "utils/utils"

describe("index", () => {
  beforeEach(() => {
    render(<Home />)
  })
  describe("page title", () => {
    it("should have a title", () => {
      const titleElement = screen.getByText("Salvoconducto", {
        selector: "h1",
        exact: false,
      })

      expect(titleElement).toBeDefined()
    })
    it("should display the event name", () => {
      const eventNameElement = screen.getByText(event.name, {
        selector: "h1 ",
        exact: false,
      })

      expect(eventNameElement).toBeDefined()
    })
    it("should display the event dates", () => {
      const startDateElement = screen.getByText(formatDate(event.startDate), {
        exact: false,
      })
      const endDateElement = screen.getByText(formatDate(event.endDate), {
        exact: false,
      })

      expect(startDateElement).toBeDefined()
      expect(endDateElement).toBeDefined()
    })
  })
})
