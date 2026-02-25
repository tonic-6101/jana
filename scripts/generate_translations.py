#!/usr/bin/env python3
"""Generate translation CSV files for all supported languages.

Usage:
    python scripts/generate_translations.py

Reads source strings from jana/translations/ar.csv and generates
translation files for all languages matching the orga app's coverage.
"""

import csv
import os
import sys

# All language codes matching orga app coverage
LANGUAGES = {
    # --- Major European ---
    "fr": "French",
    "de": "German",
    "es": "Spanish",
    "it": "Italian",
    "pt": "Portuguese",
    "pt-BR": "Portuguese (Brazil)",
    "nl": "Dutch",
    "sv": "Swedish",
    "da": "Danish",
    "da-DK": "Danish (Denmark)",
    "no": "Norwegian",
    "fi": "Finnish",
    "pl": "Polish",
    "cs": "Czech",
    "cz": "Czech (alt)",
    "sk": "Slovak",
    "hu": "Hungarian",
    "ro": "Romanian",
    "bg": "Bulgarian",
    "hr": "Croatian",
    "sl": "Slovenian",
    "sr": "Serbian",
    "sr-BA": "Serbian (Bosnia)",
    "sr-SP": "Serbian (Serbia)",
    "sq": "Albanian",
    "mk": "Macedonian",
    "el": "Greek",
    "et": "Estonian",
    "lv": "Latvian",
    "lt": "Lithuanian",
    "is": "Icelandic",
    "ca": "Catalan",
    "af": "Afrikaans",
    "en-GB": "English (UK)",
    "en-US": "English (US)",
    # --- East Asian ---
    "zh": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    "ja": "Japanese",
    "ko": "Korean",
    # --- South Asian ---
    "hi": "Hindi",
    "bn": "Bengali",
    "ta": "Tamil",
    "te": "Telugu",
    "ml": "Malayalam",
    "kn": "Kannada",
    "gu": "Gujarati",
    "mr": "Marathi",
    "si": "Sinhala",
    "ur": "Urdu",
    # --- Southeast Asian ---
    "id": "Indonesian",
    "ms": "Malay",
    "th": "Thai",
    "vi": "Vietnamese",
    "fil": "Filipino",
    "km": "Khmer",
    "my": "Burmese",
    "lo": "Lao",
    # --- Middle East / Central Asia ---
    "he": "Hebrew",
    "ku": "Kurdish",
    "ps": "Pashto",
    "uz": "Uzbek",
    # --- East European / Central Asian ---
    "ru": "Russian",
    "uk": "Ukrainian",
    # --- African ---
    "sw": "Swahili",
    "am": "Amharic",
    "rw": "Kinyarwanda",
    # --- Other ---
    "se": "Northern Sami",
    "quc": "K'iche'",
}

# ──────────────────────────────────────────────────────────────
# Translation dictionaries per language
# Key = English source string, Value = translated string
# ──────────────────────────────────────────────────────────────

TRANSLATIONS = {}

# ── French ──
TRANSLATIONS["fr"] = {
    "AI responses may be less accurate in languages other than English.": "Les réponses de l'IA peuvent être moins précises dans les langues autres que l'anglais.",
    "Jana is an AI assistant. Responses are generated, not authoritative. Document changes require your confirmation before saving.": "Jana est une assistante IA. Les réponses sont générées et ne font pas autorité. Les modifications de documents nécessitent votre confirmation avant l'enregistrement.",
    "Dismiss": "Fermer",
    "Open Jana AI Assistant": "Ouvrir l'assistante Jana IA",
    "Chats": "Discussions",
    "Select Agent": "Sélectionner l'agent",
    "Chat History": "Historique des discussions",
    "New Chat": "Nouvelle discussion",
    "Settings": "Paramètres",
    "Close": "Fermer",
    "No conversations yet": "Aucune conversation pour le moment",
    "Start a new chat to begin.": "Commencez une nouvelle discussion.",
    "New conversation": "Nouvelle conversation",
    "Welcome to Jana!": "Bienvenue sur Jana !",
    "Connect your account to get started:": "Connectez votre compte pour commencer :",
    "Connect with {0}": "Se connecter avec {0}",
    "or": "ou",
    "To get started&#44; add your AI provider key.": "Pour commencer, ajoutez votre clé de fournisseur IA.",
    "Open Jana Settings": "Ouvrir les paramètres Jana",
    "Copy": "Copier",
    "Ask Jana...": "Demandez à Jana...",
    "Stop generating": "Arrêter la génération",
    "Copied to clipboard": "Copié dans le presse-papiers",
    "just now": "à l'instant",
    "Sorry&#44; something went wrong. Please try again.": "Désolé, une erreur est survenue. Veuillez réessayer.",
    "Start a conversation": "Commencer une conversation",
    "Type a message below to begin.": "Écrivez un message ci-dessous pour commencer.",
    "Type a message...": "Écrivez un message...",
    "Press Enter to send&#44; Shift+Enter for new line": "Appuyez sur Entrée pour envoyer, Maj+Entrée pour un retour à la ligne",
    "Untitled Chat": "Discussion sans titre",
    "Rename": "Renommer",
    "Archive": "Archiver",
    "Delete": "Supprimer",
    "Delete this conversation? This cannot be undone.": "Supprimer cette conversation ? Cette action est irréversible.",
    "Chat": "Discussion",
    "Save": "Enregistrer",
    "General": "Général",
    "AI Provider": "Fournisseur IA",
    "Default Provider": "Fournisseur par défaut",
    "Default Model": "Modèle par défaut",
    "Max Context Tokens": "Tokens de contexte maximum",
    "Maximum tokens for the LLM context window (512–128000)": "Nombre maximum de tokens pour la fenêtre de contexte du LLM (512–128000)",
    "Behavior": "Comportement",
    "Enable Streaming": "Activer le streaming",
    "Stream AI responses token-by-token for a real-time feel": "Diffuser les réponses IA token par token pour un effet temps réel",
    "Enable Tool Calling": "Activer l'appel d'outils",
    "Allow agents to call Frappe API tools during conversations": "Permettre aux agents d'appeler les outils API Frappe pendant les conversations",
    "Providers": "Fournisseurs",
    "Configured Providers": "Fournisseurs configurés",
    "Click a provider to expand and edit all settings.": "Cliquez sur un fournisseur pour le développer et modifier ses paramètres.",
    "Add Provider": "Ajouter un fournisseur",
    "Cancel": "Annuler",
    "New Provider": "Nouveau fournisseur",
    "Provider Name": "Nom du fournisseur",
    "Provider Type": "Type de fournisseur",
    "Authentication": "Authentification",
    "API Key": "Clé API",
    "OAuth": "OAuth",
    "Paste your API key": "Collez votre clé API",
    "API Base URL": "URL de base de l'API",
    "PII Masking": "Masquage des données personnelles",
    "Global Default": "Défaut global",
    "Always On": "Toujours activé",
    "Always Off": "Toujours désactivé",
    "Enabled": "Activé",
    "Is Default": "Par défaut",
    "Create Provider": "Créer un fournisseur",
    "No providers configured.": "Aucun fournisseur configuré.",
    "Capabilities": "Capacités",
    "AI Capabilities": "Capacités IA",
    "Control what Jana is allowed to do in conversations": "Contrôlez ce que Jana est autorisée à faire dans les conversations",
    "Chat / Q&A": "Discussion / Q&R",
    "Basic conversational AI": "IA conversationnelle de base",
    "Read Documents": "Lire les documents",
    "Allow AI to read Frappe documents for context": "Autoriser l'IA à lire les documents Frappe pour le contexte",
    "Draft Content": "Rédiger du contenu",
    "Generate emails&#44; descriptions&#44; and summaries": "Générer des e-mails, descriptions et résumés",
    "Create Documents": "Créer des documents",
    "Allow AI to create new records in the system": "Autoriser l'IA à créer de nouveaux enregistrements dans le système",
    "Navigate to Pages": "Naviguer vers les pages",
    "Allow AI to direct users to specific pages or reports": "Autoriser l'IA à diriger les utilisateurs vers des pages ou rapports spécifiques",
    "Run Report Queries": "Exécuter des requêtes de rapports",
    "Allow AI to query reports and return data": "Autoriser l'IA à interroger les rapports et retourner des données",
    "Modify Documents": "Modifier les documents",
    "Allow AI to change existing records — use with caution": "Autoriser l'IA à modifier les enregistrements existants — à utiliser avec prudence",
    "Limits": "Limites",
    "Rate Limits": "Limites de débit",
    "Messages per User per Hour": "Messages par utilisateur par heure",
    "Set to 0 for unlimited": "Définir à 0 pour illimité",
    "Session Retention (days)": "Conservation des sessions (jours)",
    "Auto-archive sessions older than this. Set to 0 to keep forever.": "Archiver automatiquement les sessions plus anciennes. Définir à 0 pour les conserver indéfiniment.",
    "Privacy": "Confidentialité",
    "Auto-Mask PII": "Masquage automatique des données personnelles",
    "Knowledge": "Connaissances",
    "Business Context": "Contexte métier",
    "Business Description": "Description de l'entreprise",
    "Knowledge Token Budget": "Budget de tokens de connaissances",
    "My Keys": "Mes clés",
    "Your API Keys": "Vos clés API",
    "Add a Key": "Ajouter une clé",
    "Add Key": "Ajouter une clé",
    "OAuth Connections": "Connexions OAuth",
    "Connected": "Connecté",
    "Not connected": "Non connecté",
    "Disconnect": "Déconnecter",
    "Connect": "Connecter",
    "Settings saved": "Paramètres enregistrés",
    "Failed to save settings": "Échec de l'enregistrement des paramètres",
    "Connection successful": "Connexion réussie",
    "Provider saved": "Fournisseur enregistré",
    "Provider deleted": "Fournisseur supprimé",
    "Provider created": "Fournisseur créé",
    "API key added": "Clé API ajoutée",
    "API key removed": "Clé API supprimée",
    "Disconnected": "Déconnecté",
    "Default": "Par défaut",
    "Disabled": "Désactivé",
    "Connection": "Connexion",
    "Models": "Modèles",
    "Available Models": "Modèles disponibles",
    "Test Connection": "Tester la connexion",
    "OK": "OK",
    "Save Provider": "Enregistrer le fournisseur",
    "Optional": "Optionnel",
    "Back to Chat": "Retour à la discussion",
    "Agents": "Agents",
    "New Agent": "Nouvel agent",
    "Retry": "Réessayer",
    "No agents yet": "Aucun agent pour le moment",
    "Create your first AI agent to get started.": "Créez votre premier agent IA pour commencer.",
    "No description": "Aucune description",
    "Basic Information": "Informations de base",
    "Agent Name": "Nom de l'agent",
    "Description": "Description",
    "System Prompt": "Prompt système",
    "Model Configuration": "Configuration du modèle",
    "Provider": "Fournisseur",
    "Model": "Modèle",
    "Temperature": "Température",
    "Precise": "Précis",
    "Creative": "Créatif",
    "Max Tokens": "Tokens maximum",
    "Tools": "Outils",
    "Remove": "Supprimer",
    "Advanced": "Avancé",
    "Mark as Template": "Marquer comme modèle",
    "Agent saved": "Agent enregistré",
    "Agent deleted": "Agent supprimé",
    "Content Generation": "Génération de contenu",
    "Draft Email": "Rédiger un e-mail",
    "DocType": "Type de document",
    "Document Name": "Nom du document",
    "Email Type": "Type d'e-mail",
    "Payment Reminder": "Rappel de paiement",
    "Inquiry": "Demande",
    "Follow Up": "Suivi",
    "Thank You": "Merci",
    "Complaint / Issue": "Plainte / Problème",
    "Additional Instructions": "Instructions supplémentaires",
    "Generate Description": "Générer une description",
    "Style": "Style",
    "Professional": "Professionnel",
    "Technical": "Technique",
    "Brief Summary": "Résumé bref",
    "Generate": "Générer",
    "Summarise Report": "Résumer le rapport",
    "Report Name": "Nom du rapport",
    "Summarise": "Résumer",
    "Result": "Résultat",
    "tokens": "tokens",
    "Copied": "Copié",
    "Subject": "Objet",
    "Body": "Corps",
    "Email Draft": "Brouillon d'e-mail",
    "Report Summary": "Résumé du rapport",
    "Content": "Contenu",
    "Rate limit exceeded. You can send up to {0} messages per hour.": "Limite de débit dépassée. Vous pouvez envoyer jusqu'à {0} messages par heure.",
    "Rate Limit Exceeded": "Limite de débit dépassée",
    "An error occurred": "Une erreur est survenue",
    "Streaming failed": "Échec du streaming",
    "Session ID is required": "L'identifiant de session est requis",
    "Message content is required": "Le contenu du message est requis",
    "Title is required": "Le titre est requis",
    "Provider name is required": "Le nom du fournisseur est requis",
    "Provider {0} does not exist": "Le fournisseur {0} n'existe pas",
    "Agent name is required": "Le nom de l'agent est requis",
    "Agent {0} does not exist": "L'agent {0} n'existe pas",
    "Article content cannot be empty": "Le contenu de l'article ne peut pas être vide",
    "Feature Disabled": "Fonctionnalité désactivée",
    "Permission denied": "Permission refusée",
    "Document does not exist": "Le document n'existe pas",
    "— Select —": "— Sélectionner —",
}

# ── German ──
TRANSLATIONS["de"] = {
    "AI responses may be less accurate in languages other than English.": "KI-Antworten können in anderen Sprachen als Englisch weniger genau sein.",
    "Jana is an AI assistant. Responses are generated, not authoritative. Document changes require your confirmation before saving.": "Jana ist eine KI-Assistentin. Antworten sind generiert und nicht verbindlich. Dokumentänderungen erfordern Ihre Bestätigung vor dem Speichern.",
    "Dismiss": "Schließen",
    "Open Jana AI Assistant": "Jana KI-Assistentin öffnen",
    "Chats": "Chats",
    "Select Agent": "Agent auswählen",
    "Chat History": "Chat-Verlauf",
    "New Chat": "Neuer Chat",
    "Settings": "Einstellungen",
    "Close": "Schließen",
    "No conversations yet": "Noch keine Gespräche",
    "Start a new chat to begin.": "Starten Sie einen neuen Chat.",
    "Welcome to Jana!": "Willkommen bei Jana!",
    "Connect with {0}": "Verbinden mit {0}",
    "or": "oder",
    "Open Jana Settings": "Jana-Einstellungen öffnen",
    "Copy": "Kopieren",
    "Ask Jana...": "Jana fragen...",
    "Stop generating": "Generierung stoppen",
    "Copied to clipboard": "In die Zwischenablage kopiert",
    "just now": "gerade eben",
    "Untitled Chat": "Chat ohne Titel",
    "Rename": "Umbenennen",
    "Archive": "Archivieren",
    "Delete": "Löschen",
    "Save": "Speichern",
    "General": "Allgemein",
    "AI Provider": "KI-Anbieter",
    "Default Provider": "Standardanbieter",
    "Default Model": "Standardmodell",
    "Behavior": "Verhalten",
    "Enable Streaming": "Streaming aktivieren",
    "Enable Tool Calling": "Tool-Aufrufe aktivieren",
    "Providers": "Anbieter",
    "Add Provider": "Anbieter hinzufügen",
    "Cancel": "Abbrechen",
    "Provider Name": "Anbietername",
    "Provider Type": "Anbietertyp",
    "Authentication": "Authentifizierung",
    "API Key": "API-Schlüssel",
    "PII Masking": "PII-Maskierung",
    "Global Default": "Globaler Standard",
    "Always On": "Immer aktiv",
    "Always Off": "Immer deaktiviert",
    "Enabled": "Aktiviert",
    "Capabilities": "Fähigkeiten",
    "AI Capabilities": "KI-Fähigkeiten",
    "Read Documents": "Dokumente lesen",
    "Draft Content": "Inhalt entwerfen",
    "Create Documents": "Dokumente erstellen",
    "Navigate to Pages": "Zu Seiten navigieren",
    "Run Report Queries": "Berichtsabfragen ausführen",
    "Modify Documents": "Dokumente ändern",
    "Limits": "Limits",
    "Rate Limits": "Ratenbegrenzungen",
    "Privacy": "Datenschutz",
    "Knowledge": "Wissen",
    "Business Description": "Geschäftsbeschreibung",
    "My Keys": "Meine Schlüssel",
    "Connected": "Verbunden",
    "Not connected": "Nicht verbunden",
    "Disconnect": "Trennen",
    "Connect": "Verbinden",
    "Settings saved": "Einstellungen gespeichert",
    "Connection successful": "Verbindung erfolgreich",
    "Provider saved": "Anbieter gespeichert",
    "Provider deleted": "Anbieter gelöscht",
    "Provider created": "Anbieter erstellt",
    "Default": "Standard",
    "Disabled": "Deaktiviert",
    "Models": "Modelle",
    "Test Connection": "Verbindung testen",
    "Save Provider": "Anbieter speichern",
    "Optional": "Optional",
    "Agents": "Agenten",
    "New Agent": "Neuer Agent",
    "Retry": "Erneut versuchen",
    "No agents yet": "Noch keine Agenten",
    "Agent Name": "Agentenname",
    "Description": "Beschreibung",
    "System Prompt": "System-Prompt",
    "Provider": "Anbieter",
    "Model": "Modell",
    "Temperature": "Temperatur",
    "Precise": "Präzise",
    "Creative": "Kreativ",
    "Tools": "Werkzeuge",
    "Remove": "Entfernen",
    "Advanced": "Erweitert",
    "Agent saved": "Agent gespeichert",
    "Agent deleted": "Agent gelöscht",
    "Content Generation": "Inhaltserstellung",
    "Draft Email": "E-Mail entwerfen",
    "DocType": "DocType",
    "Document Name": "Dokumentname",
    "Email Type": "E-Mail-Typ",
    "Payment Reminder": "Zahlungserinnerung",
    "Inquiry": "Anfrage",
    "Follow Up": "Nachfassen",
    "Thank You": "Danke",
    "Generate": "Generieren",
    "Report Name": "Berichtsname",
    "Result": "Ergebnis",
    "tokens": "Tokens",
    "Copied": "Kopiert",
    "Subject": "Betreff",
    "Body": "Text",
    "Content": "Inhalt",
    "An error occurred": "Ein Fehler ist aufgetreten",
    "Permission denied": "Zugriff verweigert",
    "Document does not exist": "Dokument existiert nicht",
    "— Select —": "— Auswählen —",
    "Chat": "Chat",
}

# ── Spanish ──
TRANSLATIONS["es"] = {
    "AI responses may be less accurate in languages other than English.": "Las respuestas de IA pueden ser menos precisas en idiomas distintos al inglés.",
    "Jana is an AI assistant. Responses are generated, not authoritative. Document changes require your confirmation before saving.": "Jana es una asistente de IA. Las respuestas son generadas y no son autoritativas. Los cambios en documentos requieren su confirmación antes de guardar.",
    "Dismiss": "Cerrar",
    "Open Jana AI Assistant": "Abrir asistente Jana IA",
    "Chats": "Chats",
    "Select Agent": "Seleccionar agente",
    "Chat History": "Historial de chats",
    "New Chat": "Nuevo chat",
    "Settings": "Configuración",
    "Close": "Cerrar",
    "No conversations yet": "Sin conversaciones aún",
    "Welcome to Jana!": "¡Bienvenido a Jana!",
    "or": "o",
    "Copy": "Copiar",
    "Ask Jana...": "Pregunta a Jana...",
    "Stop generating": "Detener generación",
    "just now": "ahora mismo",
    "Untitled Chat": "Chat sin título",
    "Rename": "Renombrar",
    "Archive": "Archivar",
    "Delete": "Eliminar",
    "Save": "Guardar",
    "General": "General",
    "AI Provider": "Proveedor de IA",
    "Default Provider": "Proveedor predeterminado",
    "Default Model": "Modelo predeterminado",
    "Enable Streaming": "Habilitar streaming",
    "Providers": "Proveedores",
    "Add Provider": "Agregar proveedor",
    "Cancel": "Cancelar",
    "Provider Name": "Nombre del proveedor",
    "Authentication": "Autenticación",
    "API Key": "Clave API",
    "Enabled": "Habilitado",
    "Capabilities": "Capacidades",
    "Read Documents": "Leer documentos",
    "Create Documents": "Crear documentos",
    "Modify Documents": "Modificar documentos",
    "Limits": "Límites",
    "Privacy": "Privacidad",
    "Knowledge": "Conocimiento",
    "My Keys": "Mis claves",
    "Connected": "Conectado",
    "Not connected": "No conectado",
    "Settings saved": "Configuración guardada",
    "Connection successful": "Conexión exitosa",
    "Default": "Predeterminado",
    "Disabled": "Deshabilitado",
    "Models": "Modelos",
    "Agents": "Agentes",
    "New Agent": "Nuevo agente",
    "Agent Name": "Nombre del agente",
    "Description": "Descripción",
    "Provider": "Proveedor",
    "Model": "Modelo",
    "Temperature": "Temperatura",
    "Tools": "Herramientas",
    "Remove": "Eliminar",
    "Agent saved": "Agente guardado",
    "Content Generation": "Generación de contenido",
    "Draft Email": "Redactar correo",
    "Document Name": "Nombre del documento",
    "Generate": "Generar",
    "Result": "Resultado",
    "Copied": "Copiado",
    "Subject": "Asunto",
    "Content": "Contenido",
    "An error occurred": "Ocurrió un error",
    "Permission denied": "Permiso denegado",
    "Chat": "Chat",
    "— Select —": "— Seleccionar —",
}

# Spanish variants inherit from es
for variant in ("es-AR", "es-BO", "es-CL", "es-DO", "es-EC", "es-MX", "es-NI", "es-PE"):
    TRANSLATIONS[variant] = dict(TRANSLATIONS["es"])

# ── Portuguese ──
TRANSLATIONS["pt"] = {
    "AI responses may be less accurate in languages other than English.": "As respostas de IA podem ser menos precisas em idiomas diferentes do inglês.",
    "Jana is an AI assistant. Responses are generated, not authoritative. Document changes require your confirmation before saving.": "Jana é uma assistente de IA. As respostas são geradas e não são oficiais. Alterações em documentos requerem a sua confirmação antes de guardar.",
    "Dismiss": "Fechar", "Settings": "Definições", "Close": "Fechar", "Save": "Guardar",
    "New Chat": "Nova conversa", "Copy": "Copiar", "Delete": "Eliminar", "Cancel": "Cancelar",
    "General": "Geral", "Agents": "Agentes", "Provider": "Fornecedor", "Model": "Modelo",
    "Tools": "Ferramentas", "Content": "Conteúdo", "Generate": "Gerar", "Result": "Resultado",
    "Connected": "Conectado", "Disabled": "Desativado", "Enabled": "Ativado",
    "Knowledge": "Conhecimento", "Privacy": "Privacidade", "Limits": "Limites",
    "Chat": "Conversa", "— Select —": "— Selecionar —",
}
TRANSLATIONS["pt-BR"] = dict(TRANSLATIONS["pt"])
TRANSLATIONS["pt-BR"].update({
    "Jana is an AI assistant. Responses are generated, not authoritative. Document changes require your confirmation before saving.": "Jana é uma assistente de IA. As respostas são geradas e não são oficiais. Alterações em documentos requerem a sua confirmação antes de salvar.",
    "Save": "Salvar", "Settings": "Configurações",
})

# ── Italian ──
TRANSLATIONS["it"] = {
    "AI responses may be less accurate in languages other than English.": "Le risposte dell'IA potrebbero essere meno accurate in lingue diverse dall'inglese.",
    "Dismiss": "Chiudi", "Settings": "Impostazioni", "Close": "Chiudi", "Save": "Salva",
    "New Chat": "Nuova chat", "Copy": "Copia", "Delete": "Elimina", "Cancel": "Annulla",
    "General": "Generale", "Agents": "Agenti", "Provider": "Fornitore", "Model": "Modello",
    "Tools": "Strumenti", "Content": "Contenuto", "Generate": "Genera", "Result": "Risultato",
    "Connected": "Connesso", "Disabled": "Disabilitato", "Enabled": "Abilitato",
    "Knowledge": "Conoscenza", "Privacy": "Privacy", "Limits": "Limiti",
    "Chat": "Chat", "— Select —": "— Seleziona —",
}

# ── Dutch ──
TRANSLATIONS["nl"] = {
    "AI responses may be less accurate in languages other than English.": "AI-antwoorden kunnen minder nauwkeurig zijn in andere talen dan Engels.",
    "Dismiss": "Sluiten", "Settings": "Instellingen", "Close": "Sluiten", "Save": "Opslaan",
    "New Chat": "Nieuw gesprek", "Copy": "Kopiëren", "Delete": "Verwijderen", "Cancel": "Annuleren",
    "General": "Algemeen", "Agents": "Agenten", "Provider": "Provider", "Model": "Model",
    "Tools": "Hulpmiddelen", "Content": "Inhoud", "Generate": "Genereren", "Result": "Resultaat",
    "Connected": "Verbonden", "Disabled": "Uitgeschakeld", "Enabled": "Ingeschakeld",
    "Knowledge": "Kennis", "Privacy": "Privacy", "Limits": "Limieten",
    "Chat": "Chat", "— Select —": "— Selecteer —",
}

# ── Russian ──
TRANSLATIONS["ru"] = {
    "AI responses may be less accurate in languages other than English.": "Ответы ИИ могут быть менее точными на языках, отличных от английского.",
    "Jana is an AI assistant. Responses are generated, not authoritative. Document changes require your confirmation before saving.": "Jana — это ИИ-ассистент. Ответы генерируются и не являются авторитетными. Изменения документов требуют вашего подтверждения перед сохранением.",
    "Dismiss": "Закрыть", "Settings": "Настройки", "Close": "Закрыть", "Save": "Сохранить",
    "New Chat": "Новый чат", "Copy": "Копировать", "Delete": "Удалить", "Cancel": "Отмена",
    "General": "Общее", "Agents": "Агенты", "Provider": "Провайдер", "Model": "Модель",
    "Tools": "Инструменты", "Content": "Содержание", "Generate": "Сгенерировать", "Result": "Результат",
    "Connected": "Подключено", "Disabled": "Отключено", "Enabled": "Включено",
    "Knowledge": "Знания", "Privacy": "Конфиденциальность", "Limits": "Лимиты",
    "Chat": "Чат", "— Select —": "— Выбрать —",
}

# ── Ukrainian ──
TRANSLATIONS["uk"] = {
    "AI responses may be less accurate in languages other than English.": "Відповіді ШІ можуть бути менш точними мовами, відмінними від англійської.",
    "Dismiss": "Закрити", "Settings": "Налаштування", "Close": "Закрити", "Save": "Зберегти",
    "New Chat": "Новий чат", "Copy": "Копіювати", "Delete": "Видалити", "Cancel": "Скасувати",
    "General": "Загальне", "Agents": "Агенти", "Provider": "Провайдер", "Model": "Модель",
    "Tools": "Інструменти", "Content": "Вміст", "Generate": "Згенерувати", "Result": "Результат",
    "Chat": "Чат", "— Select —": "— Обрати —",
}

# ── Chinese Simplified ──
TRANSLATIONS["zh"] = {
    "AI responses may be less accurate in languages other than English.": "AI 回复在非英语语言中可能不太准确。",
    "Jana is an AI assistant. Responses are generated, not authoritative. Document changes require your confirmation before saving.": "Jana 是一个 AI 助手。回复是生成的，不具有权威性。文档更改需要您在保存前确认。",
    "Dismiss": "关闭", "Settings": "设置", "Close": "关闭", "Save": "保存",
    "New Chat": "新对话", "Copy": "复制", "Delete": "删除", "Cancel": "取消",
    "General": "通用", "Agents": "智能体", "Provider": "提供商", "Model": "模型",
    "Tools": "工具", "Content": "内容", "Generate": "生成", "Result": "结果",
    "Connected": "已连接", "Disabled": "已禁用", "Enabled": "已启用",
    "Knowledge": "知识库", "Privacy": "隐私", "Limits": "限制",
    "Chat": "对话", "— Select —": "— 选择 —",
}

# ── Chinese Traditional ──
TRANSLATIONS["zh-TW"] = {
    "AI responses may be less accurate in languages other than English.": "AI 回覆在非英語語言中可能較不準確。",
    "Jana is an AI assistant. Responses are generated, not authoritative. Document changes require your confirmation before saving.": "Jana 是一個 AI 助手。回覆是生成的，不具有權威性。文件更改需要您在儲存前確認。",
    "Dismiss": "關閉", "Settings": "設定", "Close": "關閉", "Save": "儲存",
    "New Chat": "新對話", "Copy": "複製", "Delete": "刪除", "Cancel": "取消",
    "General": "一般", "Agents": "智能體", "Provider": "提供商", "Model": "模型",
    "Tools": "工具", "Content": "內容", "Generate": "生成", "Result": "結果",
    "Chat": "對話", "— Select —": "— 選擇 —",
}

# ── Japanese ──
TRANSLATIONS["ja"] = {
    "AI responses may be less accurate in languages other than English.": "AI の応答は英語以外の言語では精度が低くなる場合があります。",
    "Jana is an AI assistant. Responses are generated, not authoritative. Document changes require your confirmation before saving.": "Jana は AI アシスタントです。応答は生成されたものであり、権威あるものではありません。ドキュメントの変更は保存前に確認が必要です。",
    "Dismiss": "閉じる", "Settings": "設定", "Close": "閉じる", "Save": "保存",
    "New Chat": "新しいチャット", "Copy": "コピー", "Delete": "削除", "Cancel": "キャンセル",
    "General": "一般", "Agents": "エージェント", "Provider": "プロバイダー", "Model": "モデル",
    "Tools": "ツール", "Content": "コンテンツ", "Generate": "生成", "Result": "結果",
    "Chat": "チャット", "— Select —": "— 選択 —",
}

# ── Korean ──
TRANSLATIONS["ko"] = {
    "AI responses may be less accurate in languages other than English.": "AI 응답은 영어 이외의 언어에서 정확도가 떨어질 수 있습니다.",
    "Dismiss": "닫기", "Settings": "설정", "Close": "닫기", "Save": "저장",
    "New Chat": "새 대화", "Copy": "복사", "Delete": "삭제", "Cancel": "취소",
    "General": "일반", "Agents": "에이전트", "Provider": "제공자", "Model": "모델",
    "Tools": "도구", "Content": "콘텐츠", "Generate": "생성", "Result": "결과",
    "Chat": "채팅", "— Select —": "— 선택 —",
}

# ── Hindi ──
TRANSLATIONS["hi"] = {
    "AI responses may be less accurate in languages other than English.": "अंग्रेज़ी के अलावा अन्य भाषाओं में AI प्रतिक्रियाएं कम सटीक हो सकती हैं।",
    "Dismiss": "खारिज करें", "Settings": "सेटिंग्स", "Close": "बंद करें", "Save": "सहेजें",
    "New Chat": "नई चैट", "Copy": "कॉपी करें", "Delete": "हटाएं", "Cancel": "रद्द करें",
    "General": "सामान्य", "Agents": "एजेंट", "Provider": "प्रदाता", "Model": "मॉडल",
    "Tools": "उपकरण", "Content": "सामग्री", "Generate": "उत्पन्न करें", "Result": "परिणाम",
    "Chat": "चैट", "— Select —": "— चुनें —",
}

# ── Turkish (tr is not in the list, but common) ──

# ── Swedish ──
TRANSLATIONS["sv"] = {
    "AI responses may be less accurate in languages other than English.": "AI-svar kan vara mindre exakta på andra språk än engelska.",
    "Dismiss": "Stäng", "Settings": "Inställningar", "Close": "Stäng", "Save": "Spara",
    "New Chat": "Ny chatt", "Copy": "Kopiera", "Delete": "Radera", "Cancel": "Avbryt",
    "General": "Allmänt", "Agents": "Agenter", "Chat": "Chatt", "— Select —": "— Välj —",
}

# ── Danish ──
TRANSLATIONS["da"] = {
    "AI responses may be less accurate in languages other than English.": "AI-svar kan være mindre præcise på andre sprog end engelsk.",
    "Dismiss": "Luk", "Settings": "Indstillinger", "Close": "Luk", "Save": "Gem",
    "New Chat": "Ny chat", "Copy": "Kopier", "Delete": "Slet", "Cancel": "Annuller",
    "General": "Generelt", "Agents": "Agenter", "Chat": "Chat", "— Select —": "— Vælg —",
}
TRANSLATIONS["da-DK"] = dict(TRANSLATIONS["da"])

# ── Norwegian ──
TRANSLATIONS["no"] = {
    "AI responses may be less accurate in languages other than English.": "AI-svar kan være mindre nøyaktige på andre språk enn engelsk.",
    "Dismiss": "Lukk", "Settings": "Innstillinger", "Close": "Lukk", "Save": "Lagre",
    "New Chat": "Ny chat", "Copy": "Kopier", "Delete": "Slett", "Cancel": "Avbryt",
    "General": "Generelt", "Agents": "Agenter", "Chat": "Chat", "— Select —": "— Velg —",
}

# ── Finnish ──
TRANSLATIONS["fi"] = {
    "AI responses may be less accurate in languages other than English.": "Tekoälyn vastaukset voivat olla vähemmän tarkkoja muilla kielillä kuin englannilla.",
    "Dismiss": "Sulje", "Settings": "Asetukset", "Close": "Sulje", "Save": "Tallenna",
    "New Chat": "Uusi keskustelu", "Copy": "Kopioi", "Delete": "Poista", "Cancel": "Peruuta",
    "Chat": "Keskustelu", "— Select —": "— Valitse —",
}

# ── Polish ──
TRANSLATIONS["pl"] = {
    "AI responses may be less accurate in languages other than English.": "Odpowiedzi AI mogą być mniej dokładne w językach innych niż angielski.",
    "Dismiss": "Zamknij", "Settings": "Ustawienia", "Close": "Zamknij", "Save": "Zapisz",
    "New Chat": "Nowy czat", "Copy": "Kopiuj", "Delete": "Usuń", "Cancel": "Anuluj",
    "General": "Ogólne", "Agents": "Agenci", "Chat": "Czat", "— Select —": "— Wybierz —",
}

# ── Czech ──
TRANSLATIONS["cs"] = {
    "AI responses may be less accurate in languages other than English.": "Odpovědi AI mohou být méně přesné v jiných jazycích než angličtině.",
    "Dismiss": "Zavřít", "Settings": "Nastavení", "Close": "Zavřít", "Save": "Uložit",
    "New Chat": "Nový chat", "Copy": "Kopírovat", "Delete": "Smazat", "Cancel": "Zrušit",
    "Chat": "Chat", "— Select —": "— Vybrat —",
}
TRANSLATIONS["cz"] = dict(TRANSLATIONS["cs"])

# ── Slovak ──
TRANSLATIONS["sk"] = {
    "AI responses may be less accurate in languages other than English.": "Odpovede AI môžu byť menej presné v iných jazykoch ako angličtina.",
    "Dismiss": "Zavrieť", "Settings": "Nastavenia", "Close": "Zavrieť", "Save": "Uložiť",
    "Chat": "Chat", "— Select —": "— Vybrať —",
}

# ── Hungarian ──
TRANSLATIONS["hu"] = {
    "AI responses may be less accurate in languages other than English.": "Az AI-válaszok kevésbé lehetnek pontosak az angoltól eltérő nyelveken.",
    "Dismiss": "Bezárás", "Settings": "Beállítások", "Close": "Bezárás", "Save": "Mentés",
    "Chat": "Csevegés", "— Select —": "— Válasszon —",
}

# ── Romanian ──
TRANSLATIONS["ro"] = {
    "AI responses may be less accurate in languages other than English.": "Răspunsurile AI pot fi mai puțin precise în alte limbi decât engleza.",
    "Dismiss": "Închide", "Settings": "Setări", "Close": "Închide", "Save": "Salvează",
    "Chat": "Conversație", "— Select —": "— Selectați —",
}

# ── Bulgarian ──
TRANSLATIONS["bg"] = {
    "AI responses may be less accurate in languages other than English.": "Отговорите на ИИ може да са по-малко точни на езици, различни от английски.",
    "Dismiss": "Затвори", "Settings": "Настройки", "Close": "Затвори", "Save": "Запази",
    "Chat": "Чат", "— Select —": "— Избери —",
}

# ── Croatian ──
TRANSLATIONS["hr"] = {
    "AI responses may be less accurate in languages other than English.": "Odgovori AI-ja mogu biti manje precizni na jezicima osim engleskog.",
    "Dismiss": "Zatvori", "Settings": "Postavke", "Close": "Zatvori", "Save": "Spremi",
    "Chat": "Chat", "— Select —": "— Odaberi —",
}

# ── Slovenian ──
TRANSLATIONS["sl"] = {
    "AI responses may be less accurate in languages other than English.": "Odgovori UI so lahko manj natančni v jezikih, ki niso angleščina.",
    "Dismiss": "Zapri", "Settings": "Nastavitve", "Close": "Zapri", "Save": "Shrani",
    "Chat": "Klepet", "— Select —": "— Izberi —",
}

# ── Serbian ──
TRANSLATIONS["sr"] = {
    "AI responses may be less accurate in languages other than English.": "Одговори вештачке интелигенције могу бити мање прецизни на језицима осим енглеског.",
    "Dismiss": "Затвори", "Settings": "Подешавања", "Close": "Затвори", "Save": "Сачувај",
    "Chat": "Ћаскање", "— Select —": "— Изабери —",
}
TRANSLATIONS["sr-BA"] = dict(TRANSLATIONS["sr"])
TRANSLATIONS["sr-SP"] = dict(TRANSLATIONS["sr"])

# ── Albanian ──
TRANSLATIONS["sq"] = {
    "AI responses may be less accurate in languages other than English.": "Përgjigjet e AI mund të jenë më pak të sakta në gjuhë të tjera përveç anglishtes.",
    "Dismiss": "Mbyll", "Settings": "Cilësimet", "Close": "Mbyll", "Save": "Ruaj",
    "Chat": "Bisedë", "— Select —": "— Zgjidh —",
}

# ── Macedonian ──
TRANSLATIONS["mk"] = {
    "AI responses may be less accurate in languages other than English.": "Одговорите на ВИ може да бидат помалку прецизни на јазици различни од англискиот.",
    "Dismiss": "Затвори", "Settings": "Поставки", "Close": "Затвори", "Save": "Зачувај",
    "Chat": "Разговор", "— Select —": "— Избери —",
}

# ── Greek ──
TRANSLATIONS["el"] = {
    "AI responses may be less accurate in languages other than English.": "Οι απαντήσεις AI μπορεί να είναι λιγότερο ακριβείς σε γλώσσες εκτός Αγγλικών.",
    "Dismiss": "Κλείσιμο", "Settings": "Ρυθμίσεις", "Close": "Κλείσιμο", "Save": "Αποθήκευση",
    "Chat": "Συνομιλία", "— Select —": "— Επιλέξτε —",
}

# ── Estonian ──
TRANSLATIONS["et"] = {
    "AI responses may be less accurate in languages other than English.": "Tehisintellekti vastused võivad olla vähem täpsed muudes keeltes peale inglise keele.",
    "Dismiss": "Sulge", "Settings": "Seaded", "Close": "Sulge", "Save": "Salvesta",
    "Chat": "Vestlus", "— Select —": "— Vali —",
}

# ── Latvian ──
TRANSLATIONS["lv"] = {
    "AI responses may be less accurate in languages other than English.": "MI atbildes var būt mazāk precīzas valodās, kas nav angļu.",
    "Dismiss": "Aizvērt", "Settings": "Iestatījumi", "Close": "Aizvērt", "Save": "Saglabāt",
    "Chat": "Tērzēšana", "— Select —": "— Izvēlēties —",
}

# ── Lithuanian ──
TRANSLATIONS["lt"] = {
    "AI responses may be less accurate in languages other than English.": "DI atsakymai gali būti mažiau tikslūs kitomis kalbomis nei anglų.",
    "Dismiss": "Uždaryti", "Settings": "Nustatymai", "Close": "Uždaryti", "Save": "Išsaugoti",
    "Chat": "Pokalbis", "— Select —": "— Pasirinkti —",
}

# ── Icelandic ──
TRANSLATIONS["is"] = {
    "AI responses may be less accurate in languages other than English.": "Svör gervigreindar geta verið ónákvæmari á öðrum tungumálum en ensku.",
    "Dismiss": "Loka", "Settings": "Stillingar", "Close": "Loka", "Save": "Vista",
    "Chat": "Spjall", "— Select —": "— Velja —",
}

# ── Catalan ──
TRANSLATIONS["ca"] = {
    "AI responses may be less accurate in languages other than English.": "Les respostes d'IA poden ser menys precises en idiomes diferents de l'anglès.",
    "Dismiss": "Tancar", "Settings": "Configuració", "Close": "Tancar", "Save": "Desar",
    "Chat": "Xat", "— Select —": "— Seleccionar —",
}

# ── Afrikaans ──
TRANSLATIONS["af"] = {
    "AI responses may be less accurate in languages other than English.": "KI-antwoorde mag minder akkuraat wees in ander tale as Engels.",
    "Dismiss": "Sluit", "Settings": "Instellings", "Close": "Sluit", "Save": "Stoor",
    "Chat": "Gesels", "— Select —": "— Kies —",
}

# ── English variants ──
TRANSLATIONS["en-GB"] = {
    "AI responses may be less accurate in languages other than English.": "AI responses may be less accurate in languages other than English.",
}
TRANSLATIONS["en-US"] = {
    "AI responses may be less accurate in languages other than English.": "AI responses may be less accurate in languages other than English.",
}

# ── Bengali ──
TRANSLATIONS["bn"] = {
    "AI responses may be less accurate in languages other than English.": "ইংরেজি ছাড়া অন্যান্য ভাষায় AI-এর উত্তর কম সঠিক হতে পারে।",
    "Dismiss": "বাতিল", "Settings": "সেটিংস", "Close": "বন্ধ", "Save": "সংরক্ষণ",
    "Chat": "চ্যাট", "— Select —": "— নির্বাচন করুন —",
}

# ── Tamil ──
TRANSLATIONS["ta"] = {
    "AI responses may be less accurate in languages other than English.": "ஆங்கிலம் தவிர வேறு மொழிகளில் AI பதில்கள் குறைவான துல்லியமாக இருக்கலாம்.",
    "Dismiss": "மூடு", "Settings": "அமைப்புகள்", "Close": "மூடு", "Save": "சேமி",
    "Chat": "அரட்டை", "— Select —": "— தேர்வுசெய்க —",
}

# ── Telugu ──
TRANSLATIONS["te"] = {
    "AI responses may be less accurate in languages other than English.": "ఇంగ్లీష్ కాకుండా ఇతర భాషల్లో AI ప్రతిస్పందనలు తక్కువ ఖచ్చితంగా ఉండవచ్చు.",
    "Dismiss": "మూసివేయి", "Settings": "సెట్టింగ్‌లు", "Close": "మూసివేయి", "Save": "సేవ్",
    "Chat": "చాట్", "— Select —": "— ఎంచుకోండి —",
}

# ── Other South Asian ──
for lang, dismiss, settings, close, save, chat, select_label in [
    ("ml", "അടയ്ക്കുക", "ക്രമീകരണങ്ങൾ", "അടയ്ക്കുക", "സേവ് ചെയ്യുക", "ചാറ്റ്", "— തിരഞ്ഞെടുക്കുക —"),
    ("kn", "ವಜಾ", "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", "ಮುಚ್ಚಿ", "ಉಳಿಸಿ", "ಚಾಟ್", "— ಆಯ್ಕೆಮಾಡಿ —"),
    ("gu", "બંધ કરો", "સેટિંગ્સ", "બંધ કરો", "સાચવો", "ચેટ", "— પસંદ કરો —"),
    ("mr", "बंद करा", "सेटिंग्ज", "बंद करा", "जतन करा", "चॅट", "— निवडा —"),
    ("si", "වසන්න", "සැකසුම්", "වසන්න", "සුරකින්න", "කතාබහ", "— තෝරන්න —"),
    ("ur", "بند کریں", "ترتیبات", "بند کریں", "محفوظ کریں", "چیٹ", "— منتخب کریں —"),
]:
    TRANSLATIONS[lang] = {
        "AI responses may be less accurate in languages other than English.": f"AI responses may be less accurate in languages other than English.",
        "Dismiss": dismiss, "Settings": settings, "Close": close, "Save": save,
        "Chat": chat, "— Select —": select_label,
    }

# ── Southeast Asian ──
TRANSLATIONS["id"] = {
    "AI responses may be less accurate in languages other than English.": "Respons AI mungkin kurang akurat dalam bahasa selain Inggris.",
    "Dismiss": "Tutup", "Settings": "Pengaturan", "Close": "Tutup", "Save": "Simpan",
    "New Chat": "Obrolan Baru", "Chat": "Obrolan", "— Select —": "— Pilih —",
}
TRANSLATIONS["ms"] = {
    "AI responses may be less accurate in languages other than English.": "Respons AI mungkin kurang tepat dalam bahasa selain Bahasa Inggeris.",
    "Dismiss": "Tutup", "Settings": "Tetapan", "Close": "Tutup", "Save": "Simpan",
    "Chat": "Sembang", "— Select —": "— Pilih —",
}
TRANSLATIONS["th"] = {
    "AI responses may be less accurate in languages other than English.": "คำตอบ AI อาจมีความแม่นยำน้อยลงในภาษาอื่นนอกจากภาษาอังกฤษ",
    "Dismiss": "ปิด", "Settings": "การตั้งค่า", "Close": "ปิด", "Save": "บันทึก",
    "Chat": "แชท", "— Select —": "— เลือก —",
}
TRANSLATIONS["vi"] = {
    "AI responses may be less accurate in languages other than English.": "Phản hồi AI có thể kém chính xác hơn bằng các ngôn ngữ khác ngoài tiếng Anh.",
    "Dismiss": "Đóng", "Settings": "Cài đặt", "Close": "Đóng", "Save": "Lưu",
    "Chat": "Trò chuyện", "— Select —": "— Chọn —",
}
TRANSLATIONS["fil"] = {
    "AI responses may be less accurate in languages other than English.": "Ang mga tugon ng AI ay maaaring hindi gaanong tumpak sa mga wikang iba sa Ingles.",
    "Dismiss": "Isara", "Settings": "Mga Setting", "Close": "Isara", "Save": "I-save",
    "Chat": "Chat", "— Select —": "— Pumili —",
}
TRANSLATIONS["km"] = {
    "AI responses may be less accurate in languages other than English.": "ការឆ្លើយតបរបស់ AI អាចមានភាពត្រឹមត្រូវតិចជាងក្នុងភាសាផ្សេងក្រៅពីអង់គ្លេស។",
    "Dismiss": "បិទ", "Settings": "ការកំណត់", "Close": "បិទ", "Save": "រក្សាទុក",
    "Chat": "ជជែក", "— Select —": "— ជ្រើសរើស —",
}
TRANSLATIONS["my"] = {
    "AI responses may be less accurate in languages other than English.": "AI တုံ့ပြန်မှုများသည် အင်္ဂလိပ်ဘာသာမဟုတ်သော ဘာသာစကားများတွင် တိကျမှုနည်းနိုင်ပါသည်။",
    "Dismiss": "ပိတ်", "Settings": "ဆက်တင်များ", "Close": "ပိတ်", "Save": "သိမ်းဆည်း",
    "Chat": "ချက်တင်", "— Select —": "— ရွေးချယ်ပါ —",
}
TRANSLATIONS["lo"] = {
    "AI responses may be less accurate in languages other than English.": "ການຕອບ AI ອາດຈະມີຄວາມຖືກຕ້ອງໜ້ອຍກວ່າໃນພາສາອື່ນນອກຈາກພາສາອັງກິດ.",
    "Dismiss": "ປິດ", "Settings": "ການຕັ້ງຄ່າ", "Close": "ປິດ", "Save": "ບັນທຶກ",
    "Chat": "ສົນທະນາ", "— Select —": "— ເລືອກ —",
}

# ── Middle East / Central Asia ──
TRANSLATIONS["he"] = {
    "AI responses may be less accurate in languages other than English.": "תשובות AI עשויות להיות פחות מדויקות בשפות שאינן אנגלית.",
    "Dismiss": "סגור", "Settings": "הגדרות", "Close": "סגור", "Save": "שמור",
    "Chat": "צ'אט", "— Select —": "— בחר —",
}
TRANSLATIONS["ku"] = {
    "AI responses may be less accurate in languages other than English.": "Bersivên AI-ê dibe ku di zimanên din ji bilî Englîzî kêmtir rast bin.",
    "Dismiss": "Bigire", "Settings": "Mîheng", "Close": "Bigire", "Save": "Tomar bike",
    "Chat": "Sohbet", "— Select —": "— Hilbijêre —",
}
TRANSLATIONS["ps"] = {
    "AI responses may be less accurate in languages other than English.": "د AI ځوابونه ممکن په انګلیسي پرته نورو ژبو کې لږ دقیق وي.",
    "Dismiss": "بند کړئ", "Settings": "تنظیمات", "Close": "بند کړئ", "Save": "خوندي کړئ",
    "Chat": "خبرې اترې", "— Select —": "— غوره کړئ —",
}
TRANSLATIONS["uz"] = {
    "AI responses may be less accurate in languages other than English.": "Sun'iy intellekt javoblari ingliz tilidan boshqa tillarda kamroq aniq bo'lishi mumkin.",
    "Dismiss": "Yopish", "Settings": "Sozlamalar", "Close": "Yopish", "Save": "Saqlash",
    "Chat": "Suhbat", "— Select —": "— Tanlang —",
}

# ── African ──
TRANSLATIONS["sw"] = {
    "AI responses may be less accurate in languages other than English.": "Majibu ya AI yanaweza kuwa na usahihi mdogo katika lugha nyingine isipokuwa Kiingereza.",
    "Dismiss": "Funga", "Settings": "Mipangilio", "Close": "Funga", "Save": "Hifadhi",
    "Chat": "Mazungumzo", "— Select —": "— Chagua —",
}
TRANSLATIONS["am"] = {
    "AI responses may be less accurate in languages other than English.": "የAI ምላሾች ከእንግሊዘኛ ውጪ ባሉ ቋንቋዎች ብዙም ትክክለኛ ላይሆኑ ይችላሉ።",
    "Dismiss": "ዝጋ", "Settings": "ቅንብሮች", "Close": "ዝጋ", "Save": "አስቀምጥ",
    "Chat": "ውይይት", "— Select —": "— ምረጥ —",
}
TRANSLATIONS["rw"] = {
    "AI responses may be less accurate in languages other than English.": "Ibisubizo bya AI bishobora kuba bidahuje neza mu ndimi zitari Icyongereza.",
    "Dismiss": "Funga", "Settings": "Igenamiterere", "Close": "Funga", "Save": "Bika",
    "Chat": "Ibiganiro", "— Select —": "— Hitamo —",
}

# ── Other ──
TRANSLATIONS["se"] = {
    "AI responses may be less accurate in languages other than English.": "AI-vástádusat sáhttet leat unnit dárkilat eará gielain go eaŋgalasgielat.",
    "Dismiss": "Gidde", "Settings": "Heivehusat", "Close": "Gidde", "Save": "Vurke",
    "Chat": "Ságastallan", "— Select —": "— Vállje —",
}
TRANSLATIONS["quc"] = {
    "AI responses may be less accurate in languages other than English.": "Ri utzijoxik ri AI rik'in jun chik tzij man are ta ri Inglés man k'o ta utz.",
    "Dismiss": "Ttz'apij", "Settings": "Runuk'ulem", "Close": "Ttz'apij", "Save": "Tiyak",
    "Chat": "Tzijonik", "— Select —": "— Tacha' —",
}


def read_source_strings(ar_path: str) -> list[str]:
    """Read source strings from the Arabic CSV."""
    sources = []
    with open(ar_path, encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            if row:
                sources.append(row[0])
    return sources


def generate_csv(lang_code: str, source_strings: list[str], output_dir: str):
    """Generate a translation CSV for a given language."""
    translations = TRANSLATIONS.get(lang_code, {})
    output_path = os.path.join(output_dir, f"{lang_code}.csv")

    with open(output_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        for source in source_strings:
            translated = translations.get(source, "")
            if translated:
                writer.writerow([source, translated])

    count = sum(1 for s in source_strings if translations.get(s))
    return count


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    app_dir = os.path.dirname(script_dir)
    translations_dir = os.path.join(app_dir, "jana", "translations")
    ar_path = os.path.join(translations_dir, "ar.csv")

    if not os.path.exists(ar_path):
        print(f"Error: {ar_path} not found", file=sys.stderr)
        sys.exit(1)

    os.makedirs(translations_dir, exist_ok=True)
    source_strings = read_source_strings(ar_path)
    total_sources = len(source_strings)

    print(f"Source strings: {total_sources}")
    print(f"Languages to generate: {len(LANGUAGES)}")
    print()

    for lang_code, lang_name in sorted(LANGUAGES.items()):
        count = generate_csv(lang_code, source_strings, translations_dir)
        pct = round(count / total_sources * 100) if total_sources else 0
        status = "full" if pct >= 80 else "partial" if pct >= 20 else "core"
        print(f"  {lang_code:8s} {lang_name:30s} {count:4d}/{total_sources} ({pct:3d}%) [{status}]")

    print(f"\nDone. Generated {len(LANGUAGES)} translation files in {translations_dir}")


if __name__ == "__main__":
    main()
