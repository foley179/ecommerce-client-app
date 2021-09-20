import { useRef } from 'react'

export default function Payment() {
    const cardNumberRef = useRef()
    const expiresRef = useRef()
    const securityRef = useRef()


    // functions
    function handleSubmit(e) {
        e.preventDefault()
        console.log("checkout (payment) form submitted") // testing only
    }

    // render
    return (
        <div className="block col-2 checkout">
            <h1>Checkout</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <h2>Card Details</h2>
                <input type="text" placeholder="Card Number" className="txt" required ref={cardNumberRef} />
                <input type="text" placeholder="Expires On: dd/mm/yy" className="txt" required ref={expiresRef} />
                <input type="text" placeholder="Security Code" className="txt" required ref={securityRef} />
                <button type="submit" className="loginbutton button">Payment</button>
            </form>
        </div>
    )
}
