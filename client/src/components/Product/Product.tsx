import { Link as ReactLink } from 'react-router-dom'
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Card,
} from '@mui/material'
import { useQuery } from '@apollo/client'
import GET_ALL_PRODUCTS from '../../graphql/Queries/Products'
import styles from './Product.module.scss'
import ImageGallery from 'react-image-gallery'
import ProductImageGallery from './ProductImageGallery'

function Product() {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}.</div>
  const images = data?.product?.images.map((image: String) => {
    return {
      original: image,
      thumbnail: image,
    }
  })
  return (
    <div>
      <Typography variant="h3">Products</Typography>
      <Grid container spacing={3}>
        {data?.products?.map((product: any) => (
          <Grid item md={4} key={product?.name} className={styles['grid-item']}>
            <Card className={styles['card']}>
              <CardActionArea>
                <CardMedia
                  children={<ProductImageGallery images={product?.images}/>}
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
  )
}
export default Product
