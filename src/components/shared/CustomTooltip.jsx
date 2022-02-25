import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#001746"
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#001746",
    fontSize: 14,
    padding: "0.5rem"
  }
}));

export default CustomTooltip;
