import {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { AuthProvider } from '../contexts/authcontext'
import data from '../data' // mock data
import Cart from './Cart'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Profile from './Profile'
import Signup from './Signup'
import PwReset from './PwReset'
import PrivateRoute from './PrivateRoute'
import UpdateProfile from './UpdateProfile'
import Success from './Success'
import Failed from './Failed'

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

  function emptyCart() {
    // for purchase success
    setCartItems([])
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
            <Route path="/success">
              <Success />
            </Route>
            <Route path="/failed">
              <Failed />
            </Route>
          </Switch>
          <Cart onAdd={onAdd} onRemove={onRemove} emptyCart={emptyCart} cartItems={cartItems} />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App;