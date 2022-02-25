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
import useMediaQuery from "@mui/material/useMediaQuery";

import { deleteAll } from "#api/api";
import CustomTooltip from "#components/shared/CustomTooltip";

const ActionIcons = ({ setLoading, setModalVisible, setOperation }) => {
  const desktop = useMediaQuery("(min-width:600px)", { noSsr: true });

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
      <CustomTooltip
        title="Tout supprimer"
        arrow
        placement={desktop ? "left" : "top"}
      >
        <Fab
          color="primary"
          aria-label="add"
          className="delete-all-button"
          onClick={() => setDialogVisible(true)}
        >
          <DeleteIcon />
        </Fab>
      </CustomTooltip>

      <CustomTooltip title="Ajouter" arrow placement={desktop ? "left" : "top"}>
        <Fab
          color="primary"
          aria-label="add"
          className="add-button"
          onClick={() => setModalVisible(true)}
        >
          <AddIcon />
        </Fab>
      </CustomTooltip>

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
