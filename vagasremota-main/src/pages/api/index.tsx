import { useLanguage } from "@/hooks/useLanguage"
import { ApiDocs } from "@/components/api/ApiDocs"
import { ApiExamples } from "@/components/api/ApiExamples"
import { ApiKeys } from "@/components/api/ApiKeys"
import { ApiRateLimits } from "@/components/api/ApiRateLimits"
import { ApiWebhooks } from "@/components/api/ApiWebhooks"
import { useApi } from "@/hooks/useApi"

export default function ApiPage() {
  const { t } = useLanguage()
  const {
    apiKeys,
    webhooks,
    rateLimits,
    createApiKey,
    deleteApiKey,
    createWebhook,
    deleteWebhook
  } = useApi()

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">{t("api.title")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("api.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ApiRateLimits
          currentUsage={rateLimits.currentUsage}
          limit={rateLimits.limit}
          resetTime={rateLimits.resetTime}
        />

        <ApiKeys
          apiKeys={apiKeys}
          onSave={createApiKey}
          onDelete={deleteApiKey}
        />
      </div>

      <ApiWebhooks
        webhooks={webhooks}
        onSave={createWebhook}
        onDelete={deleteWebhook}
      />

      <ApiDocs />

      <ApiExamples />
    </div>
  )
} 