import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import generatePdf from "server/generatePdf"
import { extractUserFromQuery } from "utils/utils"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = extractUserFromQuery(context.query)

  const pdf = await generatePdf(user)
  // Set headers in nextjs config file
  // End the response with the pdf

  return {
    props: {},
  }
}

export default function pdfSafeConductPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/")
  }, [])

  return null
}
