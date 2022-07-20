import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import { blue, grey, red } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import * as React from "react";
import { ContextCard } from "../../Context/CardContext";
import { ICartItem } from "./../../Context/CardContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { userId } from '../services/FirebaseConfig';

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: "100%",
}));

export default function CardView() {
  const {
    cart,
    removeItem,
    totalOrder,
    totalUnits,
    orderId,
    setCart,
    setQtty,
    setPrice,
    getItem,
  } = React.useContext(ContextCard);

  const [open, setOpen] = React.useState(false);
  const [itemId, setItemId] = React.useState(0);

  const handleClick = (itemId: number) => {
    setItemId(itemId);
    setOpen(!open);
  };
  const handlerDelete = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | any,
    index: number
  ) => {
    const productId = cart[index].id;
    let newArray = removeItem(cart, productId);
    setCart([...newArray]);
  };
  const handlerDecrement = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ): void => {
    const productId = cart[index].id;
    let objProduct = getItem(cart, productId);
    objProduct.quantity = setQtty(objProduct, 1, "-");
    objProduct.pricexqtty = setPrice(objProduct);
    let newArray = [...cart];
    setCart(newArray);
  };

  const handlerIncrement = (index: number): void => {
    const productId = cart[index].id;
    let objProduct = getItem(cart, productId);
    objProduct.quantity = setQtty(objProduct, 1, "+");
    objProduct.pricexqtty = setPrice(objProduct);
    let newArray = [...cart];
    setCart(newArray);
  };

  const handlerCleanCart = () => {
    let newArray = [] as any;
    setCart(newArray);
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "100%",
        display: "flex",
        justifyContent: "space-around",
        minHeight: "70vh",
        width: "100vw",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ width: "100vw", display: "flex", justifyContent: "space-around" }}
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Demo>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                color: blue[600],
                fontWeight: "800",
                mt: "1.5rem",
              }}
            >
              <>Lista de Productos del Pedido Número: {orderId}</>
            </Typography>
            <List>
              {cart.map((item: ICartItem, index: number) => {
                return (
                  <>
                    <ListItem
                      sx={{
                        display: "flex",
                        alignItems: "start",
                        flexDirection: "column",
                      }}
                      secondaryAction={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "start",
                            flexDirection: "row",
                          }}
                        >
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={0}
                          >
                            <Avatar
                              sx={{
                                bgcolor: blue["A200"],
                                width: 32,
                                height: 32,
                              }}
                              variant="square"
                            >
                              <ListItemButton
                                sx={{
                                  width: "36px",
                                  height: "36px",
                                  paddingInline: 0.5,
                                }}
                                onClick={(e) => handlerDecrement(e, index)}
                              >
                                <RemoveCircleOutlineIcon />
                              </ListItemButton>
                            </Avatar>
                            <Avatar
                              sx={{
                                bgcolor: grey[400],
                                width: 32,
                                height: 32,
                              }}
                              variant="square"
                            >
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="span"
                                sx={{
                                  color: "#FFF",
                                  fontWeight: "800",
                                  fontSize: "14px",
                                  mt: "4px",
                                }}
                              >
                                {item.quantity}
                              </Typography>
                            </Avatar>
                            <Avatar
                              sx={{
                                bgcolor: blue["A200"],
                                width: 32,
                                height: 32,
                              }}
                              variant="square"
                            >
                              <ListItemButton
                                sx={{
                                  width: "36px",
                                  height: "36px",
                                  paddingInline: 0.5,
                                }}
                                onClick={() => handlerIncrement(index)}
                              >
                                <AddCircleOutlineOutlinedIcon />
                              </ListItemButton>
                            </Avatar>

                            <IconButton
                              edge="end"
                              aria-label="delete"
                              sx={{ ml: 1, mr: 1, p: 0, pl: 1, pr: 1 }}
                              onClick={(e) => handlerDelete(e, index)}
                            >
                              <DeleteOutlineIcon
                                sx={{
                                  color: red[400],
                                }}
                                fontSize="medium"
                              />
                            </IconButton>
                          </Stack>
                        </Box>
                      }
                    >
                      <Grid
                        item
                        xs={9}
                        md={10}
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-around",
                          flexDirection: "column",
                        }}
                      >
                        <ListItemButton
                          onClick={() => {
                            return handleClick(item.id);
                          }}
                          sx={{ width: "96%" }}
                        >
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={0}
                          >
                            <ListItemAvatar sx={{ padding: "1rem" }}>
                              <Avatar
                                sx={{
                                  width: 80,
                                  height: 80,
                                  bgcolor: grey["A200"],
                                }}
                              >
                                <Image
                                  src={item.image}
                                  fit="contain"
                                  duration={3000}
                                  easing="cubic-bezier(0.7, 0, 0.6, 1)"
                                  width={80}
                                />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              sx={{ paddingRight: "2rem" }}
                              primary={item.title}
                              secondary={
                                <>
                                  <strong>
                                    <br />
                                    Cantidad: ${item.quantity}
                                    &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;Precio
                                    Unitario: $ ${item.price}
                                  </strong>
                                  <Typography
                                    variant="button"
                                    display="flex"
                                    sx={{
                                      justifyContent: "flex-start",
                                      pr: 6,
                                      marginTop: "0.1rem",
                                    }}
                                    gutterBottom
                                  >
                                    <>
                                      <strong>
                                        Precio por cantidad: $ $
                                        {item.pricexqtty}
                                      </strong>
                                    </>
                                  </Typography>
                                </>
                              }
                            />
                          </Stack>
                          {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse
                          in={open && itemId === item.id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText secondary={item.description} />
                            </ListItemButton>
                          </List>
                        </Collapse>
                      </Grid>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                );
              })}
              <Typography
                variant="button"
                display="flex"
                sx={{ justifyContent: "flex-end", pr: 6, pt: 2 }}
                gutterBottom
              >
                <> Total de Unidades: {totalUnits}</>
              </Typography>
              <Typography
                variant="button"
                display="flex"
                sx={{ justifyContent: "flex-end", pr: 6 }}
                gutterBottom
              >
                <> Total a pagar: $ {totalOrder}</>
              </Typography>
            </List>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                  pb: 2,
                },
              }}
            >
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button
                  disabled={totalUnits === 0}
                  onClick={() => handlerCleanCart()}
                >
                  Limpiar Carrito
                </Button>
                <Button onClick={() => navigate(-1)}>Seguir Comprando</Button>
                <Button disabled={totalUnits === 0}><Link to={(userId!=='') ? "/PayOrder" : "/Login"}>Ir a Pagar</Link></Button>
              </ButtonGroup>
            </Box>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
