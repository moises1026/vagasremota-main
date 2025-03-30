import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

interface SubscriptionPlansProps {
  onSelectPlan: (plan: string) => void
  currentPlan?: string
}

export function SubscriptionPlans({
  onSelectPlan,
  currentPlan,
}: SubscriptionPlansProps) {
  const { t } = useLanguage()

  const plans = [
    {
      id: "free",
      name: t("subscription.free.name"),
      price: t("subscription.free.price"),
      description: t("subscription.free.description"),
      features: [
        "Até 5 vagas ativas",
        "Busca básica",
        "Perfil da empresa",
        "Candidatos básicos",
        "Suporte por email",
      ],
    },
    {
      id: "basic",
      name: t("subscription.basic.name"),
      price: t("subscription.basic.price"),
      description: t("subscription.basic.description"),
      features: [
        "Até 20 vagas ativas",
        "Busca avançada",
        "Perfil da empresa completo",
        "Candidatos detalhados",
        "Suporte prioritário",
        "Métricas básicas",
        "API básica",
      ],
    },
    {
      id: "pro",
      name: t("subscription.pro.name"),
      price: t("subscription.pro.price"),
      description: t("subscription.pro.description"),
      features: [
        "Vagas ilimitadas",
        "Busca inteligente",
        "Perfil da empresa premium",
        "Candidatos premium",
        "Suporte VIP",
        "Métricas avançadas",
        "API completa",
        "Integrações",
        "Análise de candidatos",
        "Relatórios personalizados",
      ],
    },
    {
      id: "enterprise",
      name: t("subscription.enterprise.name"),
      price: t("subscription.enterprise.price"),
      description: t("subscription.enterprise.description"),
      features: [
        "Vagas ilimitadas",
        "Busca inteligente",
        "Perfil da empresa enterprise",
        "Candidatos enterprise",
        "Suporte dedicado",
        "Métricas enterprise",
        "API enterprise",
        "Integrações customizadas",
        "Análise avançada",
        "Relatórios enterprise",
        "Treinamento",
        "Consultoria",
        "SLA garantido",
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`p-6 ${
            currentPlan === plan.id
              ? "border-primary"
              : "border-border"
          }`}
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-2xl font-bold">{plan.price}</p>
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
            </div>

            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              variant={currentPlan === plan.id ? "default" : "outline"}
              onClick={() => onSelectPlan(plan.id)}
            >
              {currentPlan === plan.id
                ? t("subscription.current")
                : t("subscription.select")}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
} 