import { useState } from 'react'
import { JobAlert } from './jobs/JobAlert'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { toast } from 'sonner'

interface JobAlertDialogProps {
  onSave: (data: any) => void
}

export function JobAlertDialog({ onSave }: JobAlertDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSave = (data: any) => {
    onSave(data)
    toast.success('Alert saved successfully!')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Job Alert</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Job Alert</DialogTitle>
          <DialogDescription>
            Set up alerts for jobs that match your criteria
          </DialogDescription>
        </DialogHeader>
        <JobAlert 
          onSave={handleSave} 
          onCancel={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  )
} 