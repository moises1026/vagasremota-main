import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ApiWebhook } from "@/types/api"

interface WebhooksProps {
  onSave: (webhook: ApiWebhook) => void
  onDelete: (id: string) => void
  webhooks: ApiWebhook[]
}

export function Webhooks({ onSave, onDelete, webhooks }: WebhooksProps) {
  const { t } = useLanguage()
  const [newWebhook, setNewWebhook] = useState<Partial<ApiWebhook>>({
    url: "",
    events: [],
  })

  const events = [
    "job.created",
    "job.updated",
    "job.deleted",
    "application.created",
    "application.updated",
    "application.deleted",
    "candidate.created",
    "candidate.updated",
    "candidate.deleted",
  ]

  const handleSave = () => {
    if (newWebhook.url && newWebhook.events?.length) {
      onSave(newWebhook as ApiWebhook)
      setNewWebhook({
        url: "",
        events: [],
      })
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label>{t("api.webhooks")}</Label>
          <div className="space-y-4">
            <Input
              placeholder={t("api.newWebhook")}
              value={newWebhook.url}
              onChange={(e) =>
                setNewWebhook({ ...newWebhook, url: e.target.value })
              }
            />
            <div className="space-y-2">
              <Label>{t("api.events")}</Label>
              <div className="grid grid-cols-2 gap-2">
                {events.map((event) => (
                  <label key={event} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newWebhook.events?.includes(event)}
                      onChange={(e) => {
                        const events = newWebhook.events || []
                        if (e.target.checked) {
                          setNewWebhook({
                            ...newWebhook,
                            events: [...events, event],
                          })
                        } else {
                          setNewWebhook({
                            ...newWebhook,
                            events: events.filter((e) => e !== event),
                          })
                        }
                      }}
                    />
                    <span>{event}</span>
                  </label>
                ))}
              </div>
            </div>
            <Button onClick={handleSave}>{t("common.save")}</Button>
          </div>
        </div>

        <div>
          <Label>{t("api.webhooks")}</Label>
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{webhook.url}</p>
                  <p className="text-sm text-muted-foreground">
                    {webhook.events.join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("api.lastTriggered")}:{" "}
                    {webhook.lastTriggered?.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => onDelete(webhook.id)}
                  >
                    {t("common.delete")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
} 