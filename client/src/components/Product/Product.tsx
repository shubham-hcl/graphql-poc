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
      <div className={styles['top-head']}>
        <h3>Shop All</h3>
      </div>
      <div className={styles['float-container']}>
        <div className={styles['float-child-left']}>
          <Typography className={styles['typography']}>Filters</Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<Add />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Brand</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel
                aria-label="Apple"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox />}
                label="Apple"
              />
              <FormControlLabel
                aria-label="OnePlus"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox />}
                label="OnePlus"
              />
              <FormControlLabel
                aria-label="Samsung"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox />}
                label="Samsung"
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<Add />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Model</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            </AccordionDetails>
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
        </div>

        <div className={styles['float-child-right']}>
          <Typography className={styles['typography']}>Results</Typography>
          <div className={styles['product-list']}>
              {data?.products?.map((product: any) => (
                <Grid item md={5} key={product?.name} className={styles['grid-item']}>
                  <Card className={styles['card']}>
                    <CardActionArea>
                      <CardMedia
                        children={<ProductImageGallery images={product?.images} />}
                      ></CardMedia>
                      <CardContent>
                        <ReactLink to={`/products/${product.productId}`}>
                          <Typography sx={{textAlign: 'center'}}>{product?.name}</Typography>
                        </ReactLink>
                      </CardContent>
                    </CardActionArea>

                    <CardActions sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <Typography sx={{fontSize: 12}}>{product?.description}</Typography>
                      <Typography sx={{fontSize: 12}}>${product?.price}</Typography>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Product
