import { observer } from 'mobx-react-lite';
import { useState, useEffect, useContext, FC } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm'
import { IUser } from './models/IUser';
import UserService from "./services/UserService";

const App: FC = () => {
    const { store } = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [store])

    const getUsers = async () => {
        try {
            const response = await UserService.getUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div><h1>Loading, please wait</h1></div>
    }

    if (!store.loggedIn) {
        return <LoginForm />
    }

    return (
    <div className="App">
        <h1>{`You are authorized as ${store.user.email}.`}</h1>
        <h2>{store.user.isActivated ? `Your account has been activated.` : 'Please activate your account.'}</h2>
        <button onClick={() => store.logout()}>Log Out</button>
        <div>
            <button onClick={() => getUsers()}>Get Users List</button>
        </div>
        {users.map(user => <div key={user.email}>{user.email}</div>)}
    </div>
  );
}

export default observer(App);
