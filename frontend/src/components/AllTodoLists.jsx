import * as Icons from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useEffect } from 'react';

import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';

export function AllTodoLists() {
  const { data = [] } = useTodoLists();
  const { currentList, setCurrentList } = useAppState();

  useEffect(() => {
    if (!currentList && data[0]?.id) {
      setCurrentList(data[0].id);
    }
  }, [currentList, data, setCurrentList]);

  return (
    <List
      sx={{
        width: { xs: '100%', md: 280 },
        minWidth: { xs: 0, md: 280 },
        maxWidth: '100%',
        maxHeight: { xs: '34vh', md: 'calc(100vh - 64px)' },
        flex: { xs: '0 0 auto', md: '0 0 280px' },
        overflowY: 'auto',
        boxSizing: 'border-box',
        borderRight: { xs: 0, md: 1 },
        borderBottom: { xs: 1, md: 0 },
        borderColor: 'divider',
        pt: 0,
      }}
    >
      {data.map(task => {
        const TaskIcon = Icons[task.icon] ?? Icons.TaskAlt;

        return (
          <ListItem key={task.id} disablePadding>
            <ListItemButton
              onClick={() => setCurrentList(task.id)}
              selected={currentList === task.id}
              sx={{ minWidth: 0 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <TaskIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={task.title || 'Untitled task'}
                sx={{ minWidth: 0 }}
                primaryTypographyProps={{ sx: { overflowWrap: 'anywhere' } }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
