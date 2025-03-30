import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Layout } from "@/components/Layout"
import { Home } from "@/pages/Home"
import { Login } from "@/pages/Login"
import { Register } from "@/pages/Register"
import { JobDetails } from "@/pages/JobDetails"
import { Profile } from "@/pages/Profile"
import { NotFound } from "@/pages/NotFound"
import { CandidateDashboard } from "@/pages/CandidateDashboard"
import { CompanyDashboard } from "@/pages/CompanyDashboard"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="vagas/:id" element={<JobDetails />} />
        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="candidato/dashboard"
          element={
            <ProtectedRoute>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="empresa/dashboard"
          element={
            <ProtectedRoute>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
} 