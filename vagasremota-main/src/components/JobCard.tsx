import { Link } from "react-router-dom"
import { useLanguage } from "@/hooks/useLanguage"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Job } from "@/types/job"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const { t } = useLanguage()

  return (
    <Link to={`/vagas/${job.id}`}>
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <Badge variant={job.type === "remote" ? "default" : "secondary"}>
            {job.type === "remote" ? t.jobs.remote : t.jobs.hybrid}
          </Badge>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant="outline">+{job.skills.length - 3}</Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>{job.company.name}</span>
            <span>•</span>
            <span>{job.location}</span>
          </div>
          <span>
            R$ {job.salary.min.toLocaleString()} - R$ {job.salary.max.toLocaleString()}
          </span>
        </div>
      </Card>
    </Link>
  )
} 