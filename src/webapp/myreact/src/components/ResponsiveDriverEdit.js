import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Time from '../shared/Time'
import DropDown from '../shared/DropDown'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsBackupRestoreRoundedIcon from '@mui/icons-material/SettingsBackupRestoreRounded';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import {NavLink} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  items: {
    marginTop: 50,
  }
}));

const drawerWidth = 240;

function ResponsiveDriverEdit(props) {
  const [pickup, setPickup] = useState("")
  const [dropOff, setDropOff] = useState("")
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [seats, setSeats] = useState(1)
  const classes = useStyles();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const findMonth = (month) => {
    for(let i = 0; i < 12; i++) {
      if(month === months[i] && i < 10) {
        let x = i + 1;
        return "0" + x;
      }
      else if(month === months[i] && i >= 10) return i + 1;
    }
  }

  const pickUpChange = e => {
    setPickup(e.target.value);
    console.log(pickup)
  }

  const dropOffChange = e => {
    setDropOff(e.target.value);
    console.log(dropOff)
  }

  const onSelectDate = (datetime) => {
    let dateTime = datetime.toString();
    let c = dateTime.substring(17, 24)
    setTime(c);
    console.log(dateTime.substring(4,7))
    let month = findMonth(dateTime.substring(4,7))
    let day = dateTime.substring(8,10)
    let year = dateTime.substring(11,15)
    setDate(month + "/" + day + "/" + year)
    console.log(date)
  }

  const onSelectSeats = (seat) => {
    setSeats(parseInt(seat))
    console.log(seat)
  }

  useEffect(() => {
    
  }, [])  

  const createTrip = () => {
    axios.post('localhost:8181/editTrip', {
      "trip_id":1,  
      "driver_id":4,
      "source":pickup,
      "destination":dropOff,
      "date_of_trip":date,
      "time_of_trip": time,
      "no_of_seats": seats
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
    <div>
      <ListItem button key="Profile">
        <ListItemIcon>
          <AccountCircleRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button key="Ride History">
        <ListItemIcon>
          <SettingsBackupRestoreRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Ride History" />
      </ListItem>
      <ListItem button key="Wallet">
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Wallet" />
      </ListItem>
      <ListItem button key="FAQ">
        <ListItemIcon>
          <LiveHelpIcon />
        </ListItemIcon>
        <ListItemText primary="FAQ" />
      </ListItem>
      <ListItem button key="Support">
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItem>
    </div>
    <div style={{marginTop: 510}}>
      <ListItem button key="Sign Out">
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
    </div>
    </div>
    

  );
  return (
    <div style={{marginLeft: 350, marginTop: 150}}>
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box id='driverForm'>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      > 
        <Grid item >
        <form className={classes.root} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="Source" variant="outlined" onChange={pickUpChange}/>
              <ArrowForwardIcon style={{marginTop: 20}}/>
              <TextField id="outlined-basic" label="Destination" variant="outlined" onChange={dropOffChange}/>
            </form>
        </Grid>
        <Grid item >
        <div className={classes.items}> <Time onChange={onSelectDate}/> </div>
        </Grid>
        <Grid item>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className={classes.items}><DropDown onChange={onSelectSeats}/></div>
          </Grid>
          <Grid item>
        <div className={classes.items}>
        <Button variant="outlined" style={{width: 260}} onClick={createTrip}><NavLink className="nav-link" to="/driverconfirmation">
                  Edit Ride
                </NavLink></Button>

        </div>
        
          </Grid>
      </Grid>
      </Box>
    </Box>
    </div>
    
  );
}

ResponsiveDriverEdit.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDriverEdit;