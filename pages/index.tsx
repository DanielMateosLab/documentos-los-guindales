import { Container, Typography } from "@material-ui/core"
import moment from "moment"
import { AppEvent } from "types"
import { formatDate } from "utils/utils"

export const event: AppEvent = {
  name: "Taller de Hierbas Medicinales",
  startDate: moment("2021-03-13"),
  endDate: moment("2021-03-14"),
}

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" component="h1" align="center">
        Salvoconducto para el {event.name}.
      </Typography>
      <Typography variant="subtitle1" align="center">
        Del {formatDate(event.startDate)} al {formatDate(event.endDate)}.
      </Typography>
    </Container>
  )
}
