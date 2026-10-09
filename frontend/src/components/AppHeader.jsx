import { Add } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { usePopupState } from 'material-ui-popup-state/hooks';

import { NewListDialog } from './NewListDialog.jsx';

export function AppHeader() {
  const dialogState = usePopupState({ variant: 'dialog', popupId: 'new-list' });

  return (
    <>
      <NewListDialog dialogState={dialogState} />
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, minWidth: 0, overflowWrap: 'anywhere' }}
          >
            Task Lists
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Create task"
            onClick={dialogState.open}
          >
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
