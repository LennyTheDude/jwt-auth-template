import { observer } from "mobx-react-lite";
import { FC, useState, useContext } from "react";
import { Context } from "..";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const { store } = useContext(Context)
    
    return (
        <div>
            <input
                type="text"
                placeholder='Email'
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                placeholder='Password'
                onChange={e => setPwd(e.target.value)}
                value={pwd}
            />
            <button onClick={() => store.login(email, pwd)}>
                Log In
            </button>
            <button onClick={() => store.signUp(email, pwd)}>
                Sign Up
            </button>
        </div>
    );
}

export default observer(LoginForm);