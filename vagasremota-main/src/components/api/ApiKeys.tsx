import { useLanguage } from "@/hooks/useLanguage"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

interface ApiKey {
  id: string
  name: string
  key: string
  permissions: {
    read: boolean
    write: boolean
    delete: boolean
  }
  createdAt: Date
  lastUsedAt?: Date
}

interface ApiKeysProps {
  apiKeys: ApiKey[]
  onSave: (apiKey: Omit<ApiKey, "id" | "key" | "createdAt" | "lastUsedAt">) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function ApiKeys({
  apiKeys,
  onSave,
  onDelete
}: ApiKeysProps) {
  const { t } = useLanguage()
  const [newApiKey, setNewApiKey] = useState({
    name: "",
    permissions: {
      read: true,
      write: false,
      delete: false
    }
  })

  const handleSave = async () => {
    await onSave(newApiKey)
    setNewApiKey({
      name: "",
      permissions: {
        read: true,
        write: false,
        delete: false
      }
    })
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{t("api.keys")}</h2>
          <p className="text-muted-foreground">
            {t("api.keys.description")}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">{t("api.keys.name")}</Label>
            <Input
              id="name"
              value={newApiKey.name}
              onChange={(e) =>
                setNewApiKey({ ...newApiKey, name: e.target.value })
              }
              placeholder="My API Key"
            />
          </div>

          <div>
            <Label>{t("api.keys.permissions")}</Label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="read"
                  checked={newApiKey.permissions.read}
                  onCheckedChange={(checked) =>
                    setNewApiKey({
                      ...newApiKey,
                      permissions: {
                        ...newApiKey.permissions,
                        read: checked
                      }
                    })
                  }
                />
                <Label htmlFor="read">{t("api.keys.permissions.read")}</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="write"
                  checked={newApiKey.permissions.write}
                  onCheckedChange={(checked) =>
                    setNewApiKey({
                      ...newApiKey,
                      permissions: {
                        ...newApiKey.permissions,
                        write: checked
                      }
                    })
                  }
                />
                <Label htmlFor="write">{t("api.keys.permissions.write")}</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="delete"
                  checked={newApiKey.permissions.delete}
                  onCheckedChange={(checked) =>
                    setNewApiKey({
                      ...newApiKey,
                      permissions: {
                        ...newApiKey.permissions,
                        delete: checked
                      }
                    })
                  }
                />
                <Label htmlFor="delete">
                  {t("api.keys.permissions.delete")}
                </Label>
              </div>
            </div>
          </div>

          <Button onClick={handleSave}>{t("api.keys.save")}</Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t("api.keys.list")}</h3>
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="rounded-lg border p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{apiKey.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {Object.entries(apiKey.permissions)
                      .filter(([_, value]) => value)
                      .map(([key]) => key)
                      .join(", ")}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(apiKey.id)}
                >
                  {t("api.keys.delete")}
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  {t("api.keys.createdAt")}:{" "}
                  {apiKey.createdAt.toLocaleString()}
                </p>
                {apiKey.lastUsedAt && (
                  <p>
                    {t("api.keys.lastUsedAt")}:{" "}
                    {apiKey.lastUsedAt.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-medium">{t("api.keys.usage")}</h3>
          <pre className="mt-2 text-sm">
            <code>
              {`// Usando a chave da API
const response = await fetch('https://api.vagasremota.com.br/api/jobs', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`}
            </code>
          </pre>
        </div>
      </div>
    </Card>
  )
} 