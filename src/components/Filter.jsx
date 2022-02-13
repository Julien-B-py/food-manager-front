import MenuItem from "@mui/material/MenuItem";

import CssTextField from "./CssTextField";
import { filters } from "../constants/constants";

const Filter = ({ filter, filterData }) => {
  return (
    <div className="filter">
      <CssTextField
        sx={{ width: "20ch" }}
        name="filter"
        select
        label="Filtrer"
        value={filter}
        onChange={(e) => filterData(e)}
      >
        {filters.map((filter) => (
          <MenuItem key={filter} value={filter}>
            {filter}
          </MenuItem>
        ))}
      </CssTextField>
    </div>
  );
};
export default Filter;
