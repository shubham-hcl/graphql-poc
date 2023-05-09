import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ShoppingBag from './components/ShoppingBag';
import Authentication from './components/Authentication';
import Home from './components/Home';
import AuthProvider from './utils/AuthProvider';
import ProductDetail from './components/ProductDetail';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/products"
            element={
              <AuthProvider>
                <Home />
              </AuthProvider>
            }
          />
          <Route path="login" element={<Authentication />} />
          <Route
            path="bag"
            element={
              <AuthProvider>
                <ShoppingBag />
              </AuthProvider>
            }
          />
          <Route path="products/:productId" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}
