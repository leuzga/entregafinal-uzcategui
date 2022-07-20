import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import useCounter from "../../hooks/useCounter";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { blue } from '@mui/material/colors';
import { useNavigate  } from 'react-router-dom';
export interface IitemStock {
  stockAvailable: number;
  onAdd: Function;
}

const ItemCount: React.FC<IitemStock> = ({ stockAvailable, onAdd }) => {

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const info = blue["A200"];
  const vertical = "top";
  const horizontal = "right";
  const { count, increment, decrement, reset } = useCounter(0);
  const displayIncrement = count === stockAvailable;
  const displayDecrement = count > 0;
  const [open, setOpen] = React.useState<boolean>(false);
  const msgMinStock = `Seleccione el mínimo número de unidades permitidas. Unidades disponibles: ${stockAvailable}   `;
  const msgMaxStock = `Seleccione hasta el máximo número de unidades permitidas. Unidades disponibles: ${stockAvailable}`;
  const msgWithoutProduct = `No se han seleccionado Productos para agregar al carrito`;
  const [msgAlert, setMsgAlert] = React.useState<string>("");
  const navigate = useNavigate();

  const handlerClickIncrement = () => {
    if (count === stockAvailable - 1) {
      setMsgAlert(msgMaxStock);
      setOpen(true);
    }
    if (!displayIncrement) {
      increment();
    }
  };

  const handlerClickDecrement = () => {
    if (displayDecrement) {
      decrement();
    } else {
      setMsgAlert(msgMinStock);
      setOpen(true);
    }
  };

  const handleReset = () => {
    reset();
  }

  const handlerClickCart = () => {
    if (count === 0) {
      setMsgAlert(msgWithoutProduct);
      setOpen(true);
    } else if (count > 0) {
      onAdd(count);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    if (event.type === "click") {
      setOpen(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          // display: show ? "flex" : "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup color="primary" aria-label="medium button group">
          <Tooltip title="Limpiar cantidad de productos" arrow>
            <Button variant="outlined" onClick={() => handleReset()}>
              <RestartAltRoundedIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Agregar cantidad de productos" arrow>
            <Button
              key="increment"
              disabled={displayIncrement}
              onClick={() => handlerClickIncrement()}
            >
              <AddIcon />
            </Button>
          </Tooltip>
          <Button key="Amount" color="primary" aria-readonly="true">
            <strong>{count}</strong>
          </Button>
          <Tooltip title="Remover cantidad de productos" arrow>
            <Button key="decrement" onClick={() => handlerClickDecrement()}>
              <RemoveIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>
        <ButtonGroup >
        <Button variant="contained" size="medium" onClick={() => navigate(-1)} sx={{ backgroundColor: `${info}`}} >Seguir Comprando</Button>
        <Button variant="contained" size="medium" onClick={() => handlerClickCart()} sx={{ backgroundColor: `${info}`}}>
          <AddShoppingCartIcon /> Agregar al Carrito
        </Button>
        </ButtonGroup>
      </Box>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={(e) => handleClose(e)}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={(e) => handleClose(e)}
            severity="info"
            sx={{ width: "100%" }}
          >
            {msgAlert}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default ItemCount;


