import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { JobAlert as JobAlertType } from "@/types/jobAlert"

interface JobAlertProps {
  onSave: (alert: JobAlertType) => void
  onCancel: () => void
  initialData?: JobAlertType
}

export function JobAlert({ onSave, onCancel, initialData }: JobAlertProps) {
  const { t } = useLanguage()
  const [alert, setAlert] = useState<JobAlertType>(
    initialData || {
      id: "",
      userId: "",
      name: "",
      filters: {
        types: [],
        levels: [],
        skills: [],
        salary: {
          min: 0,
          max: 50000,
        },
        location: "",
        remote: false,
        hybrid: false,
        onsite: false,
        keywords: "",
      },
      emailNotifications: true,
      pushNotifications: true,
      frequency: "daily",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    }
  )

  const handleSave = () => {
    onSave(alert)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label>{t("jobs.alerts.name")}</Label>
          <Input
            placeholder={t("jobs.alerts.name")}
            value={alert.name}
            onChange={(e) =>
              setAlert({ ...alert, name: e.target.value })
            }
          />
        </div>

        <div>
          <Label>{t("jobs.alerts.frequency")}</Label>
          <Select
            value={alert.frequency}
            onValueChange={(value) =>
              setAlert({ ...alert, frequency: value as "daily" | "weekly" | "realtime" })
            }
          >
            <option value="daily">{t("jobs.alerts.daily")}</option>
            <option value="weekly">{t("jobs.alerts.weekly")}</option>
            <option value="realtime">{t("jobs.alerts.realtime")}</option>
          </Select>
        </div>

        <div>
          <Label>{t("jobs.alerts.notifications")}</Label>
          <div className="space-y-2">
            <Checkbox
              checked={alert.emailNotifications}
              onCheckedChange={(checked) =>
                setAlert({
                  ...alert,
                  emailNotifications: checked as boolean,
                })
              }
            >
              {t("jobs.alerts.email")}
            </Checkbox>
            <Checkbox
              checked={alert.pushNotifications}
              onCheckedChange={(checked) =>
                setAlert({
                  ...alert,
                  pushNotifications: checked as boolean,
                })
              }
            >
              {t("jobs.alerts.push")}
            </Checkbox>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSave}>{t("common.save")}</Button>
        </div>
      </div>
    </Card>
  )
} 