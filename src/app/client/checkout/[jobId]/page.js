'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function CheckoutPage() {
  const { jobId } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      const docSnap = await getDoc(doc(db, 'jobs', jobId));
      if (docSnap.exists()) {
        setJob({ id: docSnap.id, ...docSnap.data() });
      } else {
        alert("Trabajo no encontrado");
        router.push('/client');
      }
    };
    fetchJob();
  }, [jobId, router]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Selecciona un método de pago.');
      return;
    }
    setIsProcessing(true);

    // Simulando el procesamiento del pago (API de MercadoPago / Stripe / BinancePay)
    setTimeout(async () => {
      try {
        await updateDoc(doc(db, 'jobs', jobId), {
          status: 'paid_confirmed',
          paymentMethod: paymentMethod
        });
        alert('¡Pago exitoso! El trabajador va en camino.');
        router.push('/client'); // En una app real, llevaría a un panel de seguimiento de mapa
      } catch (err) {
        console.error(err);
        alert('Error procesando el pago. Intenta de nuevo.');
      } finally {
        setIsProcessing(false);
      }
    }, 2500); // 2.5s simulando carga con banco
  };

  if (!job) return <div className="text-center py-20 animate-pulse">Conectando con la pasarela bancaria...</div>;

  const fiftyPercent = (job.pricePerHour * 0.5).toFixed(2);

  return (
    <div className="container max-w-2xl py-12 animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-gradient-primary">Pasarela de Pagos</h1>
        <p className="text-muted">Paga el 50% para asegurar y confirmar la cita con tu profesional.</p>
      </div>

      <div className="glass-panel mb-8 p-6">
        <h3 className="mb-4 text-xl">Resumen de la Orden</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted">Servicio:</span>
          <strong>{job.workerName} ({job.categoryId})</strong>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted">Tarifa Total:</span>
          <strong>${job.pricePerHour}</strong>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <span className="text-lg">Anticipo (50%):</span>
          <span className="text-2xl font-bold text-success-color">${fiftyPercent}</span>
        </div>
      </div>

      <h3 className="mb-4">Selecciona tu método de pago</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <PaymentCard 
          id="card" 
          title="Tarjeta Crédito/Débito" 
          icon="💳" 
          desc="Visa, Mastercard, Amex" 
          selected={paymentMethod} 
          onClick={setPaymentMethod} 
        />
        <PaymentCard 
          id="wallet" 
          title="Billeteras Digitales" 
          icon="📱" 
          desc="Nequi, DaviPlata, etc." 
          selected={paymentMethod} 
          onClick={setPaymentMethod} 
        />
        <PaymentCard 
          id="crypto" 
          title="Criptomonedas" 
          icon="₿" 
          desc="Binance Pay / USDT" 
          selected={paymentMethod} 
          onClick={setPaymentMethod} 
        />
      </div>

      {paymentMethod === 'card' && (
        <div className="glass-panel mb-8 p-4 animate-fade-in-up">
          <input type="text" placeholder="Número de la tarjeta" className="w-full bg-black/50 border border-gray-700 rounded p-3 mb-3 text-white" />
          <div className="flex gap-3">
            <input type="text" placeholder="MM/AA" className="w-1/2 bg-black/50 border border-gray-700 rounded p-3 text-white" />
            <input type="text" placeholder="CVC" className="w-1/2 bg-black/50 border border-gray-700 rounded p-3 text-white" />
          </div>
        </div>
      )}

      {paymentMethod === 'wallet' && (
        <div className="glass-panel mb-8 p-4 animate-fade-in-up">
          <p className="text-muted mb-3 text-center">Selecciona tu billetera digital:</p>
          <div className="flex gap-4 justify-center mb-4">
            <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
              <input type="radio" name="subwallet" value="nequi" defaultChecked />
              <span style={{ color: '#E10098', fontWeight: 'bold' }}>Nequi</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
              <input type="radio" name="subwallet" value="daviplata" />
              <span style={{ color: '#E1251B', fontWeight: 'bold' }}>DaviPlata</span>
            </label>
          </div>
          <div className="text-center">
            <p className="text-muted mb-3 text-sm">Ingresa tu número de celular registrado y recibirás una notificación PUSH para aceptar el cobro de <strong>${fiftyPercent}</strong>.</p>
            <input type="tel" placeholder="3XX XXX XXXX" className="w-full max-w-xs bg-black/50 border border-gray-700 rounded p-3 text-white text-center text-xl tracking-widest mx-auto block" />
          </div>
        </div>
      )}

      {paymentMethod === 'crypto' && (
        <div className="glass-panel mb-8 p-4 text-center animate-fade-in-up">
          <p className="text-muted mb-3">Escanea este código QR desde tu app de Binance o cualquier wallet compatible con la red TRC20/BEP20.</p>
          <div className="mx-auto bg-white p-4 rounded-lg inline-block">
             <div style={{ width: '150px', height: '150px', backgroundImage: 'url(https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=usdt:TXc...&color=000)', backgroundSize: 'cover' }}></div>
          </div>
        </div>
      )}

      <button 
        className="btn btn-primary w-full p-4 text-xl flex justify-center items-center gap-3"
        onClick={handlePayment}
        disabled={isProcessing || !paymentMethod}
        style={{ opacity: (isProcessing || !paymentMethod) ? 0.5 : 1 }}
      >
        {isProcessing ? (
          <>
            <span style={{ animation: 'spin 1s linear infinite' }}>🔄</span> Procesando encriptación bancaria...
          </>
        ) : (
          `Pagar ${fiftyPercent} de forma Segura 🔒`
        )}
      </button>

      <div className="text-center mt-4">
        <p className="text-xs text-muted">Tus pagos están protegidos con cifrado militar (AES-256) y respaldados por la tecnología Web3.</p>
      </div>

    </div>
  );
}

function PaymentCard({ id, title, icon, desc, selected, onClick }) {
  const isSelected = selected === id;
  return (
    <div 
      onClick={() => onClick(id)}
      className="glass-panel cursor-pointer transition-all"
      style={{ 
        padding: '1.5rem 1rem', 
        border: isSelected ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
        background: isSelected ? 'rgba(0, 255, 136, 0.1)' : 'var(--surface-color)',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isSelected ? '0 0 20px rgba(0, 255, 136, 0.2)' : 'none'
      }}
    >
      <div className="flex items-center gap-4">
        <span style={{ fontSize: '2rem' }}>{icon}</span>
        <div>
          <h4 style={{ margin: 0, color: isSelected ? 'var(--primary-color)' : 'white' }}>{title}</h4>
          <p className="text-xs text-muted" style={{ margin: 0 }}>{desc}</p>
        </div>
      </div>
    </div>
  );
}
