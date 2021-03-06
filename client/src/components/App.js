import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import { AuthProvider } from '../contexts/authcontext'
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
import ResetPassword from './ResetPassword'

function App() {
    let localStorageCart = JSON.parse(localStorage.getItem("cartItems"))
    if (localStorageCart === null) {
        localStorageCart = []
    }
    const [cartItems, setCartItems] = useState(localStorageCart)
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    // helper function
    const prefix = process.env.NODE_ENV === 'production' ? "https://pern-ecommerce-app.herokuapp.com" : "http://localhost:4000"
    function getUrl(relativeUrl) {
        return prefix + "/" + relativeUrl;
    }

    async function getProducts() {
        const products = await axios.get(getUrl("products"))
        setProducts(products.data)
        setIsLoading(false)
        return
    }

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])
    
    useEffect(() => {
        // react has a warning about this func not being in the array but i only want it to render on mount
        // for now, i will change once a search bar is implemented
        getProducts()
    }, [])

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
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }

    // render
    return (
        <Router>
            <AuthProvider>
                <Header />
                <div className="row">
                    <Switch>
                        <Route exact path="/">
                            <Main onAdd={onAdd} products={products} isLoading={isLoading} />
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
                        <Route path="/resetPassword">
                            <ResetPassword />
                        </Route>
                    </Switch>
                    <Cart onAdd={onAdd} onRemove={onRemove} emptyCart={emptyCart} cartItems={cartItems} />
                </div>
            </AuthProvider>
        </Router>
    )
}
  
  export default App;