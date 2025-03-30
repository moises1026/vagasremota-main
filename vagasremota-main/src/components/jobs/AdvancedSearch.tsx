import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { JobType, JobLevel } from "@/types/job"

interface AdvancedSearchProps {
  onSearch: (filters: any) => void
  onSave?: () => void
  onCreateAlert?: () => void
}

export function AdvancedSearch({
  onSearch,
  onSave,
  onCreateAlert,
}: AdvancedSearchProps) {
  const { t } = useLanguage()
  const [filters, setFilters] = useState({
    types: [] as JobType[],
    levels: [] as JobLevel[],
    skills: [] as string[],
    salary: {
      min: 0,
      max: 50000,
    },
    location: "",
    remote: false,
    hybrid: false,
    onsite: false,
    keywords: "",
  })

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleReset = () => {
    setFilters({
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
    })
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label>{t("jobs.search.filters")}</Label>
          <Input
            placeholder={t("jobs.search.keywords")}
            value={filters.keywords}
            onChange={(e) =>
              setFilters({ ...filters, keywords: e.target.value })
            }
          />
        </div>

        <div>
          <Label>{t("jobs.type")}</Label>
          <div className="space-y-2">
            <Checkbox
              checked={filters.remote}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, remote: checked as boolean })
              }
            >
              {t("jobs.remote")}
            </Checkbox>
            <Checkbox
              checked={filters.hybrid}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, hybrid: checked as boolean })
              }
            >
              {t("jobs.hybrid")}
            </Checkbox>
            <Checkbox
              checked={filters.onsite}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, onsite: checked as boolean })
              }
            >
              {t("jobs.onsite")}
            </Checkbox>
          </div>
        </div>

        <div>
          <Label>{t("jobs.level")}</Label>
          <Select
            value={filters.levels}
            onValueChange={(value) =>
              setFilters({ ...filters, levels: value as JobLevel[] })
            }
          >
            <option value="junior">{t("jobs.junior")}</option>
            <option value="midLevel">{t("jobs.midLevel")}</option>
            <option value="senior">{t("jobs.senior")}</option>
            <option value="lead">{t("jobs.lead")}</option>
            <option value="manager">{t("jobs.manager")}</option>
            <option value="director">{t("jobs.director")}</option>
          </Select>
        </div>

        <div>
          <Label>{t("jobs.salary")}</Label>
          <div className="space-y-4">
            <Slider
              value={[filters.salary.min, filters.salary.max]}
              min={0}
              max={50000}
              step={1000}
              onValueChange={([min, max]) =>
                setFilters({
                  ...filters,
                  salary: { min, max },
                })
              }
            />
            <div className="flex justify-between">
              <span>R$ {filters.salary.min.toLocaleString()}</span>
              <span>R$ {filters.salary.max.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <Label>{t("jobs.location")}</Label>
          <Input
            placeholder={t("jobs.location")}
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            {t("common.reset")}
          </Button>
          <div className="space-x-2">
            {onSave && (
              <Button variant="outline" onClick={onSave}>
                {t("jobs.search.saveSearch")}
              </Button>
            )}
            {onCreateAlert && (
              <Button variant="outline" onClick={onCreateAlert}>
                {t("jobs.search.createAlert")}
              </Button>
            )}
            <Button onClick={handleSearch}>{t("common.search")}</Button>
          </div>
        </div>
      </div>
    </Card>
  )
} 