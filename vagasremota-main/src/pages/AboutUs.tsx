import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Sobre o Vagas Remota
          </h1>

          <Tabs defaultValue="about" className="mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
              <TabsTrigger value="about">Quem Somos</TabsTrigger>
              <TabsTrigger value="terms">Termos de Uso</TabsTrigger>
              <TabsTrigger value="privacy">Privacidade</TabsTrigger>
              <TabsTrigger value="contact">Contato</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Quem Somos</h2>
                  <p className="mb-4">
                    O Vagas Remota nasceu com o propósito de transformar o acesso ao mercado de trabalho remoto no Brasil. 
                    Somos uma plataforma 100% voltada para oportunidades de emprego remoto, conectando talentos a empresas 
                    que valorizam a flexibilidade, produtividade e diversidade.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">O Que Fazemos</h2>
                  <p className="mb-4">
                    Facilitamos o encontro entre profissionais diferentes e empresas modernas que oferecem vagas home office 
                    ou híbridas, permitindo que o talento esteja onde ele quiser estar.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Por Que Existimos</h2>
                  <p className="mb-4">
                    Acreditamos que o trabalho remoto é o presente e o futuro. Criamos uma ponte entre empresas e candidatos 
                    que buscam essa realidade.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Nossos Diferenciais</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Foco exclusivo em vagas remotas.</li>
                    <li>Plataforma intuitiva para candidatos e empresas.</li>
                    <li>Planos acessíveis e gratuitos.</li>
                    <li>Conteúdo e suporte para contribuição em sua carreira.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="terms" className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Aceitação dos Termos</h2>
                  <p className="mb-4">
                    Ao utilizar a plataforma VagasRemota, você concorda com os termos aqui descritos.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Cadastro e Responsabilidades</h2>
                  <p className="mb-4">
                    O usuário compromete-se a fornecer informações verdadeiras e manter sua conta segura. 
                    Candidatos e empresas são responsáveis ​​pelos dados publicados.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Uso Adequado</h2>
                  <p className="mb-4">É proibido:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Publicar vagas falsas ou enganosas.</li>
                    <li>Utilizar linguagem ofensiva.</li>
                    <li>Violar leis ou direitos de terceiros.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Suspensão ou Exclusão</h2>
                  <p className="mb-4">
                    A plataforma reserva-se o direito de suspender ou remover perfis que violam as regras de uso.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Coleta de Dados</h2>
                  <p className="mb-4">
                    Coletamos apenas as informações possíveis: nome, e-mail, CPF (se necessário), 
                    currículo e preferências de trabalho.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Uso das Informações</h2>
                  <p className="mb-4">Seus dados são utilizados para:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encontrar vagas compatíveis.</li>
                    <li>Melhorar sua experiência.</li>
                    <li>Comunicar oportunidades.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Compartilhamento</h2>
                  <p className="mb-4">
                    Nunca vendemos seus dados. Compartilhamos apenas com empresas para as quais você se candidatou.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Seus Direitos</h2>
                  <p className="mb-4">
                    Você pode editar ou excluir seus dados a qualquer momento, de acordo com a LGPD.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Como Falar Conosco</h2>
                  <p className="mb-6">
                    Tem alguma dúvida, sugestão ou encontrou algum erro na plataforma? Entre em contato pelos canais abaixo:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <MessageSquare className="w-5 h-5 mr-3 text-remotando-500 mt-1" />
                      <div>
                        <h3 className="font-medium">Formulário</h3>
                        <p className="text-sm text-muted-foreground">
                          Preencha o formulário e responderemos em até 24h úteis.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mr-3 text-remotando-500 mt-1" />
                      <div>
                        <h3 className="font-medium">E-mail</h3>
                        <p className="text-sm text-muted-foreground">
                          contato@vagasremota.com.br
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Instagram className="w-5 h-5 mr-3 text-remotando-500 mt-1" />
                      <div>
                        <h3 className="font-medium">Instagram</h3>
                        <p className="text-sm text-muted-foreground">
                          @vagasremota
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Linkedin className="w-5 h-5 mr-3 text-remotando-500 mt-1" />
                      <div>
                        <h3 className="font-medium">LinkedIn</h3>
                        <p className="text-sm text-muted-foreground">
                          VagasRemota
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Facebook className="w-5 h-5 mr-3 text-remotando-500 mt-1" />
                      <div>
                        <h3 className="font-medium">Facebook</h3>
                        <p className="text-sm text-muted-foreground">
                          VagasRemota
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Suporte ao Cliente</h2>
                  <p className="mb-4">
                    Disponível de segunda a sexta, das 9h às 18h.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Outros Recursos</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">🔍 Buscar Vagas</h3>
                  <p className="text-muted-foreground mb-4">Encontre sua vaga ideal com filtros avançados.</p>
                  <Link to="/vagas" className="text-remotando-600 hover:underline">Explorar vagas</Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">🧑‍💼 Criar Perfil</h3>
                  <p className="text-muted-foreground mb-4">Destaque seu talento para empresas remotas.</p>
                  <Link to="/cadastro" className="text-remotando-600 hover:underline">Cadastrar-se</Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">🏢 Publicar Vagas</h3>
                  <p className="text-muted-foreground mb-4">Publique vagas remotas em minutos.</p>
                  <Link to="/publicar-vaga" className="text-remotando-600 hover:underline">Publicar vaga</Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">💳 Planos e Preços</h3>
                  <p className="text-muted-foreground mb-4">Conheça os planos disponíveis para empresas.</p>
                  <Link to="/planos" className="text-remotando-600 hover:underline">Ver planos</Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">❓ FAQ</h3>
                  <p className="text-muted-foreground mb-4">Respostas para as dúvidas mais frequentes.</p>
                  <Link to="/faq" className="text-remotando-600 hover:underline">Ver perguntas frequentes</Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">💡 Dicas de Carreira</h3>
                  <p className="text-muted-foreground mb-4">Conteúdo para turbinar sua jornada remota.</p>
                  <Link to="/dicas" className="text-remotando-600 hover:underline">Ver dicas</Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
