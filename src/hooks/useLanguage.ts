import { useTranslation } from 'react-i18next'

export function useLanguage() {
  const { t } = useTranslation()

  return {
    t
  }
} 