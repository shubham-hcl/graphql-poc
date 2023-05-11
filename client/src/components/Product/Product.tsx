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

function Product() {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}.</div>
  return (
    <div>
      <Typography variant="h3" sx={{ textAlign: 'center', paddingTop:5 }}>
        Products
      </Typography>
      <Grid container spacing={3} className={styles.container}>
        {data?.products?.map((product: any) => (
          <Grid item md={4} key={product?.name} className={styles.grid}>
            <Card className={styles['card']}>
              <ReactLink to={`/products/${product.productId}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product?.images[0]}
                    title={product?.name}
                    height={300}
                    sx={{
                      width: 'auto',
                      margin: 'auto',
                    }}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product?.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </ReactLink>

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
