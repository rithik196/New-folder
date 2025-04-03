import "@fontsource/inter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import the icon
import { createTheme } from "@mui/material/styles";

const primarytTheme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

const secondaryTheme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none !important",
          backgroundColor: "#F8F8F8 !important",
          borderRadius: "20px !important",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderBottom: "2px solid #9B1E26 !important",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#25243B !important",
          fontSize: "14px",
          padding: "4px",
          "& .MuiFormLabel-asterisk": {
            color: "red !important",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // width: "240px",
          height: "30px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#C4C4C4 !important",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#25243B !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#C4C4C4 !important",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: "#25243B !important",
        },
      },
      defaultProps: {
        IconComponent: ExpandMoreIcon, // ✅ Use ExpandMoreIcon as the default Select icon
      },
    },
  },
});

export { primarytTheme, secondaryTheme };

