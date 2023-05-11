import React, { useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './ProductDetail.module.scss'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import ImageGallery from 'react-image-gallery'
import { SocialIcon } from 'react-social-icons'

const productData = {
  data: {
    product: {
      productId: 'eed1e0d3-806b-4430-b3d7-f217f06077f8',
      name: 'iPhone X',
      description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology',
      price: 899,
      images: [
        'https://i.dummyjson.com/data/products/2/1.jpg',
        'https://i.dummyjson.com/data/products/2/2.jpg',
        'https://i.dummyjson.com/data/products/2/3.jpg',
        'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
      ],
    },
  },
}

function ProductDetail() {
  const [quantity, setQuantity] = useState(1)

  const handleChange = (event: any) => {
    setQuantity(event.target.value)
  }

  const images = productData.data.product.images.map((image) => {
    return {
      original: image,
      thumbnail: image,
    }
  })

  const { data } = productData
  return (
    <div>
      <Header />
      <div className={styles['product-detail']}>
        <div className={styles['left-layout']}>
          <ImageGallery items={images} thumbnailPosition="left" />
        </div>

        <div className={styles['right-layout']}>
          <div>
            <h2>{data.product.name}</h2>
          </div>
          <div>
            <h1>{data.product.description}</h1>
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
            <SocialIcon url="https://twitter.com" />
            <SocialIcon url="https://facebook.com" />
            <SocialIcon url="https://pinterest.com" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default ProductDetail
