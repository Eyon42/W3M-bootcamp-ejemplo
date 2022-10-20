import { Outlet, Link } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import WalletButton from "../components/WalletButton";

export default function Layout() {
  return (
    <Box sx={{ flexGrow: 1, margin:0 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack direction="row" sx={{ flexGrow: 1}}>
            <Link to="/NFT" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" component="div" sx={{ marginX: 1, color: "white", textDecoration:"none"}}>
                NFT
              </Typography>
            </Link>
            <Link to="/Token" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" component="div" sx={{ marginX: 1, color: "white", textDecoration:"none"}}>
                Token
              </Typography>
            </Link>
          </Stack>
          {/* <Button color="inherit">Login</Button> */}
          <WalletButton/>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
