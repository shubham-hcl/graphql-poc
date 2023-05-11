import { useParams } from 'react-router-dom';
import Header from '../Header/Header'



function ProductDetail() {
  const params = useParams();
  console.log('productID', params);

  // const handleProceed = () => {
  //   history.push(`/products/${productId}`);
  // };

  return (
    <div>
      <Header />
      <div>Product Detail Page</div>
    </div>
  )
}
export default ProductDetail
