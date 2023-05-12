import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import styles from './ProductDetail.module.scss'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import ImageGallery from 'react-image-gallery'
import { SocialIcon } from 'react-social-icons'
import ADD_PRODUCT_TO_CART from '../../graphql/Mutations/AddProductToCart'
import GET_PRODUCT_DETAIL from '../../graphql/Queries/ProductDetail'
import SliderComponent from '../Slider/Slider'

const ProductDetail = () => {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const params = useParams()
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAIL, {
    variables: {
      productId: params.productId,
    },
  })

  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART)

  const handleChange = (event: any) => {
    setQuantity(event.target.value)
  }

  const handleAddToCart = () => {
    const cartId = localStorage.getItem('cartId') || ''
    const { productId, name, description, price, thumbnail, images } = data.product
    addProductToCart({
      variables: {
        cartId,
        lineItem: {
          productId,
          name,
          description,
          price,
          thumbnail,
          images,
          quantity,
        },
      },
      onCompleted: ({ addProductToCart }) => {
        if (addProductToCart.cartId) localStorage.setItem('cartId', addProductToCart.cartId)
        navigate('/bag')
      },
    })
  }

  const images = data?.product?.images.map((image: String) => {
    return {
      original: image,
      thumbnail: image,
      originalHeight: 600,
      originaWidth: 800,
    }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}.</div>

  return (
    <div>
      <div className={styles['product-detail']}>
        <div className={styles['left-layout']}>
          <ImageGallery items={images} thumbnailPosition="left" />
        </div>

        <div className={styles['right-layout']}>
          <div>
            <h2>{data.product.name}</h2>
          </div>
          <div>
            <h3>{data.product.description}</h3>
          </div>
          <div>
            <p>Price: ${data.product.price}</p>
          </div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={quantity}
                label="Quantity"
                onChange={handleChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>3</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>

          <div className="social-links">
            <p>Share At: </p>
            <SocialIcon url="https://twitter.com" className={styles['social-link']} />
            <SocialIcon url="https://facebook.com" className={styles['social-link']} />
            <SocialIcon url="https://pinterest.com" className={styles['social-link']} />
          </div>
        </div>
      </div>

      <SliderComponent />
    </div>
  )
}
export default ProductDetail
