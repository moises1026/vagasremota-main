import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { JobCard } from "@/components/JobCard"
import { useJobs } from "@/hooks/useJobs"

export default function Home() {
  const { t } = useLanguage()
  const { jobs, loading } = useJobs()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Encontre as Melhores Vagas Remotas no Brasil
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Conecte-se com empresas que valorizam o trabalho remoto e encontre sua próxima oportunidade
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">Começar Agora</Button>
          <Button size="lg" variant="outline">
            Saiba Mais
          </Button>
        </div>
      </section>

      {/* Search Section */}
      <section className="mb-12">
        <Card className="p-6">
          <div className="flex gap-4">
            <Input
              placeholder="Buscar vagas por título, empresa ou localização"
              className="flex-1"
            />
            <Button>Buscar</Button>
          </div>
        </Card>
      </section>

      {/* Featured Jobs */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Vagas em Destaque</h2>
        {loading ? (
          <div className="text-center">{t.common.loading}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Por que escolher o Vagas Remota?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Vagas Exclusivas</h3>
            <p className="text-muted-foreground">
              Acesso a vagas remotas de empresas brasileiras e internacionais
            </p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Processo Simplificado</h3>
            <p className="text-muted-foreground">
              Candidatura rápida e fácil para as vagas que você deseja
            </p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Suporte Dedicado</h3>
            <p className="text-muted-foreground">
              Equipe especializada para ajudar em sua jornada profissional
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Pronto para encontrar sua próxima oportunidade?
        </h2>
        <p className="text-muted-foreground mb-8">
          Junte-se a milhares de profissionais que já encontraram seu trabalho dos sonhos
        </p>
        <Button size="lg">Criar Conta Gratuita</Button>
      </section>
    </div>
  )
} 