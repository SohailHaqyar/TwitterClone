import { createMuiTheme } from "@material-ui/core/styles";

import { blue, red } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: {
      // main: blue[600],
      // main: '#9c0014'
      // main: "#d4e054",
      // main: "#9c0054",
      main: "#22366e",
    },

    secondary: {
      main: red[600],
    },
  },
});

export default theme;
// linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))
