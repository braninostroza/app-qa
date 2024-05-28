import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Registrar.css';

const Register: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validación de campos
        if (!username || !password || !confirmPassword || !email) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        if (password.length < 5) {
            setError('La contraseña debe tener al menos 5 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Ingrese un correo electrónico válido.');
            return;
        }

        // Verificar duplicados
        if (users.some(user => user.username === username)) {
            setError('El nombre de usuario ya existe.');
            return;
        }

        if (users.some(user => user.email === email)) {
            setError('El correo electrónico ya está registrado.');
            return;
        }

        // Guardar datos en el array
        const newUser = { username, password, email };
        setUsers([...users, newUser]);
        alert('Usuario registrado con éxito.');
        // Limpiar campos y errores
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    return (
        <div className="register-container">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLocaleLowerCase())}
                        required
                        minLength={5}
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
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
                        minLength={5}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={5}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Registrar</button>
            </form>
            <p>¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link></p>
        </div>
    );
};

export default Register;
