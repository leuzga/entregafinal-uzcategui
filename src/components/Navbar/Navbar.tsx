import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { grey } from "@mui/material/colors";
import CartWidget from "./../CartWidget/CartWidget";
import {Link as LinkRoute, useNavigate} from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import blueGrey from '@mui/material/colors/blueGrey';
import { logout, userId } from "../../components/services/FirebaseConfig";
import Link from "@mui/material/Link";


const pages = ["Home", "Men", "Women", "Jewelery", "Electronics", "About"];
const settings = [ "Logout"]; // add "History Orders" options
export interface IqttyProduct {
  quantityProduct: number;
}
const NavBar: React.FC<IqttyProduct> = ({ quantityProduct }) => {
  
  let user, name = '';

  if( localStorage.length > 0 && userId !== '') {
    user = JSON.parse(window.localStorage.getItem('user')!);
    name = user.userName.split(' ',1)[0];
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigate = useNavigate();

  const handleCloseUserMenu = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLSpanElement, MouseEvent>, optItem: any) => {
    if(optItem.setting === 'Logout'){
      logout();
      navigate("/");
    }
    // if(optItem.setting === 'History Orders'){
    //   navigate("/History");
    // }
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: grey[900], opacity: "0.7" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LinkRoute to={"/"} replace style={{ textDecoration: "none" }}>
            <Avatar src="/img/logoTiendita.png" alt="Logo tiendita" />
          </LinkRoute>
          <Typography
            variant="h5"
            noWrap
            sx={{
              ml: 2,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Store.
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">
                    <LinkRoute to={page} replace style={{ textDecoration: "none" }}>
                      {page}
                    </LinkRoute>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Typography textAlign="center" key={page}>
                <LinkRoute to={page} replace style={{ textDecoration: "none" }}>
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                </LinkRoute>
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              height: "100%",
            }}
          >
            <LinkRoute to={"/Login"} style={{ textDecoration: "none" }}>
              <Typography noWrap component="span">
                <AccountCircleOutlinedIcon
                  sx={{
                    fontSize: 32,
                    color: blueGrey[50],
                    mt: "6px",
                    mr: "6px",
                  }}
                />
                <Typography
                  component="span"
                  sx={{
                    color: blueGrey[50],
                    mr: "8px",
                    verticalAlign: "top",
                    lineHeight: "3",
                  }}
                >
                  { userId !== '' ? name === '' ? 'Login' : 'Hola '.concat(name) : 'Login'}
                </Typography>
              </Typography>
            </LinkRoute>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/img/Frenchie.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} >
                  <Typography textAlign="center">
                    <Link  sx={{ textDecoration: "none", fontSize: "14px"}} component="button"
                      onClick={(evt) => handleCloseUserMenu(evt,{setting})}
                    >
                      {setting}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <CartWidget quantityProduct={quantityProduct} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
