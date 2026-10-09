import { AllTodoLists } from './AllTodoLists.jsx';
import { AppHeader } from './AppHeader.jsx';
import { AppState } from '../providers/AppState.jsx';
import { Box, CssBaseline } from '@mui/material';
import { CurrentTodoList } from './CurrentTodoList.jsx';

export function App() {
  return (
    <AppState>
     
      <Box sx={{ display: 'flex' }}>
     
        <CssBaseline />
        <AppHeader />
        <AllTodoLists />
        <CurrentTodoList /> 
      </Box>
    </AppState>
  );
}
