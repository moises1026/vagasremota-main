import React, { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'

interface AdvancedSearchProps {
  onSearch: (filters: any) => void
  onSave?: () => void
  onCreateAlert?: () => void
}

export function AdvancedSearch({ onSearch, onSave, onCreateAlert }: AdvancedSearchProps) {
  const { t } = useLanguage()
  const [filters, setFilters] = useState({
    keywords: '',
    types: [] as string[],
    level: '',
    salary: 50000,
    location: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(filters)
  }

  const handleReset = () => {
    setFilters({
      keywords: '',
      types: [],
      level: '',
      salary: 50000,
      location: ''
    })
  }

  const toggleType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="keywords">{t('jobs.search.keywords')}</Label>
        <Input
          id="keywords"
          value={filters.keywords}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, keywords: e.target.value })}
          placeholder={t('jobs.search.keywords')}
        />
      </div>

      <div className="space-y-2">
        <Label>{t('jobs.type')}</Label>
        <div className="flex flex-wrap gap-2">
          <Checkbox
            id="remote"
            checked={filters.types.includes('remote')}
            onCheckedChange={() => toggleType('remote')}
          />
          <Label htmlFor="remote">{t('jobs.remote')}</Label>

          <Checkbox
            id="hybrid"
            checked={filters.types.includes('hybrid')}
            onCheckedChange={() => toggleType('hybrid')}
          />
          <Label htmlFor="hybrid">{t('jobs.hybrid')}</Label>

          <Checkbox
            id="onsite"
            checked={filters.types.includes('onsite')}
            onCheckedChange={() => toggleType('onsite')}
          />
          <Label htmlFor="onsite">{t('jobs.onsite')}</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="level">{t('jobs.level')}</Label>
        <Select
          value={filters.level}
          onValueChange={(value: string) => setFilters({ ...filters, level: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('jobs.level')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="junior">{t('jobs.junior')}</SelectItem>
            <SelectItem value="midLevel">{t('jobs.midLevel')}</SelectItem>
            <SelectItem value="senior">{t('jobs.senior')}</SelectItem>
            <SelectItem value="lead">{t('jobs.lead')}</SelectItem>
            <SelectItem value="manager">{t('jobs.manager')}</SelectItem>
            <SelectItem value="director">{t('jobs.director')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t('jobs.salary')}</Label>
        <Slider
          value={[filters.salary]}
          onValueChange={(value: number[]) => setFilters({ ...filters, salary: value[0] })}
          max={50000}
          step={1000}
        />
        <div className="text-sm text-gray-500">
          R$ {filters.salary.toLocaleString()}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">{t('jobs.location')}</Label>
        <Input
          id="location"
          value={filters.location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, location: e.target.value })}
          placeholder={t('jobs.location')}
        />
      </div>

      <div className="flex justify-between">
        <div className="space-x-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            {t('common.reset')}
          </Button>
          <Button type="submit">
            {t('common.search')}
          </Button>
        </div>
        <div className="space-x-2">
          {onSave && (
            <Button type="button" variant="outline" onClick={onSave}>
              {t('jobs.search.saveSearch')}
            </Button>
          )}
          {onCreateAlert && (
            <Button type="button" variant="outline" onClick={onCreateAlert}>
              {t('jobs.search.createAlert')}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
} 