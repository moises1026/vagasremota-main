import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "@/hooks/useAuth"
import { LanguageProvider } from "@/hooks/useLanguage"
import { AppRoutes } from "@/routes"
import { Toaster } from "@/components/ui/toaster"

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
