import MenuItem from "@mui/material/MenuItem";

import CssTextField from "#components/shared/CssTextField";
import { filterOptions } from "#constants/constants";

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
        {filterOptions.map((filterOption) => (
          <MenuItem key={filterOption} value={filterOption}>
            {filterOption}
          </MenuItem>
        ))}
      </CssTextField>
    </div>
  );
};
export default Filter;
