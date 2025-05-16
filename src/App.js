import React, { useState } from 'react';
import './App.css';

function App() {
  //usamos el estado para las constantes producto y lista
  const [producto, setProducto] = useState('');
  const [lista, setLista] = useState([]);

  //función para agregar un producto
  const agregarProducto = () => {
    //si no es una cadena vacía
    if (producto.trim() !== '') {
      //usamos el spread operator para agregar producto a la lista quitando espacios vacíos al principio y final del string.
      setLista([...lista, producto.trim()]);
      //vaciamos el valor de producto
      setProducto('');
    }
  };

  //función para eliminar un producto
  const eliminarProducto = (index) => {
      setLista(lista.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>🛒 Lista de Compras</h1>
      <input
        type="text"
        placeholder="Introduce un producto"
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
      />
      <button onClick={agregarProducto}>Agregar</button>

      <ul>
        {lista.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => eliminarProducto(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
