import { categories, mockWorkers } from '@/lib/data';
import WorkerCard from '@/components/WorkerCard';
import Link from 'next/link';

export default async function CategoryPage({ params }) {
  const { id } = await params;
  const category = categories.find(c => c.id === id);
  
  // Filter workers who offer this service
  const availableWorkers = mockWorkers.filter(w => w.categoryId === id);

  if (!category) {
    return <div className="text-center py-20"><h2>Categoría no encontrada</h2></div>;
  }

  return (
    <div className="animate-fade-in-up">
      <Link href="/client" className="text-muted mb-6 inline-block hover:text-white transition-colors" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        ← Volver a categorías
      </Link>
      
      <div className="glass-panel mb-8 text-center" style={{ padding: '3rem 2rem', background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(0, 212, 255, 0.05))', borderTop: '2px solid var(--primary-color)' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.3))' }}>{category.icon}</div>
        <h1 className="text-gradient-primary mb-2" style={{ fontSize: '3rem' }}>{category.name}s Disponibles</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>Profesionales en tu zona, listos para trabajar ahora mismo.</p>
      </div>

      <div className="flex justify-between items-center mb-6 border-b pb-4" style={{ borderColor: 'var(--glass-border)' }}>
        <h3 style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>{availableWorkers.length} {availableWorkers.length === 1 ? 'profesional encontrado' : 'profesionales encontrados'}</h3>
        <select className="glass-panel" style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', outline: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>
          <option value="nearest">Más Cercanos (Recomendado)</option>
          <option value="rating">Mejor Calificados</option>
          <option value="price">Menor Precio</option>
        </select>
      </div>
      
      {availableWorkers.length === 0 ? (
        <div className="glass-panel text-center py-12">
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📭</span>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No hay profesionales en línea en este momento.</p>
          <p className="text-muted">Intenta volver a buscar en unos minutos.</p>
        </div>
      ) : (
        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {availableWorkers.map((worker, index) => (
            <div key={worker.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in-up">
              <WorkerCard worker={worker} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
