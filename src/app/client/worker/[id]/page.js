'use client';

import { useState } from 'react';
import { mockWorkers, categories } from '@/lib/data';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function WorkerProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const worker = mockWorkers.find(w => w.id === id);
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestJob = async () => {
    if (!user) {
      alert("Debes iniciar sesión para pedir un servicio");
      router.push('/login');
      return;
    }
    
    setIsRequesting(true);
    try {
      const docRef = await addDoc(collection(db, 'jobs'), {
        clientId: user.uid,
        clientEmail: user.email,
        workerId: worker.id,
        workerName: worker.name,
        categoryId: worker.categoryId,
        status: 'pending',
        pricePerHour: worker.pricePerHour,
        createdAt: serverTimestamp()
      });
      alert('¡Solicitud enviada! Serás redirigido para esperar la confirmación del trabajador.');
      router.push('/client/waiting/' + docRef.id);
    } catch (error) {
      console.error("Error asking for job:", error);
      alert('Hubo un error al conectar con el servidor.');
    } finally {
      setIsRequesting(false);
    }
  };

  if (!worker) {
    return <div className="text-center py-20"><h2>Perfil no encontrado</h2></div>;
  }

  const category = categories.find(c => c.id === worker.categoryId);

  return (
    <div className="animate-fade-in-up container" style={{ maxWidth: '800px', paddingBottom: '100px' }}>
      
      <Link href={`/client/category/${worker.categoryId}`} className="text-muted mb-6 inline-block hover:text-white transition-colors" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        ← Volver a {category?.name || 'la categoría'}
      </Link>

      {/* Hero Profile Section */}
      <div className="glass-panel text-center flex flex-col items-center relative overflow-hidden" style={{ padding: '3rem 2rem', marginBottom: '2rem', borderTop: '4px solid var(--primary-color)' }}>
        
        {/* Glow Background */}
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', background: 'var(--primary-color)', filter: 'blur(100px)', opacity: '0.2', zIndex: 0 }}></div>

        <div style={{ position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--surface-color-light), var(--surface-color))', border: '2px solid var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'var(--text-color)', boxShadow: '0 0 30px rgba(0, 255, 136, 0.3)' }}>
            {worker.name.charAt(0)}
          </div>
          <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: worker.isOnline ? 'var(--success-color)' : 'var(--text-muted)', border: '4px solid var(--bg-color)', boxShadow: worker.isOnline ? '0 0 15px var(--success-color)' : 'none' }}></div>
        </div>

        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', zIndex: 1 }} className="text-gradient-primary">{worker.name}</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', zIndex: 1, marginBottom: '1rem' }}>
          {category?.icon} {category?.name} Profesional
        </p>

        {worker.isOnline && (
          <div style={{ background: 'rgba(0, 255, 136, 0.1)', color: 'var(--primary-color)', padding: '0.3rem 1rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid var(--primary-color)', zIndex: 1 }}>
            🟢 DISPONIBLE AHORA
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel text-center" style={{ padding: '1.5rem 1rem' }}>
          <p className="text-muted mb-1 text-sm">Tarifa</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }} className="text-gradient-primary">${worker.pricePerHour}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/hr</span></p>
        </div>
        <div className="glass-panel text-center" style={{ padding: '1.5rem 1rem' }}>
          <p className="text-muted mb-1 text-sm">Trabajos</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{worker.completedJobs}</p>
        </div>
        <div className="glass-panel text-center" style={{ padding: '1.5rem 1rem' }}>
          <p className="text-muted mb-1 text-sm">Calificación</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700' }}>⭐ {worker.rating.toFixed(1)}</p>
        </div>
        <div className="glass-panel text-center" style={{ padding: '1.5rem 1rem' }}>
          <p className="text-muted mb-1 text-sm">Distancia</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Cerca</p>
        </div>
      </div>

      {/* Bio */}
      <div className="glass-panel mb-8">
        <h3 className="mb-4 text-gradient">Sobre Mí</h3>
        <p style={{ lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>
          {worker.bio} <br/><br/>
          Siempre garantizo puntualidad y limpieza en mi área de trabajo. Mi prioridad es tu satisfacción total con el servicio prestado. Si tienes dudas, puedes escribirme a través del Asistente de IA o de mi chat directo.
        </p>
      </div>

      {/* Instagram-style Portfolio */}
      <div className="mb-8">
        <h3 className="mb-4 flex items-center gap-2">📸 Mi Portafolio de Trabajos</h3>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {[1, 2, 3, 4, 5, 6].map((img) => (
            <div key={img} className="aspect-square rounded-lg" style={{ background: 'var(--surface-color)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s', overflow: 'hidden' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <span style={{ fontSize: '2rem', opacity: 0.5 }}>🏗️</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-12">
        <h3 className="mb-4">⭐ Reseñas Recientes ({worker.reviewsCount})</h3>
        <div className="flex flex-col gap-4">
          {worker.recentReviews?.map((review, i) => (
            <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div className="flex justify-between mb-2">
                <strong>{review.author}</strong>
                <span style={{ color: '#FFD700' }}>{'⭐'.repeat(review.rating)}</span>
              </div>
              <p className="text-muted" style={{ fontStyle: 'italic' }}>"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="glass-panel" style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 2rem)', maxWidth: '800px', display: 'flex', gap: '1rem', padding: '1rem', zIndex: 100, boxShadow: '0 20px 50px rgba(0,0,0,0.8)', border: '1px solid var(--primary-color)' }}>
        <button className="btn btn-secondary" style={{ flex: 1, padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
          <span>💬</span> Chat & Asistente IA
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleRequestJob}
          disabled={!worker.isOnline || isRequesting}
          style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', opacity: (!worker.isOnline || isRequesting) ? 0.5 : 1 }}
        >
          {isRequesting ? 'Enviando...' : (worker.isOnline ? 'Solicitar Servicio Ahora' : 'No Disponible')}
        </button>
      </div>

    </div>
  );
}
