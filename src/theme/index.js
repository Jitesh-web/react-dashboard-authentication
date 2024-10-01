import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: `Ubuntu`,
    body: "Ubuntu",
  },
  colors: {
    grey: "#D8DDE2",
    gray: "#797E82",
    purple: "#5F00D9",
    greyBtn: "#EEEEF4",
  },
  textStyles: {
    h1: {
      fontSize: {
        base: "30px",
        md: "32px",
      },
      color: "#171717",
      lineHeight: {
        base: "34px",
        md: "36px",
      },
    },
    h5: {
      fontSize: {
        base: "10px",
        md: "12px",
      },
      color: "#171717",

      lineHeight: { base: "12px", md: "14px" },
    },
    h6: {
      fontSize: {
        base: "16px",
        md: "14px",
      },
      color: "#797E82",

      lineHeight: { base: "20px", md: "18px" },
    },
  },
});
