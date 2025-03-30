
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Check, AlertTriangle, Wrench, FileText, Settings, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Termos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">📄 Termos de Uso — VagasRemota</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bem-vindo(a) à VagasRemota! Estes Termos estabelecem regras e diretrizes para a utilização de nossa plataforma.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-muted-foreground mb-8">
              Estes Termos de Uso estabelecem regras e diretrizes para a utilização de nossa plataforma por candidatos, empresas e visitantes. 
              Ao acessar ou utilizar qualquer funcionalidade do site, você concorda com as condições descritas abaixo.
            </p>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">1. Aceitação dos Termos</h2>
                    <p className="text-muted-foreground">
                      Ao se cadastrar ou utilizar qualquer funcionalidade da plataforma VagasRemota, o usuário declara estar de acordo com os presentes Termos de Uso. 
                      Caso não concorde com algum item, o uso da plataforma não é permitido.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">2. Cadastro e Responsabilidades</h2>
                    <p className="text-muted-foreground mb-3">
                      O usuário compromete-se a fornecer informações corretas, atualizadas e verdadeiras no momento do cadastro e durante o uso da plataforma.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      O acesso ao contato é de uso pessoal e intransferível. É responsabilidade do usuário manter seus dados de login em sigilo.
                    </p>
                    <p className="text-muted-foreground">
                      Candidatos e empresas são responsáveis ​​pelo conteúdo que publicam (vagas, currículos, mensagens, comentários, entre outros).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">3. Uso Indevido da Plataforma</h2>
                    <p className="text-muted-foreground mb-2">É expressamente proibido:</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Publicar vagas falsas, enganosas, que envolvem esquemas de pirâmide, marketing multinível ou promessas não realistas.</li>
                      <li>Compartilhar ou solicitar informações confidenciais como dados bancários ou documentos pessoais sem finalidade clara e segura.</li>
                      <li>Utilização de linguagem operacional, preconceituosa, discriminatória ou inapropriada em qualquer área da plataforma.</li>
                      <li>Praticar atos ilícitos, violar leis, normas éticas ou direitos de terceiros, incluindo propriedade intelectual.</li>
                      <li>Tentar acessar áreas restritas ou realizar qualquer tentativa de fraude ou ataque à segurança da plataforma.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">4. Penalidades e Exclusão de Conta</h2>
                    <p className="text-muted-foreground mb-2">A VagasRemota se reserva o direito de, a qualquer momento e sem aviso prévio:</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Suspender perfis temporariamente que estão sob análise por descumprimento das regras.</li>
                      <li>Remover ou excluir definitivamente contas que apresentem comportamento abusivo, fraudulento ou ilegal.</li>
                      <li>Cancelar vagas ou conteúdos publicados que infrinjam os Termos de Uso ou prejudiquem a experiência de outros usuários.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Settings className="h-6 w-6 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">5. Modificações nos Termos</h2>
                    <p className="text-muted-foreground">
                      A VagasRemota pode atualizar estes Termos de Uso a qualquer momento. Recomendamos que os usuários revisem esta seção periodicamente. 
                      O uso contínuo da plataforma após qualquer alteração constitui aceitação das novas condições.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Mail className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">6. Contato e Suporte</h2>
                    <p className="text-muted-foreground">
                      Em caso de dúvidas sobre os Termos de Uso ou se precisar de ajuda, entre em contato pelo e-mail:
                    </p>
                    <p className="text-remotando-600 font-medium mt-2">
                      📧 contato@vagasremota.com.br
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Termos;
