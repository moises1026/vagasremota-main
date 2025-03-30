import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/useToast';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmail(formData.email, formData.password);
      navigate('/');
      toast({
        title: t.success.saved,
        description: 'Bem-vindo de volta!',
      });
    } catch (error) {
      toast({
        title: t.errors.unauthorized,
        description: 'E-mail ou senha incorretos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);

    try {
      await signInWithGoogle();
      navigate('/');
      toast({
        title: t.success.saved,
        description: 'Bem-vindo de volta!',
      });
    } catch (error) {
      toast({
        title: t.errors.unauthorized,
        description: 'Erro ao fazer login com Google.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{t.auth.signIn}</h1>
            <p className="text-muted-foreground">
              Entre com sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t.common.loading : t.auth.signIn}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <img
              src="/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            {t.auth.signInWithGoogle}
          </Button>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {t.auth.dontHaveAccount}{' '}
            </span>
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              {t.auth.register}
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
