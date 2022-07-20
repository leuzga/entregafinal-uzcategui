import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import PublishIcon from "@mui/icons-material/Publish";
import { blue } from "@mui/material/colors";
import { ContextCard } from "../../Context/CardContext";
import * as React from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db, userId } from '../services/FirebaseConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const schema = yup.object().shape({
  email: yup.string().email().required(),
  nroStreet: yup.string().matches(/^[0-9]+$/, "Must be only digits"),
  numberPhone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  firstName: yup.string().min(3, 'Must be min 3 characters'),
  lastName: yup.string().min(3, 'Must be min 3 characters'),
  street: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  zipCode: yup.string().required(),

});

const PayOrder = () => {

  const {
    cart,
    setCart,
    setOrderId,
    orderId,
  } = React.useContext(ContextCard);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),   
  });

  const isError = (nameField: string): boolean => Object.keys(errors)?.some(arrVal => nameField === arrVal);
  const navigate = useNavigate();
  

  const onSubmit = async (data: any) => {
    const newOrder =  {...cart, userId: userId, order: { orderId,...data}}
    // alert(JSON.stringify(newOrder,null,2));
    await setDoc(doc(db, 'Orders_FS', userId), newOrder).then(function() {
      alert(`Orden Nro: ${orderId} creada con exito`)
      let newArray = [] as any;
      setCart(newArray);
      setOrderId('');
      navigate("/");
    });
    
  };

  const titleOrder = "Please provide the data to process your order number: ";
  const infoUser = "Type the User data";
  const infoShipping = "Type the data for courier shipment"; 

  return (
    <Grid
        container
        xs={12}
        md={10}
        lg={12}
        spacing={2}
        sx={{ width: "100vw", display: "flex", justifyContent: "center", justifySelf: "center", alignContent: "center" }}
      >
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        justifyContent: "center",
        justifySelf: "center",
        "& > :not(style)": {
          m: 1,
          width: "100vw",
          minHeight: "70vh",
        },
      }}
      autoComplete="off"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "flex-start",
          flexDirection: "column",
          flexWrap: "nowrap",
          maxWidth: "45%",
          textAlign: "left",
        }}
      >
        <><Typography component="div" variant="h6" sx={{ color: blue[400] }}>
              <>{titleOrder} {orderId}</>
          </Typography>
          <Typography component="div" variant="h6" sx={{ color: blue[400] }}>
              {infoUser}
          </Typography>
          <Box sx={{ p: 2 }}>
            <TextField
              size="small"
              sx={{ width: "80%" }}
              id="nombre"
              error={isError("firstName")}
              {...register("firstName", { required: "This is required." })}
              placeholder="First Name"
              label="Name"
              variant="outlined"
            />
            <Typography component="div" sx={{ color: "red" }}>
              <>
              <ErrorMessage errors={errors} name="firstName" />
              </>
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            {" "}
            <TextField
              size="small"
              sx={{ width: "80%" }}
              id="apellido"
              error={isError("lastName")}
              {...register("lastName", { required: "This is required." })}
              placeholder="Last Name"
              label="Last Name"
              variant="outlined"
            />
            <Typography component="div" sx={{ color: "red" }}>
              <ErrorMessage errors={errors} name="lastName" />
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              size="small"
              sx={{ width: "80%" }}
              id="email"
              error={isError("email")}
              {...register("email", { required: "This is required." })}
              placeholder="Type valid email e.g.: nombre@dominio.com"
              label="E-mail"
              variant="outlined"
            />
            <Typography component="div" sx={{ color: "red" }}>
              <ErrorMessage errors={errors} name="email" />
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              size="small"
              sx={{ width: "80%" }}
              id="NroTlf"
              error={isError("numberPhone")}
              {...register("numberPhone", { required: "This is required." })}
              placeholder="Type valid number phone e.g. +56123456789"
              label="Number Phone"
              variant="outlined"
            />
            <Typography component="div" sx={{ color: "red" }}>
              <ErrorMessage errors={errors} name="numberPhone" />
            </Typography>
          </Box>
          <Typography component="div" variant="h5" sx={{ color: blue[400] }}>
              {infoShipping}
          </Typography>
          <Box sx={{ p: 2 }}>
            <TextField
              size="small"
              sx={{ width: "80%" }}
              id="street"
              error={isError("street")}
              {...register("street", { required: "This is required." })}
              placeholder="Type your street or avenue"
              label="Street/Avenue"
              variant="outlined"
            />
            <Typography component="div" sx={{ color: "red" }}>
              <ErrorMessage errors={errors} name="street" />
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              size="small"
              type="number"
              sx={{ width: "80%" }}
              id="numero"
              error={isError("nroStreet")}
              {...register("nroStreet", { required: "This is required." })}
              placeholder="Type number of street: 000"
              label="Number Street"
              variant="outlined"
            />
            <Typography component="div" sx={{ color: "red" }}>
              <ErrorMessage errors={errors} name="nroStreet" />
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              size="small"
              sx={{ width: "80%" }}
              id="ciudad"
              error={isError("city")}
              {...register("city", { required: "This is required." })}
              placeholder="Type your city"
              label="City"
              variant="outlined"
            />
            <Typography component="div" sx={{ color: "red" }}>
              <ErrorMessage errors={errors} name="city" />
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              size="small"
              sx={{ width: "80%" }}
              id="pais"
              error={isError("country")}
              {...register("country", { required: "This is required." })}
              placeholder="Type your country"
              label="Country"
              variant="outlined"
            />
            <Typography component="div" sx={{ color: "red" }}>
              <ErrorMessage errors={errors} name="country" />
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              size="small"
              sx={{ width: "80%" }}
              id="zipCode"
              error={isError("zipCode")}
              {...register("zipCode", { required: "This is required." })}
              placeholder="Type your zip code"
              label="Zip Code"
              variant="outlined"
            />
            <Typography component="div" sx={{ color: "red" }}>
              <ErrorMessage errors={errors} name="zipCode" />
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              justifySelf: "flex-start",
              "& > :not(style)": {
                m: 1,
                width: "100%",
                minHeight: "2rem",
                p: 2,
              },
            }}
          >
            <Box sx={{ p: 2 }}>
            <Button type="submit" variant="outlined" sx={{ width: "80%"}}>
              <PublishIcon />
              Submit
            </Button>
            </Box>
          </Box>
        </>
      </Paper>
    </Box>
    </Grid>
  )
};

export default PayOrder;
