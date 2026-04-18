'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [phone, setPhone] = useState('');
  const [docId, setDocId] = useState('');
  const [location, setLocation] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (role === 'worker' && !termsAccepted) {
      setError('Debes aceptar los términos y verificación de antecedentes.');
      return;
    }

    try {
      await signup(email, password, name, role, phone, docId, location);
      // Redirect based on role
      if (role === 'worker') {
        router.push('/worker');
      } else {
        router.push('/client');
      }
    } catch (error) {
      let errorMessage = 'Error al crear la cuenta. ';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage += 'Este correo ya está registrado.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage += 'La contraseña debe tener al menos 6 caracteres.';
      } else if (error.message.includes('Missing or insufficient permissions') || error.code === 'permission-denied') {
        errorMessage += 'Error de permisos. Asegúrate de haber creado la base de datos Firestore en "Modo de prueba".';
      } else {
        errorMessage += error.message;
      }
      setError(errorMessage);
      console.error("Firebase Error Detallado:", error);
    }
  };

  const inputStyle = { padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: 'white', width: '100%' };

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <div className="glass-panel w-full" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-6">Crear Cuenta</h2>
        {error && <p className="text-center mb-4" style={{ color: 'var(--secondary-color)', padding: '0.5rem', background: 'rgba(255,0,0,0.1)', borderRadius: '8px' }}>{error}</p>}
        
        <button 
          onClick={() => {
            setName('Trabajador Demo');
            setEmail(`demo${Math.floor(Math.random()*1000)}@test.com`);
            setPhone('3000000000');
            setPassword('123456');
            setRole('worker');
            setDocId('1000000000');
            setLocation('Bogotá, Chapinero');
            setTermsAccepted(true);
          }}
          type="button"
          className="w-full mb-6 p-2 rounded text-sm bg-blue-900/50 border border-blue-500 hover:bg-blue-800 transition-colors"
        >
          🤖 Rellenar con Datos de Prueba (Bypass)
        </button>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="mb-2">
            <p className="text-muted mb-2 text-sm font-bold">1. ¿Qué deseas hacer en Barbachos?</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg flex-1" style={{ borderColor: role === 'client' ? 'var(--primary-color)' : 'var(--border-color)', background: role === 'client' ? 'rgba(0, 230, 118, 0.1)' : 'transparent' }}>
                <input type="radio" name="role" value="client" checked={role === 'client'} onChange={() => setRole('client')} />
                Contratar
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg flex-1" style={{ borderColor: role === 'worker' ? 'var(--primary-color)' : 'var(--border-color)', background: role === 'worker' ? 'rgba(0, 230, 118, 0.1)' : 'transparent' }}>
                <input type="radio" name="role" value="worker" checked={role === 'worker'} onChange={() => setRole('worker')} />
                Trabajar
              </label>
            </div>
          </div>

          <p className="text-muted text-sm font-bold mt-2">2. Datos de Usuario</p>
          <input type="text" placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Teléfono / Celular" value={phone} onChange={(e) => setPhone(e.target.value)} required style={inputStyle} />
          <input type="password" placeholder="Contraseña (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
          
          {role === 'worker' && (
            <div className="flex flex-col gap-4 mt-2 animate-fade-in-up">
              <p className="text-muted text-sm font-bold">3. Verificación de Trabajador (Transparencia)</p>
              <input type="text" placeholder="Cédula de Ciudadanía (CC) / DNI" value={docId} onChange={(e) => setDocId(e.target.value)} required style={inputStyle} />
              <input type="text" placeholder="Ciudad y Dirección Residencia" value={location} onChange={(e) => setLocation(e.target.value)} required style={inputStyle} />
              
              <div>
                <label className="text-sm text-muted mb-1 block">Sube una foto de tu Documento (Frente y Reverso)</label>
                <input type="file" accept="image/*" style={inputStyle} />
                <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--text-muted)' }}>*Por el momento la subida de imagen está en fase beta, puedes dejarlo vacío.*</p>
              </div>

              <label className="flex items-start gap-2 cursor-pointer mt-2" style={{ fontSize: '0.85rem' }}>
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required style={{ marginTop: '0.2rem' }} />
                <span className="text-muted">Acepto los Términos de Servicio y autorizo a Barbachos a realizar una verificación de antecedentes penales y validar mi identidad para garantizar la seguridad de la comunidad.</span>
              </label>
            </div>
          )}

          <button type="submit" className="btn btn-primary mt-4" style={{ fontSize: '1.1rem', padding: '1rem' }}>
            {role === 'worker' ? 'Aplicar como Trabajador' : 'Crear mi Cuenta'}
          </button>
        </form>
        
        <p className="text-center mt-6 text-muted">
          ¿Ya tienes cuenta? <Link href="/login" style={{ color: 'var(--primary-color)' }}>Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
