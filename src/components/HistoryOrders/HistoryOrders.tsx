import Box from "@mui/material/Box"
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../services/FirebaseConfig";

const HistoryOrders = () => {

    const auth = getAuth();
    const user = auth.currentUser;

    const getOrders = async () => {
      try {
        if (user) {
          let docRef = doc(db, "Orders_FS", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.info("Collection ORDERS_FS ", docSnap.data());
            return docSnap.data();
          }
        }       
      } catch (err) {
        alert(`No such document! `);
        return
      }
    };
    const otrafuncion = async () => {
      console.log(await getOrders())
  }
  otrafuncion();

  
  return (
    <Box sx={{ minHeight: "70vh", display: "flex", width: "100%", justifyContent: "center"}}>
    <List sx={{ width: '100%', maxWidth: 1024, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
    </Box>
  );
}

export default HistoryOrders