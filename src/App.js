import React from 'react'
import Cart from './components/Cart'
import Header from './components/Header'
import Main from './components/Main'
import data from './data'

function App() {
  const {products} = data
  return (
    <>
      <Header />
      <div className="row">
        <Main products={products} />
        <Cart />
      </div>
    </>
  )
}

export default App;