import {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { AuthProvider } from './contexts/authcontext'
import data from './data' // mock data
import Cart from './components/Cart'
import Header from './components/Header'
import Main from './components/Main'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'
import PwReset from './components/PwReset'
import PrivateRoute from './components/PrivateRoute'
import UpdateProfile from './components/UpdateProfile'
import Checkout from './components/checkout/Checkout'
import Payment from './components/checkout/Payment'

function App() {
  const {products} = data
  const [cartItems, setCartItems] = useState([])

  // functions
  function onAdd(product) {
    // adding product to cart
    const exist = cartItems.find((x) => x.id === product.id)
    if (exist) {
      setCartItems(
        cartItems.map((x) => {
          return x.id === product.id ? {...exist, qty: exist.qty + 1} : x
        })
      )
    } else {
      setCartItems([...cartItems, {...product, qty: 1}])
    }
  }

  function onRemove(product) {
    // removing product from cart
    const exist = cartItems.find((x) => x.id === product.id)
    if (exist.qty === 1) {
      setCartItems(
        cartItems.filter((item) => {
          return item.id !== product.id
        })
      )
    } else {
      setCartItems(
        cartItems.map((x) => {
          return x.id === product.id ? {...exist, qty: exist.qty - 1} : x
        })
      )
    }
  }

  // render
  return (
    <Router>
      <AuthProvider>
        <Header />
        <div className="row">
          <Switch>
            <Route exact path="/">
              <Main onAdd={onAdd} products={products} />
            </Route>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/updateProfile">
              <UpdateProfile />
            </PrivateRoute>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/pwReset">
              <PwReset />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/payment">
              <Payment />
            </Route>
          </Switch>
          <Cart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App;