import styles from './Slider.module.scss'
import Slider from 'react-slick'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { mostViewedProducts } from '../../constant'
import Button from '@mui/material/Button'

const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
      <div onClick={onClick}>
        <ArrowForwardIosOutlinedIcon
          className={className}
          style={{ ...style, background: 'grey', color: 'white', height: 30, width: 30 }}
        />
      </div>
    )
  }
  
  const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
      <div onClick={onClick}>
        <ArrowBackIosNewOutlinedIcon
          className={className}
          style={{ ...style, background: 'grey', color: 'white', height: 30, width: 30 }}
        />
      </div>
    )
  }

const SliderComponent = () => {

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    }

    return (
        <div className={styles['slider']}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2>Most Viewed Products</h2>
        </div>

        <Slider {...sliderSettings}>
          {mostViewedProducts.map((card, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  style={{ textAlign: 'center' }}
                  alt={card.name}
                  src={card.images[0]}
                  height="200"
                />
              </div>
              <div>
                <h3 style={{ textAlign: 'center', fontSize: 16 }}>{card.name}</h3>
                <h3 style={{ textAlign: 'center', fontSize: 12}}>{card.description}</h3>
                <p style={{ textAlign: 'center' }}>Price: ${card.price}</p>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Add to cart
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    )

}

export default SliderComponent;