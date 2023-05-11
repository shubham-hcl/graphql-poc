import styles from './ShoppingBagProduct.module.scss';
import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Remove, Add } from '@mui/icons-material';
import TextField from '@mui/material/TextField';

export default function ShoppingBagProduct({lineItem, decrement, increment, updateQuantity, removeItem}: any) {
  const [quantity, setQuantity] = useState(lineItem.quantity);

  const changeQuantity = (lineItemId: Number, inputQuantity: string) => {
    let itemQuantity = parseInt(inputQuantity);
    if (10 <= itemQuantity) {
      itemQuantity = 10;
      alert('Maximum purchase 10 units');
    }
    setQuantity(itemQuantity);
    updateQuantity(lineItemId, itemQuantity);
  };

  const decrementQuantity = (lineItemId: Number, inputQuantity: string) => {
    let itemQuantity = parseInt(inputQuantity);
    if (itemQuantity <= 0) {
      itemQuantity = 0;
    } else {
      itemQuantity = itemQuantity - 1;
    }
    setQuantity(itemQuantity);
    decrement(lineItemId, itemQuantity);
  };

  const incrementQuantity = (lineItemId: Number, inputQuantity: string) => {
    let itemQuantity = parseInt(inputQuantity);
    if (10 <= itemQuantity) {
      itemQuantity = 10;
      alert('Maximum purchase 10 units');
    } else {
      itemQuantity = itemQuantity + 1;
    }
    setQuantity(itemQuantity);
    increment(lineItemId, itemQuantity);
  };

  return (
    <div className={styles.products__product}>
      <div className={styles.products__product__image}>
        <img src={lineItem.thumbnail} width="125px" height="125px"/>
      </div>
      <div className={styles.products__product__name}>
        <h3>{lineItem.name}</h3>
        {lineItem.size && <div>Size: {lineItem.size}</div>}
        <p>{lineItem.description}</p>
        <div className={styles.products__product__name__counter}>
          <IconButton onClick={(e) => decrementQuantity(lineItem.productId, quantity)}>
            <Remove/>
          </IconButton>
          <TextField size="small" value={quantity} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e) => changeQuantity(lineItem.productId, e.target.value)}/>
          <IconButton onClick={(e) => incrementQuantity(lineItem.productId, quantity)}>
            <Add/>
          </IconButton>
          <Button variant="contained" size="small" onClick={(e) => removeItem(lineItem.productId)} sx={{marginLeft: '1rem'}}>Remove</Button>
        </div>
      </div>
      <div className={styles.products__product__total}>${lineItem.price * lineItem.quantity}</div>
    </div>
  )
}
