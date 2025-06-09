"use client"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-contexts"

type Language = "en" | "fr" | "es" | "de" | "pt" | "zh" | "ja"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: "en" as Language, name: t("language.english"), flag: "🇺🇸" },
    { code: "fr" as Language, name: t("language.french"), flag: "🇫🇷" },
    { code: "es" as Language, name: t("language.spanish"), flag: "🇪🇸" },
    { code: "de" as Language, name: t("language.german"), flag: "🇩🇪" },
    { code: "pt" as Language, name: t("language.portuguese"), flag: "🇵🇹" },
    { code: "zh" as Language, name: t("language.chinese"), flag: "🇨🇳" },
    { code: "ja" as Language, name: t("language.japanese"), flag: "🇯🇵" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentLanguage?.flag} {currentLanguage?.name}
          </span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 ${language === lang.code ? "bg-accent" : ""}`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
