import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    // Estado para almacenar los elementos del CRUD
    const [items, setItems] = useState<string[]>([]);
    // Estado para almacenar el nuevo valor del elemento
    const [newValue, setNewValue] = useState<string>('');

    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    // Cargar los elementos del localStorage cuando se monte el componente
    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            setItems(storedItems.split(','));
        }
    }, []);

    // Función para guardar los elementos en el localStorage
    useEffect(() => {
        localStorage.setItem('items', items.join(','));
    }, [items]);

    // Función para agregar un nuevo elemento
    const addItem = () => {
        if (newValue.trim() !== '') {
            setItems([...items, newValue.trim()]);
            setNewValue('');
        }
    };

    // Función para marcar un elemento como completado
    const toggleComplete = (index: number) => {
        const updatedItems = [...items];
        updatedItems[index] = updatedItems[index].startsWith('✔') ? updatedItems[index].substr(2) : `✔ ${updatedItems[index]}`;
        setItems(updatedItems);
    };

    // Función para editar un elemento existente
    const editItem = (index: number) => {
        setEditingIndex(index);
        setNewValue(items[index]);
    };

    // Función para actualizar un elemento existente
    const updateItem = () => {
        if (newValue.trim() !== '') {
            const updatedItems = [...items];
            updatedItems[editingIndex as number] = newValue.trim();
            setItems(updatedItems);
            setEditingIndex(null);
            setNewValue('');
        }
    };

    // Función para eliminar un elemento existente
    const deleteItem = (index: number) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    return (
        <div className="homepage-container">
            <h2>TO DO</h2>
            <br /><br />
            <div>
                <input
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Nuevo elemento"
                />
                <button onClick={addItem}>Agregar</button>
            </div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <p style={{ textDecoration: item.startsWith('✔') ? 'line-through' : 'none' }}>
                            {editingIndex === index ? (
                                <input
                                    type="text"
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                />
                            ) : (
                                item
                            )}
                        </p>
                        <div>
                            {editingIndex === index ? (
                                <button onClick={updateItem}>Guardar</button>
                            ) : (
                                <>
                                    <button onClick={() => toggleComplete(index)}>
                                        {item.startsWith('✔') ? 'Deshacer' : 'Listo'}
                                    </button>
                                    <button onClick={() => editItem(index)}>Editar</button>
                                    <button onClick={() => deleteItem(index)}>Eliminar</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <button className="boton1"><a><Link to="/">Cerrar Sesión</Link></a></button>
        </div>
    );
};

export default HomePage;
