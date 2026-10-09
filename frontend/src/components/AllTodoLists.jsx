import * as Icons from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
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
        width: 280,
        minWidth: 280,
        borderRight: 1,
        borderColor: 'divider',
        pt: 0,
      }}
    >
      <Toolbar />
      {data.map(task => {
        const TaskIcon = Icons[task.icon] ?? Icons.TaskAlt;

        return (
          <ListItem key={task.id} disablePadding>
            <ListItemButton
              onClick={() => setCurrentList(task.id)}
              selected={currentList === task.id}
            >
              <ListItemIcon>
                <TaskIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={task.title || 'Untitled task'} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
