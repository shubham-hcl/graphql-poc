import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Link as ReactLink } from 'react-router-dom'
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

const products = [
  {
    name: 'Free Shirt',
    category: 'Shirts',
    image: '/images/shirt1.jpg',
    price: 70,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 10,
    countInStock: 20,
    description: 'A popular Shirt',
    slug: 'free-shirt',
  },
  {
    name: 'Fit Shirt',
    category: 'Shirts',
    image: '/images/shirt2.jpg',
    price: 70,
    brand: 'Adidas',
    rating: 4.5,
    numReviews: 10,
    countInStock: 20,
    description: 'A popular Shirt',
    slug: 'fit-shirt',
  },
  {
    name: 'Slim Shirt',
    category: 'Shirts',
    image: '/images/shirt3.jpg',
    price: 70,
    brand: 'Raymond',
    rating: 4.5,
    numReviews: 10,
    countInStock: 20,
    description: 'A popular Shirt',
    slug: 'slim-shirt',
  },
  {
    name: 'Golf Pants',
    category: 'Pants',
    image: '/images/pants1.jpg',
    price: 70,
    brand: 'Olivaer',
    rating: 4,
    numReviews: 10,
    countInStock: 20,
    description: 'Smart looking Pants',
    slug: 'golf-pants',
  },
  {
    name: 'Fit Pants',
    category: 'Pants',
    image: '/images/pants2.jpg',
    price: 70,
    brand: 'Zara',
    rating: 4.5,
    numReviews: 10,
    countInStock: 20,
    description: 'A popular Pants',
    slug: 'fit-pants',
  },
  {
    name: 'Classic Pants',
    category: 'Pants',
    image: '/images/pants3.jpg',
    price: 70,
    brand: 'Casely',
    rating: 4.5,
    numReviews: 10,
    countInStock: 20,
    description: 'A popular Pants',
    slug: 'classic-pants',
  },
]

function Product() {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
  console.log('productssss', data)
  return (
    <div>
      <Header />
      <div>
        <Typography variant="h3">Products</Typography>
        <Grid container spacing={3}>
          {data?.products?.map((product: any) => (
            <Grid item md={4} key={product?.name}>
              <Card>
                <ReactLink to={`/product/${product.productId}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product?.image}
                      title={product?.name}
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
      <Footer></Footer>
    </div>
  )
}
export default Product
