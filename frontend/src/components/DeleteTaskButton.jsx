import DeleteOutline from '@mui/icons-material/DeleteOutline';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';

export function DeleteTaskButton({ taskId, taskTitle, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const closeDialog = () => {
    if (!isDeleting) {
      setIsOpen(false);
      setError('');
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setError('');

    try {
      await onDelete(taskId);
      setIsOpen(false);
    } catch {
      setError('Unable to delete this task. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Tooltip title="Delete task">
        <IconButton
          aria-label={`Delete ${taskTitle || 'task'}`}
          onClick={() => setIsOpen(true)}
          size="small"
          sx={{
            flexShrink: 0,
            alignSelf: 'center',
            color: 'text.secondary',
            '&:hover': { color: 'error.main' },
          }}
        >
          <DeleteOutline fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
        sx={{
          '& .MuiDialog-paper': {
            width: { xs: 'calc(100% - 16px)', sm: '100%' },
            m: { xs: 1, sm: 2 },
          },
        }}
      >
        <DialogTitle>Delete task?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ overflowWrap: 'anywhere' }}>
            Delete “{taskTitle || 'Untitled task'}”? This cannot be undone.
          </DialogContentText>
          {error && (
            <DialogContentText color="error" role="alert" sx={{ mt: 1 }}>
              {error}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={isDeleting}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" disabled={isDeleting}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}