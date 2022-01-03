const breakpoint = {
  mobile: "576px",
  tablet: "768px",
  desktop: "1024px",
};

const theme = {
  accentColor: "rgb(228, 36, 20)",
  darkerGreyColor: "rgb(24,24,24)",
  darkGreyColor: "rgb(48,48,48)",
  lightGreyColor: "rgb(89,89,89)",
  mobile: `(max-width: ${breakpoint.tablet})`,
  tablet: `(min-width: ${breakpoint.tablet}) and (max-width: ${
    breakpoint.desktop - 1
  })`,
};

export default theme;
