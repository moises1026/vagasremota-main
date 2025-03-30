
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Faq = () => {
  const candidateQuestions = [
    {
      question: "Como criar um perfil?",
      answer: "Para criar um perfil, clique em 'Cadastrar-se' no menu superior, preencha suas informações pessoais, adicione experiências, habilidades e configure suas preferências de trabalho remoto."
    },
    {
      question: "O uso da plataforma é gratuito?",
      answer: "Sim, para candidatos o uso da plataforma é totalmente gratuito. Você pode se cadastrar, buscar vagas e se candidatar sem nenhum custo."
    },
    {
      question: "Posso editar minha candidatura?",
      answer: "Não. Uma vez enviada a candidatura, não é possível editá-la. Certifique-se de que todas as informações estão corretas antes de enviar."
    },
    {
      question: "Como funcionam os alertas de vagas?",
      answer: "Após criar seu perfil, você pode configurar alertas baseados em seus interesses e preferências. Você receberá notificações por e-mail quando novas vagas compatíveis forem publicadas."
    },
    {
      question: "Como me destaco entre outros candidatos?",
      answer: "Complete 100% do seu perfil, adicione um vídeo de apresentação, conecte suas redes profissionais e mantenha seu currículo atualizado com palavras-chave relevantes para sua área."
    }
  ];

  const companyQuestions = [
    {
      question: "Como publicar uma vaga?",
      answer: "Após criar o perfil da empresa, acesse 'Publicar Vaga' no seu painel, preencha todas as informações solicitadas sobre a vaga, configure a duração e visibilidade, e finalize a publicação."
    },
    {
      question: "Como cancelar meu plano?",
      answer: "Você pode cancelar seu plano a qualquer momento acessando 'Configurações > Plano e Pagamentos' no seu painel administrativo. O plano permanecerá ativo até o final do período já pago."
    },
    {
      question: "Quantos currículos posso visualizar?",
      answer: "O número de currículos que você pode visualizar depende do seu plano. No plano Grátis, você pode ver até 10 currículos. Nos planos pagos, o acesso é ilimitado."
    },
    {
      question: "Como destaco minha vaga?",
      answer: "Para destacar sua vaga, escolha os planos Profissional ou Premium ao publicá-la. Vagas destacadas aparecem no topo das buscas e recebem destaque visual."
    },
    {
      question: "Posso editar uma vaga já publicada?",
      answer: "Sim, você pode editar qualquer vaga publicada através do seu painel administrativo. Acesse 'Minhas Vagas', encontre a vaga desejada e clique em 'Editar'."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Perguntas Frequentes</h1>
          <p className="text-muted-foreground mb-8">Respostas para as dúvidas mais comuns sobre a plataforma.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Para Candidatos</h2>
              <Accordion type="single" collapsible className="bg-card rounded-md shadow-sm">
                {candidateQuestions.map((item, index) => (
                  <AccordionItem key={index} value={`candidate-${index}`}>
                    <AccordionTrigger className="px-4">{item.question}</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Para Empresas</h2>
              <Accordion type="single" collapsible className="bg-card rounded-md shadow-sm">
                {companyQuestions.map((item, index) => (
                  <AccordionItem key={index} value={`company-${index}`}>
                    <AccordionTrigger className="px-4">{item.question}</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="mt-12 bg-slate-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Ainda tem dúvidas?</h2>
            <p className="mb-4">
              Se você não encontrou a resposta para sua pergunta, entre em contato conosco através de 
              um de nossos canais de atendimento.
            </p>
            <p className="text-remotando-600">
              Email: contato@vagasremota.com.br | Atendimento: Segunda a sexta, 9h às 18h
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
