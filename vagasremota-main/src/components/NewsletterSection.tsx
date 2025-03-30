
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, informe seu e-mail');
      return;
    }
    
    if (!isValidEmail(email)) {
      toast.error('Por favor, informe um e-mail válido');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('E-mail cadastrado com sucesso!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Simple email validation
  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-remotando-50/30">
      <div className="container mx-auto max-w-3xl">
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Quer receber as melhores vagas diretas no seu e-mail?
            </h2>
            <p className="text-muted-foreground">
              Cadastre-se gratuitamente e receba vagas remotas selecionadas para o seu perfil.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="h-12 flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="remotando-button-primary h-12 px-8 rounded-xl" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cadastrando...' : 'Assinar'}
            </Button>
          </form>
          
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Receba novidades, vagas e dicas exclusivas sobre trabalho remoto.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
