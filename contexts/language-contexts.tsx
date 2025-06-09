"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "fr" | "es" | "de" | "pt" | "zh" | "ja"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.profile": "Profile",
    "nav.account": "Account",
    "nav.appearance": "Appearance",
    "nav.notifications": "Notifications",
    "nav.security": "Security",
    "nav.advanced": "Advanced",
    "nav.signOut": "Sign Out",

    // Common
    "common.save": "Save Changes",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.connect": "Connect",
    "common.disconnect": "Disconnect",
    "common.enabled": "Enabled",
    "common.disabled": "Disabled",
    "common.connected": "Connected",
    "common.notConnected": "Not connected",

    // Settings page
    "settings.title": "Settings",
    "settings.subtitle": "Manage your account settings and preferences",

    // Profile section
    "profile.title": "Profile Information",
    "profile.subtitle": "Update your personal information and profile picture",
    "profile.changePhoto": "Change Photo",
    "profile.firstName": "First Name",
    "profile.lastName": "Last Name",
    "profile.email": "Email Address",
    "profile.phone": "Phone Number",
    "profile.bio": "Bio",
    "profile.bioPlaceholder": "Write a short bio about yourself...",

    // Account section
    "account.title": "Account Settings",
    "account.subtitle": "Manage your account preferences and settings",
    "account.info": "Account Information",
    "account.username": "Username",
    "account.role": "Role",
    "account.connectedAccounts": "Connected Accounts",
    "account.dangerZone": "Danger Zone",
    "account.deleteAccount": "Delete Account",
    "account.deleteDescription": "Permanently delete your account and all of your data",
    "account.deleteConfirmTitle": "Are you absolutely sure?",
    "account.deleteConfirmDescription":
      "This action cannot be undone. This will permanently delete your account and remove all of your data from our servers.",

    // Appearance section
    "appearance.title": "Appearance",
    "appearance.subtitle": "Customize the appearance of the application",
    "appearance.theme": "Theme",
    "appearance.light": "Light",
    "appearance.dark": "Dark",
    "appearance.system": "System",
    "appearance.language": "Language",
    "appearance.accessibility": "Accessibility",
    "appearance.reduceMotion": "Reduce Motion",
    "appearance.reduceMotionDesc": "Reduce the amount of animations in the interface",
    "appearance.highContrast": "High Contrast",
    "appearance.highContrastDesc": "Increase contrast between elements",

    // Languages
    "language.english": "English",
    "language.french": "French",
    "language.german": "German",
    "language.spanish": "Spanish",
    "language.portuguese": "Portuguese",
    "language.chinese": "Chinese",
    "language.japanese": "Japanese",

    // Notifications section
    "notifications.title": "Notifications",
    "notifications.subtitle": "Manage how you receive notifications",
    "notifications.email": "Email Notifications",
    "notifications.emailDesc": "Receive notifications via email",
    "notifications.securityAlerts": "Security Alerts",
    "notifications.securityAlertsDesc": "Receive security alerts via email",
    "notifications.marketing": "Marketing Emails",
    "notifications.marketingDesc": "Receive marketing and promotional emails",
    "notifications.push": "Push Notifications",
    "notifications.pushDesc": "Receive push notifications on your devices",
    "notifications.preferences": "Notification Preferences",
    "notifications.newUser": "New User Registration",
    "notifications.newUserDesc": "When a new user registers in the system",
    "notifications.systemUpdates": "System Updates",
    "notifications.systemUpdatesDesc": "When system updates are available",

    // Security section
    "security.title": "Security",
    "security.subtitle": "Manage your security settings and authentication methods",
    "security.changePassword": "Change Password",
    "security.currentPassword": "Current Password",
    "security.newPassword": "New Password",
    "security.confirmPassword": "Confirm New Password",
    "security.updatePassword": "Update Password",
    "security.twoFactor": "Two-Factor Authentication",
    "security.twoFactorDesc": "Add an extra layer of security to your account",
    "security.backupCodes": "Backup Codes",
    "security.backupCodesDesc":
      "Save these backup codes in a secure place. You can use them to sign in if you lose access to your authenticator app.",
    "security.downloadBackup": "Download Backup Codes",
    "security.sessionManagement": "Session Management",
    "security.sessionTimeout": "Session Timeout (minutes)",
    "security.activeSessions": "Active Sessions",
    "security.signOutAll": "Sign Out All Devices",
    "security.scanQR": "Scan with authenticator app",
    "security.lastActive": "Last active",
    "security.justNow": "Just now",
    "security.current": "Current",

    // Advanced section
    "advanced.title": "Advanced Settings",
    "advanced.subtitle": "Configure advanced system settings",
    "advanced.apiAccess": "API Access",
    "advanced.enableApi": "Enable API Access",
    "advanced.enableApiDesc": "Allow external applications to access your data",
    "advanced.apiKey": "API Key",
    "advanced.regenerate": "Regenerate",
    "advanced.dataExport": "Data Export",
    "advanced.dataExportDesc": "Export all your data in various formats",
    "advanced.exportJson": "Export as JSON",
    "advanced.exportCsv": "Export as CSV",
    "advanced.exportPdf": "Export as PDF",
    "advanced.systemPreferences": "System Preferences",
    "advanced.analytics": "Usage Analytics",
    "advanced.analyticsDesc": "Allow us to collect anonymous usage data",
    "advanced.autoUpdates": "Automatic Updates",
    "advanced.autoUpdatesDesc": "Automatically update the application when new versions are available",
    "advanced.betaFeatures": "Beta Features",
    "advanced.betaFeaturesDesc": "Enable experimental features",

    // Roles
    "role.admin": "Administrator",
    "role.agent": "Agent",
    "role.user": "User",

    // Time
    "time.minutes": "minutes",
    "time.hour": "hour",
    "time.hours": "hours",
    "time.hoursAgo": "hours ago",
  },
  fr: {
    // Navigation
    "nav.profile": "Profil",
    "nav.account": "Compte",
    "nav.appearance": "Apparence",
    "nav.notifications": "Notifications",
    "nav.security": "Sécurité",
    "nav.advanced": "Avancé",
    "nav.signOut": "Se déconnecter",

    // Common
    "common.save": "Enregistrer les modifications",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.connect": "Connecter",
    "common.disconnect": "Déconnecter",
    "common.enabled": "Activé",
    "common.disabled": "Désactivé",
    "common.connected": "Connecté",
    "common.notConnected": "Non connecté",

    // Settings page
    "settings.title": "Paramètres",
    "settings.subtitle": "Gérez vos paramètres de compte et préférences",

    // Profile section
    "profile.title": "Informations du profil",
    "profile.subtitle": "Mettez à jour vos informations personnelles et photo de profil",
    "profile.changePhoto": "Changer la photo",
    "profile.firstName": "Prénom",
    "profile.lastName": "Nom",
    "profile.email": "Adresse e-mail",
    "profile.phone": "Numéro de téléphone",
    "profile.bio": "Biographie",
    "profile.bioPlaceholder": "Écrivez une courte biographie sur vous...",

    // Account section
    "account.title": "Paramètres du compte",
    "account.subtitle": "Gérez vos préférences et paramètres de compte",
    "account.info": "Informations du compte",
    "account.username": "Nom d'utilisateur",
    "account.role": "Rôle",
    "account.connectedAccounts": "Comptes connectés",
    "account.dangerZone": "Zone de danger",
    "account.deleteAccount": "Supprimer le compte",
    "account.deleteDescription": "Supprimez définitivement votre compte et toutes vos données",
    "account.deleteConfirmTitle": "Êtes-vous absolument sûr ?",
    "account.deleteConfirmDescription":
      "Cette action ne peut pas être annulée. Cela supprimera définitivement votre compte et supprimera toutes vos données de nos serveurs.",

    // Appearance section
    "appearance.title": "Apparence",
    "appearance.subtitle": "Personnalisez l'apparence de l'application",
    "appearance.theme": "Thème",
    "appearance.light": "Clair",
    "appearance.dark": "Sombre",
    "appearance.system": "Système",
    "appearance.language": "Langue",
    "appearance.accessibility": "Accessibilité",
    "appearance.reduceMotion": "Réduire les animations",
    "appearance.reduceMotionDesc": "Réduire la quantité d'animations dans l'interface",
    "appearance.highContrast": "Contraste élevé",
    "appearance.highContrastDesc": "Augmenter le contraste entre les éléments",

    // Languages
    "language.english": "Anglais",
    "language.french": "Français",
    "language.german": "Allemand",
    "language.spanish": "Espagnol",
    "language.portuguese": "Portugais",
    "language.chinese": "Chinois",
    "language.japanese": "Japonais",

    // Notifications section
    "notifications.title": "Notifications",
    "notifications.subtitle": "Gérez comment vous recevez les notifications",
    "notifications.email": "Notifications par e-mail",
    "notifications.emailDesc": "Recevoir des notifications par e-mail",
    "notifications.securityAlerts": "Alertes de sécurité",
    "notifications.securityAlertsDesc": "Recevoir des alertes de sécurité par e-mail",
    "notifications.marketing": "E-mails marketing",
    "notifications.marketingDesc": "Recevoir des e-mails marketing et promotionnels",
    "notifications.push": "Notifications push",
    "notifications.pushDesc": "Recevoir des notifications push sur vos appareils",
    "notifications.preferences": "Préférences de notification",
    "notifications.newUser": "Inscription d'un nouvel utilisateur",
    "notifications.newUserDesc": "Quand un nouvel utilisateur s'inscrit dans le système",
    "notifications.systemUpdates": "Mises à jour système",
    "notifications.systemUpdatesDesc": "Quand des mises à jour système sont disponibles",

    // Security section
    "security.title": "Sécurité",
    "security.subtitle": "Gérez vos paramètres de sécurité et méthodes d'authentification",
    "security.changePassword": "Changer le mot de passe",
    "security.currentPassword": "Mot de passe actuel",
    "security.newPassword": "Nouveau mot de passe",
    "security.confirmPassword": "Confirmer le nouveau mot de passe",
    "security.updatePassword": "Mettre à jour le mot de passe",
    "security.twoFactor": "Authentification à deux facteurs",
    "security.twoFactorDesc": "Ajoutez une couche de sécurité supplémentaire à votre compte",
    "security.backupCodes": "Codes de sauvegarde",
    "security.backupCodesDesc":
      "Enregistrez ces codes de sauvegarde dans un endroit sûr. Vous pouvez les utiliser pour vous connecter si vous perdez l'accès à votre application d'authentification.",
    "security.downloadBackup": "Télécharger les codes de sauvegarde",
    "security.sessionManagement": "Gestion des sessions",
    "security.sessionTimeout": "Délai de session (minutes)",
    "security.activeSessions": "Sessions actives",
    "security.signOutAll": "Déconnecter tous les appareils",
    "security.scanQR": "Scanner avec l'application d'authentification",
    "security.lastActive": "Dernière activité",
    "security.justNow": "À l'instant",
    "security.current": "Actuel",

    // Advanced section
    "advanced.title": "Paramètres avancés",
    "advanced.subtitle": "Configurez les paramètres système avancés",
    "advanced.apiAccess": "Accès à l'API",
    "advanced.enableApi": "Activer l'accès à l'API",
    "advanced.enableApiDesc": "Permettre aux applications externes d'accéder à vos données",
    "advanced.apiKey": "Clé d'API",
    "advanced.regenerate": "Régénérer",
    "advanced.dataExport": "Export de données",
    "advanced.dataExportDesc": "Exportez toutes vos données dans différents formats",
    "advanced.exportJson": "Exporter en JSON",
    "advanced.exportCsv": "Exporter en CSV",
    "advanced.exportPdf": "Exporter en PDF",
    "advanced.systemPreferences": "Préférences système",
    "advanced.analytics": "Analyses d'utilisation",
    "advanced.analyticsDesc": "Nous permettre de collecter des données d'utilisation anonymes",
    "advanced.autoUpdates": "Mises à jour automatiques",
    "advanced.autoUpdatesDesc":
      "Mettre à jour automatiquement l'application quand de nouvelles versions sont disponibles",
    "advanced.betaFeatures": "Fonctionnalités bêta",
    "advanced.betaFeaturesDesc": "Activer les fonctionnalités expérimentales",

    // Roles
    "role.admin": "Administrateur",
    "role.agent": "Agent",
    "role.user": "Utilisateur",

    // Time
    "time.minutes": "minutes",
    "time.hour": "heure",
    "time.hours": "heures",
    "time.hoursAgo": "il y a",
  },
  es: {
    // Navigation
    "nav.profile": "Perfil",
    "nav.account": "Cuenta",
    "nav.appearance": "Apariencia",
    "nav.notifications": "Notificaciones",
    "nav.security": "Seguridad",
    "nav.advanced": "Avanzado",
    "nav.signOut": "Cerrar sesión",

    // Common
    "common.save": "Guardar cambios",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.connect": "Conectar",
    "common.disconnect": "Desconectar",
    "common.enabled": "Habilitado",
    "common.disabled": "Deshabilitado",
    "common.connected": "Conectado",
    "common.notConnected": "No conectado",

    // Settings page
    "settings.title": "Configuración",
    "settings.subtitle": "Gestiona la configuración de tu cuenta y preferencias",

    // Languages
    "language.english": "Inglés",
    "language.french": "Francés",
    "language.german": "Alemán",
    "language.spanish": "Español",
    "language.portuguese": "Portugués",
    "language.chinese": "Chino",
    "language.japanese": "Japonés",

    // Add more Spanish translations as needed...
  },
  de: {
    // Navigation
    "nav.profile": "Profil",
    "nav.account": "Konto",
    "nav.appearance": "Erscheinungsbild",
    "nav.notifications": "Benachrichtigungen",
    "nav.security": "Sicherheit",
    "nav.advanced": "Erweitert",
    "nav.signOut": "Abmelden",

    // Languages
    "language.english": "Englisch",
    "language.french": "Französisch",
    "language.german": "Deutsch",
    "language.spanish": "Spanisch",
    "language.portuguese": "Portugiesisch",
    "language.chinese": "Chinesisch",
    "language.japanese": "Japanisch",

    // Add more German translations as needed...
  },
  pt: {
    // Languages
    "language.english": "Inglês",
    "language.french": "Francês",
    "language.german": "Alemão",
    "language.spanish": "Espanhol",
    "language.portuguese": "Português",
    "language.chinese": "Chinês",
    "language.japanese": "Japonês",

    // Add more Portuguese translations as needed...
  },
  zh: {
    // Languages
    "language.english": "英语",
    "language.french": "法语",
    "language.german": "德语",
    "language.spanish": "西班牙语",
    "language.portuguese": "葡萄牙语",
    "language.chinese": "中文",
    "language.japanese": "日语",

    // Add more Chinese translations as needed...
  },
  ja: {
    // Languages
    "language.english": "英語",
    "language.french": "フランス語",
    "language.german": "ドイツ語",
    "language.spanish": "スペイン語",
    "language.portuguese": "ポルトガル語",
    "language.chinese": "中国語",
    "language.japanese": "日本語",

    // Add more Japanese translations as needed...
  },
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
