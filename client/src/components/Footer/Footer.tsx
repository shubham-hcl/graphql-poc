import { Typography } from '@mui/material/'
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div>
      <footer className={styles['footer']}>
        <Typography>All rights reserved @Team GraphQl-React</Typography>
      </footer>
    </div>
  )
}
export default Footer
