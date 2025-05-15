import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    fetch('https://tu-servicio-railway.com/api/productos', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductos(data);
      }
    })
    .catch(() => setError('Error al cargar productos'));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Productos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {productos.map(p => (
          <li key={p.id}>{p.nombre} - ${p.precio}</li>
        ))}
      </ul>
    </div>
  );
}
