import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import generatePdf from "server/generatePdf"
import { extractUserFromQuery } from "utils/utils"

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const user = extractUserFromQuery(query)

  const pdf = await generatePdf(user)

  res.end(pdf)

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
