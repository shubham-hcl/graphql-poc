import './App.scss'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import ShoppingBag from './components/ShoppingBag'
import Authentication from './components/Authentication'
import Product from './components/Product'
import AuthProvider from './utils/AuthProvider'
import AppProvider from './providers/AppProvider'
import ProductDetail from './components/ProductDetail'

const httpLink = createHttpLink({
  uri: 'https://graphql-poc-tdor.onrender.com/graphql', //'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
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
      </AppProvider>
    </ApolloProvider>
  )
}
