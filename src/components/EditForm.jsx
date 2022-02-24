import moment from "moment";
import { useEffect } from "react";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import CssTextField from "./CssTextField";

import { selectCategories } from "../constants/constants";
import { editFood } from "../api/api";

const EditForm = ({
  edit,
  handleChange,
  input,
  setEdit,
  setInput,
  setOperation,
  setUpdateNeeded
}) => {



  // Submit current modifications to the database to save update
  const submitFoodModif = async (e) => {
    e.preventDefault();

    const food = {
      name: input.name,
      category: input.category,
      storageLife: input.storageLife,
      expDate: moment(input.expDate).format("DD/MM/YYYY"),
      opened: input.opened,
    };

    if (food.opened) {
       food.openedDate = input.openedDate
    }

    const editedFood = edit.food.name;

    // If operation is successful, clear edit hook and display feedback to user
    editFood(edit.food._id, food).then((response) => {
      if (response === "Success") {
        setEdit({ edit: false, foodId: "" });
        setOperation({
          desc: `${editedFood} modifié avec succès.`,
          result: "success"
        });
        setUpdateNeeded(true);
      }
    });
  };

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

        <CssTextField
          label="Cuisiné/entamé"
          name="opened"
          onChange={(e) => handleChange(e)}
          select
          value={input.opened}
        >
        <MenuItem  value={false}>Non</MenuItem>
        <MenuItem  value={true}>Oui</MenuItem>
        </CssTextField>


{input.opened &&         <CssTextField
          label="Date d'ouverture/cuisson"
          name="openedDate"
          onChange={(e) => handleChange(e)}
          type="date"
          value={input.openedDate}
        />}


        <Button onClick={(e) => submitFoodModif(e)} variant="contained">
          Valider
        </Button>
      </form>
    </div>
  );
};

export default EditForm;
