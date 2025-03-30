import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      'jobAlert.name': 'Nome do Alerta',
      'jobAlert.frequency': 'Frequência',
      'jobAlert.frequency.daily': 'Diário',
      'jobAlert.frequency.weekly': 'Semanal',
      'jobAlert.frequency.realtime': 'Tempo Real',
      'jobAlert.notifications': 'Notificações',
      'jobAlert.notifications.email': 'Email',
      'jobAlert.notifications.push': 'Push',
      'jobAlert.save': 'Salvar',
      'jobAlert.cancel': 'Cancelar',
      'advancedSearch.keywords': 'Palavras-chave',
      'advancedSearch.jobType': 'Tipo de Vaga',
      'advancedSearch.jobType.remote': 'Remoto',
      'advancedSearch.jobType.hybrid': 'Híbrido',
      'advancedSearch.jobType.onsite': 'Presencial',
      'advancedSearch.experience': 'Experiência',
      'advancedSearch.experience.junior': 'Júnior',
      'advancedSearch.experience.mid': 'Pleno',
      'advancedSearch.experience.senior': 'Sênior',
      'advancedSearch.experience.lead': 'Líder',
      'advancedSearch.experience.manager': 'Gerente',
      'advancedSearch.salary': 'Faixa Salarial',
      'advancedSearch.location': 'Localização',
      'advancedSearch.reset': 'Limpar',
      'advancedSearch.search': 'Buscar',
      'advancedSearch.save': 'Salvar Busca',
      'advancedSearch.createAlert': 'Criar Alerta',
    },
  },
  en: {
    translation: {
      'jobAlert.name': 'Alert Name',
      'jobAlert.frequency': 'Frequency',
      'jobAlert.frequency.daily': 'Daily',
      'jobAlert.frequency.weekly': 'Weekly',
      'jobAlert.frequency.realtime': 'Real-time',
      'jobAlert.notifications': 'Notifications',
      'jobAlert.notifications.email': 'Email',
      'jobAlert.notifications.push': 'Push',
      'jobAlert.save': 'Save',
      'jobAlert.cancel': 'Cancel',
      'advancedSearch.keywords': 'Keywords',
      'advancedSearch.jobType': 'Job Type',
      'advancedSearch.jobType.remote': 'Remote',
      'advancedSearch.jobType.hybrid': 'Hybrid',
      'advancedSearch.jobType.onsite': 'On-site',
      'advancedSearch.experience': 'Experience',
      'advancedSearch.experience.junior': 'Junior',
      'advancedSearch.experience.mid': 'Mid-level',
      'advancedSearch.experience.senior': 'Senior',
      'advancedSearch.experience.lead': 'Lead',
      'advancedSearch.experience.manager': 'Manager',
      'advancedSearch.salary': 'Salary Range',
      'advancedSearch.location': 'Location',
      'advancedSearch.reset': 'Reset',
      'advancedSearch.search': 'Search',
      'advancedSearch.save': 'Save Search',
      'advancedSearch.createAlert': 'Create Alert',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 