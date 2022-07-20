import Grid from "@mui/material/Grid";
import Image from "mui-image";

export default function About() {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ position: "relative", display: "inline-block" }}>
        <Image
          src="/img/ecom-scaled.jpg"
          fit="contain"
          duration={3000}
          easing="cubic-bezier(0.7, 0, 0.6, 1)"
        />
      </Grid>
      <Grid item xs={12} sx={{ position: "relative", display: "inline-block" }}>
        <Image
          src="/img/Depositphotos_.jpg"
          fit="contain"
          duration={3000}
          easing="cubic-bezier(0.7, 0, 0.6, 1)"
        />
      </Grid>
    </Grid>
  );
}
