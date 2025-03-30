import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { doc, getDoc, updateDoc, increment } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Job } from "@/types/job"

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { user } = useAuth()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [showApplyDialog, setShowApplyDialog] = useState(false)

  useEffect(() => {
    loadJob()
  }, [id])

  async function loadJob() {
    if (!id) return

    try {
      const jobRef = doc(db, "jobs", id)
      const jobDoc = await getDoc(jobRef)

      if (!jobDoc.exists()) {
        navigate("/")
        return
      }

      const jobData = {
        id: jobDoc.id,
        ...jobDoc.data(),
        createdAt: jobDoc.data().createdAt?.toDate(),
        updatedAt: jobDoc.data().updatedAt?.toDate(),
      } as Job

      setJob(jobData)

      // Incrementa o contador de visualizações
      await updateDoc(jobRef, {
        viewsCount: increment(1),
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao carregar vaga"))
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">{t.common.loading}</div>
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">{t.errors.notFound}</h2>
        <Button onClick={() => navigate("/")}>Voltar para Home</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <Badge variant={job.type === "remote" ? "default" : "secondary"}>
              {job.type === "remote" ? t.jobs.remote : t.jobs.hybrid}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>{job.company.name}</span>
            <span>•</span>
            <span>{job.location}</span>
            <span>•</span>
            <span>{t.jobs.level[job.level]}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Description */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{t.jobs.description}</h2>
              <p className="whitespace-pre-wrap">{job.description}</p>
            </Card>

            {/* Requirements */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{t.jobs.requirements}</h2>
              <ul className="list-disc list-inside space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </Card>

            {/* Benefits */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t.jobs.benefits}</h2>
              <ul className="list-disc list-inside space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{t.jobs.salary}</h3>
                <p className="text-2xl font-bold">
                  R$ {job.salary.min.toLocaleString()} - R$ {job.salary.max.toLocaleString()}
                </p>
              </div>

              <Separator className="my-6" />

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{t.jobs.skills}</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => setShowApplyDialog(true)}
                disabled={!user}
              >
                {user ? t.jobs.apply : t.auth.signIn}
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.jobs.apply}</DialogTitle>
            <DialogDescription>
              {job.title} - {job.company.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Você está prestes a se candidatar para esta vaga. Deseja continuar?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplyDialog(false)}>
              {t.common.cancel}
            </Button>
            <Button>Confirmar Candidatura</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 