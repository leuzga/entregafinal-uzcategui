import React from "react";
import Image from "mui-image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {grey} from '@mui/material/colors';

const Error404 = () => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#000",
          position: "sticky",
          zIndex: "10",
        }}
      >
      <Typography id="btnHome" textAlign="center" >
        <Link to={"/"} replace style={{ textDecoration: "none" }}>
          <Button sx={{ backgroundColor: grey[900], color: "orange", }} size="large" >Ir a Home</Button>
        </Link>
      </Typography>
        <Image
          src="/img/robot404.gif"
          fit="contain"
          duration={3000}
          easing="cubic-bezier(0.7, 0, 0.6, 1)"
          alt="Error 404 file not found"
        />
      </Box>
    </>
  );
};

export default Error404;