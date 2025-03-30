
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const jobs = [
  {
    id: 1,
    title: 'Designer Gráfico Remoto (PJ)',
    company: 'Agência Criativa',
    location: 'Remoto',
    schedule: 'Horário flexível',
    type: 'PJ',
    logo: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Desenvolvedor(a) Front-end React',
    company: 'TechSolutions',
    location: 'Remoto',
    schedule: 'Integral',
    type: 'CLT',
    logo: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Social Media Manager',
    company: 'Marketing Digital Ltda',
    location: 'Remoto',
    schedule: 'Horário flexível',
    type: 'PJ',
    logo: '/placeholder.svg'
  },
  {
    id: 4,
    title: 'Analista de Suporte Técnico',
    company: 'TechHelp',
    location: 'Remoto',
    schedule: 'Integral',
    type: 'CLT',
    logo: '/placeholder.svg'
  }
];

const FeaturedJobs = () => {
  const navigate = useNavigate();
  
  const handleJobClick = (jobId: number) => {
    navigate(`/vagas/${jobId}`);
  };
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Vagas em Destaque
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          As melhores oportunidades remotas selecionadas para você. Atualizadas diariamente.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job, index) => (
            <div 
              key={job.id} 
              className="job-card animate-fade-in cursor-pointer hover:shadow-md transition-all border rounded-lg p-4"
              style={{ '--index': index } as React.CSSProperties}
              onClick={() => handleJobClick(job.id)}
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded bg-remotando-100 mr-3 flex items-center justify-center">
                  <img src={job.logo} alt={job.company} className="w-6 h-6" />
                </div>
                <span className="text-sm text-muted-foreground">{job.company}</span>
              </div>
              
              <h3 className="text-lg font-medium mb-3">{job.title}</h3>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{job.schedule}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{job.type}</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/vagas/${job.id}`);
                  }}
                >
                  Ver vaga
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="remotando-button-primary px-8 py-3 rounded-xl" asChild>
            <Link to="/vagas">Ver todas as vagas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
