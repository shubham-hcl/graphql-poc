import React from 'react'
import ImageGallery from 'react-image-gallery'
import styles from './Product.module.scss'
function ProductImageGallery({ images }: any) {
  const img = images?.map((image: String) => {
    return {
      original: image,
      thumbnail: image,
    }
  })

  return (
    <div className={styles['img image-gallery-image']}>
      <ImageGallery sizes={width:'20px} items={img} thumbnailPosition="bottom" />
    </div>
  )
}

export default ProductImageGallery
