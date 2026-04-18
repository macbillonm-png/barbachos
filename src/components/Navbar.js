'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, userRole, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="app-header">
      <div className="container nav-container">
        <Link href="/" className="logo">
          Barbachos<span style={{ color: 'var(--primary-color)' }}>.</span>
        </Link>
        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              {userRole === 'client' && (
                <Link href="/client" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                  Explorar Servicios
                </Link>
              )}
              {userRole === 'worker' && (
                <Link href="/worker" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                  Mi Panel
                </Link>
              )}
              <span className="text-muted text-sm ml-2">{user.email}</span>
              <button onClick={handleLogout} className="text-sm text-gradient-primary ml-2" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ fontSize: '0.9rem' }}>Ingresar</Link>
              <Link href="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Crear Cuenta</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
