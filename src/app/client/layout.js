import Navbar from '@/components/Navbar';

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar role="client" />
      <main className="container main-content" style={{ padding: '2rem 1.5rem' }}>
        {children}
      </main>
    </>
  );
}
