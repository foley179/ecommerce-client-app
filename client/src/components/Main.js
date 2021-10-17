import React from "react"
import Product from "./Product"

export default function Main(props) {
    const {products, onAdd, isLoading} = props
    if (isLoading) {
        return <main className="block col-2">...Loading please wait</main>
    } else {
        return (
            <main className="block col-2">
                <h2>Products</h2>
                <div className="row">
                    {products.map((product) => (
                        <Product onAdd={onAdd} key={product.id} product={product} />
                    ))}
                </div>
            </main>
        )
    }
}