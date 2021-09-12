import {useState} from 'react'

export default function Login(props) {
    const {changeLoginTab} = props
    const [tabType, setTabType] = useState("login")
    function doNothing(e) {
        // to be removed once "login onclick" fixed
        e.preventDefault()
    }

    function handleClose(e) {
        // refresh state to "login" so login tab shows on initial click
        setTabType("login")
        changeLoginTab(e)
    }

    function changeTabType(e) {
        e.preventDefault()
        if (tabType === "login") {
            setTabType("signup")
        } else {
            setTabType("login")
        }
    }

    if (tabType === "login") {
        return (
            <div id="overlay">
                <div id="login">
                    <h2>Login Tab</h2>
                    <form>
                        <input type="email" placeholder="Enter Your Email" className="txt" />
                        <input type="password" placeholder="Enter Your Password" className="txt" />
                        {/* change onclick for login button */}
                        <button onClick={(e) => doNothing(e)} className="loginbutton button">Login</button>
                        <button onClick={(e) => changeTabType(e)} className="loginbutton button">Sign Up</button>
                        <button onClick={(e) => handleClose(e)} className="loginbutton button close">Close</button>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <div id="overlay">
                <div id="login">
                    <h2>Login Tab</h2>
                    <form>
                        <input type="email" placeholder="Enter Your Email" className="txt" />
                        <input type="password" placeholder="Enter Your Password" className="txt" />
                        <input type="password" placeholder="Re-Enter Your Password" className="txt" />
                        {/* change onclick for signup button */}
                        <button onClick={(e) => doNothing(e)} className="loginbutton button">Sign Up</button>
                        <button onClick={(e) => changeTabType(e)} className="loginbutton button">Login</button>
                        <button onClick={(e) => handleClose(e)} className="loginbutton button close">Close</button>
                    </form>
                </div>
            </div>
        )
    }
}
