import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { CandidateProfile as CandidateProfileType } from "@/types/candidate"

interface CandidateProfileProps {
  onSave: (profile: CandidateProfileType) => void
  onCancel: () => void
  initialData?: CandidateProfileType
}

export function CandidateProfile({
  onSave,
  onCancel,
  initialData,
}: CandidateProfileProps) {
  const { t } = useLanguage()
  const [profile, setProfile] = useState<CandidateProfileType>(
    initialData || {
      id: "",
      userId: "",
      name: "",
      email: "",
      phone: "",
      location: "",
      bio: "",
      skills: [],
      languages: [],
      education: [],
      experience: [],
      socialMedia: {
        linkedin: "",
        github: "",
        portfolio: "",
        youtube: "",
      },
      availability: {
        remote: false,
        hybrid: false,
        onsite: false,
        relocation: false,
      },
      salary: {
        min: 0,
        max: 50000,
      },
      interests: [],
      resume: "",
      video: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      applications: 0,
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
          <Label>{t("profile.personalInfo")}</Label>
          <div className="space-y-4">
            <Input
              placeholder={t("profile.name")}
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />
            <Input
              placeholder={t("profile.email")}
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <Input
              placeholder={t("profile.phone")}
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
            <Input
              placeholder={t("profile.location")}
              value={profile.location}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <Label>{t("profile.bio")}</Label>
          <Textarea
            placeholder={t("profile.bio")}
            value={profile.bio}
            onChange={(e) =>
              setProfile({ ...profile, bio: e.target.value })
            }
          />
        </div>

        <div>
          <Label>{t("profile.availability")}</Label>
          <div className="space-y-2">
            <Checkbox
              checked={profile.availability.remote}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  availability: {
                    ...profile.availability,
                    remote: checked as boolean,
                  },
                })
              }
            >
              {t("profile.remote")}
            </Checkbox>
            <Checkbox
              checked={profile.availability.hybrid}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  availability: {
                    ...profile.availability,
                    hybrid: checked as boolean,
                  },
                })
              }
            >
              {t("profile.hybrid")}
            </Checkbox>
            <Checkbox
              checked={profile.availability.onsite}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  availability: {
                    ...profile.availability,
                    onsite: checked as boolean,
                  },
                })
              }
            >
              {t("profile.onsite")}
            </Checkbox>
            <Checkbox
              checked={profile.availability.relocation}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  availability: {
                    ...profile.availability,
                    relocation: checked as boolean,
                  },
                })
              }
            >
              {t("profile.relocation")}
            </Checkbox>
          </div>
        </div>

        <div>
          <Label>{t("profile.salary")}</Label>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder={t("profile.salary.min")}
              value={profile.salary.min}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  salary: {
                    ...profile.salary,
                    min: Number(e.target.value),
                  },
                })
              }
            />
            <Input
              type="number"
              placeholder={t("profile.salary.max")}
              value={profile.salary.max}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  salary: {
                    ...profile.salary,
                    max: Number(e.target.value),
                  },
                })
              }
            />
          </div>
        </div>

        <div>
          <Label>{t("profile.socialMedia")}</Label>
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
              placeholder="GitHub"
              value={profile.socialMedia.github}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialMedia: {
                    ...profile.socialMedia,
                    github: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="Portfolio"
              value={profile.socialMedia.portfolio}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialMedia: {
                    ...profile.socialMedia,
                    portfolio: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="YouTube"
              value={profile.socialMedia.youtube}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialMedia: {
                    ...profile.socialMedia,
                    youtube: e.target.value,
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