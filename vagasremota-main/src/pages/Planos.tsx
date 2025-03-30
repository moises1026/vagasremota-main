
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type PlanFeature = {
  name: string;
  included: boolean;
};

type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
  recommended?: boolean;
  features: PlanFeature[];
  buttonText: string;
};

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Vagas Básicas',
    price: 0,
    description: 'Plano gratuito para pequenas empresas ou startups que querem testar a plataforma.',
    features: [
      { name: 'Publicação de 1 vaga por mês', included: true },
      { name: 'Acesso básico ao painel de controle', included: true },
      { name: 'Visibilidade padrão', included: true },
      { name: 'Cadastro manual de vagas', included: true },
      { name: 'Visualização das candidaturas', included: true },
      { name: 'Vagas destacadas', included: false },
      { name: 'Página de empresa personalizada', included: false },
      { name: 'Acesso a métricas avançadas', included: false },
      { name: 'Entrevistas por vídeo integradas', included: false },
      { name: 'API para cadastro automático', included: false },
    ],
    buttonText: 'Começar Grátis',
  },
  {
    id: 'basic',
    name: 'Vagas Essentials',
    price: 49,
    description: 'Ideal para pequenas empresas que desejam mais visibilidade e métricas básicas.',
    features: [
      { name: 'Publicação de até 5 vagas por mês', included: true },
      { name: 'Visibilidade destacada', included: true },
      { name: 'Página de empresa personalizada', included: true },
      { name: 'Métricas básicas', included: true },
      { name: 'Alertas de novas candidaturas', included: true },
      { name: 'Vagas ativas por 30 dias', included: true },
      { name: 'Entrevistas por vídeo integradas', included: false },
      { name: 'Feedback para candidatos', included: false },
      { name: 'Relatórios detalhados', included: false },
      { name: 'API para cadastro automático', included: false },
    ],
    buttonText: 'Assinar Plano',
  },
  {
    id: 'pro',
    name: 'Vagas Pro',
    price: 99,
    description: 'Para empresas de médio porte que buscam otimizar o recrutamento com mais funcionalidades.',
    recommended: true,
    features: [
      { name: 'Publicação de até 15 vagas por mês', included: true },
      { name: 'Vagas Premium (destaque na página inicial)', included: true },
      { name: 'Acesso a todos os filtros avançados', included: true },
      { name: 'Entrevistas por vídeo integradas', included: true },
      { name: 'Feedback para candidatos', included: true },
      { name: 'Relatórios detalhados', included: true },
      { name: 'Acesso ao painel completo de métricas', included: true },
      { name: 'Cadastro automático via API', included: true },
      { name: 'Personalização do layout', included: false },
      { name: 'Suporte dedicado', included: false },
    ],
    buttonText: 'Assinar Plano',
  },
  {
    id: 'enterprise',
    name: 'Empreendimento Vagas',
    price: 199,
    description: 'Solução completa para grandes empresas com alto volume de recrutamento.',
    features: [
      { name: 'Publicação ilimitada de vagas', included: true },
      { name: 'Vagas Premium com destaque máximo', included: true },
      { name: 'Sistema completo de recrutamento', included: true },
      { name: 'Análise detalhada de perfis', included: true },
      { name: 'Acesso a informações avançadas', included: true },
      { name: 'Integração completa via API', included: true },
      { name: 'Suporte dedicado e personalizado', included: true },
      { name: 'Personalização do layout', included: true },
      { name: 'Onboarding personalizado', included: true },
      { name: 'Prioridade no suporte', included: true },
    ],
    buttonText: 'Falar com Consultor',
  },
];

const Planos = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const navigate = useNavigate();
  
  const getPrice = (basePrice: number) => {
    if (billingCycle === 'annual') {
      const discountedPrice = basePrice * 10; // 10 months for annual (2 months free)
      return basePrice === 0 ? 0 : discountedPrice;
    }
    return basePrice;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Planos para Empresas
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para encontrar os melhores talentos remotos para sua empresa.
            </p>
            
            <div className="flex justify-center mt-8">
              <div className="bg-white border rounded-lg p-1 inline-flex">
                <button
                  className={`px-4 py-2 rounded-md transition-all ${
                    billingCycle === 'monthly' 
                      ? 'bg-remotando-500 text-white' 
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Mensal
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition-all flex items-center ${
                    billingCycle === 'annual' 
                      ? 'bg-remotando-500 text-white' 
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setBillingCycle('annual')}
                >
                  Anual
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                    Economize 2 meses
                  </Badge>
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`rounded-xl border bg-white p-6 flex flex-col transition-all ${
                  plan.recommended 
                    ? 'ring-2 ring-remotando-500 shadow-lg transform md:-translate-y-2' 
                    : 'hover:shadow-md'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="bg-remotando-500 text-white text-xs px-3 py-1 rounded-full">
                      Mais popular
                    </span>
                  </div>
                )}
                
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">{plan.name}</h2>
                  <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      {plan.price === 0 ? 'Grátis' : `R$ ${getPrice(plan.price)}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground ml-2">
                        /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                      </span>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={
                    plan.recommended 
                      ? "remotando-button-primary w-full"
                      : (plan.id === 'free' ? "bg-gray-100 hover:bg-gray-200 text-gray-800 w-full" : "w-full")
                  }
                  onClick={() => {
                    if (plan.id === 'enterprise') {
                      // For enterprise plan, redirect to contact form
                      navigate('/contato?plano=enterprise');
                    } else {
                      // For other plans, show payment flow
                      navigate('/publicar-vaga?plano=' + plan.id);
                    }
                  }}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-16 glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium">Posso mudar de plano a qualquer momento?</h3>
                <p className="text-muted-foreground">Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento, com o valor proporcional.</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Preciso fornecer cartão de crédito para o plano gratuito?</h3>
                <p className="text-muted-foreground">Não, o plano gratuito não requer informações de pagamento.</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Posso cancelar minha assinatura?</h3>
                <p className="text-muted-foreground">Você pode cancelar sua assinatura a qualquer momento, sem taxas adicionais.</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Como funciona o período de teste?</h3>
                <p className="text-muted-foreground">Oferecemos 7 dias de teste para todos os planos pagos, sem compromisso.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Planos;
