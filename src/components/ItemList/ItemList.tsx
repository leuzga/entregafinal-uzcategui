import * as React from "react";
import Grid from "@mui/material/Grid";
import ItemCard from "../ItemCard/ItemCard";

const ItemList: React.FC<any> = ({dataJson}) => {
  const [spacing] = React.useState(2);

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing} >
          {dataJson.map((value: { id: React.Key | null | undefined; },index: number) => (
              <Grid item  key={dataJson[index].id}>
                  <ItemCard  dataJson={dataJson[index]}/>
              </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
export default ItemList;