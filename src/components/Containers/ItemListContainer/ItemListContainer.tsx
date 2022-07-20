import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import ItemList from "../../ItemList/ItemList";

const ItemListContainer: React.FC<{
  mensaje: string;
  objProducts: any;
  category: string;
}> = ({ mensaje, objProducts, category }) => {
  const [dataJson, setDataJson]: any = React.useState<any[]>([]);
  
  React.useEffect(() => {
    setDataJson(objProducts);
  }, [objProducts]);

  return (
    <>
      {category === "Home" && (
        <Box
          id="boxHome"
          sx={{
            width: "100%",
            maxWidth: "100%",
            height: "300",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            component="div"
            sx={{ color: "#FFF" }}
          >
            {mensaje}
          </Typography>
          <Image
            src="/img/storeFashion.jpg"
            fit="contain"
            duration={3000}
            easing="cubic-bezier(0.7, 0, 0.6, 1)"
            alt="Logo tiendita"
            style={{ paddingBottom: "3rem" }}
          />
        </Box>
      )}
      <br />
      { dataJson &&
      <Box sx={{ width: "100%", maxWidth: "98%", justifyContent: "center" }}>
        <ItemList dataJson={dataJson} />
      </Box>
      }
      <br />
    </>
  );
};
export default ItemListContainer;
