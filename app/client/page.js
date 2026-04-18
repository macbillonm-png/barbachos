import { categories } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';
import Link from 'next/link';

export default function ClientPage() {
  return (
    <div className="flex flex-col gap-12">
      
      {/* Hero Section */}
      <section className="glass-panel text-center animate-fade-in-up" style={{ padding: '3rem 2rem', background: 'linear-gradient(135deg, rgba(0,230,118,0.1), rgba(0,184,212,0.1))' }}>
        <h1 className="text-gradient-primary mb-2" style={{ fontSize: '3rem' }}>¿Qué necesitas resolver hoy?</h1>
        <p className="text-muted text-xl">Encuentra a los mejores profesionales de confianza, verificados y listos para trabajar.</p>
        
        <div className="mt-8 flex justify-center gap-4">
          <input type="text" placeholder="Buscar un servicio (ej. Plomero, Niñera)..." style={{ padding: '1rem', width: '100%', maxWidth: '400px', borderRadius: '12px', border: '1px solid var(--primary-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
          <button className="btn btn-primary" style={{ borderRadius: '12px' }}>Buscar</button>
        </div>
      </section>

      <div className="grid gap-8" style={{ gridTemplateColumns: '3fr 1fr' }}>
        
        {/* Left Column: Categories & History */}
        <div className="flex flex-col gap-10">
          
          {/* Categories */}
          <section>
            <h2 className="mb-6 flex items-center gap-2"><span style={{ color: 'var(--primary-color)' }}>●</span> Categorías Populares</h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {categories.map((category, index) => (
                <div key={category.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in-up">
                  <ServiceCard category={category} />
                </div>
              ))}
            </div>
          </section>

          {/* History */}
          <section>
            <h2 className="mb-6 flex items-center gap-2"><span style={{ color: 'var(--secondary-color)' }}>●</span> Historial de Servicios</h2>
            <div className="glass-panel">
              <p className="text-muted text-center py-6">Aún no has solicitado ningún servicio. ¡Busca un profesional arriba para empezar!</p>
              {/* Here we will map real history from Firestore later */}
            </div>
          </section>

        </div>

        {/* Right Column: News & Rewards */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel" style={{ borderTop: '4px solid var(--primary-color)' }}>
            <h3 className="mb-4">🏆 Mejores Trabajadores del Mes</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>
                <span>1. Carlos M. (Plomería)</span>
                <span className="text-gradient-primary font-bold">5.0 ⭐</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>
                <span>2. Luisa F. (Limpieza)</span>
                <span className="text-gradient-primary font-bold">4.9 ⭐</span>
              </div>
              <div className="flex items-center justify-between">
                <span>3. Ana S. (Niñera)</span>
                <span className="text-gradient-primary font-bold">4.8 ⭐</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ background: 'linear-gradient(135deg, var(--surface-color-light), var(--surface-color))' }}>
            <h3 className="mb-2 text-gradient">🎟️ Eventos Especiales</h3>
            <p className="text-sm text-muted mb-4">¡Participa en el sorteo de esta semana! Pide 2 servicios antes del viernes y entra a ganar una limpieza profunda de hogar gratis.</p>
            <button className="btn btn-secondary w-full text-sm" style={{ padding: '0.5rem' }}>Ver detalles del evento</button>
          </div>
        </div>

      </div>
    </div>
  );
}
