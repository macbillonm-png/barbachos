import Link from 'next/link';

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in-up">
      <div style={{ maxWidth: '800px', zIndex: 10 }}>
        
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.2)', borderRadius: '100px', marginBottom: '2rem', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' }}>
          ✨ LA NUEVA GENERACIÓN DE SERVICIOS
        </div>
        
        <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', marginBottom: '1.5rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          Conecta con el <br />
          <span className="text-gradient-primary">Futuro del Trabajo.</span>
        </h1>
        
        <p className="text-muted" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
          La plataforma más avanzada para encontrar profesionales verificados o empezar a generar ingresos hoy mismo.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/register" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>
            Quiero empezar ahora
          </Link>
          
          <Link href="/login" className="btn btn-secondary" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem', background: 'transparent' }}>
            Ya tengo una cuenta
          </Link>
        </div>

      </div>
    </div>
  );
}
