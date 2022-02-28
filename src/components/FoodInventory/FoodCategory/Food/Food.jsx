import { useState } from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";

import { editFood, removeFood } from "#api/api";
import CustomTooltip from "#components/shared/CustomTooltip";
import { displayDaysLeft } from "#utils/utils";

const Food = ({ food, setEdit, setInput, setOperation, setLoading }) => {
  // Handle dialog visibility
  const [dialogVisible, setDialogVisible] = useState(false);
  // Hide dialog
  const handleCancel = () => {
    setDialogVisible(false);
  };
  // Delete selected food item and hide dialog
  const handleConfirm = () => {
    setDialogVisible(false);
    removeFood(food._id).then((response) => {
      if (response === true) {
        setOperation({
          desc: `${food.name} supprimé avec succès.`,
          result: "success"
        });

        setLoading(true);
        return;
      }
      setOperation({
        desc: response,
        result: "error"
      });
    });
  };

  // Manual food edit
  const edit = () => {
    let date;
    if (food.openedDate) {
      date = moment(food.openedDate, "DD/MM/YYYY").format("YYYY-MM-DD");
    } else {
      date = moment().format("YYYY-MM-DD");
    }

    //
    setInput({
      name: food.name,
      category: food.category,
      storageLife: food.storageLife,
      expDate: moment(food.expDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      opened: food.opened,
      openedDate: date,
      quantity: 0
    });

    setEdit({ enabled: true, food: food });
  };

  // Quick open food
  const markAsOpen = () => {
    const update = {
      opened: true,
      openOnly: true
    };

    // If operation is successful, clear edit hook and display feedback to user
    editFood(food._id, update).then((response) => {
      if (response === "Success") {
        setOperation({
          desc: `${food.name} modifié avec succès.`,
          result: "success"
        });
        setLoading(true);
      }
    });
  };

  return (
    <div className="food">
      <p> {food.name} </p>
      <div className="food-center">
        <p className="date" style={food.expDays}>
          {displayDaysLeft(food.remainingDays)}
        </p>
      </div>
      <div className="food-icons">
        {!food.opened && (
          <CustomTooltip title="Marquer comme entamé" arrow placement="top">
            <i
              className="fa-solid fa-box-open action-icon"
              onClick={markAsOpen}
            ></i>
          </CustomTooltip>
        )}
        <CustomTooltip title="Modifier" arrow placement="top">
          <i className="fas fa-edit action-icon" onClick={edit}></i>
        </CustomTooltip>
        <CustomTooltip title="Supprimer" arrow placement="top">
          <i
            className="fas fa-trash-alt action-icon"
            onClick={() => setDialogVisible(true)}
          ></i>
        </CustomTooltip>
      </div>

      <Dialog
        open={dialogVisible}
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Supprimer ${food.name} ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Cette action est irréversible, merci de valider votre choix.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} autoFocus>
            Annuler
          </Button>
          <Button onClick={handleConfirm}>Valider</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Food.propTypes = {
  food: PropTypes.object,
  setEdit: PropTypes.func,
  setInput: PropTypes.func,
  setOperation: PropTypes.func,
  setLoading: PropTypes.func
};

export default Food;
