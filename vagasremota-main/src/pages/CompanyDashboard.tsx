import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus } from 'lucide-react';
import type { Job, Application, Company } from '@/types/database';
import { getJobs, getCompany, checkPlanLimits } from '@/services/database';

export function CompanyDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [canCreateJob, setCanCreateJob] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Carregar dados da empresa
      if (user?.id) {
        const companyData = await getCompany(user.id);
        setCompany(companyData);
        
        // Verificar limites do plano
        const canCreate = await checkPlanLimits(user.id);
        setCanCreateJob(canCreate);
      }

      // Carregar vagas da empresa
      if (company?.id) {
        const jobsData = await getJobs(company.id);
        setJobs(jobsData.jobs);
      }

      // Carregar candidaturas
      // TODO: Implementar getApplicationsByCompany
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

  const handleCreateJob = () => {
    if (!canCreateJob) {
      toast({
        title: "Limite atingido",
        description: "Você atingiu o limite de vagas do seu plano. Faça upgrade para criar mais vagas.",
        variant: "destructive",
      });
      return;
    }
    // TODO: Implementar criação de vaga
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Painel da Empresa
          </h1>
          <Button onClick={handleCreateJob}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Vaga
          </Button>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">Minhas Vagas</TabsTrigger>
            <TabsTrigger value="applications">Candidaturas</TabsTrigger>
            <TabsTrigger value="plan">Plano</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{job.location}</span>
                      <span className="text-sm text-gray-500">{job.type}</span>
                      <span className="text-sm text-gray-500">
                        R$ {job.salary.min} - R$ {job.salary.max}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        job.status === 'active' ? 'bg-green-100 text-green-800' :
                        job.status === 'closed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status === 'active' ? 'Ativa' :
                         job.status === 'closed' ? 'Fechada' : 'Rascunho'}
                      </span>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      Ver Candidatos
                    </Button>
                  </div>
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
                        Candidato: {application.candidateId}
                      </p>
                      <p className="text-gray-600">
                        Status: {application.status}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Ver Currículo
                      </Button>
                      <Button variant="outline" size="sm">
                        Responder
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="plan">
            {company && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Plano Atual
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-medium">
                      {company.plan.type === 'basic' ? 'Básico' :
                       company.plan.type === 'pro' ? 'Pro' : 'Enterprise'}
                    </p>
                    <p className="text-gray-600">
                      Status: {company.plan.status === 'active' ? 'Ativo' : 'Inativo'}
                    </p>
                    <p className="text-gray-600">
                      Válido até: {new Date(company.plan.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Button>
                    Gerenciar Plano
                  </Button>
                </div>
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