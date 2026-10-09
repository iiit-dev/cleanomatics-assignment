import { Box, CssBaseline } from '@mui/material';

import { AppState } from '../providers/AppState.jsx';
import { AllTodoLists } from './AllTodoLists.jsx';
import { AppHeader } from './AppHeader.jsx';
import { CurrentTodoList } from './CurrentTodoList.jsx';

export function App() {
  return (
    <AppState>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          minHeight: '100vh',
          minWidth: 0,
          boxSizing: 'border-box',
          pt: { xs: '56px', sm: '64px' },
        }}
      >
        <CssBaseline />
        <AppHeader />
        <AllTodoLists />
        <CurrentTodoList />
      </Box>
    </AppState>
  );
}
