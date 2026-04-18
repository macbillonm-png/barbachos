import Link from 'next/link';

export default function ServiceCard({ category }) {
  return (
    <Link href={`/client/category/${category.id}`} className="glass-panel text-center animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s', cursor: 'pointer' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{category.icon}</div>
      <h3 className="mb-2">{category.name}</h3>
      <p className="text-muted" style={{ fontSize: '0.9rem' }}>{category.description}</p>
    </Link>
  );
}
