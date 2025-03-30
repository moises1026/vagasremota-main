
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Filter, X } from 'lucide-react';

export type FilterOptions = {
  experienceLevel?: string;
  contractType?: string;
  schedule?: string;
  location?: string;
  salaryRange?: [number, number];
  remote?: boolean;
}

type AdvancedFiltersProps = {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

const AdvancedFilters = ({ isOpen, onClose, onApplyFilters }: AdvancedFiltersProps) => {
  const [experienceLevel, setExperienceLevel] = useState('');
  const [contractType, setContractType] = useState('');
  const [schedule, setSchedule] = useState('');
  const [location, setLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([1000, 15000]);
  const [remote, setRemote] = useState(true);

  const handleReset = () => {
    setExperienceLevel('');
    setContractType('');
    setSchedule('');
    setLocation('');
    setSalaryRange([1000, 15000]);
    setRemote(true);
  };

  const handleApply = () => {
    onApplyFilters({
      experienceLevel,
      contractType,
      schedule,
      location,
      salaryRange,
      remote
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtros Avançados
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="experience-level">Nível de Experiência</Label>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger id="experience-level" className="mt-1">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="estagio">Estágio</SelectItem>
                <SelectItem value="junior">Júnior</SelectItem>
                <SelectItem value="pleno">Pleno</SelectItem>
                <SelectItem value="senior">Sênior</SelectItem>
                <SelectItem value="gerente">Gerente</SelectItem>
                <SelectItem value="diretor">Diretor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="contract-type">Tipo de Contrato</Label>
            <Select value={contractType} onValueChange={setContractType}>
              <SelectTrigger id="contract-type" className="mt-1">
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
            <Label htmlFor="schedule">Jornada</Label>
            <Select value={schedule} onValueChange={setSchedule}>
              <SelectTrigger id="schedule" className="mt-1">
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

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remote" 
              checked={remote} 
              onCheckedChange={(checked) => setRemote(checked as boolean)}
            />
            <Label htmlFor="remote">Mostrar apenas vagas remotas</Label>
          </div>

          <div>
            <Label htmlFor="location">Localização</Label>
            <Input 
              id="location" 
              placeholder="Cidade ou estado" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              className="mt-1"
              disabled={remote}
            />
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="salary">
              <AccordionTrigger>Faixa Salarial</AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 pb-6">
                  <Slider 
                    value={[salaryRange[0], salaryRange[1]]}
                    min={1000} 
                    max={30000} 
                    step={500}
                    onValueChange={(value) => setSalaryRange([value[0], value[1]])}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>R$ {salaryRange[0].toLocaleString('pt-BR')}</span>
                    <span>R$ {salaryRange[1].toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex justify-between pt-6 mt-6 border-t">
          <Button variant="outline" onClick={handleReset}>
            Limpar Filtros
          </Button>
          <Button onClick={handleApply} className="remotando-button-primary">
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
