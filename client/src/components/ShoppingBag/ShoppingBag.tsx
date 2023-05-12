import { useMutation, useQuery } from '@apollo/client'
import Header from '../Header/Header'
import Button from '@mui/material/Button'
import styles from './ShoppingBag.module.scss'
import GET_CART from '../../graphql/Queries/Cart'
import ShoppingBagProduct from '../ShoppingBagProduct/ShoppingBagProduct'
import UPDATE_CART_PRODUCT from '../../graphql/Mutations/UpdateCartProduct'
import DELETE_CART_PRODUCT from '../../graphql/Mutations/DeleteCartProduct'
import SliderComponent from '../Slider/Slider'

export default function ShoppingBag() {
  const cartId = localStorage.getItem('cartId') || ''

  const { loading, error, data } = useQuery(GET_CART, {
    variables: {
      cartId,
    },
  })

  const [mutateProductUpdate] = useMutation(UPDATE_CART_PRODUCT, {
    refetchQueries: [
      {
        query: GET_CART,
        variables: { cartId },
      },
    ],
  })

  const [mutateProductDelete] = useMutation(DELETE_CART_PRODUCT, {
    refetchQueries: [
      {
        query: GET_CART,
        variables: { cartId },
      },
    ],
  })

  const decrement = (itemId: Number, inputQuantity: number) => {
    let lineItem = Object.assign(
      {},
      data.cart.lineItems.find((lineItem: any) => lineItem.productId === itemId)
    )
    delete lineItem.__typename
    if (inputQuantity === 0) {
      mutateProductDelete({
        variables: {
          cartId: data.cart.cartId,
          lineItem,
        },
      })
    } else {
      lineItem.quantity = inputQuantity

      mutateProductUpdate({
        variables: {
          cartId: data.cart.cartId,
          lineItem,
        },
      })
    }
  }

  const increment = (itemId: Number, inputQuantity: number) => {
    let lineItem = Object.assign(
      {},
      data.cart.lineItems.find((lineItem: any) => lineItem.productId === itemId)
    )
    delete lineItem.__typename
    lineItem.quantity = inputQuantity

    mutateProductUpdate({
      variables: {
        cartId: data.cart.cartId,
        lineItem,
      },
    })
  }

  const updateQuantity = (itemId: Number, inputQuantity: number) => {
    let lineItem = Object.assign(
      {},
      data.cart.lineItems.find((lineItem: any) => lineItem.productId === itemId)
    )
    delete lineItem.__typename
    lineItem.quantity = inputQuantity

    mutateProductUpdate({
      variables: {
        cartId: data.cart.cartId,
        lineItem,
      },
    })
  }

  const removeItem = (itemId: Number) => {
    let lineItem = Object.assign(
      {},
      data.cart.lineItems.find((lineItem: any) => lineItem.productId === itemId)
    )
    delete lineItem.__typename
    mutateProductDelete({
      variables: {
        cartId: data.cart.cartId,
        lineItem,
      },
    })
  }

  const CartData = data ? (
    <div>
      <div className={styles.cart__main}>
        <div className={styles.cart__main__products}>
          {data.cart.lineItems.map((lineItem: any, index: any) => (
            <>
              <ShoppingBagProduct
                key={index}
                lineItem={lineItem}
                increment={increment}
                decrement={decrement}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
              {index > 0 && <hr />}
            </>
          ))}
        </div>
        <div className={styles.cart__main__total_section}>
          <div className={styles.cart__main__total_section__total}>
            <div className={styles.cart__main__total_section__total__text}>Total Amount</div>
            <div className={styles.cart__main__total_section__total__amount}>
              {data.cart.totalPrice}
            </div>
          </div>
          <Button fullWidth variant="contained">
            Checkout
          </Button>
        </div>
      </div>
      <SliderComponent />
    </div>
  ) : (
    <div className={styles.cart__error}>{error?.message}</div>
  )

  return (
    <div>
      <Header />
      <div className={styles.cart}>
        <div className={styles.cart__heading}>
          <h2>Shopping Cart</h2>
          {loading ? <div className={styles.cart__loader}>Loading....</div> : CartData}
        </div>
      </div>
    </div>
  )
}
