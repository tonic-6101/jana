#!/usr/bin/env python3
"""Fill in translations for the 13 terms/language strings in specified CSV files.

Usage:
    python scripts/fill_translations.py <lang_code> [lang_code2 ...]
    python scripts/fill_translations.py --all  # Fill all languages that have translations defined
"""

import csv
import io
import os
import sys

# Source strings (must match exactly what's in the CSVs)
SOURCE_STRINGS = [
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

# All translations keyed by lang code
TRANSLATIONS = {
    "af": {  # Afrikaans
        "Terms of Use": "Gebruiksvoorwaardes",
        "Before using Jana, please review and accept the following terms:": "Voordat u Jana gebruik, lees en aanvaar asseblief die volgende voorwaardes:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana is 'n KI-assistent. KI-gegenereerde antwoorde kan onakkuraat, onvolledig of verouderd wees. U is verantwoordelik vir die verifiëring van alle inligting voordat u optree.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "As u u eie API-sleutels gebruik (BYOK), is u verantwoordelik vir alle koste en gebruik by u LLM-verskaffer. Jana bestuur, beperk of monitor nie u verskaffer se fakturering nie.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana waarborg nie die akkuraatheid, betroubaarheid of geskiktheid van KI-antwoorde vir enige spesifieke doel nie.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "U gesprekke word op hierdie Frappe-werf gestoor. Data wat na wolk-LLM-verskaffers gestuur word, is onderhewig aan hul databeleide.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition is gelisensieer onder AGPL-3.0. Sien die volledige lisensie vir voorwaardes.",
        "I have read and agree to the Terms of Use": "Ek het die Gebruiksvoorwaardes gelees en stem saam",
        "View Full Terms of Use": "Bekyk volledige Gebruiksvoorwaardes",
        "Accept and Continue": "Aanvaar en gaan voort",
        "You must accept the Terms of Use to continue.": "U moet die Gebruiksvoorwaardes aanvaar om voort te gaan.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana antwoord in u taal. Komplekse tegniese inhoud kan in kwaliteit wissel tussen tale.",
        "Could not save acceptance. Please try again.": "Kon nie die aanvaarding stoor nie. Probeer asseblief weer.",
    },
    "am": {  # Amharic
        "Terms of Use": "የአጠቃቀም ውሎች",
        "Before using Jana, please review and accept the following terms:": "Jana ን ከመጠቀምዎ በፊት እባክዎ የሚከተሉትን ውሎች ያንብቡ እና ይቀበሉ:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana የ AI ረዳት ነው። በ AI የተፈጠሩ ምላሾች ትክክል ላይሆኑ፣ ያልተሟሉ ወይም ያረጁ ሊሆኑ ይችላሉ። ከመንቀሳቀስዎ በፊት ሁሉንም መረጃዎች ማረጋገጥ የእርስዎ ኃላፊነት ነው።",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "የራስዎን API ቁልፎች (BYOK) ከተጠቀሙ፣ ከ LLM አቅራቢዎ ጋር ለሁሉም ወጪዎች እና አጠቃቀም ኃላፊነት የእርስዎ ነው። Jana የአቅራቢዎን ክፍያ አያስተዳድርም፣ አይገድብም ወይም አይከታተልም።",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana ለማንኛውም የተወሰነ ዓላማ የ AI ምላሾችን ትክክለኛነት፣ አስተማማኝነት ወይም ተስማሚነት አይዋስም።",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "ውይይቶችዎ በዚህ Frappe ጣቢያ ላይ ተከማችተዋል። ወደ ደመና LLM አቅራቢዎች የተላከ ውሂብ ለእነሱ የውሂብ አያያዝ ፖሊሲዎች ተገዢ ነው።",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition በ AGPL-3.0 ስር ፈቃድ ተሰጥቶታል። ለውሎች እና ሁኔታዎች ሙሉ ፈቃዱን ይመልከቱ።",
        "I have read and agree to the Terms of Use": "የአጠቃቀም ውሎችን አንብቤ ተስማምቻለሁ",
        "View Full Terms of Use": "ሙሉ የአጠቃቀም ውሎችን ይመልከቱ",
        "Accept and Continue": "ይቀበሉ እና ይቀጥሉ",
        "You must accept the Terms of Use to continue.": "ለመቀጠል የአጠቃቀም ውሎችን መቀበል አለብዎት።",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana በቋንቋዎ ይመልሳል። ውስብስብ ቴክኒካዊ ይዘት በቋንቋዎች መካከል በጥራት ሊለያይ ይችላል።",
        "Could not save acceptance. Please try again.": "ተቀባይነትን ማስቀመጥ አልተቻለም። እባክዎ እንደገና ይሞክሩ።",
    },
    "cz": {  # Czech (duplicate of cs)
        "Terms of Use": "Podmínky používání",
        "Before using Jana, please review and accept the following terms:": "Před použitím Jana si prosím přečtěte a přijměte následující podmínky:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana je AI asistent. Odpovědi generované AI mohou být nepřesné, neúplné nebo zastaralé. Jste zodpovědní za ověření všech informací před jednáním.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "Pokud používáte vlastní API klíče (BYOK), nesete odpovědnost za veškeré náklady a využívání u svého poskytovatele LLM. Jana nespravuje, neomezuje ani nemonitoruje fakturaci vašeho poskytovatele.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana nezaručuje přesnost, spolehlivost ani vhodnost odpovědí AI pro jakýkoliv konkrétní účel.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "Vaše konverzace jsou uloženy na tomto Frappe webu. Data odeslaná cloudovým poskytovatelům LLM podléhají jejich zásadám zpracování dat.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition je licencována pod AGPL-3.0. Úplné podmínky naleznete v plné licenci.",
        "I have read and agree to the Terms of Use": "Přečetl(a) jsem si a souhlasím s Podmínkami používání",
        "View Full Terms of Use": "Zobrazit úplné Podmínky používání",
        "Accept and Continue": "Přijmout a pokračovat",
        "You must accept the Terms of Use to continue.": "Pro pokračování musíte přijmout Podmínky používání.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana odpovídá ve vašem jazyce. Složitý technický obsah se může lišit kvalitou v závislosti na jazyce.",
        "Could not save acceptance. Please try again.": "Nepodařilo se uložit souhlas. Zkuste to prosím znovu.",
    },
    "da-DK": {  # Danish (Denmark) — same as da
        "Terms of Use": "Brugsvilkår",
        "Before using Jana, please review and accept the following terms:": "Før du bruger Jana, bedes du gennemgå og acceptere følgende vilkår:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana er en AI-assistent. AI-genererede svar kan være unøjagtige, ufuldstændige eller forældede. Du er ansvarlig for at verificere al information, før du handler på den.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "Hvis du bruger dine egne API-nøgler (BYOK), er du ansvarlig for alle omkostninger og forbrug hos din LLM-udbyder. Jana administrerer, begrænser eller overvåger ikke din udbyders fakturering.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana garanterer ikke nøjagtigheden, pålideligheden eller egnetheden af AI-svar til noget bestemt formål.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "Dine samtaler gemmes på dette Frappe-websted. Data sendt til cloud-LLM-udbydere er underlagt deres datahåndteringspolitikker.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition er licenseret under AGPL-3.0. Se den fulde licens for vilkår og betingelser.",
        "I have read and agree to the Terms of Use": "Jeg har læst og accepterer Brugsvilkårene",
        "View Full Terms of Use": "Se de fulde Brugsvilkår",
        "Accept and Continue": "Accepter og fortsæt",
        "You must accept the Terms of Use to continue.": "Du skal acceptere Brugsvilkårene for at fortsætte.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana svarer på dit sprog. Komplekst teknisk indhold kan variere i kvalitet på tværs af sprog.",
        "Could not save acceptance. Please try again.": "Accepten kunne ikke gemmes. Prøv venligst igen.",
    },
    "en-GB": {  # English (UK) — same as source
        "Terms of Use": "Terms of Use",
        "Before using Jana, please review and accept the following terms:": "Before using Jana, please review and accept the following terms:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition is licensed under AGPL-3.0. See the full licence for terms and conditions.",
        "I have read and agree to the Terms of Use": "I have read and agree to the Terms of Use",
        "View Full Terms of Use": "View Full Terms of Use",
        "Accept and Continue": "Accept and Continue",
        "You must accept the Terms of Use to continue.": "You must accept the Terms of Use to continue.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana responds in your language. Complex technical content may vary in quality across languages.",
        "Could not save acceptance. Please try again.": "Could not save acceptance. Please try again.",
    },
    "en-US": {  # English (US) — same as source
        "Terms of Use": "Terms of Use",
        "Before using Jana, please review and accept the following terms:": "Before using Jana, please review and accept the following terms:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.",
        "I have read and agree to the Terms of Use": "I have read and agree to the Terms of Use",
        "View Full Terms of Use": "View Full Terms of Use",
        "Accept and Continue": "Accept and Continue",
        "You must accept the Terms of Use to continue.": "You must accept the Terms of Use to continue.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana responds in your language. Complex technical content may vary in quality across languages.",
        "Could not save acceptance. Please try again.": "Could not save acceptance. Please try again.",
    },
    "fil": {  # Filipino
        "Terms of Use": "Mga Tuntunin ng Paggamit",
        "Before using Jana, please review and accept the following terms:": "Bago gamitin ang Jana, pakibasa at tanggapin ang mga sumusunod na tuntunin:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Ang Jana ay isang AI assistant. Ang mga tugon na gawa ng AI ay maaaring hindi tama, hindi kumpleto, o lipas na. Ikaw ang may pananagutan sa pag-verify ng lahat ng impormasyon bago kumilos.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "Kung gagamit ka ng sarili mong API keys (BYOK), ikaw ang responsable sa lahat ng gastos at paggamit sa iyong LLM provider. Hindi pinamamahalaan, nililimitahan, o minomonitor ng Jana ang billing ng iyong provider.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Hindi ginagarantiyahan ng Jana ang katumpakan, pagiging maaasahan, o angkop na paggamit ng mga tugon ng AI para sa anumang partikular na layunin.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "Ang iyong mga pag-uusap ay naka-imbak sa Frappe site na ito. Ang data na ipinadala sa cloud LLM providers ay napapailalim sa kanilang mga patakaran sa pangangasiwa ng data.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Ang Jana Community Edition ay lisensyado sa ilalim ng AGPL-3.0. Tingnan ang buong lisensya para sa mga tuntunin at kundisyon.",
        "I have read and agree to the Terms of Use": "Nabasa ko at sumasang-ayon ako sa Mga Tuntunin ng Paggamit",
        "View Full Terms of Use": "Tingnan ang Buong Mga Tuntunin ng Paggamit",
        "Accept and Continue": "Tanggapin at Magpatuloy",
        "You must accept the Terms of Use to continue.": "Kailangan mong tanggapin ang Mga Tuntunin ng Paggamit upang makapagpatuloy.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Ang Jana ay sumasagot sa iyong wika. Ang kumplikadong teknikal na nilalaman ay maaaring mag-iba sa kalidad sa iba't ibang wika.",
        "Could not save acceptance. Please try again.": "Hindi ma-save ang pagtanggap. Pakisubukan muli.",
    },
    "gu": {  # Gujarati
        "Terms of Use": "ઉપયોગની શરતો",
        "Before using Jana, please review and accept the following terms:": "Jana નો ઉપયોગ કરતા પહેલાં, કૃપા કરીને નીચેની શરતો વાંચો અને સ્વીકારો:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana એક AI સહાયક છે. AI દ્વારા જનરેટ કરેલા જવાબો અચોક્કસ, અપૂર્ણ અથવા જૂના હોઈ શકે છે. કોઈપણ માહિતી પર કાર્ય કરતા પહેલાં તેની ચકાસણી કરવી એ તમારી જવાબદારી છે.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "જો તમે તમારી પોતાની API કી (BYOK) વાપરો છો, તો તમારા LLM પ્રદાતા સાથેના તમામ ખર્ચ અને ઉપયોગ માટે તમે જવાબદાર છો. Jana તમારા પ્રદાતાની બિલિંગનું સંચાલન, મર્યાદા અથવા દેખરેખ રાખતું નથી.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana કોઈ ચોક્કસ હેતુ માટે AI જવાબોની ચોકસાઈ, વિશ્વસનીયતા અથવા યોગ્યતાની ખાતરી આપતું નથી.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "તમારી વાતચીત આ Frappe સાઇટ પર સંગ્રહિત છે. ક્લાઉડ LLM પ્રદાતાઓને મોકલેલો ડેટા તેમની ડેટા હેન્ડલિંગ નીતિઓને આધીન છે.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition AGPL-3.0 હેઠળ લાઇસન્સ ધરાવે છે. શરતો માટે સંપૂર્ણ લાઇસન્સ જુઓ.",
        "I have read and agree to the Terms of Use": "મેં ઉપયોગની શરતો વાંચી છે અને સંમત છું",
        "View Full Terms of Use": "સંપૂર્ણ ઉપયોગની શરતો જુઓ",
        "Accept and Continue": "સ્વીકારો અને ચાલુ રાખો",
        "You must accept the Terms of Use to continue.": "ચાલુ રાખવા માટે તમારે ઉપયોગની શરતો સ્વીકારવી આવશ્યક છે.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana તમારી ભાષામાં જવાબ આપે છે. જટિલ તકનીકી સામગ્રી ભાષાઓ વચ્ચે ગુણવત્તામાં ભિન્ન હોઈ શકે છે.",
        "Could not save acceptance. Please try again.": "સ્વીકૃતિ સાચવી શકાઈ નહીં. કૃપા કરીને ફરી પ્રયાસ કરો.",
    },
    "km": {  # Khmer
        "Terms of Use": "លក្ខខណ្ឌប្រើប្រាស់",
        "Before using Jana, please review and accept the following terms:": "មុនពេលប្រើ Jana សូមអានហើយទទួលយកលក្ខខណ្ឌដូចខាងក្រោម:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana គឺជាជំនួយការ AI។ ចម្លើយដែលបង្កើតដោយ AI អាចមិនត្រឹមត្រូវ មិនពេញលេញ ឬហួសសម័យ។ អ្នកទទួលខុសត្រូវក្នុងការផ្ទៀងផ្ទាត់ព័ត៌មានទាំងអស់មុនពេលធ្វើសកម្មភាព។",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "ប្រសិនបើអ្នកប្រើកូនសោ API ផ្ទាល់ខ្លួន (BYOK) អ្នកទទួលខុសត្រូវចំពោះការចំណាយនិងការប្រើប្រាស់ទាំងអស់ជាមួយអ្នកផ្តល់ خدمات LLM របស់អ្នក។ Jana មិនគ្រប់គ្រង កំណត់ ឬតាមដានការចេញវិក្កយបត្ររបស់អ្នកផ្តល់សេវារបស់អ្នកទេ។",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana មិនធានាភាពត្រឹមត្រូវ ភាពជឿជាក់ ឬភាពសមស្របនៃចម្លើយ AI សម្រាប់គោលបំណងជាក់លាក់ណាមួយទេ។",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "ការសន្ទនារបស់អ្នកត្រូវបានរក្សាទុកនៅលើគេហទំព័រ Frappe នេះ។ ទិន្នន័យដែលផ្ញើទៅអ្នកផ្តល់សេវា LLM ពពកស្ថិតក្រោមគោលការណ៍គ្រប់គ្រងទិន្នន័យរបស់ពួកគេ។",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition មានអាជ្ញាប័ណ្ណក្រោម AGPL-3.0។ មើលអាជ្ញាប័ណ្ណពេញលេញសម្រាប់លក្ខខណ្ឌ។",
        "I have read and agree to the Terms of Use": "ខ្ញុំបានអានហើយយល់ព្រមនឹងលក្ខខណ្ឌប្រើប្រាស់",
        "View Full Terms of Use": "មើលលក្ខខណ្ឌប្រើប្រាស់ពេញលេញ",
        "Accept and Continue": "ទទួលយកហើយបន្ត",
        "You must accept the Terms of Use to continue.": "អ្នកត្រូវតែទទួលយកលក្ខខណ្ឌប្រើប្រាស់ដើម្បីបន្ត។",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana ឆ្លើយតបជាភាសារបស់អ្នក។ មាតិកាបច្ចេកទេសស្មុគ្រស្មាញអាចខុសគ្នាក្នុងគុណភាពរវាងភាសា។",
        "Could not save acceptance. Please try again.": "មិនអាចរក្សាទុកការទទួលយកបានទេ។ សូមព្យាយាមម្តងទៀត។",
    },
    "kn": {  # Kannada
        "Terms of Use": "ಬಳಕೆಯ ನಿಯಮಗಳು",
        "Before using Jana, please review and accept the following terms:": "Jana ಬಳಸುವ ಮೊದಲು, ದಯವಿಟ್ಟು ಈ ಕೆಳಗಿನ ನಿಯಮಗಳನ್ನು ಓದಿ ಒಪ್ಪಿಕೊಳ್ಳಿ:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana ಒಂದು AI ಸಹಾಯಕ. AI ಉತ್ಪತ್ತಿ ಮಾಡಿದ ಪ್ರತಿಕ್ರಿಯೆಗಳು ತಪ್ಪು, ಅಪೂರ್ಣ ಅಥವಾ ಹಳೆಯದಾಗಿರಬಹುದು. ಯಾವುದೇ ಮಾಹಿತಿಯ ಮೇಲೆ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳುವ ಮೊದಲು ಅದನ್ನು ಪರಿಶೀಲಿಸುವುದು ನಿಮ್ಮ ಜವಾಬ್ದಾರಿ.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "ನಿಮ್ಮ ಸ್ವಂತ API ಕೀಗಳನ್ನು (BYOK) ಬಳಸಿದರೆ, ನಿಮ್ಮ LLM ಒದಗಿಸುವವರ ಎಲ್ಲಾ ವೆಚ್ಚಗಳು ಮತ್ತು ಬಳಕೆಗೆ ನೀವು ಜವಾಬ್ದಾರರು. Jana ನಿಮ್ಮ ಒದಗಿಸುವವರ ಬಿಲ್ಲಿಂಗ್ ಅನ್ನು ನಿರ್ವಹಿಸುವುದಿಲ್ಲ, ಮಿತಿಗೊಳಿಸುವುದಿಲ್ಲ ಅಥವಾ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುವುದಿಲ್ಲ.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಉದ್ದೇಶಕ್ಕಾಗಿ AI ಪ್ರತಿಕ್ರಿಯೆಗಳ ನಿಖರತೆ, ವಿಶ್ವಾಸಾರ್ಹತೆ ಅಥವಾ ಸೂಕ್ತತೆಯನ್ನು ಖಾತರಿಪಡಿಸುವುದಿಲ್ಲ.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "ನಿಮ್ಮ ಸಂಭಾಷಣೆಗಳು ಈ Frappe ಸೈಟ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲ್ಪಡುತ್ತವೆ. ಕ್ಲೌಡ್ LLM ಒದಗಿಸುವವರಿಗೆ ಕಳುಹಿಸಲಾದ ಡೇಟಾ ಅವರ ಡೇಟಾ ನಿರ್ವಹಣೆ ನೀತಿಗಳಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition AGPL-3.0 ಅಡಿಯಲ್ಲಿ ಪರವಾನಗಿ ಪಡೆದಿದೆ. ನಿಯಮಗಳಿಗಾಗಿ ಪೂರ್ಣ ಪರವಾನಗಿ ನೋಡಿ.",
        "I have read and agree to the Terms of Use": "ನಾನು ಬಳಕೆಯ ನಿಯಮಗಳನ್ನು ಓದಿದ್ದೇನೆ ಮತ್ತು ಒಪ್ಪುತ್ತೇನೆ",
        "View Full Terms of Use": "ಪೂರ್ಣ ಬಳಕೆಯ ನಿಯಮಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
        "Accept and Continue": "ಒಪ್ಪಿಕೊಳ್ಳಿ ಮತ್ತು ಮುಂದುವರಿಸಿ",
        "You must accept the Terms of Use to continue.": "ಮುಂದುವರಿಸಲು ನೀವು ಬಳಕೆಯ ನಿಯಮಗಳನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಬೇಕು.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತದೆ. ಸಂಕೀರ್ಣ ತಾಂತ್ರಿಕ ವಿಷಯ ಭಾಷೆಗಳ ನಡುವೆ ಗುಣಮಟ್ಟದಲ್ಲಿ ಬದಲಾಗಬಹುದು.",
        "Could not save acceptance. Please try again.": "ಒಪ್ಪಿಗೆ ಉಳಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    },
    "ku": {  # Kurdish
        "Terms of Use": "Mercên Bikaranînê",
        "Before using Jana, please review and accept the following terms:": "Berî bikaranîna Jana, ji kerema xwe mercên jêrîn bixwînin û qebûl bikin:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana arîkarek AI ye. Bersivên ku ji hêla AI ve hatine çêkirin dibe ku ne rast, ne temam an kevn bin. Berî ku hûn tevbigerin, piştrastkirina hemû agahiyan berpirsyariya we ye.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "Heke hûn mifteyên xwe yên API (BYOK) bikar tînin, hûn berpirsiyar in ji bo hemû lêçûn û bikaranînê bi dabînkerê xwe yê LLM re. Jana fatûrekirina dabînkerê we birêve nabe, sînordar nake an naçavdêrî nake.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana rastbûn, pêbawerî an guncaniya bersivên AI ji bo tu armanceke taybetî garantî nake.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "Danûstandinên we li ser vê malpera Frappe têne hilanîn. Daneyên ku ji dabînkerên LLM ên ewr re hatine şandin tabi siyasetên rêvebirina daneyên wan in.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition di bin AGPL-3.0 de lîsanskirî ye. Ji bo mercan lîsansa tevahî bibînin.",
        "I have read and agree to the Terms of Use": "Min Mercên Bikaranînê xwand û razî me",
        "View Full Terms of Use": "Mercên Bikaranînê yên tevahî bibînin",
        "Accept and Continue": "Qebûl bike û bidomîne",
        "You must accept the Terms of Use to continue.": "Divê hûn Mercên Bikaranînê qebûl bikin da ku bidomînin.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana bi zimanê we bersiv dide. Naveroka teknîkî ya tevlihev dibe ku di navbera zimanan de ji hêla kalîteyê ve cûda be.",
        "Could not save acceptance. Please try again.": "Qebûlkirin nehat tomarkirin. Ji kerema xwe dîsa biceribînin.",
    },
    "lo": {  # Lao
        "Terms of Use": "ເງື່ອນໄຂການນຳໃຊ້",
        "Before using Jana, please review and accept the following terms:": "ກ່ອນໃຊ້ Jana, ກະລຸນາອ່ານ ແລະ ຍອಮ ຣັບເງື່ອນໄຂດັ່ງຕໍ່ໄປນີ້:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana ເປັນຜູ້ຊ່ວຍ AI. ຄຳຕອບທີ່ສ້າງໂດຍ AI ອາດບໍ່ຖືກຕ້ອງ, ບໍ່ຄົບຖ້ວນ ຫຼື ລ້າສະໄໝ. ທ່ານຮັບຜິດຊອບໃນການກວດສອບຂໍ້ມູນທັງໝົດກ່ອນດຳເນີນການ.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "ຖ້າທ່ານໃຊ້ກະແຈ API ຂອງຕົວເອງ (BYOK), ທ່ານຮັບຜິດຊອບຄ່າໃຊ້ຈ່າຍ ແລະ ການນຳໃຊ້ທັງໝົດກັບຜູ້ໃຫ້ບໍລິການ LLM ຂອງທ່ານ. Jana ບໍ່ໄດ້ຈັດການ, ຈຳກັດ ຫຼື ຕິດຕາມການເກັບເງິນຂອງຜູ້ໃຫ້ບໍລິການຂອງທ່ານ.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana ບໍ່ຮັບປະກັນຄວາມຖືກຕ້ອງ, ຄວາມໜ້າເຊື່ອຖື ຫຼື ຄວາມເໝາະສົມຂອງຄຳຕອບ AI ສຳລັບຈຸດປະສົງໃດໜຶ່ງ.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "ການສົນທະນາຂອງທ່ານຖືກເກັບຮັກສາໄວ້ໃນເວັບໄຊ Frappe ນີ້. ຂໍ້ມູນທີ່ສົ່ງໄປຫາຜູ້ໃຫ້ບໍລິການ LLM ຄລາວຂຶ້ນກັບນະໂຍບາຍການຈັດການຂໍ້ມູນຂອງພວກເຂົາ.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition ໄດ້ຮັບອະນຸຍາດພາຍໃຕ້ AGPL-3.0. ເບິ່ງໃບອະນຸຍາດເຕັມສຳລັບເງື່ອນໄຂ.",
        "I have read and agree to the Terms of Use": "ຂ້ອຍໄດ້ອ່ານ ແລະ ເຫັນດີກັບເງື່ອນໄຂການນຳໃຊ້",
        "View Full Terms of Use": "ເບິ່ງເງື່ອນໄຂການນຳໃຊ້ເຕັມ",
        "Accept and Continue": "ຍອມຮັບ ແລະ ດຳເນີນຕໍ່",
        "You must accept the Terms of Use to continue.": "ທ່ານຕ້ອງຍອມຮັບເງື່ອນໄຂການນຳໃຊ້ເພື່ອດຳເນີນຕໍ່.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana ຕອບເປັນພາສາຂອງທ່ານ. ເນື້ອຫາທາງເທັກນິກທີ່ຊັບຊ້ອນອາດແຕກຕ່າງກັນໃນຄຸນນະພາບລະຫວ່າງພາສາ.",
        "Could not save acceptance. Please try again.": "ບໍ່ສາມາດບັນທຶກການຍອມຮັບໄດ້. ກະລຸນາລອງໃໝ່.",
    },
    "ml": {  # Malayalam
        "Terms of Use": "ഉപയോഗ നിബന്ധനകൾ",
        "Before using Jana, please review and accept the following terms:": "Jana ഉപയോഗിക്കുന്നതിന് മുമ്പ്, ദയവായി ഇനിപ്പറയുന്ന നിബന്ധനകൾ വായിച്ച് അംഗീകരിക്കുക:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana ഒരു AI സഹായിയാണ്. AI സൃഷ്ടിച്ച മറുപടികൾ കൃത്യമല്ലാത്തതോ അപൂർണ്ണമോ കാലഹരണപ്പെട്ടതോ ആകാം. എല്ലാ വിവരങ്ങളും പ്രവർത്തിക്കുന്നതിന് മുമ്പ് പരിശോധിക്കേണ്ടത് നിങ്ങളുടെ ഉത്തരവാദിത്തമാണ്.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "നിങ്ങളുടെ സ്വന്തം API കീകൾ (BYOK) ഉപയോഗിക്കുകയാണെങ്കിൽ, നിങ്ങളുടെ LLM ദാതാവിലെ എല്ലാ ചെലവുകൾക്കും ഉപയോഗത്തിനും നിങ്ങൾ ഉത്തരവാദിയാണ്. Jana നിങ്ങളുടെ ദാതാവിന്റെ ബില്ലിംഗ് നിയന്ത്രിക്കുകയോ പരിമിതപ്പെടുത്തുകയോ നിരീക്ഷിക്കുകയോ ചെയ്യുന്നില്ല.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "ഏതെങ്കിലും പ്രത്യേക ഉദ്ദേശ്യത്തിനായി AI മറുപടികളുടെ കൃത്യത, വിശ്വാസ്യത അല്ലെങ്കിൽ അനുയോജ്യത Jana ഉറപ്പാക്കുന്നില്ല.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "നിങ്ങളുടെ സംഭാഷണങ്ങൾ � Frappe സൈറ്റിൽ സൂക്ഷിക്കപ്പെടുന്നു. ക്ലൗഡ് LLM ദാതാക്കൾക്ക് അയച്ച ഡാറ്റ അവരുടെ ഡാറ്റ കൈകാര്യം നയങ്ങൾക്ക് വിധേയമാണ്.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition AGPL-3.0 പ്രകാരം ലൈസൻസ് ചെയ്തിരിക്കുന്നു. നിബന്ധനകൾക്കായി പൂർണ്ണ ലൈസൻസ് കാണുക.",
        "I have read and agree to the Terms of Use": "ഞാൻ ഉപയോഗ നിബന്ധനകൾ വായിച്ചു, അംഗീകരിക്കുന്നു",
        "View Full Terms of Use": "പൂർണ്ണ ഉപയോഗ നിബന്ധനകൾ കാണുക",
        "Accept and Continue": "അംഗീകരിച്ച് തുടരുക",
        "You must accept the Terms of Use to continue.": "തുടരുന്നതിന് നിങ്ങൾ ഉപയോഗ നിബന്ധനകൾ അംഗീകരിക്കണം.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana നിങ്ങളുടെ ഭാഷയിൽ പ്രതികരിക്കുന്നു. സങ്കീർണ്ണ സാങ്കേതിക ഉള്ളടക്കം ഭാഷകൾ തമ്മിൽ ഗുണനിലവാരത്തിൽ വ്യത്യാസപ്പെടാം.",
        "Could not save acceptance. Please try again.": "അംഗീകാരം സേവ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    },
    "mr": {  # Marathi
        "Terms of Use": "वापरण्याच्या अटी",
        "Before using Jana, please review and accept the following terms:": "Jana वापरण्यापूर्वी, कृपया खालील अटी वाचा आणि स्वीकारा:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana एक AI सहाय्यक आहे. AI द्वारे तयार केलेली उत्तरे अचूक नसू शकतात, अपूर्ण असू शकतात किंवा जुनी असू शकतात. कोणत्याही माहितीवर कृती करण्यापूर्वी ती सत्यापित करणे ही तुमची जबाबदारी आहे.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "तुम्ही स्वतःच्या API कळा (BYOK) वापरल्यास, तुमच्या LLM प्रदात्याकडील सर्व खर्च आणि वापरासाठी तुम्ही जबाबदार आहात. Jana तुमच्या प्रदात्याचे बिलिंग व्यवस्थापित, मर्यादित किंवा निरीक्षण करत नाही.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana कोणत्याही विशिष्ट उद्देशासाठी AI उत्तरांची अचूकता, विश्वासार्हता किंवा योग्यता हमी देत नाही.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "तुमच्या संवाद या Frappe साइटवर संग्रहित केले जातात. क्लाउड LLM प्रदात्यांना पाठवलेला डेटा त्यांच्या डेटा हाताळणी धोरणांच्या अधीन आहे.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition AGPL-3.0 अंतर्गत परवानाकृत आहे. अटींसाठी संपूर्ण परवाना पहा.",
        "I have read and agree to the Terms of Use": "मी वापरण्याच्या अटी वाचल्या आहेत आणि सहमत आहे",
        "View Full Terms of Use": "संपूर्ण वापरण्याच्या अटी पहा",
        "Accept and Continue": "स्वीकारा आणि पुढे चालू ठेवा",
        "You must accept the Terms of Use to continue.": "पुढे जाण्यासाठी तुम्हाला वापरण्याच्या अटी स्वीकाराव्या लागतील.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana तुमच्या भाषेत उत्तर देतो. जटिल तांत्रिक सामग्रीची गुणवत्ता भाषांमध्ये भिन्न असू शकते.",
        "Could not save acceptance. Please try again.": "स्वीकृती जतन करता आली नाही. कृपया पुन्हा प्रयत्न करा.",
    },
    "my": {  # Burmese
        "Terms of Use": "အသုံးပြုမှု စည်းကမ်းချက်များ",
        "Before using Jana, please review and accept the following terms:": "Jana အသုံးမပြုမီ အောက်ပါစည်းကမ်းချက်များကို ဖတ်ရှုပြီး လက်ခံပါ:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana သည် AI အကူအညီပေးသူဖြစ်သည်။ AI မှ ထုတ်လုပ်သော အဖြေများသည် မမှန်ကန်နိုင်ပါ၊ မပြည့်စုံနိုင်ပါ သို့မဟုတ် ခေတ်မမီနိုင်ပါ။ လုပ်ဆောင်မှု မပြုမီ အချက်အလက်အားလုံးကို စစ်ဆေးရန် သင့်တာဝန်ဖြစ်သည်။",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "သင့်ကိုယ်ပိုင် API key များ (BYOK) အသုံးပြုပါက၊ သင်၏ LLM ဝန်ဆောင်မှုပေးသူနှင့် ကုန်ကျစရိတ်နှင့် အသုံးပြုမှုအားလုံးအတွက် သင်တာဝန်ရှိသည်။ Jana သည် သင့်ဝန်ဆောင်မှုပေးသူ၏ ငွေတောင်းခံမှုကို စီမံ၊ ကန့်သတ် သို့မဟုတ် စောင့်ကြည့်ခြင်း မပြုပါ။",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana သည် မည်သည့်ရည်ရွယ်ချက်အတွက်မဆို AI အဖြေများ၏ တိကျမှု၊ ယုံကြည်စိတ်ချရမှု သို့မဟုတ် သင့်လျော်မှုကို အာမမခံပါ။",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "သင့်စကားပြောဆိုမှုများကို ဤ Frappe site တွင် သိမ်းဆည်းထားသည်။ Cloud LLM ဝန်ဆောင်မှုပေးသူများထံ ပေးပို့သော ဒေတာသည် ၎င်းတို့၏ ဒေတာကိုင်တွယ်မှု မူဝါဒများအရ ဖြစ်သည်။",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition သည် AGPL-3.0 အောက်တွင် လိုင်စင်ရထားသည်။ စည်းကမ်းချက်များအတွက် လိုင်စင်အပြည့်အစုံကို ကြည့်ပါ။",
        "I have read and agree to the Terms of Use": "အသုံးပြုမှု စည်းကမ်းချက်များကို ဖတ်ပြီး သဘောတူပါသည်",
        "View Full Terms of Use": "အသုံးပြုမှု စည်းကမ်းချက်အပြည့်အစုံ ကြည့်ရှုရန်",
        "Accept and Continue": "လက်ခံပြီး ဆက်လုပ်ရန်",
        "You must accept the Terms of Use to continue.": "ဆက်လုပ်ရန် အသုံးပြုမှု စည်းကမ်းချက်များကို လက်ခံရပါမည်။",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana သည် သင့်ဘာသာစကားဖြင့် တုံ့ပြန်သည်။ ရှုပ်ထွေးသော နည်းပညာဆိုင်ရာ အကြောင်းအရာသည် ဘာသာစကားများကြား အရည်အသွေး ကွဲပြားနိုင်သည်။",
        "Could not save acceptance. Please try again.": "လက်ခံမှုကို သိမ်းဆည်း၍ မရပါ။ ထပ်စမ်းကြည့်ပါ။",
    },
    "ps": {  # Pashto
        "Terms of Use": "د کارولو شرایط",
        "Before using Jana, please review and accept the following terms:": "د Jana کارولو دمخه، مهرباني وکړئ لاندې شرایط ولولئ او ومنئ:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana د AI مرستیال دی. د AI لخوا جوړ شوي ځوابونه ممکن ناسم، نیمګړي یا زاړه وي. د هرې معلوماتو پر بنسټ عمل کولو دمخه د هغو تایید کول ستاسو مسؤلیت دی.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "که تاسو خپل API کیلي (BYOK) کاروئ، تاسو د خپل LLM چمتو کونکي سره ټول لګښتونو او کارونو مسؤل یاست. Jana ستاسو د چمتو کونکي بیلینګ نه اداره کوي، محدودوي او نه یې نظارت کوي.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana د هیڅ ځانګړي موخې لپاره د AI ځوابونو دقت، باوري بودن یا مناسبت تضمین نه کوي.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "ستاسو خبرې اترې پدې Frappe سایټ کې زیرمه شوي. کلاوډ LLM چمتو کونکو ته لیږل شوي ډاټا د دوی د ډاټا اداره کولو پالیسیو تابع دي.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition د AGPL-3.0 لاندې جواز لیک شوی دی. د شرایطو لپاره بشپړ جواز لیک وګورئ.",
        "I have read and agree to the Terms of Use": "ما د کارولو شرایط لوستلي او موافق یم",
        "View Full Terms of Use": "بشپړ د کارولو شرایط وګورئ",
        "Accept and Continue": "ومنئ او دوام ورکړئ",
        "You must accept the Terms of Use to continue.": "د دوام لپاره تاسو باید د کارولو شرایط ومنئ.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana ستاسو په ژبه ځواب ورکوي. پیچلې تخنیکي منځپانګه ممکن د ژبو ترمنځ په کیفیت کې توپیر ولري.",
        "Could not save acceptance. Please try again.": "منل ساتل نشول. مهرباني وکړئ بیا هڅه وکړئ.",
    },
    "quc": {  # K'iche' (Mayan)
        "Terms of Use": "Uwach taq ucholajil rech ukojik",
        "Before using Jana, please review and accept the following terms:": "Chuwach ukojik ri Jana, tab'ana' utzil kasik'ij xuqujeꞌ kak'ulu' ri re taq ucholajil:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Ri Jana jun to'onel AI. Ri taq tzij ri kuya ri AI rik'in juba' man e utz ta, man e tz'aqat ta o e ojer chik. At at k'o chi achomaj ronojel ri etamab'al chuwach asamaj.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "We kawokisaj ri awech API taq llave (BYOK), at at k'o chi pa ronojel ri rajil xuqujeꞌ ri ukojik rik'in ri LLM ajawal. Ri Jana man kuya ta ucholajil ri q'atoj rajil ri ajawal.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Ri Jana man kuya ta uq'alajisaxik chi ri taq tzij ri kuya ri AI e utz, e k'o kik'ij, o e k'amon chirij jun cholajil.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "Ri ach'ab'al e k'o waral pa re ruxaq Frappe. Ri taq tzij ri etaqon chi ke ri LLM jawalil pa sutz' e k'o pa ri kicholajil.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Ri Jana Community Edition k'o ulicencia pa AGPL-3.0. Tatz'eta' ri nimalaj licencia rech ri ucholajil.",
        "I have read and agree to the Terms of Use": "Xinsik'ij xuqujeꞌ kinwetamaj ri Uwach taq ucholajil rech ukojik",
        "View Full Terms of Use": "Tatz'eta' ronojel ri Uwach taq ucholajil rech ukojik",
        "Accept and Continue": "Tak'ulu' xuqujeꞌ tasamajij",
        "You must accept the Terms of Use to continue.": "K'o chi kak'ulu' ri Uwach taq ucholajil rech ukojik rech kasamajij.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Ri Jana kutzijoj pa ri ach'ab'al. Ri nimalaj taq tzij ri man e are ta rech k'o juba' man e junam ta pa ronojel ch'ab'al.",
        "Could not save acceptance. Please try again.": "Man xtikir ta xkeyak ri uk'ulaxik. Tab'ana' utzil tachapa' chik.",
    },
    "rw": {  # Kinyarwanda
        "Terms of Use": "Amabwiriza y'imikoreshereze",
        "Before using Jana, please review and accept the following terms:": "Mbere yo gukoresha Jana, soma kandi wemere amabwiriza akurikira:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana ni umufasha wa AI. Ibisubizo byakozwe na AI bishobora kutaba byo, gutuzura cyangwa gushaje. Ni inshingano yawe kugenzura amakuru yose mbere yo gukora.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "Niba ukoresha urupfunguzo rwawe rwa API (BYOK), uri umwishingizi w'amafaranga yose n'imikoreshereze ku mutanga wawe wa LLM. Jana ntiyobora, ntilimita cyangwa ntigenzura inyemezabuguzi z'umutanga wawe.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana ntihamya ukuri, kwizerana cyangwa kubereha kw'ibisubizo bya AI ku ntego iyo ari yo yose.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "Ibibarizwa byawe bibitswe kuri uru rubuga rwa Frappe. Amakuru yoherejwe ku batanga LLM bo mu bicu akurikira politiki zabo zo gucunga amakuru.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition ifite uruhushya rwa AGPL-3.0. Reba uruhushya rwose ku mabwiriza.",
        "I have read and agree to the Terms of Use": "Nasomye kandi nemeye Amabwiriza y'imikoreshereze",
        "View Full Terms of Use": "Reba Amabwiriza yose y'imikoreshereze",
        "Accept and Continue": "Emera kandi ukomeze",
        "You must accept the Terms of Use to continue.": "Ugomba kwemera Amabwiriza y'imikoreshereze kugira ngo ukomeze.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana isubiza mu rurimi rwawe. Ibikubiye mu bya tekinike bigoye bishobora gutandukana ku kuri mu ndimi zitandukanye.",
        "Could not save acceptance. Please try again.": "Kwemera ntibyashobotse kubikwa. Ongera ugerageze.",
    },
    "se": {  # Northern Sami
        "Terms of Use": "Geavahaneavttut",
        "Before using Jana, please review and accept the following terms:": "Ovdal go geavahit Jana, loga ja dohkket čuovvovaš eavttuid:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana lea AI-veahkki. AI-ráhkaduvvon vástádusat sáhttet leat eahpedárkilat, váilevaččat dahje boarásmuvvan. Du ovddasvástádus lea dárkkistit buot dieđuid ovdal go doaimmát.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "Jus geavahit iežat API-čoavdagat (BYOK), de leat ovddasvástideaddji buot goluid ja geavaheami ovddas du LLM-fálaldahkii. Jana ii hálddaš, ráddje dahje čuovo du fálaldaga rehkenastima.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana ii dáhkko AI-vástádusaid dárkilašvuođa, luohtehahttivuođa dahje heivvolašvuođa oktage erenoamáš ulbmilii.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "Du ságastallamat vurkkoduvvojit dán Frappe-siidui. Dieđut mat sáddejuvvojit bálkko-LLM-fálaldagaide čuvvot sin diehtomeannudeami njuolggadusaid.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition lea liseanssejuvvon AGPL-3.0 vuolde. Geahča olles liseansa eavttuide.",
        "I have read and agree to the Terms of Use": "Lean lohkan ja dohkkehan Geavahaneavttuid",
        "View Full Terms of Use": "Geahča olles Geavahaneavttuid",
        "Accept and Continue": "Dohkket ja joatkit",
        "You must accept the Terms of Use to continue.": "Ferte dohkkehit Geavahaneavttuid joatkimis.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana vástida du gillii. Váttes teknihkalaš sisdoallu sáhttá earuha kvaliteahtas gielaid gaskkas.",
        "Could not save acceptance. Please try again.": "Ii lihkostuvvan vurket dohkkehusa. Geahččal ođđasit.",
    },
    "si": {  # Sinhala
        "Terms of Use": "භාවිත නියම",
        "Before using Jana, please review and accept the following terms:": "Jana භාවිත කිරීමට පෙර, කරුණාකර පහත නියම කියවා පිළිගන්න:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana AI සහායකයෙකි. AI මඟින් ජනනය කරන ලද පිළිතුරු නිවැරදි නොවිය හැකිය, අසම්පූර්ණ හෝ යල් පැන ගිය ඒවා විය හැකිය. කටයුතු කිරීමට පෙර සියලු තොරතුරු තහවුරු කර ගැනීම ඔබේ වගකීමයි.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "ඔබ ඔබේම API යතුරු (BYOK) භාවිත කරන්නේ නම්, ඔබේ LLM සපයන්නා සමඟ සියලු වියදම් සහ භාවිතය සඳහා ඔබ වගකිව යුතුය. Jana ඔබේ සපයන්නාගේ බිල්පත් කළමනාකරණය, සීමා කිරීම හෝ අධීක්ෂණය නොකරයි.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana කිසිදු විශේෂ අරමුණක් සඳහා AI පිළිතුරුවල නිවැරදිභාවය, විශ්වාසනීයත්වය හෝ යෝග්‍යතාවය සහතික නොකරයි.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "ඔබේ සංවාද මෙම Frappe අඩවියේ ගබඩා කර ඇත. වලාකුළු LLM සපයන්නන්ට යවන දත්ත ඔවුන්ගේ දත්ත හැසිරවීමේ ප්‍රතිපත්තිවලට යටත් වේ.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition AGPL-3.0 යටතේ බලපත්‍ර ලබා ඇත. නියම සඳහා සම්පූර්ණ බලපත්‍රය බලන්න.",
        "I have read and agree to the Terms of Use": "මම භාවිත නියම කියවා එකඟ වෙමි",
        "View Full Terms of Use": "සම්පූර්ණ භාවිත නියම බලන්න",
        "Accept and Continue": "පිළිගෙන ඉදිරියට යන්න",
        "You must accept the Terms of Use to continue.": "ඉදිරියට යාමට ඔබ භාවිත නියම පිළිගත යුතුය.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana ඔබේ භාෂාවෙන් පිළිතුරු දෙයි. සංකීර්ණ තාක්ෂණික අන්තර්ගතය භාෂා අතර ගුණාත්මක බවින් වෙනස් විය හැකිය.",
        "Could not save acceptance. Please try again.": "පිළිගැනීම සුරැකිය නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.",
    },
    "sw": {  # Swahili
        "Terms of Use": "Masharti ya Matumizi",
        "Before using Jana, please review and accept the following terms:": "Kabla ya kutumia Jana, tafadhali soma na ukubali masharti yafuatayo:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana ni msaidizi wa AI. Majibu yanayotengenezwa na AI yanaweza kuwa yasiyo sahihi, kamili, au ya zamani. Wewe una wajibu wa kuthibitisha taarifa zote kabla ya kuchukua hatua.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "Ukitumia funguo zako za API (BYOK), wewe una wajibu wa gharama zote na matumizi na mtoa huduma wako wa LLM. Jana haisimamii, haipunguzi wala haifuatilii utozaji wa mtoa huduma wako.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana haitoi dhamana ya usahihi, uaminifu, au ufaafu wa majibu ya AI kwa madhumuni yoyote maalum.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "Mazungumzo yako yamehifadhiwa kwenye tovuti hii ya Frappe. Data inayotumwa kwa watoa huduma wa LLM wa wingu inategemea sera zao za kushughulikia data.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition ina leseni chini ya AGPL-3.0. Tazama leseni kamili kwa masharti.",
        "I have read and agree to the Terms of Use": "Nimesoma na ninakubali Masharti ya Matumizi",
        "View Full Terms of Use": "Tazama Masharti Kamili ya Matumizi",
        "Accept and Continue": "Kubali na Endelea",
        "You must accept the Terms of Use to continue.": "Lazima ukubali Masharti ya Matumizi ili kuendelea.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana inajibu kwa lugha yako. Maudhui changamano ya kiufundi yanaweza kutofautiana kwa ubora kati ya lugha.",
        "Could not save acceptance. Please try again.": "Haikuweza kuhifadhi kukubalika. Tafadhali jaribu tena.",
    },
    "ta": {  # Tamil
        "Terms of Use": "பயன்பாட்டு விதிமுறைகள்",
        "Before using Jana, please review and accept the following terms:": "Jana பயன்படுத்துவதற்கு முன், பின்வரும் விதிமுறைகளைப் படித்து ஏற்றுக்கொள்ளுங்கள்:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana ஒரு AI உதவியாளர். AI உருவாக்கிய பதில்கள் துல்லியமற்றதாகவோ, முழுமையற்றதாகவோ அல்லது காலாவதியானதாகவோ இருக்கலாம். எந்தவொரு தகவலின் அடிப்படையில் செயல்படுவதற்கு முன் அதைச் சரிபார்ப்பது உங்கள் பொறுப்பு.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "உங்கள் சொந்த API விசைகளைப் (BYOK) பயன்படுத்தினால், உங்கள் LLM வழங்குநரிடம் அனைத்து செலவுகளுக்கும் பயன்பாட்டிற்கும் நீங்கள் பொறுப்பு. Jana உங்கள் வழங்குநரின் கட்டணத்தை நிர்வகிக்காது, வரம்பிடாது அல்லது கண்காணிக்காது.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "எந்தவொரு குறிப்பிட்ட நோக்கத்திற்கும் AI பதில்களின் துல்லியம், நம்பகத்தன்மை அல்லது பொருத்தத்தை Jana உத்தரவாதம் அளிக்காது.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "உங்கள் உரையாடல்கள் இந்த Frappe தளத்தில் சேமிக்கப்படுகின்றன. கிளவுட் LLM வழங்குநர்களுக்கு அனுப்பப்படும் தரவு அவர்களின் தரவு கையாளல் கொள்கைகளுக்கு உட்பட்டது.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition AGPL-3.0 இன் கீழ் உரிமம் பெற்றது. விதிமுறைகளுக்கு முழு உரிமத்தைப் பாருங்கள்.",
        "I have read and agree to the Terms of Use": "நான் பயன்பாட்டு விதிமுறைகளைப் படித்தேன், ஒப்புக்கொள்கிறேன்",
        "View Full Terms of Use": "முழு பயன்பாட்டு விதிமுறைகளைக் காண்க",
        "Accept and Continue": "ஏற்றுக்கொண்டு தொடரவும்",
        "You must accept the Terms of Use to continue.": "தொடர பயன்பாட்டு விதிமுறைகளை ஏற்றுக்கொள்ள வேண்டும்.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana உங்கள் மொழியில் பதிலளிக்கிறது. சிக்கலான தொழில்நுட்ப உள்ளடக்கம் மொழிகளுக்கிடையே தரத்தில் மாறுபடலாம்.",
        "Could not save acceptance. Please try again.": "ஏற்றுக்கொள்ளலைச் சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    },
    "te": {  # Telugu
        "Terms of Use": "వాడుక నిబంధనలు",
        "Before using Jana, please review and accept the following terms:": "Jana వాడకానికి ముందు, దయచేసి క్రింది నిబంధనలను చదివి అంగీకరించండి:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana ఒక AI సహాయకుడు. AI రూపొందించిన సమాధానాలు సరికానివి, అసంపూర్ణమైనవి లేదా పాతవి కావచ్చు. ఏదైనా సమాచారంపై చర్య తీసుకునే ముందు దాన్ని ధృవీకరించడం మీ బాధ్యత.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "మీ స్వంత API కీలు (BYOK) వాడితే, మీ LLM ప్రొవైడర్‌తో అన్ని ఖర్చులు మరియు వాడకానికి మీరు బాధ్యులు. Jana మీ ప్రొవైడర్ బిల్లింగ్‌ను నిర్వహించదు, పరిమితం చేయదు లేదా పర్యవేక్షించదు.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana ఏ ప్రత్యేక ఉద్దేశ్యానికైనా AI సమాధానాల ఖచ్చితత్వం, విశ్వసనీయత లేదా అనుకూలతను హామీ ఇవ్వదు.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "మీ సంభాషణలు ఈ Frappe సైట్‌లో నిల్వ చేయబడతాయి. క్లౌడ్ LLM ప్రొవైడర్లకు పంపిన డేటా వారి డేటా నిర్వహణ విధానాలకు లోబడి ఉంటుంది.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition AGPL-3.0 కింద లైసెన్స్ పొందింది. నిబంధనల కోసం పూర్తి లైసెన్స్ చూడండి.",
        "I have read and agree to the Terms of Use": "నేను వాడుక నిబంధనలను చదివాను మరియు అంగీకరిస్తున్నాను",
        "View Full Terms of Use": "పూర్తి వాడుక నిబంధనలను చూడండి",
        "Accept and Continue": "అంగీకరించి కొనసాగించండి",
        "You must accept the Terms of Use to continue.": "కొనసాగించడానికి మీరు వాడుక నిబంధనలను అంగీకరించాలి.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana మీ భాషలో స్పందిస్తుంది. సంక్లిష్ట సాంకేతిక కంటెంట్ భాషల మధ్య నాణ్యతలో మారవచ్చు.",
        "Could not save acceptance. Please try again.": "అంగీకారాన్ని సేవ్ చేయడం సాధ్యం కాలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    },
    "ur": {  # Urdu
        "Terms of Use": "استعمال کی شرائط",
        "Before using Jana, please review and accept the following terms:": "Jana استعمال کرنے سے پہلے، براہ کرم درج ذیل شرائط کا جائزہ لیں اور قبول کریں:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana ایک AI معاون ہے۔ AI کے ذریعے تیار کردہ جوابات غلط، نامکمل یا پرانے ہو سکتے ہیں۔ کسی بھی معلومات پر عمل کرنے سے پہلے اس کی تصدیق کرنا آپ کی ذمہ داری ہے۔",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "اگر آپ اپنی API کیز (BYOK) استعمال کرتے ہیں تو آپ اپنے LLM فراہم کنندہ کے ساتھ تمام اخراجات اور استعمال کے ذمہ دار ہیں۔ Jana آپ کے فراہم کنندہ کی بلنگ کا انتظام، حد بندی یا نگرانی نہیں کرتا۔",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana کسی بھی مخصوص مقصد کے لیے AI جوابات کی درستگی، قابل اعتمادی یا موزونیت کی ضمانت نہیں دیتا۔",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "آپ کی گفتگو اس Frappe سائٹ پر محفوظ ہے۔ کلاؤڈ LLM فراہم کنندگان کو بھیجا گیا ڈیٹا ان کی ڈیٹا ہینڈلنگ پالیسیوں کے تابع ہے۔",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition AGPL-3.0 کے تحت لائسنس یافتہ ہے۔ شرائط کے لیے مکمل لائسنس دیکھیں۔",
        "I have read and agree to the Terms of Use": "میں نے استعمال کی شرائط پڑھ لی ہیں اور متفق ہوں",
        "View Full Terms of Use": "مکمل استعمال کی شرائط دیکھیں",
        "Accept and Continue": "قبول کریں اور جاری رکھیں",
        "You must accept the Terms of Use to continue.": "جاری رکھنے کے لیے آپ کو استعمال کی شرائط قبول کرنا ضروری ہے۔",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana آپ کی زبان میں جواب دیتا ہے۔ پیچیدہ تکنیکی مواد کا معیار زبانوں کے درمیان مختلف ہو سکتا ہے۔",
        "Could not save acceptance. Please try again.": "قبولیت محفوظ نہیں ہو سکی۔ براہ کرم دوبارہ کوشش کریں۔",
    },
    "uz": {  # Uzbek
        "Terms of Use": "Foydalanish shartlari",
        "Before using Jana, please review and accept the following terms:": "Jana'dan foydalanishdan oldin, quyidagi shartlarni o'qib chiqing va qabul qiling:",
        "Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.": "Jana AI yordamchisi. AI tomonidan yaratilgan javoblar noto'g'ri, to'liq emas yoki eskirgan bo'lishi mumkin. Har qanday ma'lumot asosida harakat qilishdan oldin uni tekshirish sizning mas'uliyatingiz.",
        "If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.": "Agar o'z API kalitlaringiz (BYOK) ishlatayotgan bo'lsangiz, LLM provaydringiz bilan barcha xarajatlar va foydalanish uchun siz javobgarsiz. Jana provaydringiz hisob-kitobini boshqarmaydi, cheklamaydi yoki nazorat qilmaydi.",
        "Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.": "Jana AI javoblarining aniq, ishonchli yoki har qanday maxsus maqsadga mos kelishini kafolatlamaydi.",
        "Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.": "Suhbatlaringiz ushbu Frappe saytida saqlanadi. Bulutli LLM provayderlariga yuborilgan ma'lumotlar ularning ma'lumotlarni qayta ishlash siyosatlariga bo'ysunadi.",
        "Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.": "Jana Community Edition AGPL-3.0 bo'yicha litsenziyalangan. Shartlar uchun to'liq litsenziyani ko'ring.",
        "I have read and agree to the Terms of Use": "Foydalanish shartlarini o'qidim va roziman",
        "View Full Terms of Use": "To'liq Foydalanish shartlarini ko'rish",
        "Accept and Continue": "Qabul qilish va davom etish",
        "You must accept the Terms of Use to continue.": "Davom etish uchun Foydalanish shartlarini qabul qilishingiz kerak.",
        "Jana responds in your language. Complex technical content may vary in quality across languages.": "Jana sizning tilingizda javob beradi. Murakkab texnik kontent tillar o'rtasida sifat bo'yicha farq qilishi mumkin.",
        "Could not save acceptance. Please try again.": "Qabul qilishni saqlash imkoni bo'lmadi. Iltimos, qayta urinib ko'ring.",
    },
}


def fill_csv(filepath, lang_code):
    """Read a CSV, fill in translations for our 13 strings, write back."""
    translations = TRANSLATIONS.get(lang_code, {})
    if not translations:
        print(f"  No translations defined for {lang_code}, skipping")
        return 0

    # Read entire file
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Parse and rebuild
    reader = csv.reader(io.StringIO(content))
    rows = list(reader)

    filled = 0
    for i, row in enumerate(rows):
        if len(row) >= 1 and row[0] in translations:
            if len(row) < 2 or not row[1].strip():
                if len(row) < 2:
                    row.append(translations[row[0]])
                else:
                    row[1] = translations[row[0]]
                filled += 1

    # Write back
    output = io.StringIO()
    writer = csv.writer(output)
    for row in rows:
        writer.writerow(row)

    with open(filepath, "w", encoding="utf-8", newline="") as f:
        f.write(output.getvalue())

    return filled


def main():
    translations_dir = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "jana", "translations",
    )

    if len(sys.argv) >= 2 and sys.argv[1] == "--all":
        lang_codes = list(TRANSLATIONS.keys())
    elif len(sys.argv) >= 2:
        lang_codes = sys.argv[1:]
    else:
        print("Usage: python scripts/fill_translations.py --all")
        print("       python scripts/fill_translations.py <lang_code> [...]")
        sys.exit(1)

    total = 0
    for lang_code in lang_codes:
        filepath = os.path.join(translations_dir, f"{lang_code}.csv")
        if not os.path.exists(filepath):
            print(f"  {lang_code}.csv not found, skipping")
            continue
        filled = fill_csv(filepath, lang_code)
        total += filled
        if filled:
            print(f"  {lang_code}.csv: filled {filled} translations")

    print(f"\nDone. Filled {total} translations across {len(lang_codes)} files.")


if __name__ == "__main__":
    main()
