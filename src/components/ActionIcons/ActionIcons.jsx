import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";

import { deleteAll } from "#api/api";

const ActionIcons = ({ setLoading, setModalVisible, setOperation }) => {
  // Handle dialog visibility
  const [dialogVisible, setDialogVisible] = useState(false);
  // Hide dialog
  const handleCancel = () => {
    setDialogVisible(false);
  };
  // Delete all elements and hide dialog
  const handleConfirm = async () => {
    setDialogVisible(false);
    const success = await deleteAll();

    if (success === true) {
      setLoading(true);
      setOperation({
        desc: "Tous les éléments ont été supprimés avec succès.",
        result: "success"
      });
      return;
    }
    setOperation({ desc: success, result: "error" });
  };

  return (
    <div className="action-icons">
      <Fab
        color="primary"
        aria-label="add"
        className="delete-all-button"
        onClick={() => setDialogVisible(true)}
      >
        <DeleteIcon />
      </Fab>

      <Fab
        color="primary"
        aria-label="add"
        className="add-button"
        onClick={() => setModalVisible(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={dialogVisible}
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Tout supprimer ?"}</DialogTitle>
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

export default ActionIcons;
