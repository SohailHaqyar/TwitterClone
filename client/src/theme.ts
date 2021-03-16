import { createMuiTheme } from "@material-ui/core/styles";

import { indigo } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[600],
    },
  },
});

export default theme;
// linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))
