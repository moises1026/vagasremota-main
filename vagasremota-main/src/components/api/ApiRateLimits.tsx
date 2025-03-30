import { useLanguage } from "@/hooks/useLanguage"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ApiRateLimitsProps {
  currentUsage: number
  limit: number
  resetTime: Date
}

export function ApiRateLimits({
  currentUsage,
  limit,
  resetTime
}: ApiRateLimitsProps) {
  const { t } = useLanguage()

  const usagePercentage = (currentUsage / limit) * 100

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{t("api.rateLimits")}</h2>
          <p className="text-muted-foreground">
            {t("api.rateLimits.description")}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="font-medium">{t("api.rateLimits.currentUsage")}</p>
              <p className="text-sm text-muted-foreground">
                {currentUsage} / {limit} {t("api.rateLimits.requests")}
              </p>
            </div>
            <Progress value={usagePercentage} className="mt-2" />
          </div>

          <div>
            <p className="font-medium">{t("api.rateLimits.resetTime")}</p>
            <p className="text-sm text-muted-foreground">
              {resetTime.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-medium">{t("api.rateLimits.headers")}</h3>
            <pre className="mt-2 text-sm">
              <code>
                {`X-RateLimit-Limit: ${limit}
X-RateLimit-Remaining: ${limit - currentUsage}
X-RateLimit-Reset: ${Math.floor(resetTime.getTime() / 1000)}`}
              </code>
            </pre>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-medium">{t("api.rateLimits.error")}</h3>
            <pre className="mt-2 text-sm">
              <code>
                {`{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded",
  "retryAfter": ${Math.floor(resetTime.getTime() / 1000)}
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </Card>
  )
} 