#!/usr/bin/env python3
"""Append new translation strings to all existing translation CSV files.

Usage:
    python scripts/append_translations.py
"""

import csv
import os

# New strings to add (source, with commas as-is — csv.writer handles escaping)
NEW_STRINGS = [
    "Terms of Use",
    "Before using Jana, please review and accept the following terms:",
    "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.",
    "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.",
    "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.",
    "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.",
    "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.",
    "I have read and agree to the Terms of Use",
    "View Full Terms of Use",
    "Accept and Continue",
    "You must accept the Terms of Use to continue.",
    "Jana responds in your language. Complex technical content may vary in quality across languages.",
    "Could not save acceptance. Please try again.",
]

# Arabic translations for the new strings
ARABIC_TRANSLATIONS = {
    "Terms of Use": "شروط الاستخدام",
    "Before using Jana, please review and accept the following terms:": "قبل استخدام جنى، يرجى مراجعة وقبول الشروط التالية:",
    "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "جنى هي مساعدة ذكاء اصطناعي. قد تكون الردود المُولّدة غير دقيقة أو ناقصة أو قديمة. أنت مسؤول عن التحقق من جميع المعلومات قبل العمل بها.",
    "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "إذا كنت تستخدم مفاتيح API الخاصة بك (BYOK)، فأنت مسؤول عن جميع التكاليف والاستخدام مع مزود نموذج اللغة الخاص بك. جنى لا تدير أو تحد أو تراقب فواتير مزودك.",
    "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "لا تضمن جنى دقة أو موثوقية أو ملاءمة ردود الذكاء الاصطناعي لأي غرض معين.",
    "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "يتم تخزين محادثاتك على موقع Frappe هذا. البيانات المرسلة إلى مزودي نماذج اللغة السحابية تخضع لسياسات معالجة البيانات الخاصة بهم.",
    "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "إصدار مجتمع جنى مرخص بموجب AGPL-3.0. راجع الرخصة الكاملة للشروط والأحكام.",
    "I have read and agree to the Terms of Use": "لقد قرأت ووافقت على شروط الاستخدام",
    "View Full Terms of Use": "عرض شروط الاستخدام الكاملة",
    "Accept and Continue": "قبول ومتابعة",
    "You must accept the Terms of Use to continue.": "يجب عليك قبول شروط الاستخدام للمتابعة.",
    "Jana responds in your language. Complex technical content may vary in quality across languages.": "تستجيب جنى بلغتك. قد يختلف جودة المحتوى التقني المعقد عبر اللغات.",
    "Could not save acceptance. Please try again.": "تعذر حفظ القبول. يرجى المحاولة مرة أخرى.",
}

def get_existing_sources(filepath):
    """Read existing source strings from a CSV file."""
    sources = set()
    if not os.path.exists(filepath):
        return sources
    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            if row:
                sources.add(row[0])
    return sources


def append_to_csv(filepath, lang_code):
    """Append new strings to a CSV file if not already present."""
    existing = get_existing_sources(filepath)
    new_count = 0

    with open(filepath, "a", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        for source in NEW_STRINGS:
            if source not in existing:
                if lang_code == "ar":
                    translation = ARABIC_TRANSLATIONS.get(source, "")
                else:
                    translation = ""
                writer.writerow([source, translation])
                new_count += 1

    return new_count


def main():
    translations_dir = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "jana", "translations"
    )

    if not os.path.isdir(translations_dir):
        print(f"Translations directory not found: {translations_dir}")
        return

    csv_files = sorted(f for f in os.listdir(translations_dir) if f.endswith(".csv"))
    total_added = 0

    for csv_file in csv_files:
        lang_code = csv_file.replace(".csv", "")
        filepath = os.path.join(translations_dir, csv_file)
        added = append_to_csv(filepath, lang_code)
        total_added += added
        if added:
            print(f"  {csv_file}: +{added} strings")

    print(f"\nDone. Added {total_added} new strings across {len(csv_files)} files.")


if __name__ == "__main__":
    main()
