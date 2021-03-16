import Home, {
  emailLabel,
  event,
  identityDocumentLabel,
  nameLabel,
  submitButtonText,
} from "pages"
import { render, screen } from "utils/testUtils"
import { formatDate } from "utils/utils"

describe("index", () => {
  beforeEach(() => {
    render(<Home />)
  })
  describe("page title", () => {
    it("should have a title", () => {
      const titleElement = screen.getByRole("heading", {
        name: new RegExp("Salvoconducto"),
      })

      expect(titleElement).toBeDefined()
    })
    it("should display the event name", () => {
      const eventNameElement = screen.getByRole("heading", {
        name: new RegExp(event.name),
      })

      expect(eventNameElement).toBeDefined()
    })
    it("should display the event dates", () => {
      const startDateElement = screen.getByRole("heading", {
        name: new RegExp(formatDate(event.startDate)),
      })
      const endDateElement = screen.getByRole("heading", {
        name: new RegExp(formatDate(event.endDate)),
      })

      expect(startDateElement).toBeDefined()
      expect(endDateElement).toBeDefined()
    })
    describe("form", () => {
      it("should have a name input", () => {
        const nameInput = screen.getByLabelText(nameLabel)

        expect(nameInput).toBeInTheDocument()
      })
      it("should have a identityDocument input", () => {
        const identityDocumentInput = screen.getByLabelText(
          identityDocumentLabel
        )

        expect(identityDocumentInput).toBeInTheDocument()
      })
      it("should have an email input", () => {
        const emailInput = screen.getByLabelText(emailLabel)

        expect(emailInput).toBeInTheDocument()
      })
      it("should have a submit button", () => {
        const submitButton = screen.getByRole("button", {
          name: submitButtonText,
        })

        expect(submitButton).toBeInTheDocument()
      })
    })
  })
})
