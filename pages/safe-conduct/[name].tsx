import SafeConduct from "client/components/SafeConduct"
import { useRouter } from "next/router"
import { parseQueryParameters } from "utils/utils"

export default function SafeConductPage() {
  const { query } = useRouter()
  const user = {
    name: decodeURIComponent(parseQueryParameters(query.name)),
    identityDocument: decodeURIComponent(
      parseQueryParameters(query.identityDocument)
    ),
  }

  return (
    <SafeConduct name={user.name} identityDocument={user.identityDocument} />
  )
}
