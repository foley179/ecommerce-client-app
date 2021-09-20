import React from "react"

export default function Product(props) {
    const {product, onAdd} = props
    return (
        <div>
            <img className="small" src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <div>£{(product.price / 100).toFixed(2)}</div>
            <div>
                <button className="button" onClick={() => onAdd(product)}>Add To Cart</button>
            </div>
        </div>
    )
}