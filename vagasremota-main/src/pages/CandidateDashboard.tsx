import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { Application, Job, CandidateProfile } from '@/types/database';
import { getJobs, createApplication } from '@/services/database';

export function CandidateDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Carregar vagas disponíveis
      const jobsData = await getJobs('all');
      setJobs(jobsData.jobs);

      // Carregar candidaturas do usuário
      // TODO: Implementar getApplicationsByCandidate

      // Carregar perfil do candidato
      // TODO: Implementar getCandidateProfile
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar as informações do dashboard.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId: string) => {
    try {
      await createApplication({
        jobId,
        candidateId: user!.id,
        companyId: jobs.find(j => j.id === jobId)?.companyId || '',
        status: 'pending'
      });

      toast({
        title: "Candidatura realizada!",
        description: "Sua candidatura foi enviada com sucesso.",
      });

      loadDashboardData();
    } catch (error) {
      toast({
        title: "Erro ao candidatar",
        description: "Não foi possível enviar sua candidatura. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Painel do Candidato
        </h1>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">Vagas Disponíveis</TabsTrigger>
            <TabsTrigger value="applications">Minhas Candidaturas</TabsTrigger>
            <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600 mt-1">{job.companyId}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{job.location}</span>
                      <span className="text-sm text-gray-500">{job.type}</span>
                      <span className="text-sm text-gray-500">
                        R$ {job.salary.min} - R$ {job.salary.max}
                      </span>
                    </div>
                  </div>
                  <Button onClick={() => handleApply(job.id)}>
                    Candidatar-se
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="applications">
            <div className="space-y-4">
              {applications.map((application) => (
                <Card key={application.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {jobs.find(j => j.id === application.jobId)?.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Status: {application.status}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            {profile ? (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Meu Perfil
                </h2>
                {/* TODO: Implementar formulário de edição de perfil */}
              </Card>
            ) : (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Criar Perfil
                </h2>
                {/* TODO: Implementar formulário de criação de perfil */}
              </Card>
            )}
          </TabsContent>

          <TabsContent value="messages">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Mensagens
              </h2>
              {/* TODO: Implementar chat */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 