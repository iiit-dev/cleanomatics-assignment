import { List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
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
      {data.map(task => (
        <ListItem key={task.id} disablePadding>
          <ListItemButton
            onClick={() => setCurrentList(task.id)}
            selected={currentList === task.id}
          >
            <ListItemText primary={task.title || 'Untitled task'} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
