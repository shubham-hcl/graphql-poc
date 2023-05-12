import React from 'react'
import ImageGallery from 'react-image-gallery'
import styles from './Product.module.scss'
function ProductImageGallery({ images }: any) {
  const img = images?.map((image: String) => {
    return {
      original: image,
      thumbnail: image,
      thumbnailHeight: '20px',
      thumbnailWidth: '20px',
      originalHeight: '200px',
    }
  })

  return (
    <div className={styles['image-gallery-right-nav']}>
      <ImageGallery
        items={img}
        showFullscreenButton={false}
        showPlayButton={false}
        thumbnailPosition="bottom"        
      />
    </div>
  )
}

export default ProductImageGallery
