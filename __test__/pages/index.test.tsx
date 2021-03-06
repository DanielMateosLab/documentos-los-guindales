import Home, { eventDates, eventName } from "pages"
import { render } from "utils/testUtils"
import { formatDate } from "utils/utils"

describe("index", () => {
  describe("page title", () => {
    it("should have a title", () => {
      const { getByText } = render(<Home />)

      const titleElement = getByText(/Salvoconducto/, { selector: "h1" })

      expect(titleElement).toBeDefined()
    })
    it("should display the event name", () => {
      const { getByText } = render(<Home />)

      const eventNameElement = getByText(new RegExp(eventName), {
        selector: "h1 ",
      })

      expect(eventNameElement).toBeDefined()
    })
    it("should display the event dates", () => {
      const { getByText } = render(<Home />)

      const startDateElement = getByText(
        new RegExp(formatDate(eventDates.startDate))
      )
      const endDateElement = getByText(
        new RegExp(formatDate(eventDates.endDate))
      )

      expect(startDateElement).toBeDefined()
      expect(endDateElement).toBeDefined()
    })
  })
})
