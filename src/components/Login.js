export default function Login(props) {
    const {changeLoginTab} = props
    function doNothing(e) {
        // to be removed once "login onclick" fixed
        e.preventDefault()
    }
    return (
        <div id="overlay">
            <div id="login">
                <h2>Login Tab</h2>
                <form>
                    <input type="text" placeholder="Enter Your Email" className="txt" />
                    <input type="text" placeholder="Enter Your Password" className="txt" />
                    {/* change onclick for login&signup button */}
                    <button onClick={(e) => doNothing(e)} className="loginbutton button">Login</button>
                    <button onClick={(e) => doNothing(e)} className="loginbutton button">Sign Up</button>
                    <button onClick={(e) => changeLoginTab(e)} className="loginbutton button close">Close</button>
                </form>
            </div>
        </div>
    )
}

// change login for sign up tab onclick?