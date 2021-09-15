import { useRef } from "react"

export default function Checkout() {
    const address1Ref = useRef()
    const address2Ref = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const countryRef = useRef()
    const cityRef = useRef()
    const postcodeRef = useRef()
    const emailRef = useRef()

    // functions
    function handleSubmit(e) {
        e.preventDefault()
        console.log("checkout (address) form submitted") // testing only
    }

    // render
    return (
        <div className="block col-2 checkout">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <h2>Shipping address</h2>
                <hr />
                <input type="text" placeholder="First Name" className="txt txt25" required ref={firstNameRef} />
                <input type="text" placeholder="Last Name" className="txt txt25" required ref={lastNameRef} />
                <input type="text" placeholder="Address 1" className="txt txt100" required ref={address1Ref} />
                <input type="text" placeholder="Address 2" className="txt txt100" required ref={address2Ref} />
                <input type="text" placeholder="Country" className="txt txt100" required ref={countryRef} />
                <input type="text" placeholder="City" className="txt txt25" required ref={cityRef} />
                <input type="text" placeholder="Postcode" className="txt txt25" required ref={postcodeRef} />
                <input type="email" placeholder="Email Address" className="txt txt100" required ref={emailRef} />
                <button type="submit" className="loginbutton button">Payment</button>
            </form>
        </div>
    )
}
