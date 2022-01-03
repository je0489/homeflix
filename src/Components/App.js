import React from "react";
import Router from "./Router";
import GlobalStyles from "./GlobalStyles";
import { ThemeProvider } from "styled-components";

import theme from "../theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
