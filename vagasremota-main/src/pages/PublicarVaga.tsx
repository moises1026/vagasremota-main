
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PublicarVaga = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobType, setJobType] = useState('');
  const [schedule, setSchedule] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally send this data to an API
    // For now, we'll just show the success dialog
    setShowSuccessDialog(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Button 
            variant="outline" 
            className="mb-6 flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
          
          <div className="glass-card p-8 rounded-2xl mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              Publicar nova vaga
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Título da vaga *
                </label>
                <Input
                  id="title"
                  placeholder="Ex: Desenvolvedor Front-end React"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Nome da empresa *
                </label>
                <Input
                  id="company"
                  placeholder="Ex: TechSolutions"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="jobType" className="block text-sm font-medium mb-2">
                    Tipo de contratação *
                  </label>
                  <Select value={jobType} onValueChange={setJobType} required>
                    <SelectTrigger id="jobType">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLT">CLT</SelectItem>
                      <SelectItem value="PJ">PJ</SelectItem>
                      <SelectItem value="Freelancer">Freelancer</SelectItem>
                      <SelectItem value="Estágio">Estágio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="schedule" className="block text-sm font-medium mb-2">
                    Jornada *
                  </label>
                  <Select value={schedule} onValueChange={setSchedule} required>
                    <SelectTrigger id="schedule">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Integral">Integral</SelectItem>
                      <SelectItem value="Meio período">Meio período</SelectItem>
                      <SelectItem value="Horário flexível">Horário flexível</SelectItem>
                      <SelectItem value="Por demanda">Por demanda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label htmlFor="salary" className="block text-sm font-medium mb-2">
                  Faixa salarial *
                </label>
                <Input
                  id="salary"
                  placeholder="Ex: R$ 5.000 - R$ 7.000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Descrição da vaga *
                </label>
                <Textarea
                  id="description"
                  placeholder="Descreva detalhes da vaga, responsabilidades, requisitos e benefícios"
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="remotando-button-primary w-full md:w-auto px-8 py-3 h-12 rounded-xl"
                >
                  Publicar vaga
                </Button>
              </div>
            </form>
          </div>
          
          <div className="border rounded-xl p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">Dicas para atrair os melhores candidatos</h2>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-remotando-600">✓</span>
                <span>Seja claro sobre as responsabilidades e requisitos da vaga</span>
              </li>
              <li className="flex gap-2">
                <span className="text-remotando-600">✓</span>
                <span>Mencione os benefícios oferecidos pela empresa</span>
              </li>
              <li className="flex gap-2">
                <span className="text-remotando-600">✓</span>
                <span>Informe a faixa salarial para atrair candidatos compatíveis</span>
              </li>
              <li className="flex gap-2">
                <span className="text-remotando-600">✓</span>
                <span>Descreva a cultura da empresa e as oportunidades de crescimento</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Vaga publicada com sucesso!</AlertDialogTitle>
            <AlertDialogDescription>
              Sua vaga foi publicada e já está disponível para candidaturas. 
              Você pode gerenciar esta e outras vagas no painel da sua empresa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => navigate('/vagas')}>
              Ver todas as vagas
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default PublicarVaga;
