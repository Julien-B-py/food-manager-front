import Button from "@mui/material/Button";

import CssTextField from "./CssTextField";

import { selectCategories } from "../constants/constants";

const EditForm = ({ edit, handleChange, input, setInput }) => {
  return (
    <div className="user-controls">
      <form className="add-input">
        <span>Modifier un aliment</span>
        <CssTextField
          label="Aliment"
          name="name"
          onChange={(e) => handleChange(e)}
          value={input.name}
        />

        <CssTextField
          label="Catégorie"
          name="category"
          onChange={(e) => handleChange(e)}
          select
          value={input.category}
        >
          {selectCategories}
        </CssTextField>

        <CssTextField
          label="Durée de conservation"
          name="storageLife"
          onChange={(e) => handleChange(e)}
          value={input.storageLife}
          type="number"
        />
        <CssTextField
          label="Date de péremption"
          name="expDate"
          onChange={(e) => handleChange(e)}
          type="date"
          value={input.expDate}
        />

        <Button onClick={(e) => {}} variant="contained">
          Valider
        </Button>
      </form>
    </div>
  );
};

export default EditForm;
