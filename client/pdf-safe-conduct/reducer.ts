interface State {
  status: "success" | "error" | undefined
  pathname: string | undefined
}
type Action =
  | {
      type: "setStatus"
      payload: State["status"]
    }
  | {
      type: "setPathname"
      payload: State["pathname"]
    }
const pdfSafeConductReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setStatus":
      return { ...state, status: action.payload }
    case "setPathname":
      return { ...state, pathname: action.payload }
  }
}

export default pdfSafeConductReducer
