import React, { useState, useEffect } from 'react';
import './ListarItems.css';
import  {Link}  from 'react-router-dom';
const ItemListPage: React.FC = () => {
    // Estado para almacenar los elementos del localStorage
    const [items, setItems] = useState<string[]>([]);

    // Cargar los elementos del localStorage cuando se monte el componente
    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    return (
        <div className='item-list-container'>
            <h2>Lista de Items</h2>
            <ul className='item-list'>
                {items.map((item, index) => (
                    <li  key={index}>{item}</li>
                ))}
            </ul>

            <button ><Link to="/principal">Atrás</Link></button>
        </div>
    );
};

export default ItemListPage;
