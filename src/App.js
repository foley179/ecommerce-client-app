import React from 'react'
import {useState, useEffect} from 'react'
import Cart from './components/Cart'
import Header from './components/Header'
import Main from './components/Main'
import data from './data'
import Login from './components/Login'

function App() {
  const {products} = data
  const [cartItems, setCartItems] = useState([])
  const [loginTab, setLoginTab] = useState("none")

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

  function changeLoginTab(e) {
    // change state for login tab
    e.preventDefault()
    if (loginTab === "none") {
      setLoginTab("block")
    } else {
      setLoginTab("none")
    }
  }

  // hooks
  useEffect(() => {
    // hide/show login tab
    document.getElementById("overlay").style.display = loginTab
  }, [loginTab])

  // render
  return (
    <>
      <Header changeLoginTab={changeLoginTab} cartQty={cartItems.length} />
      <Login changeLoginTab={changeLoginTab} />
      <div className="row">
        <Main onAdd={onAdd} products={products} />
        <Cart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} />
      </div>
    </>
  )
}

export default App;