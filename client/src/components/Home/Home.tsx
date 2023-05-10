import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { Grid, Typography, Button, Box } from '@mui/material';


function Home() {
  return (
    <div>
      <Header></Header>
       {/* <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            Let's scale your business
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Hire professionals who will help your business make 10X your
            previous income. With over 5years experience in Marketing & Business
            strategy, we are your best client.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            HIRE US
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={'https://via.placeholder.com/1300x300'} alt="My Team" className={classes.largeImage} />
        </Grid>
      </Grid> 
    </Box> */}
      <h1> This is the home page </h1>
      <Footer></Footer>
    </div>
  )
}
export default Home
