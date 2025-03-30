import React, { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface JobAlertProps {
  onSave: (data: any) => void
  onCancel: () => void
  initialData?: any
}

export function JobAlert({ onSave, onCancel, initialData }: JobAlertProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    frequency: initialData?.frequency || 'daily',
    emailNotifications: initialData?.emailNotifications || true,
    pushNotifications: initialData?.pushNotifications || false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name) {
      return
    }

    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t('jobs.alerts.name')}</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="frequency">{t('jobs.alerts.frequency')}</Label>
        <Select
          value={formData.frequency}
          onValueChange={(value: string) => setFormData({ ...formData, frequency: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('jobs.alerts.frequency')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">{t('jobs.alerts.daily')}</SelectItem>
            <SelectItem value="weekly">{t('jobs.alerts.weekly')}</SelectItem>
            <SelectItem value="realtime">{t('jobs.alerts.realtime')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t('jobs.alerts.notifications')}</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="email"
            checked={formData.emailNotifications}
            onCheckedChange={(checked) => setFormData({ ...formData, emailNotifications: checked as boolean })}
          />
          <Label htmlFor="email">{t('jobs.alerts.email')}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="push"
            checked={formData.pushNotifications}
            onCheckedChange={(checked) => setFormData({ ...formData, pushNotifications: checked as boolean })}
          />
          <Label htmlFor="push">{t('jobs.alerts.push')}</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button type="submit">
          {t('common.save')}
        </Button>
      </div>
    </form>
  )
} 