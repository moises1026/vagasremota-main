import { useLanguage } from "@/hooks/useLanguage"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

interface Webhook {
  id: string
  url: string
  events: string[]
  isActive: boolean
  secret: string
  createdAt: Date
  lastTriggeredAt?: Date
}

interface ApiWebhooksProps {
  webhooks: Webhook[]
  onSave: (webhook: Omit<Webhook, "id" | "createdAt" | "lastTriggeredAt">) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function ApiWebhooks({
  webhooks,
  onSave,
  onDelete
}: ApiWebhooksProps) {
  const { t } = useLanguage()
  const [newWebhook, setNewWebhook] = useState({
    url: "",
    events: [] as string[],
    isActive: true,
    secret: ""
  })

  const handleSave = async () => {
    await onSave(newWebhook)
    setNewWebhook({
      url: "",
      events: [],
      isActive: true,
      secret: ""
    })
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{t("api.webhooks")}</h2>
          <p className="text-muted-foreground">
            {t("api.webhooks.description")}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="url">{t("api.webhooks.url")}</Label>
            <Input
              id="url"
              value={newWebhook.url}
              onChange={(e) =>
                setNewWebhook({ ...newWebhook, url: e.target.value })
              }
              placeholder="https://example.com/webhook"
            />
          </div>

          <div>
            <Label htmlFor="secret">{t("api.webhooks.secret")}</Label>
            <Input
              id="secret"
              type="password"
              value={newWebhook.secret}
              onChange={(e) =>
                setNewWebhook({ ...newWebhook, secret: e.target.value })
              }
              placeholder="your-webhook-secret"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={newWebhook.isActive}
              onCheckedChange={(checked) =>
                setNewWebhook({ ...newWebhook, isActive: checked })
              }
            />
            <Label htmlFor="isActive">{t("api.webhooks.isActive")}</Label>
          </div>

          <div>
            <Label>{t("api.webhooks.events")}</Label>
            <div className="mt-2 space-y-2">
              {[
                "job.created",
                "job.updated",
                "job.deleted",
                "candidate.created",
                "candidate.updated",
                "candidate.deleted",
                "company.created",
                "company.updated",
                "company.deleted",
                "interview.created",
                "interview.updated",
                "interview.deleted"
              ].map((event) => (
                <div key={event} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={event}
                    checked={newWebhook.events.includes(event)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewWebhook({
                          ...newWebhook,
                          events: [...newWebhook.events, event]
                        })
                      } else {
                        setNewWebhook({
                          ...newWebhook,
                          events: newWebhook.events.filter((e) => e !== event)
                        })
                      }
                    }}
                  />
                  <Label htmlFor={event}>{event}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave}>{t("api.webhooks.save")}</Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t("api.webhooks.list")}</h3>
          {webhooks.map((webhook) => (
            <div
              key={webhook.id}
              className="rounded-lg border p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{webhook.url}</p>
                  <p className="text-sm text-muted-foreground">
                    {webhook.events.join(", ")}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      webhook.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(webhook.id)}
                  >
                    {t("api.webhooks.delete")}
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  {t("api.webhooks.createdAt")}:{" "}
                  {webhook.createdAt.toLocaleString()}
                </p>
                {webhook.lastTriggeredAt && (
                  <p>
                    {t("api.webhooks.lastTriggeredAt")}:{" "}
                    {webhook.lastTriggeredAt.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-medium">{t("api.webhooks.payload")}</h3>
          <pre className="mt-2 text-sm">
            <code>
              {`{
  "event": "job.created",
  "timestamp": "2024-03-20T14:00:00Z",
  "data": {
    "id": "123",
    "title": "Desenvolvedor Full Stack",
    "description": "Buscamos um desenvolvedor...",
    "type": "remote",
    "level": "senior",
    "location": "Brasil",
    "salary": {
      "min": 8000,
      "max": 12000
    },
    "skills": ["React", "Node.js", "TypeScript"],
    "requirements": ["Experiência com..."],
    "benefits": ["Plano de saúde", "Vale refeição"]
  }
}`}
            </code>
          </pre>
        </div>
      </div>
    </Card>
  )
} 