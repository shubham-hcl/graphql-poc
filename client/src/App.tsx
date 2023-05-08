import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import ProductList from './components/ProductList'
import ShoppingBag from './components/ShoppingBag'
import Authentication from './components/Authentication'
import Home from './components/Home'
import AppProvider from './providers/AppProvider'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App() {
  return (
    <ApolloProvider client={client}>
       <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Authentication />} />
          <Route path="bag" element={<ShoppingBag />} />
          <Route path="products" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
      </AppProvider>
    </ApolloProvider>
  )
}
