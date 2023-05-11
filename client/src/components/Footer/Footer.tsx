
import {Grid, Link, Typography} from '@mui/material';
import styles from './Footer.module.scss';
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];
function Footer() {
  return (
       <footer className={styles['footer']}>
         <div className={styles['footer__innerContainer']}>

       
        <Grid container spacing={10}>
          {footers.map(footer => (
            <Grid item xs key={footer.title}>
              
              <Typography variant="h6" gutterBottom>
               
                {footer.title}
               
              </Typography>
             
              {footer.description.map(item => (
                <>
                
                <Typography key={item} variant="subtitle1">
                <Link className={styles['footer__innerContainer__anchor']} component="a" href={'#'}> {item} </Link>
                </Typography>
               
                </>
              ))}
            </Grid>
          ))}
        </Grid>
        <div>

        </div>
        </div>
      </footer>
  )
}
export default Footer
