import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const ItemCard: React.FC<any> = ({dataJson}) => {
  return (
    <Card sx={{ maxWidth: 345, objectFit: "contain", border: "none", backgroundColor: "transparent" }} variant="outlined" >
      <Paper elevation={3} sx={{height: "97%", width: "97%", border: "1px solid #dfdfdf"}}>
      <Link to={"/detail"+ dataJson.id} style={{ textDecoration: 'none' }}>  
      <CardActionArea sx={{height: "100%", border: "none" }}>
        <CardMedia
          sx={{ objectFit: "contain", paddingTop: "1rem"}}
          component="img"
          height="200"
          width="100%"
          image={dataJson.image}
          alt={dataJson.altText}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dataJson.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dataJson.description}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{padding: "1rem"}}>
            $ {dataJson.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
      </Paper>
    </Card>
  );
}
export default ItemCard;
