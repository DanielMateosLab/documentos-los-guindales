import { Container, Typography } from "@material-ui/core"
import moment, { Moment } from "moment"
import { formatDate } from "utils/utils"

export const eventName = "Taller de Hierbas Medicinales"
interface EventDates {
  startDate: Moment
  endDate: Moment
}
export const eventDates: EventDates = {
  startDate: moment("2021-03-13"),
  endDate: moment("2021-3-14"),
}

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" component="h1" align="center">
        Salvoconducto para el {eventName}.
      </Typography>
      <Typography variant="subtitle1" align="center">
        Del {formatDate(eventDates.startDate)} al{" "}
        {formatDate(eventDates.endDate)}.
      </Typography>
    </Container>
  )
}
