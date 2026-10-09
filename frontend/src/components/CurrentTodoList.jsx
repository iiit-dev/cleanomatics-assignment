import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';
import { fetcher } from '../utils.js';
import { DeleteTaskButton } from './DeleteTaskButton.jsx';

export function CurrentTodoList() {
  const { currentList } = useAppState();
  const { updateList, deleteList } = useTodoLists();
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
      <Box
        component="main"
        sx={{ flex: '1 1 0', minWidth: 0, p: { xs: 2, sm: 3 } }}
      >
        <Typography sx={{ overflowWrap: 'anywhere' }}>No Task Selected</Typography>
      </Box>
    );
  }

  const updateField = (field, value) => {
    const nextDraft = { ...draft, [field]: value, updatedAt: new Date().toISOString() };
    setDraft(nextDraft);
    void updateList(currentList, nextDraft);
  };

  return (
    <Box
      component="main"
      sx={{ flex: '1 1 0', minWidth: 0, p: { xs: 2, sm: 3 } }}
    >
      <Box sx={{ width: '100%', maxWidth: 700, minWidth: 0, display: 'grid', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, minWidth: 0 }}>
          <TextField
            label="Title"
            multiline
            minRows={1}
            value={draft.title ?? ''}
            onChange={event => updateField('title', event.target.value)}
            sx={{ flex: 1, minWidth: 0, '& textarea': { overflowWrap: 'anywhere' } }}
          />
          <DeleteTaskButton
            taskId={currentList}
            taskTitle={draft.title}
            onDelete={deleteList}
          />
        </Box>

        <TextField
          label="Description"
          multiline
          minRows={4}
          value={draft.description ?? ''}
          onChange={event => updateField('description', event.target.value)}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            minWidth: 0,
          }}
        >
          <TextField
            select
            label="Status"
            value={draft.status ?? 'pending'}
            onChange={event => updateField('status', event.target.value)}
            sx={{ minWidth: { xs: 0, sm: 180 }, width: { xs: '100%', sm: 'auto' } }}
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
            sx={{ minWidth: { xs: 0, sm: 180 }, width: { xs: '100%', sm: 'auto' } }}
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

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
            color: 'text.secondary',
            minWidth: 0,
          }}
        >
          <Typography variant="body2" sx={{ overflowWrap: 'anywhere' }}>
            Created: {draft.createdAt ?? '—'}
          </Typography>
          <Typography variant="body2" sx={{ overflowWrap: 'anywhere' }}>
            Updated: {draft.updatedAt ?? '—'}
          </Typography>
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
