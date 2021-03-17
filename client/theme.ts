import type '@material-ui/lab/themeAugmentation'
import { brown, green } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: green[300],
      main: green[800],
    },
    secondary: {
      main: brown[400],
    },
  },
})

export default theme
