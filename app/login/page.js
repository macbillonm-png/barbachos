'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/');
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error(error);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <div className="glass-panel w-full" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-6">Iniciar Sesión</h2>
        {error && <p className="text-center mb-4" style={{ color: 'var(--secondary-color)' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />
          <button type="submit" className="btn btn-primary mt-4">Entrar</button>
        </form>
        
        <p className="text-center mt-6 text-muted">
          ¿No tienes cuenta? <Link href="/register" style={{ color: 'var(--primary-color)' }}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
