import userEvent from "@testing-library/user-event"
import Home, {
  emailLabel,
  event,
  identityDocumentLabel,
  nameLabel,
  submitButtonText,
  successPdfGenerationMessage,
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
      let nameInput: HTMLElement,
        identityDocumentInput: HTMLElement,
        emailInput: HTMLElement,
        submitButton: HTMLElement

      it("should have a name input", () => {
        nameInput = screen.getByLabelText(nameLabel)

        expect(nameInput).toBeVisible()
      })
      it("should have a identityDocument input", () => {
        identityDocumentInput = screen.getByLabelText(identityDocumentLabel)

        expect(identityDocumentInput).toBeVisible()
      })
      it.skip("should have an email input", () => {
        emailInput = screen.getByLabelText(emailLabel)

        expect(emailInput).toBeVisible()
      })
      it("should have a submit button", () => {
        submitButton = screen.getByRole("button", {
          name: submitButtonText,
        })

        expect(submitButton).toBeVisible()
      })

      describe("submission handler", () => {
        it("should set a success message if response is ok", async () => {
          fetchMock.once("", { status: 200 })

          userEvent.type(nameInput, "aaaaa")
          userEvent.type(identityDocumentInput, "aaaaa")
          userEvent.click(submitButton)

          const successMessage = await screen.findByText(
            successPdfGenerationMessage
          )
          expect(successMessage).toBeVisible()
        })
      })
    })
  })
})
