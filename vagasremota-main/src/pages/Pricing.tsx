import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/useToast"

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for small companies just getting started",
    features: [
      "1 active job posting",
      "Basic candidate search",
      "Email support",
      "Basic analytics",
    ],
    limits: {
      jobs: 1,
      applications: 50,
      candidates: 100,
      storage: 100,
    },
  },
  {
    name: "Basic",
    price: 49,
    description: "Great for growing companies",
    features: [
      "5 active job postings",
      "Advanced candidate search",
      "Priority email support",
      "Advanced analytics",
      "Custom branding",
      "API access",
    ],
    limits: {
      jobs: 5,
      applications: 200,
      candidates: 500,
      storage: 500,
    },
  },
  {
    name: "Pro",
    price: 99,
    description: "For companies that need more power",
    features: [
      "15 active job postings",
      "AI-powered candidate matching",
      "24/7 phone support",
      "Custom integrations",
      "Advanced reporting",
      "Team collaboration",
      "Dedicated account manager",
    ],
    limits: {
      jobs: 15,
      applications: 1000,
      candidates: 2000,
      storage: 2000,
    },
  },
  {
    name: "Enterprise",
    price: 299,
    description: "For large organizations with complex needs",
    features: [
      "Unlimited job postings",
      "Custom AI models",
      "Dedicated support team",
      "Custom development",
      "Advanced security",
      "SLA guarantees",
      "On-site training",
    ],
    limits: {
      jobs: -1,
      applications: -1,
      candidates: -1,
      storage: -1,
    },
  },
]

export default function Pricing() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSubscribe = async (planName: string) => {
    if (!user) {
      showToast("Please sign in to subscribe to a plan", "error")
      return
    }

    try {
      // TODO: Implement subscription logic
      showToast(`Subscribed to ${planName} plan`, "success")
    } catch (error) {
      console.error("Error subscribing to plan:", error)
      showToast("Failed to subscribe to plan", "error")
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that's right for your company
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${
              selectedPlan === plan.name ? "border-primary" : ""
            }`}
            onClick={() => setSelectedPlan(plan.name)}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  ${plan.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleSubscribe(plan.name)}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
        <p className="text-muted-foreground mb-8">
          Contact us for a custom solution tailored to your needs
        </p>
        <Button variant="outline">Contact Sales</Button>
      </div>
    </div>
  )
} 