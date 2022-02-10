import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = ({showEntryFormClick}) => {
    return (
        <div style={{flex: '0 0 auto'}}>
        <AppBar position="static" style = {{background: "#2F4F4F"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MapBench
          </Typography>
          <Button color="inherit" onClick = {showEntryFormClick}>Add Bench</Button>
        </Toolbar>
      </AppBar>
        </div>
    )
}

export default Navigation
