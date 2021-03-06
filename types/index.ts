import { Moment } from "moment"

export interface AppEvent {
  name: string
  startDate: Moment
  endDate: Moment
}
