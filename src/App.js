import React from 'react'
import {useState} from 'react'
import Cart from './components/Cart'
import Header from './components/Header'
import Main from './components/Main'
import data from './data'

function App() {
  const {products} = data
  const [cartItems, setCartItems] = useState([])

  function onAdd(product) {
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

  return (
    <>
      <Header cartQty={cartItems.length} />
      <div className="row">
        <Main onAdd={onAdd} products={products} />
        <Cart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} />
      </div>
    </>
  )
}

export default App;