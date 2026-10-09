import * as Icons from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useTodoLists } from '../hooks/useTodoLists.js';

export function NewListDialog({ dialogState }) {
  const [state, setState] = useState('');
  const [iconSearch, setIconSearch] = useState('');
  const [icon, setIcon] = useState('TaskAlt');
  const { newList } = useTodoLists();

  const [filteredIcons, setFilteredIcons] = useState(Object.entries(Icons));

  useEffect(() => {
    setFilteredIcons(
      Object.entries(Icons)
        .filter(([name]) => !/Outlined$|TwoTone$|Rounded$|Sharp$/.test(name))
        .filter(([name]) => (iconSearch ? name.includes(iconSearch) : true))
        .slice(0, 9)
    );
  }, [iconSearch]);

  return (
    <Dialog
      open={dialogState.isOpen}
      onClose={dialogState.close}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          width: { xs: 'calc(100% - 16px)', sm: '100%' },
          maxHeight: 'calc(100% - 32px)',
          m: { xs: 1, sm: 2 },
        },
      }}
    >
      <DialogTitle>Create New Task</DialogTitle>
      <DialogContent>
        <DialogContentText>Create a new task and select a suitable icon</DialogContentText>
        <TextField
          onChange={event => {
            setState(event.target.value);
          }}
          value={state}
          autoFocus
          required
          margin="dense"
          id="name"
          label="New Task"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          onChange={event => {
            setIconSearch(event.target.value);
          }}
          value={iconSearch}
          autoFocus
          margin="dense"
          id="name"
          label="Icon Search"
          type="text"
          fullWidth
          variant="standard"
        />
        <Card
          variant="outlined"
          sx={{
            mt: 1,
            p: 1,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1,
            minWidth: 0,
          }}
        >
          {filteredIcons.map(([name, Icon]) => (
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                width: 48,
                minWidth: 0,
              }}
              key={name}
            >
              <ToggleButton
                value={name}
                selected={name === icon}
                onClick={() => setIcon(name)}
              >
                <Icon />
              </ToggleButton>
              <Typography
                variant="caption"
                align="center"
                sx={{ overflowWrap: 'anywhere' }}
              >
                {name}
              </Typography>
            </Box>
          ))}
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogState.close}>Cancel</Button>
        <Button
          onClick={() => {
            void newList(state, icon);
            dialogState.close();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
