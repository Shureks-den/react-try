import React, { useState, useEffect } from 'react';
import './App.scss'

import Alert from '../Alert';
import Input from '../Input';
import MyButton from '../MyButton';
import UserList from '../UserList';


export default function App() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoginValid, setLoginValidation] = useState(false);
    const [isPasswordValid, setPasswordValidtaion] = useState(false);
    const [isLogged, setLoggedStatus] = useState('pending');

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/checkAuth', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                credentials: "include",
            });
            if (response.status === 200) {
                setLoggedStatus('logged');
            } else {
                setLoggedStatus('notLogged');
            }
        })();
    }, [])

    const validateLogin = (e) => {
        const input = e.target.value;
        setLogin(input);
        setLoginValidation(/\d+/.test(input) ? false : true);
    };
    const validatePassword = (e) => {
        const input = e.target.value;
        setPassword(input);
        setPasswordValidtaion(Number.isNaN(Number(input)) ? false : true);
    }
    const onClickLogin = async (endpoint) => {
        console.log(login, password, isLoginValid, isPasswordValid);
        if (!isLoginValid || !isPasswordValid) {
            setErrorMessage('Ошибка в данных логина/пароля');
            return;
        }
        setErrorMessage(null);
        const user = {
            login: login,
            password: password,
        }
        const response = await fetch(`http://localhost:8000/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            credentials: "include",
            body: JSON.stringify(user)
        });
        if (response.status === 404) {
            setErrorMessage('Такого пользователя не существует');
            setLoggedStatus('notLogged');
            return;
        }
        if (response.status === 409) {
            setErrorMessage('Пользователь с таким логином существует');
            setLoggedStatus('notLogged');
            return;
        }
        const res = await response.json();
        console.log(res);
        setLoggedStatus('logged');
    }

    const logout = async (e) => {
        const response = await fetch(`http://localhost:8000/logout`, {
            method: 'POST',
            credentials: "include",
        });
        if (response.status === 200) {
            setLoggedStatus('notLogged');
        }
    }

    const resetData = () => {
        console.log('aaa')
        setLogin('');
        setPassword('');
        setErrorMessage(null);
    }
    return (
        <div>
            {isLogged === 'notLogged' ? <div className="input-container">
                <Input label="Логин" onChangeEvent={validateLogin} value={login} />
                <Input label="Пароль" onChangeEvent={validatePassword} value={password} isPassword={true} />
                <MyButton label="Авторизоваться" onClick={() => onClickLogin('auth')} />
                <MyButton label="Зарегистрироваться" onClick={() => onClickLogin('reg')} />
                {errorMessage ? <Alert message={errorMessage} onClick={resetData} /> : null}
            </div> : null}
            {isLogged === 'logged' ? <UserList /> : null}
            {isLogged === 'logged' ? <MyButton label='Выйти' onClick={logout} /> : null}
        </div>
    )
}
