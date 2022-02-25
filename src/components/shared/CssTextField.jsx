import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

// Custom TextField
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "rgb(144,202,249)"
  },

  "& label": {
    color: "rgb(126,175,215)"
  },

  "& .MuiInputBase-root": {
    color: "#fff"
  },

  "& .MuiSvgIcon-root": {
    color: "rgb(126,175,215)"
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgb(126,175,215)"
    },
    "&:hover fieldset": {
      borderColor: "rgb(152,187,215)"
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(144,202,249)"
    }
  }
});

export default CssTextField;
