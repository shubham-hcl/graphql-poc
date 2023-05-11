import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Link as ReactLink, unstable_HistoryRouter, useNavigate, useParams } from 'react-router-dom'
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Card,
  Button,
} from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'
import GET_ALL_PRODUCTS from '../../graphql/Queries/Products'
import Layout from '../Layout/Layout'
import styles from './Product.module.scss'

function Product() {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
  console.log('productssss', data)

  // const history = useNavigate()
  // console.log('history', history)

  // const handleProceed = (e) => {
  //   id && history.push(generatePath("/products/:id", { id }));
  // };
  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}.</div>
  return (
    <Layout>
      <div>
        <Typography variant="h3">Products</Typography>
        <Grid container spacing={3}>
          {data?.products?.map((product: any) => (
            <Grid item md={4} key={product?.name}>
              <Card className={styles['card']}>
                <ReactLink to={`/products/${product.productId}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product?.thumbnail}
                      title={product?.name}
                      height={300}
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
                  {/* <Button size="small" color="primary">
                    Add to Cart
                  </Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}
export default Product
