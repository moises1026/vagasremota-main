import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Interview as InterviewType, InterviewStatus, InterviewType as InterviewTypeEnum } from "@/types/interview"

interface InterviewProps {
  onSave: (interview: InterviewType) => void
  onCancel: () => void
  initialData?: InterviewType
}

export function Interview({
  onSave,
  onCancel,
  initialData,
}: InterviewProps) {
  const { t } = useLanguage()
  const [interview, setInterview] = useState<InterviewType>(
    initialData || {
      id: "",
      jobId: "",
      candidateId: "",
      interviewerId: "",
      type: "initial",
      status: "scheduled",
      scheduledAt: new Date(),
      duration: 60,
      meetingLink: "",
      meetingPassword: "",
      feedback: {
        id: "",
        interviewId: "",
        interviewerId: "",
        candidateId: "",
        jobId: "",
        rating: 0,
        strengths: [],
        weaknesses: [],
        notes: "",
        recommendation: "consider",
        technical: 0,
        communication: 0,
        problemSolving: 0,
        culturalFit: 0,
        createdAt: new Date(),
        isShared: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isRecorded: false,
      recordingUrl: "",
      isCompleted: false,
      completedAt: null,
      isCancelled: false,
      cancelledAt: null,
      cancelledBy: "",
      cancelledReason: "",
    }
  )

  const handleSave = () => {
    onSave(interview)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label>{t("interviews.type")}</Label>
          <Select
            value={interview.type}
            onValueChange={(value) =>
              setInterview({
                ...interview,
                type: value as InterviewTypeEnum,
              })
            }
          >
            <option value="initial">{t("interviews.type.initial")}</option>
            <option value="technical">{t("interviews.type.technical")}</option>
            <option value="behavioral">
              {t("interviews.type.behavioral")}
            </option>
            <option value="final">{t("interviews.type.final")}</option>
            <option value="team">{t("interviews.type.team")}</option>
          </Select>
        </div>

        <div>
          <Label>{t("interviews.status")}</Label>
          <Select
            value={interview.status}
            onValueChange={(value) =>
              setInterview({
                ...interview,
                status: value as InterviewStatus,
              })
            }
          >
            <option value="scheduled">{t("interviews.status.scheduled")}</option>
            <option value="inProgress">
              {t("interviews.status.inProgress")}
            </option>
            <option value="completed">
              {t("interviews.status.completed")}
            </option>
            <option value="cancelled">
              {t("interviews.status.cancelled")}
            </option>
          </Select>
        </div>

        <div>
          <Label>{t("interviews.scheduledAt")}</Label>
          <Input
            type="datetime-local"
            value={interview.scheduledAt.toISOString().slice(0, 16)}
            onChange={(e) =>
              setInterview({
                ...interview,
                scheduledAt: new Date(e.target.value),
              })
            }
          />
        </div>

        <div>
          <Label>{t("interviews.duration")}</Label>
          <Input
            type="number"
            value={interview.duration}
            onChange={(e) =>
              setInterview({
                ...interview,
                duration: Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <Label>{t("interviews.meetingLink")}</Label>
          <Input
            placeholder={t("interviews.meetingLink")}
            value={interview.meetingLink}
            onChange={(e) =>
              setInterview({
                ...interview,
                meetingLink: e.target.value,
              })
            }
          />
        </div>

        <div>
          <Label>{t("interviews.meetingPassword")}</Label>
          <Input
            type="password"
            placeholder={t("interviews.meetingPassword")}
            value={interview.meetingPassword}
            onChange={(e) =>
              setInterview({
                ...interview,
                meetingPassword: e.target.value,
              })
            }
          />
        </div>

        <div>
          <Label>{t("interviews.feedback.title")}</Label>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder={t("interviews.feedback.rating")}
              value={interview.feedback.rating}
              onChange={(e) =>
                setInterview({
                  ...interview,
                  feedback: {
                    ...interview.feedback,
                    rating: Number(e.target.value),
                  },
                })
              }
            />
            <Textarea
              placeholder={t("interviews.feedback.notes")}
              value={interview.feedback.notes}
              onChange={(e) =>
                setInterview({
                  ...interview,
                  feedback: {
                    ...interview.feedback,
                    notes: e.target.value,
                  },
                })
              }
            />
            <Select
              value={interview.feedback.recommendation}
              onValueChange={(value) =>
                setInterview({
                  ...interview,
                  feedback: {
                    ...interview.feedback,
                    recommendation: value as "hire" | "reject" | "consider",
                  },
                })
              }
            >
              <option value="hire">{t("interviews.feedback.hire")}</option>
              <option value="reject">{t("interviews.feedback.reject")}</option>
              <option value="consider">
                {t("interviews.feedback.consider")}
              </option>
            </Select>
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