import { useState } from 'react';
import { usePayment } from '@/contexts/PaymentContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const plans = [
  {
    id: 'basic',
    name: 'Básico',
    price: 49.90,
    features: [
      'Até 5 vagas ativas',
      'Acesso a candidatos',
      'Suporte por email',
      'Relatórios básicos'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99.90,
    features: [
      'Vagas ilimitadas',
      'Acesso a candidatos',
      'Suporte prioritário',
      'Relatórios avançados',
      'Destaque nas vagas'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199.90,
    features: [
      'Vagas ilimitadas',
      'Acesso a candidatos',
      'Suporte 24/7',
      'Relatórios personalizados',
      'Destaque nas vagas',
      'API de integração'
    ]
  }
];

export function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const { createPaymentIntent, loading, error } = usePayment();
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!selectedPlan) {
      toast({
        title: "Selecione um plano",
        description: "Por favor, escolha um plano antes de prosseguir com o pagamento.",
        variant: "destructive",
      });
      return;
    }

    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    try {
      await createPaymentIntent(plan.price, paymentMethod);
      toast({
        title: "Pagamento processado!",
        description: "Seu plano foi ativado com sucesso.",
      });
    } catch (err) {
      toast({
        title: "Erro no pagamento",
        description: error || "Não foi possível processar o pagamento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Escolha o plano ideal para sua empresa
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Selecione o plano que melhor atende às suas necessidades
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`p-6 rounded-lg shadow-lg ${
                selectedPlan === plan.id
                  ? 'border-2 border-indigo-500'
                  : 'border border-gray-200'
              }`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-4xl font-extrabold text-gray-900">
                  R$ {plan.price.toFixed(2)}
                  <span className="text-base font-medium text-gray-500">/mês</span>
                </p>
              </div>

              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="ml-3 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => setSelectedPlan(plan.id)}
                className={`mt-8 w-full ${
                  selectedPlan === plan.id
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {selectedPlan === plan.id ? 'Selecionado' : 'Selecionar'}
              </Button>
            </Card>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-12 max-w-md mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Método de pagamento
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                    Cartão de crédito
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pix"
                    name="payment"
                    value="pix"
                    checked={paymentMethod === 'pix'}
                    onChange={() => setPaymentMethod('pix')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor="pix" className="ml-3 block text-sm font-medium text-gray-700">
                    PIX
                  </label>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={loading}
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Pagar agora'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 