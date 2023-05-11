import './App.scss'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import ShoppingBag from './components/ShoppingBag'
import Authentication from './components/Authentication'
import Product from './components/Product'
import AuthProvider from './utils/AuthProvider'
import ProductDetail from './components/ProductDetail'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace={true} />} />
          <Route
            path="products"
            element={
              <AuthProvider>
                <Product />
              </AuthProvider>
            }
          ></Route>
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
