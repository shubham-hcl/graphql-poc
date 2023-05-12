import { Link as ReactLink } from 'react-router-dom'
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Card,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { useQuery } from '@apollo/client'
import GET_ALL_PRODUCTS from '../../graphql/Queries/Products'
import styles from './Product.module.scss'
import ImageGallery from 'react-image-gallery'
import ProductImageGallery from './ProductImageGallery'

function Product() {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}.</div>

  return (
    <div>
      <div>
        {' '}
        <Grid className={styles['div-nav']} container>
          <Grid className={styles['div-women']}>WOMEN</Grid>
          <Grid className={styles['div-men']}>MEN</Grid>
          <Grid className={styles['div-accessories']}>ACCESSORIES</Grid>
          <Grid className={styles['div-shoes']}>SHOES</Grid>
          <Grid className={styles['div-search']}>
            <TextField id="outlined-basic" label="Search" variant="outlined" />
          </Grid>
        </Grid>
        <div className={styles['float-container']}>
          <div className={styles['float-child-left']}>
            <Typography className={styles['typography']}>Whats New?</Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<Add />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Gender</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControlLabel
                  aria-label="Men"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}
                  label="Men"
                />
                <FormControlLabel
                  aria-label="Women"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}
                  label="Women"
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Add />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Category</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Add />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Type</Typography>
              </AccordionSummary>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Add />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Activity</Typography>
              </AccordionSummary>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Add />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Size</Typography>
              </AccordionSummary>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Add />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Size Type</Typography>
              </AccordionSummary>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Add />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Color</Typography>
              </AccordionSummary>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Add />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Collection</Typography>
              </AccordionSummary>
            </Accordion>
          </div>

          <div className={styles['float-child-right']}>
            <div className={styles['padding-left: 50px;']}>
              <Grid container spacing={3}>
                {data?.products?.map((product: any) => (
                  <Grid item md={5} key={product?.name} className={styles['grid-item']}>
                    <Card className={styles['card']}>
                      <CardActionArea>
                        <CardMedia
                          children={<ProductImageGallery images={product?.images} />}
                          // component="img"
                          // image={product?.thumbnail}
                          // title={product?.name}
                          // height={300}
                        ></CardMedia>
                        {/* <ImageGallery items={images} thumbnailPosition="left" /> */}
                        <CardContent>
                          <ReactLink to={`/products/${product.productId}`}>
                            <Typography>{product?.name}</Typography>
                          </ReactLink>
                        </CardContent>
                      </CardActionArea>

                      <CardActions>
                        {' '}
                        <Typography>{product?.description}</Typography>
                        <Typography>${product?.price}</Typography>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Product
