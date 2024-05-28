import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Recuperar datos de LocalStorage
        const storedUsers = localStorage.getItem('users');
        if (!storedUsers) {
            setError('No hay usuarios registrados');
            return;
        }
        const users = JSON.parse(storedUsers);

        // Verificar si el nombre de usuario y la contraseña coinciden con los almacenados
        const foundUser = users.find((user: any) => user.username === username && user.password === password);
        if (foundUser) {
            // Si coinciden, redirigir al usuario a la página principal
            window.location.href = '/principal';
        } else {
            // Si no coinciden, mostrar un mensaje de error
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Iniciar sesión</button>
            </form>
            <p>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
        </div>
    );
};

export default Login;
