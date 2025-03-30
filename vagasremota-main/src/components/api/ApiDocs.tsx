import { useLanguage } from "@/hooks/useLanguage"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ApiDocs() {
  const { t } = useLanguage()

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{t("api.documentation")}</h2>
          <p className="text-muted-foreground">
            {t("api.documentation.description")}
          </p>
        </div>

        <Tabs defaultValue="authentication">
          <TabsList>
            <TabsTrigger value="authentication">
              {t("api.documentation.authentication.title")}
            </TabsTrigger>
            <TabsTrigger value="jobs">
              {t("api.documentation.jobs.title")}
            </TabsTrigger>
            <TabsTrigger value="candidates">
              {t("api.documentation.candidates.title")}
            </TabsTrigger>
            <TabsTrigger value="companies">
              {t("api.documentation.companies.title")}
            </TabsTrigger>
            <TabsTrigger value="interviews">
              {t("api.documentation.interviews.title")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="authentication" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {t("api.documentation.authentication.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("api.documentation.authentication.description")}
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium">
                    {t("api.documentation.authentication.headers")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.authentication.error")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`{
  "error": "Unauthorized",
  "message": "Invalid API key"
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {t("api.documentation.jobs.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("api.documentation.jobs.description")}
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium">
                    {t("api.documentation.jobs.list")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`GET /api/jobs

Query Parameters:
- type: string (remote, hybrid, onsite)
- level: string (junior, mid, senior, lead)
- location: string
- salary: { min: number, max: number }
- skills: string[]
- page: number
- limit: number`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.jobs.create")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`POST /api/jobs

Request Body:
{
  "title": string,
  "description": string,
  "type": "remote" | "hybrid" | "onsite",
  "level": "junior" | "mid" | "senior" | "lead",
  "location": string,
  "salary": {
    "min": number,
    "max": number
  },
  "skills": string[],
  "requirements": string[],
  "benefits": string[]
}`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.jobs.update")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`PUT /api/jobs/:id

Request Body:
{
  "title"?: string,
  "description"?: string,
  "type"?: "remote" | "hybrid" | "onsite",
  "level"?: "junior" | "mid" | "senior" | "lead",
  "location"?: string,
  "salary"?: {
    "min": number,
    "max": number
  },
  "skills"?: string[],
  "requirements"?: string[],
  "benefits"?: string[]
}`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.jobs.delete")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`DELETE /api/jobs/:id`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {t("api.documentation.candidates.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("api.documentation.candidates.description")}
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium">
                    {t("api.documentation.candidates.list")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`GET /api/candidates

Query Parameters:
- skills: string[]
- experience: { min: number, max: number }
- education: string[]
- languages: string[]
- page: number
- limit: number`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.candidates.create")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`POST /api/candidates

Request Body:
{
  "name": string,
  "email": string,
  "phone": string,
  "location": string,
  "bio": string,
  "skills": {
    "name": string,
    "level": "beginner" | "intermediate" | "advanced" | "expert",
    "yearsOfExperience": number
  }[],
  "languages": {
    "name": string,
    "level": "beginner" | "intermediate" | "advanced" | "native"
  }[],
  "experience": {
    "company": string,
    "position": string,
    "startDate": string,
    "endDate"?: string,
    "description": string,
    "skills": string[]
  }[],
  "education": {
    "institution": string,
    "degree": string,
    "field": string,
    "startDate": string,
    "endDate": string
  }[],
  "socialMedia": {
    "linkedin"?: string,
    "github"?: string,
    "portfolio"?: string
  },
  "availability": {
    "remote": boolean,
    "hybrid": boolean,
    "onsite": boolean
  },
  "salary": {
    "expected": {
      "min": number,
      "max": number
    }
  }
}`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.candidates.update")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`PUT /api/candidates/:id

Request Body:
{
  "name"?: string,
  "email"?: string,
  "phone"?: string,
  "location"?: string,
  "bio"?: string,
  "skills"?: {
    "name": string,
    "level": "beginner" | "intermediate" | "advanced" | "expert",
    "yearsOfExperience": number
  }[],
  "languages"?: {
    "name": string,
    "level": "beginner" | "intermediate" | "advanced" | "native"
  }[],
  "experience"?: {
    "company": string,
    "position": string,
    "startDate": string,
    "endDate"?: string,
    "description": string,
    "skills": string[]
  }[],
  "education"?: {
    "institution": string,
    "degree": string,
    "field": string,
    "startDate": string,
    "endDate": string
  }[],
  "socialMedia"?: {
    "linkedin"?: string,
    "github"?: string,
    "portfolio"?: string
  },
  "availability"?: {
    "remote": boolean,
    "hybrid": boolean,
    "onsite": boolean
  },
  "salary"?: {
    "expected": {
      "min": number,
      "max": number
    }
  }
}`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.candidates.delete")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`DELETE /api/candidates/:id`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="companies" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {t("api.documentation.companies.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("api.documentation.companies.description")}
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium">
                    {t("api.documentation.companies.list")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`GET /api/companies

Query Parameters:
- industry: string
- size: string
- location: string
- verified: boolean
- page: number
- limit: number`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.companies.create")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`POST /api/companies

Request Body:
{
  "name": string,
  "logo": string,
  "cover": string,
  "description": string,
  "mission": string,
  "vision": string,
  "values": string[],
  "website": string,
  "industry": string,
  "size": string,
  "foundedYear": number,
  "location": {
    "address": string,
    "city": string,
    "state": string,
    "country": string,
    "remote": boolean,
    "hybrid": boolean,
    "onsite": boolean
  },
  "benefits": {
    "healthInsurance": boolean,
    "dentalInsurance": boolean,
    "visionInsurance": boolean,
    "lifeInsurance": boolean,
    "disabilityInsurance": boolean,
    "retirementPlan": boolean,
    "paidTimeOff": boolean,
    "maternityLeave": boolean,
    "paternityLeave": boolean,
    "flexibleHours": boolean,
    "remoteWork": boolean,
    "professionalDevelopment": boolean,
    "gymMembership": boolean,
    "other": string[]
  },
  "culture": {
    "workStyle": string,
    "teamStructure": string,
    "communicationStyle": string,
    "workLifeBalance": string
  },
  "socialMedia": {
    "linkedin"?: string,
    "instagram"?: string,
    "facebook"?: string,
    "twitter"?: string,
    "youtube"?: string
  }
}`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.companies.update")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`PUT /api/companies/:id

Request Body:
{
  "name"?: string,
  "logo"?: string,
  "cover"?: string,
  "description"?: string,
  "mission"?: string,
  "vision"?: string,
  "values"?: string[],
  "website"?: string,
  "industry"?: string,
  "size"?: string,
  "foundedYear"?: number,
  "location"?: {
    "address": string,
    "city": string,
    "state": string,
    "country": string,
    "remote": boolean,
    "hybrid": boolean,
    "onsite": boolean
  },
  "benefits"?: {
    "healthInsurance": boolean,
    "dentalInsurance": boolean,
    "visionInsurance": boolean,
    "lifeInsurance": boolean,
    "disabilityInsurance": boolean,
    "retirementPlan": boolean,
    "paidTimeOff": boolean,
    "maternityLeave": boolean,
    "paternityLeave": boolean,
    "flexibleHours": boolean,
    "remoteWork": boolean,
    "professionalDevelopment": boolean,
    "gymMembership": boolean,
    "other": string[]
  },
  "culture"?: {
    "workStyle": string,
    "teamStructure": string,
    "communicationStyle": string,
    "workLifeBalance": string
  },
  "socialMedia"?: {
    "linkedin"?: string,
    "instagram"?: string,
    "facebook"?: string,
    "twitter"?: string,
    "youtube"?: string
  }
}`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.companies.delete")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`DELETE /api/companies/:id`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {t("api.documentation.interviews.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("api.documentation.interviews.description")}
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium">
                    {t("api.documentation.interviews.list")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`GET /api/interviews

Query Parameters:
- jobId: string
- candidateId: string
- interviewerId: string
- status: string
- type: string
- page: number
- limit: number`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.interviews.create")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`POST /api/interviews

Request Body:
{
  "jobId": string,
  "candidateId": string,
  "interviewerId": string,
  "type": "technical" | "behavioral" | "cultural" | "final",
  "status": "scheduled" | "completed" | "cancelled",
  "scheduledAt": string,
  "duration": number,
  "meetingLink": string,
  "meetingPassword": string,
  "requirements": string[],
  "questions": string[],
  "isRecorded": boolean,
  "isPrivate": boolean
}`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.interviews.update")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`PUT /api/interviews/:id

Request Body:
{
  "type"?: "technical" | "behavioral" | "cultural" | "final",
  "status"?: "scheduled" | "completed" | "cancelled",
  "scheduledAt"?: string,
  "duration"?: number,
  "meetingLink"?: string,
  "meetingPassword"?: string,
  "requirements"?: string[],
  "questions"?: string[],
  "isRecorded"?: boolean,
  "isPrivate"?: boolean,
  "completedAt"?: string,
  "feedback"?: {
    "rating": number,
    "strengths": string[],
    "weaknesses": string[],
    "notes": string,
    "recommendation": "hire" | "reject" | "maybe",
    "technicalScore": number,
    "communicationScore": number,
    "problemSolvingScore": number,
    "culturalFitScore": number,
    "isShared": boolean
  }
}`}
                    </code>
                  </pre>
                </div>

                <div>
                  <p className="font-medium">
                    {t("api.documentation.interviews.delete")}
                  </p>
                  <pre className="mt-2 rounded-lg bg-muted p-4">
                    <code>
                      {`DELETE /api/interviews/:id`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
} 