import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const iniciarSesion = async () => {
    const res = await fetch('https://tu-auth-heroku.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, clave })
    });

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      router.push('/productos');
    } else {
      setError(data.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Inicio de Sesión</h2>
      <input placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} /><br/>
      <input placeholder="Clave" type="password" value={clave} onChange={e => setClave(e.target.value)} /><br/>
      <button onClick={iniciarSesion}>Ingresar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
