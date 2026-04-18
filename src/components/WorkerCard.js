'use client';

export default function WorkerCard({ worker }) {
  // Use a deterministic calculation for distance to avoid Next.js hydration mismatch errors
  const distance = worker.distance || ((worker.name.length % 5) + 0.5).toFixed(1);

  return (
    <div className="glass-panel flex flex-col justify-between" style={{ padding: '1.5rem', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', height: '100%' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 136, 0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)'; }}>
      
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3 items-center" style={{ position: 'relative' }} 
               onMouseEnter={() => document.getElementById(`popover-${worker.id}`).style.opacity = '1'}
               onMouseLeave={() => document.getElementById(`popover-${worker.id}`).style.opacity = '0'}>
            
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => window.location.href = `/client/worker/${worker.id}`}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--surface-color-light), var(--surface-color))', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--primary-color)' }}>
                {worker.name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: worker.isOnline ? 'var(--success-color)' : 'var(--text-muted)', border: '2px solid var(--bg-color)', boxShadow: worker.isOnline ? '0 0 10px var(--success-color)' : 'none' }}></div>
            </div>
            
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => window.location.href = `/client/worker/${worker.id}`} className="hover:text-primary transition-colors">
                {worker.name}
                {worker.rating >= 4.8 && <span style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem', background: 'rgba(0, 255, 136, 0.1)', color: 'var(--primary-color)', borderRadius: '100px', border: '1px solid var(--primary-color)' }}>TOP</span>}
              </h3>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.1rem' }}>📍 a {distance} km de ti</p>
            </div>

            {/* MINI BURBUJA DE PERFIL (FACEBOOK STYLE) */}
            <div id={`popover-${worker.id}`} className="glass-panel" style={{ 
              position: 'absolute', top: '100%', left: '0', zIndex: 50, marginTop: '10px', width: '250px', 
              padding: '1rem', opacity: 0, pointerEvents: 'none', transition: 'opacity 0.2s',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)', border: '1px solid var(--primary-color)'
            }}>
              <div className="flex items-center gap-3 mb-2">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface-color)' }} className="flex items-center justify-center font-bold text-primary">{worker.name.charAt(0)}</div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', margin: 0 }}>{worker.name}</h4>
                  <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0 }}>Profesional Verificado</p>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{worker.bio}</p>
              <button className="btn btn-secondary w-full" style={{ padding: '0.5rem', fontSize: '0.8rem', pointerEvents: 'auto' }} onClick={() => window.location.href = `/client/worker/${worker.id}`}>
                Ver Perfil Completo
              </button>
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div className="text-gradient-primary" style={{ fontSize: '1.2rem', fontWeight: '900' }}>
              ${worker.pricePerHour}<span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/hr</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mb-3 text-sm text-muted">
          <span className="text-gradient-primary font-bold" style={{ filter: 'drop-shadow(0 0 2px rgba(0,255,136,0.5))' }}>⭐ {worker.rating.toFixed(1)}</span>
          <span>({worker.reviewsCount} reseñas)</span>
          <span>•</span>
          <span>{worker.completedJobs} trabajos</span>
        </div>
        
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', lineHeight: '1.5' }}>{worker.bio}</p>
      </div>
      
      <div>
        {worker.recentReviews && worker.recentReviews.length > 0 && (
          <div style={{ marginBottom: '1.5rem', padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '2px solid var(--secondary-color)' }}>
            <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
              "{worker.recentReviews[0].text}" <br/><span style={{ fontSize: '0.75rem', opacity: 0.7 }}>— {worker.recentReviews[0].author}</span>
            </div>
          </div>
        )}

        <button className="btn w-full" style={{ padding: '0.8rem', fontSize: '0.95rem', background: worker.isOnline ? 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' : 'rgba(255,255,255,0.1)', color: worker.isOnline ? '#000' : 'var(--text-muted)' }}>
          {worker.isOnline ? 'Solicitar Servicio' : 'No Disponible'}
        </button>
      </div>
    </div>
  );
}
