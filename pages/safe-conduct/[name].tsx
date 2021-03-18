import SafeConduct from "client/components/SafeConduct"
import { useRouter } from "next/router"
import { extractUserFromQuery } from "utils/utils"

export default function SafeConductPage() {
  const { query } = useRouter()
  const user = extractUserFromQuery(query)

  return (
    <SafeConduct name={user.name} identityDocument={user.identityDocument} />
  )
}
