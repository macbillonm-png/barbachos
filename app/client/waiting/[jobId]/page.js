'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function WaitingPage() {
  const { jobId } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    const unsub = onSnapshot(doc(db, 'jobs', jobId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setJob(data);

        if (data.status === 'accepted_awaiting_payment') {
          router.push(`/client/checkout/${jobId}`);
        } else if (data.status === 'rejected') {
          alert('El trabajador rechazó la solicitud. Por favor intenta con otro.');
          router.push('/client');
        }
      }
    });

    return () => unsub();
  }, [jobId, router]);

  return (
    <div className="container min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in-up">
      <div className="glass-panel" style={{ padding: '4rem', maxWidth: '600px', width: '100%' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem', animation: 'pulse 2s infinite' }}>⏳</div>
        <h1 className="text-gradient-primary mb-4" style={{ fontSize: '2rem' }}>Petición Enviada</h1>
        <p className="text-muted text-lg mb-8">
          Estamos esperando a que {job?.workerName || 'el trabajador'} confirme disponibilidad para este trabajo. 
          Por favor no cierres esta pantalla.
        </p>

        <div className="flex gap-2 justify-center mb-6">
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-color)', animation: 'pulse 1s infinite 0.2s' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-color)', animation: 'pulse 1s infinite 0.4s' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-color)', animation: 'pulse 1s infinite 0.6s' }}></div>
        </div>

        <button className="btn btn-secondary text-sm" onClick={() => router.push('/client')}>
          Cancelar Petición
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse { 0% { transform: scale(0.9); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(0.9); opacity: 0.5; } }
      `}</style>
    </div>
  );
}
