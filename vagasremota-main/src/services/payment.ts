import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export interface CreateCheckoutSessionParams {
  priceId: string
  successUrl: string
  cancelUrl: string
  customerId?: string
  metadata?: Record<string, string>
}

export interface CreateCheckoutSessionResponse {
  sessionId: string
  url: string
}

export class PaymentService {
  private static instance: PaymentService
  private stripe: Promise<any>

  private constructor() {
    this.stripe = stripePromise
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService()
    }
    return PaymentService.instance
  }

  public async createCheckoutSession(
    params: CreateCheckoutSessionParams
  ): Promise<CreateCheckoutSessionResponse> {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { sessionId, url } = await response.json()
      return { sessionId, url }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      throw error
    }
  }

  public async redirectToCheckout(url: string): Promise<void> {
    try {
      window.location.href = url
    } catch (error) {
      console.error("Error redirecting to checkout:", error)
      throw error
    }
  }

  public async handleWebhook(event: any): Promise<void> {
    try {
      switch (event.type) {
        case "checkout.session.completed":
          // Handle successful payment
          await this.handleSuccessfulPayment(event.data.object)
          break
        case "checkout.session.expired":
          // Handle expired session
          await this.handleExpiredSession(event.data.object)
          break
        case "customer.subscription.updated":
          // Handle subscription update
          await this.handleSubscriptionUpdate(event.data.object)
          break
        case "customer.subscription.deleted":
          // Handle subscription cancellation
          await this.handleSubscriptionCancellation(event.data.object)
          break
        default:
          console.log(`Unhandled event type: ${event.type}`)
      }
    } catch (error) {
      console.error("Error handling webhook:", error)
      throw error
    }
  }

  private async handleSuccessfulPayment(session: any): Promise<void> {
    // Update user's subscription status in your database
    const { customerId, subscriptionId } = session
    // Implement your logic here
  }

  private async handleExpiredSession(session: any): Promise<void> {
    // Handle expired checkout session
    // Implement your logic here
  }

  private async handleSubscriptionUpdate(subscription: any): Promise<void> {
    // Handle subscription updates
    // Implement your logic here
  }

  private async handleSubscriptionCancellation(subscription: any): Promise<void> {
    // Handle subscription cancellations
    // Implement your logic here
  }
} 