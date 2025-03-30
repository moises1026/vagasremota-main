import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { CompanyProfile as CompanyProfileType } from "@/types/company"

interface CompanyProfileProps {
  onSave: (profile: CompanyProfileType) => void
  onCancel: () => void
  initialData?: CompanyProfileType
}

export function CompanyProfile({
  onSave,
  onCancel,
  initialData,
}: CompanyProfileProps) {
  const { t } = useLanguage()
  const [profile, setProfile] = useState<CompanyProfileType>(
    initialData || {
      id: "",
      userId: "",
      name: "",
      logo: "",
      cover: "",
      description: "",
      mission: "",
      vision: "",
      values: [],
      website: "",
      industry: "",
      size: "",
      foundedYear: 0,
      location: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      },
      benefits: {
        health: false,
        dental: false,
        vision: false,
        life: false,
        disability: false,
        retirement: false,
        vacation: false,
        sickLeave: false,
        parentalLeave: false,
        education: false,
        gym: false,
        homeOffice: false,
        flexibleHours: false,
        other: [],
      },
      culture: {
        workStyle: "",
        teamStructure: "",
        values: [],
        diversity: "",
        growth: "",
      },
      socialMedia: {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",
      },
      subscription: {
        plan: "free",
        startDate: new Date(),
        endDate: new Date(),
        autoRenew: false,
        status: "active",
      },
      metrics: {
        totalViews: 0,
        totalApplications: 0,
        conversionRate: 0,
        averageResponseTime: 0,
        candidateSatisfaction: 0,
        activeJobs: 0,
        totalJobs: 0,
        monthlyApplications: 0,
        monthlyViews: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: false,
      isActive: true,
    }
  )

  const handleSave = () => {
    onSave(profile)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label>{t("company.profile")}</Label>
          <div className="space-y-4">
            <Input
              placeholder={t("company.name")}
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />
            <Input
              placeholder={t("company.website")}
              value={profile.website}
              onChange={(e) =>
                setProfile({ ...profile, website: e.target.value })
              }
            />
            <Input
              placeholder={t("company.industry")}
              value={profile.industry}
              onChange={(e) =>
                setProfile({ ...profile, industry: e.target.value })
              }
            />
            <Input
              placeholder={t("company.size")}
              value={profile.size}
              onChange={(e) =>
                setProfile({ ...profile, size: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder={t("company.foundedYear")}
              value={profile.foundedYear}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  foundedYear: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div>
          <Label>{t("company.description")}</Label>
          <Textarea
            placeholder={t("company.description")}
            value={profile.description}
            onChange={(e) =>
              setProfile({ ...profile, description: e.target.value })
            }
          />
        </div>

        <div>
          <Label>{t("company.mission")}</Label>
          <Textarea
            placeholder={t("company.mission")}
            value={profile.mission}
            onChange={(e) =>
              setProfile({ ...profile, mission: e.target.value })
            }
          />
        </div>

        <div>
          <Label>{t("company.vision")}</Label>
          <Textarea
            placeholder={t("company.vision")}
            value={profile.vision}
            onChange={(e) =>
              setProfile({ ...profile, vision: e.target.value })
            }
          />
        </div>

        <div>
          <Label>{t("company.location")}</Label>
          <div className="space-y-4">
            <Input
              placeholder={t("company.location.street")}
              value={profile.location.street}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: {
                    ...profile.location,
                    street: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder={t("company.location.city")}
              value={profile.location.city}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: {
                    ...profile.location,
                    city: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder={t("company.location.state")}
              value={profile.location.state}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: {
                    ...profile.location,
                    state: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder={t("company.location.country")}
              value={profile.location.country}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: {
                    ...profile.location,
                    country: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder={t("company.location.zipCode")}
              value={profile.location.zipCode}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: {
                    ...profile.location,
                    zipCode: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        <div>
          <Label>{t("company.socialMedia")}</Label>
          <div className="space-y-4">
            <Input
              placeholder="LinkedIn"
              value={profile.socialMedia.linkedin}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialMedia: {
                    ...profile.socialMedia,
                    linkedin: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="Twitter"
              value={profile.socialMedia.twitter}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialMedia: {
                    ...profile.socialMedia,
                    twitter: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="Facebook"
              value={profile.socialMedia.facebook}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialMedia: {
                    ...profile.socialMedia,
                    facebook: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="Instagram"
              value={profile.socialMedia.instagram}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialMedia: {
                    ...profile.socialMedia,
                    instagram: e.target.value,
                  },
                })
              }
            />
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