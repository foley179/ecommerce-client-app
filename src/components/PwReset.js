import React from 'react'

export default function PwReset() {
    
    // functions
    function handleSubmit(e) {
        // to be removed once onClick fixed for pwreset
        e.preventDefault()
        alert("Sending Email")
    }

    return (
        <div class="block col-2 login">
            <h2>Password Reset</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                <input type="email" placeholder="Enter Your Email" className="txt" required />
                <button type="submit" className="loginbutton button">Send Email</button>
            </form>
        </div>
    )
}
