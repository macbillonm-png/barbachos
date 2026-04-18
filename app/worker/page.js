'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'; 
import { db } from '@/lib/firebase';

export default function WorkerDashboard() {
  const { user, userRole } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('requests'); // requests, agenda, earnings, portfolio

  useEffect(() => {
    if (!user || !isOnline) return;

    // Listen to real jobs targeted at this worker (or broadcasted, but we'll stick to targeted for now)
    // In a real app we'd get the worker's own docId from the profile. 
    // Here we use mockWorkers IDs, but wait, the client sends workerId (which is e.g., 'w1'). 
    // For the demo to work, we'll listen to ALL pending jobs and assume the worker can see them.
    const q = query(collection(db, 'jobs'), where('status', '==', 'pending'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pendingJobs = [];
      snapshot.forEach((doc) => {
        pendingJobs.push({ id: doc.id, ...doc.data() });
      });
      setRequests(pendingJobs);
    });

    return () => unsubscribe();
  }, [user, isOnline]);

  const acceptRequest = async (id) => {
    try {
      await updateDoc(doc(db, 'jobs', id), {
        status: 'accepted_awaiting_payment'
      });
      alert('¡Trabajo aceptado! El cliente debe pagar el 50% para confirmar la cita.');
    } catch(err) {
      console.error(err);
      alert('Error aceptando trabajo');
    }
  };

  const rejectRequest = async (id) => {
    try {
      await updateDoc(doc(db, 'jobs', id), {
        status: 'rejected'
      });
    } catch(err) {
      console.error(err);
    }
  };

  if (!user) return <div className="p-8 text-center">Cargando perfil...</div>;

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Hola, {user.email.split('@')[0]} 👋</h1>
          <p className="text-muted">Panel de Control Profesional</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '50px' }}>
          <span style={{ fontWeight: 'bold', paddingLeft: '1rem', color: isOnline ? 'var(--primary-color)' : 'var(--text-muted)' }}>
            {isOnline ? 'EN LÍNEA' : 'DESCONECTADO'}
          </span>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`btn ${isOnline ? 'btn-danger' : 'btn-primary'}`}
            style={{ borderRadius: '50px', padding: '0.8rem 2rem', background: isOnline ? 'var(--secondary-color)' : 'var(--primary-color)', color: '#000' }}
          >
            {isOnline ? 'Desconectarse' : 'Conectarse'}
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-4 mb-6 border-b" style={{ borderColor: 'var(--border-color)', overflowX: 'auto' }}>
        {['requests', 'agenda', 'earnings', 'portfolio'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '1rem', 
              background: 'none', 
              border: 'none', 
              borderBottom: activeTab === tab ? '2px solid var(--primary-color)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--primary-color)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              textTransform: 'capitalize'
            }}
          >
            {tab === 'requests' ? 'Solicitudes' : tab === 'earnings' ? 'Ganancias' : tab === 'portfolio' ? 'Portafolio' : 'Agenda & Chat'}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        
        {/* TAB: REQUESTS */}
        {activeTab === 'requests' && (
          <div className="glass-panel w-full">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: isOnline ? 'var(--primary-color)' : 'var(--text-muted)', display: 'inline-block', boxShadow: isOnline ? '0 0 10px var(--primary-color)' : 'none' }}></span>
              Radar de Solicitudes
            </h2>
            
            {!isOnline && <p className="text-muted text-center py-8">Conéctate para empezar a recibir alertas de trabajos cercanos.</p>}
            {isOnline && requests.length === 0 && (
              <div className="text-center py-8">
                <div style={{ display: 'inline-block', animation: 'pulse 2s infinite', fontSize: '2rem', marginBottom: '1rem' }}>📡</div>
                <p className="text-muted">Escuchando solicitudes en tu zona...</p>
              </div>
            )}

            {requests.map(req => (
              <div key={req.id} style={{ background: 'var(--surface-color-light)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', borderLeft: '4px solid var(--primary-color)' }} className="animate-fade-in-up flex flex-col md:flex-row justify-between gap-4">
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Nuevo Trabajo: {req.clientEmail || 'Cliente'}</h3>
                  <p className="text-muted text-sm mb-2">📍 {req.address || 'Buscando Ubicación...'} ({req.distance || (Math.random() * 5 + 0.5).toFixed(1)} km)</p>
                  <p style={{ fontSize: '0.95rem' }}>"{req.description || 'Necesito tu servicio lo antes posible. Es urgente.'}"</p>
                </div>
                <div className="flex flex-col gap-2 min-w-[150px]">
                  <button onClick={() => acceptRequest(req.id)} className="btn btn-primary">Aceptar (Cobrar 50%)</button>
                  <button onClick={() => rejectRequest(req.id)} className="btn btn-secondary" style={{ background: 'transparent' }}>Rechazar</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: AGENDA & CHAT */}
        {activeTab === 'agenda' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel">
              <h3 className="mb-4">📅 Próximas Citas</h3>
              <p className="text-muted text-center py-4">No tienes citas agendadas. Acepta solicitudes para empezar.</p>
              {/* Mock appointment */}
              <div className="p-4 rounded-lg mt-2" style={{ background: 'rgba(0,184,212,0.1)', border: '1px solid var(--secondary-color)' }}>
                <div className="flex justify-between mb-1">
                  <strong>Visita a Doña Marta</strong>
                  <span className="text-secondary-color">Mañana, 10:00 AM</span>
                </div>
                <p className="text-sm text-muted">Mantenimiento general (Cliente recurrente)</p>
              </div>
            </div>
            <div className="glass-panel flex flex-col">
              <h3 className="mb-4">💬 Mensajes Recientes</h3>
              <div className="flex-1 border rounded-lg p-4 flex flex-col items-center justify-center text-center text-muted" style={{ borderColor: 'var(--border-color)', minHeight: '200px' }}>
                <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>✉️</span>
                <p>El chat se activará automáticamente cuando aceptes un trabajo.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: EARNINGS */}
        {activeTab === 'earnings' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-6">
              <div className="glass-panel text-center" style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.1), transparent)' }}>
                <p className="text-muted mb-2">Balance Disponible</p>
                <h2 className="text-gradient-primary" style={{ fontSize: '3rem' }}>$0.00</h2>
                <button className="btn btn-primary mt-4 w-full">Retirar Dinero</button>
              </div>
              
              <div className="glass-panel" style={{ background: 'linear-gradient(135deg, var(--surface-color-light), var(--surface-color))' }}>
                <h3 className="mb-2 text-gradient">🎁 Recompensas por Lealtad</h3>
                <p className="text-sm text-muted mb-4">¡Completa 50 trabajos y llévate un set de herramientas profesional nuevo! Tu próxima meta: Un smartphone.</p>
                <div className="flex gap-1 mb-2">
                  <div style={{ flex: 1, height: '8px', background: 'var(--primary-color)', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1, height: '8px', background: 'var(--primary-color)', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                </div>
                <p className="text-xs text-right text-muted">20 / 50 trabajos completados</p>
              </div>
            </div>
            
            <div className="glass-panel md:col-span-2">
              <h3 className="mb-4">Historial de Transacciones</h3>
              <div className="text-center py-8 text-muted border-dashed border-2 rounded-lg" style={{ borderColor: 'var(--border-color)' }}>
                Aún no tienes movimientos.
              </div>
            </div>
          </div>
        )}

        {/* TAB: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="glass-panel">
            <div className="flex justify-between items-center mb-6">
              <h3>Mis Trabajos Realizados</h3>
              <button className="btn btn-secondary text-sm">+ Añadir Foto</button>
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
              <div className="aspect-square rounded-lg flex items-center justify-center border-dashed border-2 cursor-pointer hover:bg-white/5" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-4xl text-muted">+</span>
              </div>
              <div className="aspect-square rounded-lg bg-gray-800 flex items-center justify-center">
                <span className="text-sm text-muted">Ejemplo 1</span>
              </div>
              <div className="aspect-square rounded-lg bg-gray-800 flex items-center justify-center">
                <span className="text-sm text-muted">Ejemplo 2</span>
              </div>
            </div>
            <p className="text-sm text-muted mt-6 mt-4">Un buen portafolio aumenta tus posibilidades de ser contratado hasta un 80%.</p>
          </div>
        )}

      </div>

      <style jsx>{`
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
