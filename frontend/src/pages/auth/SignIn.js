import { useState } from 'react'

const SignIn = () => {
    const [isRegistered, setIsRegistered] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rPassword, setRepPassword] = useState('')
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [invalidRepPassword, setInvalidRepPassword] = useState(false)


    let title = isRegistered ? "Sign In" : "Sign Up";

    const onSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            alert('Please enter email and password')
            return
        }
        // "\\b[a-zа-я]+@[a-zа-я]+.com"

        setEmail('')
        setPassword('')
        setRepPassword('')

    }

    const emailBlurHandler = (e) => {
        if(!/^\S+@\S+\.\S+$/.test(email)){
            setInvalidEmail(true);
        } else {
            setInvalidEmail(false);
        }
    };
    const passwordBlurHandler = (e) => {
        if(!/^\w{8,}$/.test(password)){
            setInvalidPassword(true);
        } else {
            setInvalidPassword(false);
        }
    };
    const rPasswordBlurHandler = (e) => {
        if(rPassword !== password){
            setInvalidRepPassword(true);
        } else {
            setInvalidRepPassword(false);
        }
    };

    return (

        <form className='add-form' onSubmit={onSubmit}>
            <header className='header'>
                <h1>{title}</h1>
            </header>
            <div className='form-control'>
                <label>Email</label>
                <input
                    type='text'
                    placeholder='Enter Email'
                    onBlur={emailBlurHandler}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {invalidEmail && !isRegistered &&
                <p className="invalid-register-input">Please, enter valid email</p>
                }
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input
                    type='text'
                    placeholder='Enter Password'
                    onBlur={passwordBlurHandler}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {invalidPassword && !isRegistered &&
                <p className="invalid-register-input">Please, enter valid password, at least 8 characters</p>
                }
            </div>
            {!isRegistered &&
            <div className='form-control'>
                <label>Repeat your Password</label>
                <input
                    type='text'
                    placeholder='Repeat Password'
                    onBlur={rPasswordBlurHandler}
                    value={rPassword}
                    onChange={(e) => setRepPassword(e.target.value)}
                />
                {invalidRepPassword &&
                <p className="invalid-register-input">Passwords don`t match</p>
                }
            </div>
            }
            <input type='submit' value={title} className='btn btn-block' />
            {isRegistered ?
            <p className="link" onClick = {() => setIsRegistered(false)}>Don`t have account? Create one</p> :
                <p className="link" onClick = {() => setIsRegistered(true)}>Already have an account? Sign in</p>}
        </form>
    )
}

export default SignIn