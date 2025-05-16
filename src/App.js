import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // usamos el estado para las constantes producto y lista
  const [producto, setProducto] = useState('');
  // leemos la lista guardada en localStorage al iniciar la app
  const [lista, setLista] = useState(() => {
    const datosGuardados = localStorage.getItem('listaDeCompras');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  // cada vez que la lista cambie, la guardamos en localStorage
  useEffect(() => {
    localStorage.setItem('listaDeCompras', JSON.stringify(lista));
  }, [lista]);

  // función para agregar un producto
  const agregarProducto = () => {
    // quitamos espacios al inicio y fin y convertimos a minúsculas para evitar duplicados
    const nuevoProducto = producto.trim();

    // si no es una cadena vacía
    if (nuevoProducto !== '') {
      // evitamos duplicados (ignorando mayúsculas/minúsculas)
      const existe = lista.some(item => item.nombre.toLowerCase() === nuevoProducto.toLowerCase());
      if (existe) {
        alert('Ese producto ya está en la lista.');
        return;
      }

      // agregamos un objeto con nombre y estado de comprado
      setLista([...lista, { nombre: nuevoProducto, comprado: false }]);
      // vaciamos el valor de producto
      setProducto('');
    }
  };

  // función para eliminar un producto
  const eliminarProducto = (index) => {
    setLista(lista.filter((_, i) => i !== index));
  };

  // función para marcar/desmarcar como comprado
  const alternarComprado = (index) => {
    // usamos map para cambiar solo el producto correspondiente
    const nuevaLista = lista.map((item, i) =>
      i === index ? { ...item, comprado: !item.comprado } : item
    );
    setLista(nuevaLista);
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
        {/* recorremos la lista con map para renderizar los productos */}
        {lista.map((item, index) => (
          <li key={index}>
            {/* tachamos el texto si está marcado como comprado */}
            <span
              style={{ textDecoration: item.comprado ? 'line-through' : 'none', marginRight: '8px' }}
            >
              {item.nombre}
            </span>
            <button onClick={() => alternarComprado(index)}>
              {item.comprado ? 'Desmarcar' : 'Comprado'}
            </button>
            <button onClick={() => eliminarProducto(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
