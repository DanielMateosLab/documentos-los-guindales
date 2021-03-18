import userEvent from "@testing-library/user-event"
import Home, {
  emailLabel,
  event,
  identityDocumentLabel,
  nameLabel,
  submitButtonText,
  successPdfGenerationMessage,
} from "pages"
import { mockPush, render, screen, waitFor } from "utils/testUtils"
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

        expect(nameInput).toBeVisible()
      })
      it("should have a identityDocument input", () => {
        const identityDocumentInput = screen.getByLabelText(
          identityDocumentLabel
        )

        expect(identityDocumentInput).toBeVisible()
      })
      it.skip("should have an email input", () => {
        const emailInput = screen.getByLabelText(emailLabel)

        expect(emailInput).toBeVisible()
      })
      it("should have a submit button", () => {
        const submitButton = screen.getByRole("button", {
          name: submitButtonText,
        })

        expect(submitButton).toBeVisible()
      })

      describe("submission handler", () => {
        const name = "aaaaaa"
        const identityDocument = "bbbbbb"
        const fillFormAndSubmit = () => {
          userEvent.type(screen.getByLabelText(nameLabel), name)
          userEvent.type(
            screen.getByLabelText(identityDocumentLabel),
            identityDocument
          )
          userEvent.click(screen.getByText(submitButtonText))
        }
        it("should redirect the user to the pdf creation page", async () => {
          fillFormAndSubmit()

          await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith(
              "/pdf-safe-conduct/" +
                encodeURIComponent(name) +
                "?identityDocument=" +
                encodeURIComponent(identityDocument)
            )
          })
        })
        it("should set a success message after clicking the submit button", async () => {
          fillFormAndSubmit()

          const successMessage = await screen.findByText(
            successPdfGenerationMessage
          )
          expect(successMessage).toBeVisible()
        })
        it.todo(
          "should have a success message with a link to the pdf page creation"
        )
      })
    })
  })
})
