import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const useDeleteConfirmation = () => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);

    return new Promise((resolve) => {
      // Resolve the promise when the user confirms deletion
      resolve(true);
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    closeDeleteDialog();
  };

  const DeleteConfirmationDialog = () => (
    <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { openDeleteDialog, DeleteConfirmationDialog };
};

const MyComponent = () => {
  const { openDeleteDialog, DeleteConfirmationDialog } = useDeleteConfirmation();

  const handleDelete = async () => {
    const confirm = await openDeleteDialog();

    if (confirm) {
      // Call API to delete
      console.log('Calling API to delete...');
    }
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleDelete}>
        Delete Item
      </Button>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog />
    </div>
  );
};

export default MyComponent;
