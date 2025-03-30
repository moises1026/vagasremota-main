import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  getCandidateProfile,
  updateCandidateProfile,
  getCompany,
  updateCompany
} from '@/services/database';
import type { CandidateProfile, Company } from '@/types/database';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user } = useAuth();
  const { toast: useToastToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<CandidateProfile | Company | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      try {
        const candidateProfile = await getCandidateProfile(user.id);
        if (candidateProfile) {
          setProfile(candidateProfile);
        } else {
          const companyProfile = await getCompany(user.id);
          if (companyProfile) {
            setProfile(companyProfile);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        useToastToast({
          title: 'Erro',
          description: 'Não foi possível carregar seu perfil.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !user) return;

    try {
      setSaving(true);
      if ('skills' in profile) {
        await updateCandidateProfile(profile.id, profile as CandidateProfile);
      } else {
        await updateCompany(profile.id, profile as Company);
      }
      useToastToast({
        title: 'Sucesso',
        description: 'Perfil atualizado com sucesso!'
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      useToastToast({
        title: 'Erro',
        description: 'Não foi possível atualizar seu perfil.',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!profile) return;

    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  if (!profile || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Meu Perfil</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {('skills' in profile) ? (
                // Candidate Profile Form
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nome
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profile.phone || ''}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Localização
                    </label>
                    <Input
                      type="text"
                      id="location"
                      name="location"
                      value={profile.location || ''}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Biografia
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={profile.bio || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                      Habilidades
                    </label>
                    <Input
                      type="text"
                      id="skills"
                      name="skills"
                      value={profile.skills.join(', ')}
                      onChange={e => setProfile({
                        ...profile,
                        skills: e.target.value.split(',').map(s => s.trim())
                      })}
                      className="mt-1"
                      placeholder="Separe as habilidades por vírgula"
                    />
                  </div>
                </>
              ) : (
                // Company Profile Form
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nome da Empresa
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Descrição
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={profile.description}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <Input
                      type="url"
                      id="website"
                      name="website"
                      value={profile.website || ''}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Localização
                    </label>
                    <Input
                      type="text"
                      id="location"
                      name="location"
                      value={profile.location || ''}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                      Indústria
                    </label>
                    <Input
                      type="text"
                      id="industry"
                      name="industry"
                      value={profile.industry || ''}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                      Tamanho
                    </label>
                    <select
                      id="size"
                      name="size"
                      value={profile.size || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Selecione</option>
                      <option value="1-10">1-10 funcionários</option>
                      <option value="11-50">11-50 funcionários</option>
                      <option value="51-200">51-200 funcionários</option>
                      <option value="201-500">201-500 funcionários</option>
                      <option value="501-1000">501-1000 funcionários</option>
                      <option value="1000+">1000+ funcionários</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="founded" className="block text-sm font-medium text-gray-700">
                      Ano de Fundação
                    </label>
                    <Input
                      type="number"
                      id="founded"
                      name="founded"
                      value={profile.founded || ''}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
} 