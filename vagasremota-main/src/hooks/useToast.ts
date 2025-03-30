import { useToast as useToastBase } from "@/components/ui/use-toast"

export function useToast() {
  const { toast } = useToastBase()

  return {
    toast: (props: {
      title: string
      description?: string
      variant?: "default" | "destructive"
    }) => {
      toast({
        ...props,
        duration: 5000,
      })
    },
  }
} 