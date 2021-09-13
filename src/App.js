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

  // hooks


  // render
  return (
    <AuthProvider>
      <Router>
        <Header cartQty={cartItems.length} />
        <div className="row">
          <Switch>
            <Route exact path="/">
              <Main onAdd={onAdd} products={products} />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/pwReset">
              <PwReset />
            </Route>
          </Switch>
          <Cart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;