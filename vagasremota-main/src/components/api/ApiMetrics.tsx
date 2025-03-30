import { useLanguage } from "@/hooks/useLanguage"
import { Card } from "@/components/ui/card"
import { ApiRateLimit } from "@/types/api"

interface ApiMetricsProps {
  rateLimit: ApiRateLimit
}

export function ApiMetrics({ rateLimit }: ApiMetricsProps) {
  const { t } = useLanguage()

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">{t("api.rateLimit")}</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {t("api.requestsPerMinute")}
              </p>
              <p className="text-2xl font-bold">
                {rateLimit.requestsPerMinute}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("api.currentUsage")}: {rateLimit.currentUsage.minute}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {t("api.requestsPerHour")}
              </p>
              <p className="text-2xl font-bold">
                {rateLimit.requestsPerHour}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("api.currentUsage")}: {rateLimit.currentUsage.hour}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {t("api.requestsPerDay")}
              </p>
              <p className="text-2xl font-bold">
                {rateLimit.requestsPerDay}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("api.currentUsage")}: {rateLimit.currentUsage.day}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">{t("api.usage")}</h3>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {t("api.requestsPerMinute")}
                </p>
                <p className="text-sm font-medium">
                  {rateLimit.currentUsage.minute} / {rateLimit.requestsPerMinute}
                </p>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${
                      (rateLimit.currentUsage.minute /
                        rateLimit.requestsPerMinute) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {t("api.requestsPerHour")}
                </p>
                <p className="text-sm font-medium">
                  {rateLimit.currentUsage.hour} / {rateLimit.requestsPerHour}
                </p>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${
                      (rateLimit.currentUsage.hour /
                        rateLimit.requestsPerHour) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {t("api.requestsPerDay")}
                </p>
                <p className="text-sm font-medium">
                  {rateLimit.currentUsage.day} / {rateLimit.requestsPerDay}
                </p>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${
                      (rateLimit.currentUsage.day /
                        rateLimit.requestsPerDay) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
} 