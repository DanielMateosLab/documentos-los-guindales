import userEvent from "@testing-library/user-event"
import Home, {
  dateLabel,
  emailLabel,
  identityDocumentLabel,
  nameLabel,
  submitButtonText,
  successPdfGenerationMessage,
} from "pages"
import { render, screen, waitFor } from "utils/testUtils"
import { getPathname } from "utils/utils"

global.open = jest.fn()

describe("index", () => {
  beforeEach(() => {
    render(<Home />)
  })
  describe("page title", () => {
    it("should have a title", () => {
      const titleElement = screen.getByRole("heading", {
        name: new RegExp("Generador"),
      })

      expect(titleElement).toBeDefined()
    })
  })
  describe("form", () => {
    it("should have a dates input", () => {
      const datesInput = screen.getByLabelText(dateLabel)

      expect(datesInput).toBeVisible()
    })
    it("should have a name input", () => {
      const nameInput = screen.getByLabelText(nameLabel)

      expect(nameInput).toBeVisible()
    })
    it("should have a identityDocument input", () => {
      const identityDocumentInput = screen.getByLabelText(identityDocumentLabel)

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
      const pathname = getPathname({ name, identityDocument }, "pdf")

      const fillFormAndSubmit = () => {
        userEvent.type(screen.getByLabelText(nameLabel), name)
        userEvent.type(
          screen.getByLabelText(identityDocumentLabel),
          identityDocument
        )
        userEvent.click(screen.getByText(submitButtonText))
      }

      it("should open the pdf creation page in a new tab", async () => {
        fillFormAndSubmit()

        await waitFor(() => {
          expect(global.open).toHaveBeenCalledWith(pathname, "_blank")
        })
      })
      it("should set a success message after clicking the submit button", async () => {
        fillFormAndSubmit()

        const successMessage = await screen.findByText(
          successPdfGenerationMessage
        )
        expect(successMessage).toBeVisible()
      })
      test("the success message should have a link to the pdf creation page", async () => {
        fillFormAndSubmit()

        const link = await screen.findByRole("link")
        expect(link).toBeVisible()
        expect(link).toHaveProperty("href", "http://localhost" + pathname)
      })
    })
  })
})
