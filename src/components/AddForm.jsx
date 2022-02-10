import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import CssTextField from "./CssTextField";

import { categories } from "../constants/constants";

function AddForm({ input, handleChange, addFood, closeModal }) {
  return (
    <div className="user-controls">
      <form className="add-input">
        <span>Ajouter un aliment</span>
        <CssTextField
          label="Aliment"
          name="name"
          onChange={(e) => handleChange(e)}
          value={input.name}
        />

        <CssTextField
          name="category"
          select
          label="Catégorie"
          value={input.category}
          onChange={(e) => handleChange(e)}
        >
          {categories.map((categorie) => (
            <MenuItem key={categorie} value={categorie}>
              {categorie}
            </MenuItem>
          ))}
        </CssTextField>

        <CssTextField
          label="Durée de conservation"
          name="storageLife"
          type="number"
          onChange={(e) => handleChange(e)}
          value={input.storageLife}
        />
        <CssTextField
          label="Date de péremption"
          name="expDate"
          type="date"
          onChange={(e) => handleChange(e)}
          value={input.expDate}
        />

        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            addFood();
            closeModal();
          }}
        >
          Ajouter
        </Button>
      </form>
    </div>
  );
}

export default AddForm;
