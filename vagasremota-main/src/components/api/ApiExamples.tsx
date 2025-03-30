import { useLanguage } from "@/hooks/useLanguage"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ApiExamples() {
  const { t } = useLanguage()

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{t("api.examples")}</h2>
          <p className="text-muted-foreground">
            {t("api.examples.description")}
          </p>
        </div>

        <Tabs defaultValue="jobs">
          <TabsList>
            <TabsTrigger value="jobs">{t("api.examples.jobs")}</TabsTrigger>
            <TabsTrigger value="candidates">
              {t("api.examples.candidates")}
            </TabsTrigger>
            <TabsTrigger value="companies">
              {t("api.examples.companies")}
            </TabsTrigger>
            <TabsTrigger value="interviews">
              {t("api.examples.interviews")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {t("api.examples.jobs.title")}
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium">{t("api.examples.jobs.list")}</p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Listar vagas
const response = await fetch('https://api.vagasremota.com.br/api/jobs', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">{t("api.examples.jobs.create")}</p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Criar uma vaga
const response = await fetch('https://api.vagasremota.com.br/api/jobs', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Desenvolvedor Full Stack',
    description: 'Buscamos um desenvolvedor...',
    type: 'remote',
    level: 'senior',
    location: 'Brasil',
    salary: {
      min: 8000,
      max: 12000
    },
    skills: ['React', 'Node.js', 'TypeScript'],
    requirements: ['Experiência com...'],
    benefits: ['Plano de saúde', 'Vale refeição']
  })
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">{t("api.examples.jobs.update")}</p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Atualizar uma vaga
const response = await fetch('https://api.vagasremota.com.br/api/jobs/123', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Desenvolvedor Full Stack Senior',
    salary: {
      min: 10000,
      max: 15000
    }
  })
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">{t("api.examples.jobs.delete")}</p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Deletar uma vaga
const response = await fetch('https://api.vagasremota.com.br/api/jobs/123', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {t("api.examples.candidates.title")}
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium">
                    {t("api.examples.candidates.list")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Listar candidatos
const response = await fetch('https://api.vagasremota.com.br/api/candidates', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.examples.candidates.create")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Criar um candidato
const response = await fetch('https://api.vagasremota.com.br/api/candidates', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '+55 11 99999-9999',
    location: 'São Paulo',
    bio: 'Desenvolvedor Full Stack...',
    skills: [
      {
        name: 'React',
        level: 'advanced',
        yearsOfExperience: 3
      }
    ],
    languages: [
      {
        name: 'Português',
        level: 'native'
      }
    ],
    experience: [
      {
        company: 'Tech Corp',
        position: 'Desenvolvedor Full Stack',
        startDate: '2020-01-01',
        description: 'Desenvolvimento de...',
        skills: ['React', 'Node.js']
      }
    ],
    education: [
      {
        institution: 'Universidade XYZ',
        degree: 'Bacharel em Ciência da Computação',
        field: 'Ciência da Computação',
        startDate: '2015-01-01',
        endDate: '2019-12-31'
      }
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/joao',
      github: 'https://github.com/joao'
    },
    availability: {
      remote: true,
      hybrid: true,
      onsite: false
    },
    salary: {
      expected: {
        min: 8000,
        max: 12000
      }
    }
  })
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.examples.candidates.update")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Atualizar um candidato
const response = await fetch('https://api.vagasremota.com.br/api/candidates/123', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    salary: {
      expected: {
        min: 10000,
        max: 15000
      }
    }
  })
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.examples.candidates.delete")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Deletar um candidato
const response = await fetch('https://api.vagasremota.com.br/api/candidates/123', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="companies" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {t("api.examples.companies.title")}
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium">
                    {t("api.examples.companies.list")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Listar empresas
const response = await fetch('https://api.vagasremota.com.br/api/companies', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.examples.companies.create")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Criar uma empresa
const response = await fetch('https://api.vagasremota.com.br/api/companies', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Tech Corp',
    logo: 'https://example.com/logo.png',
    cover: 'https://example.com/cover.png',
    description: 'Empresa de tecnologia...',
    mission: 'Nossa missão é...',
    vision: 'Nossa visão é...',
    values: ['Inovação', 'Qualidade'],
    website: 'https://techcorp.com.br',
    industry: 'Tecnologia',
    size: '51-200',
    foundedYear: 2015,
    location: {
      address: 'Rua XYZ, 123',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      remote: true,
      hybrid: true,
      onsite: true
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: true,
      lifeInsurance: true,
      disabilityInsurance: true,
      retirementPlan: true,
      paidTimeOff: true,
      maternityLeave: true,
      paternityLeave: true,
      flexibleHours: true,
      remoteWork: true,
      professionalDevelopment: true,
      gymMembership: true,
      other: ['Vale refeição', 'Vale transporte']
    },
    culture: {
      workStyle: 'Agile',
      teamStructure: 'Squads',
      communicationStyle: 'Direta',
      workLifeBalance: 'Flexível'
    },
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techcorp',
      instagram: 'https://instagram.com/techcorp',
      facebook: 'https://facebook.com/techcorp',
      twitter: 'https://twitter.com/techcorp',
      youtube: 'https://youtube.com/techcorp'
    }
  })
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.examples.companies.update")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Atualizar uma empresa
const response = await fetch('https://api.vagasremota.com.br/api/companies/123', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    size: '201-500',
    benefits: {
      ...company.benefits,
      gymMembership: true
    }
  })
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.examples.companies.delete")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Deletar uma empresa
const response = await fetch('https://api.vagasremota.com.br/api/companies/123', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {t("api.examples.interviews.title")}
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium">
                    {t("api.examples.interviews.list")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Listar entrevistas
const response = await fetch('https://api.vagasremota.com.br/api/interviews', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.examples.interviews.create")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Criar uma entrevista
const response = await fetch('https://api.vagasremota.com.br/api/interviews', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    jobId: '123',
    candidateId: '456',
    interviewerId: '789',
    type: 'technical',
    status: 'scheduled',
    scheduledAt: '2024-03-20T14:00:00Z',
    duration: 60,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    meetingPassword: '123456',
    requirements: [
      'Discussão sobre experiência técnica',
      'Resolução de problemas'
    ],
    questions: [
      'Como você lida com conflitos?',
      'Qual sua experiência com arquitetura de software?'
    ],
    isRecorded: true,
    isPrivate: false
  })
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.examples.interviews.update")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Atualizar uma entrevista
const response = await fetch('https://api.vagasremota.com.br/api/interviews/123', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    status: 'completed',
    completedAt: new Date().toISOString(),
    feedback: {
      rating: 4,
      strengths: ['Boa comunicação', 'Conhecimento técnico'],
      weaknesses: ['Pouca experiência com cloud'],
      notes: 'Candidato tem potencial...',
      recommendation: 'hire',
      technicalScore: 4,
      communicationScore: 5,
      problemSolvingScore: 4,
      culturalFitScore: 5,
      isShared: true
    }
  })
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.examples.interviews.delete")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`// Deletar uma entrevista
const response = await fetch('https://api.vagasremota.com.br/api/interviews/123', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const data = await response.json();`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
} 