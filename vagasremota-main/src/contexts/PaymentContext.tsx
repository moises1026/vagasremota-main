import { createContext, useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentContextType {
  createPaymentIntent: (amount: number, paymentMethod: 'card' | 'pix') => Promise<void>;
  loading: boolean;
  error: string | null;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentIntent = async (amount: number, paymentMethod: 'card' | 'pix') => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao processar pagamento');
      }

      if (paymentMethod === 'card') {
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe não inicializado');

        const { error: stripeError } = await stripe.confirmCardPayment(data.clientSecret);
        if (stripeError) throw new Error(stripeError.message);
      } else if (paymentMethod === 'pix') {
        // Implementar lógica de PIX aqui
        // Por exemplo, mostrar QR code ou redirecionar para página de PIX
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider value={{ createPaymentIntent, loading, error }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment deve ser usado dentro de um PaymentProvider');
  }
  return context;
} 