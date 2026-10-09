import {
  Box,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { fetcher } from '../utils.js';
import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';

export function CurrentTodoList() {
  const { currentList } = useAppState();
  const { updateList } = useTodoLists();
  const { data: task } = useSWR(
    () => (currentList ? { url: 'todo-list', id: currentList } : null),
    fetcher
  );
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (task) {
      setDraft(task);
    }
  }, [task]);

  if (!task || !draft) {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography>No Task Selected</Typography>
      </Box>
    );
  }

  const updateField = (field, value) => {
    const nextDraft = { ...draft, [field]: value, updatedAt: new Date().toISOString() };
    setDraft(nextDraft);
    void updateList(currentList, nextDraft);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Box sx={{ maxWidth: 700, display: 'grid', gap: 2 }}>
        <TextField
          label="Title"
          value={draft.title ?? ''}
          onChange={event => updateField('title', event.target.value)}
        />

        <TextField
          label="Description"
          multiline
          minRows={4}
          value={draft.description ?? ''}
          onChange={event => updateField('description', event.target.value)}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            select
            label="Status"
            value={draft.status ?? 'pending'}
            onChange={event => updateField('status', event.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="pending">pending</MenuItem>
            <MenuItem value="in_progress">in_progress</MenuItem>
            <MenuItem value="completed">completed</MenuItem>
          </TextField>

          <TextField
            select
            label="Priority"
            value={draft.priority ?? 'medium'}
            onChange={event => updateField('priority', event.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="low">low</MenuItem>
            <MenuItem value="medium">medium</MenuItem>
            <MenuItem value="high">high</MenuItem>
          </TextField>
        </Box>

        <TextField
          label="Due date"
          type="date"
          value={draft.dueDate ?? ''}
          onChange={event => updateField('dueDate', event.target.value || null)}
          InputLabelProps={{ shrink: true }}
        />

        <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
          <Typography variant="body2">Created: {draft.createdAt ?? '—'}</Typography>
          <Typography variant="body2">Updated: {draft.updatedAt ?? '—'}</Typography>
        </Box>

        <Select
          value={draft.status ?? 'pending'}
          onChange={event => updateField('status', event.target.value)}
          sx={{ display: 'none' }}
        >
          <MenuItem value="pending">pending</MenuItem>
          <MenuItem value="in_progress">in_progress</MenuItem>
          <MenuItem value="completed">completed</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}
