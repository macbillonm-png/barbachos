import Navbar from '@/components/Navbar';

export default function WorkerLayout({ children }) {
  return (
    <>
      <Navbar role="worker" />
      <main className="container main-content" style={{ padding: '2rem 1.5rem' }}>
        {children}
      </main>
    </>
  );
}
