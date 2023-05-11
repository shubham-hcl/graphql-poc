import React, { useState } from 'react'
import styles from './ProductDetail.module.scss'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import ImageGallery from 'react-image-gallery'
import { SocialIcon } from 'react-social-icons'
import GET_PRODUCT_DETAIL from '../../graphql/Queries/ProductDetail'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div onClick={onClick}>
      <ArrowForwardIosOutlinedIcon className={className} style={{ ...style, background: 'grey', color: 'white', height: 30, width: 30 }} />
    </div>
  )
}

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div onClick={onClick}>
      <ArrowBackIosNewOutlinedIcon className={className} style={{ ...style, background: 'grey', color: 'white', height: 30, width: 30 }} />
    </div>
  )
}

function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const params = useParams()
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAIL, {
    variables: {
      productId: params.productId,
    },
  })

  const handleChange = (event: any) => {
    setQuantity(event.target.value)
  }

  const images = data?.product?.images.map((image: String) => {
    return {
      original: image,
      thumbnail: image,
      originalHeight: 600,
      originaWidth: 800,
    }
  })

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  const mostViewedProducts = [
    { image: 'https://i.dummyjson.com/data/products/2/1.jpg', title: 'Iphone X', price: '$500' },
    { image: 'https://i.dummyjson.com/data/products/2/1.jpg', title: 'Iphone 9', price: '$500' },
    { image: 'https://i.dummyjson.com/data/products/2/1.jpg', title: 'Iphone 12', price: '$500' },
    { image: 'https://i.dummyjson.com/data/products/2/1.jpg', title: 'Iphone 11', price: '$500' },
    { image: 'https://i.dummyjson.com/data/products/2/1.jpg', title: 'Iphone 9', price: '$500' },
  ]

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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
      <div className={styles['most-viewed']}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2>Most Viewed Products</h2>
        </div>

        <Slider {...sliderSettings}>
          {mostViewedProducts.map((card, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  style={{ textAlign: 'center' }}
                  alt={card.title}
                  src={card.image}
                  height="200"
                />
              </div>
              <div>
                <h3 style={{ textAlign: 'center' }}>{card.title}</h3>
                <p style={{ textAlign: 'center' }}>Price: {card.price}</p>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Add to cart
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
export default ProductDetail
