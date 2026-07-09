import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "or", label: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "as", label: "Assamese", native: "অসমীয়া" },
  { code: "ur", label: "Urdu", native: "اردو" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

type Dict = Record<string, string>;

const T: Record<LangCode, Dict> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.marketplace": "Marketplace",
    "nav.smart": "Smart Farming",
    "nav.manure": "Manure",
    "nav.products": "Products",
    "nav.contact": "Contact",
    "hero.chip": "A student innovation for sustainable farming",
    "hero.title1": "Growing futures,",
    "hero.title2": "one seed at a time.",
    "hero.sub": "Agrivio turns discarded fruit seeds and farm residue into quality saplings, organic compost and a fair, transparent marketplace for Indian farmers.",
    "hero.cta1": "Explore marketplace",
    "hero.cta2": "Our story",
    "footer.tag": "A student innovation turning fruit-market waste into seeds, saplings, compost and fair income for Indian farmers.",
    "footer.explore": "Explore",
    "footer.project": "Project",
    "lang.label": "Language",
  },
  hi: {
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.marketplace": "बाज़ार",
    "nav.smart": "स्मार्ट खेती",
    "nav.manure": "खाद",
    "nav.products": "उत्पाद",
    "nav.contact": "संपर्क",
    "hero.chip": "टिकाऊ खेती के लिए एक विद्यार्थी नवाचार",
    "hero.title1": "भविष्य उगाओ,",
    "hero.title2": "एक बीज के साथ।",
    "hero.sub": "एग्रीवियो फेंके गए फलों के बीज और खेत के अवशेष को गुणवत्तापूर्ण पौध, जैविक खाद और भारतीय किसानों के लिए एक निष्पक्ष, पारदर्शी बाज़ार में बदलता है।",
    "hero.cta1": "बाज़ार देखें",
    "hero.cta2": "हमारी कहानी",
    "footer.tag": "फल-मंडी के कचरे को बीज, पौध, खाद और किसानों की उचित आय में बदलने वाला एक विद्यार्थी नवाचार।",
    "footer.explore": "खोजें",
    "footer.project": "परियोजना",
    "lang.label": "भाषा",
  },
  bn: {
    "nav.home": "হোম",
    "nav.about": "আমাদের কথা",
    "nav.marketplace": "বাজার",
    "nav.smart": "স্মার্ট কৃষি",
    "nav.manure": "সার",
    "nav.products": "পণ্য",
    "nav.contact": "যোগাযোগ",
    "hero.chip": "টেকসই কৃষির জন্য একটি ছাত্র উদ্ভাবন",
    "hero.title1": "ভবিষ্যৎ বাড়ছে,",
    "hero.title2": "একটি করে বীজে।",
    "hero.sub": "এগ্রিভিও ফেলে দেওয়া ফলের বীজ ও কৃষি বর্জ্যকে মানসম্পন্ন চারা, জৈব সার এবং ভারতীয় কৃষকদের জন্য একটি ন্যায্য, স্বচ্ছ বাজারে রূপান্তরিত করে।",
    "hero.cta1": "বাজার দেখুন",
    "hero.cta2": "আমাদের গল্প",
    "footer.tag": "ফলের বাজারের বর্জ্যকে বীজ, চারা, সার ও কৃষকদের ন্যায্য আয়ে পরিণত করার এক ছাত্র উদ্ভাবন।",
    "footer.explore": "অন্বেষণ",
    "footer.project": "প্রকল্প",
    "lang.label": "ভাষা",
  },
  ta: {
    "nav.home": "முகப்பு",
    "nav.about": "எங்களைப் பற்றி",
    "nav.marketplace": "சந்தை",
    "nav.smart": "ஸ்மார்ட் விவசாயம்",
    "nav.manure": "உரம்",
    "nav.products": "பொருட்கள்",
    "nav.contact": "தொடர்பு",
    "hero.chip": "நிலையான விவசாயத்திற்கான ஒரு மாணவர் புதுமை",
    "hero.title1": "எதிர்காலத்தை வளர்க்கிறோம்,",
    "hero.title2": "ஒரு விதையில் இருந்து.",
    "hero.sub": "அக்ரிவியோ தூக்கியெறியப்பட்ட பழ விதைகள் மற்றும் விவசாய கழிவுகளை தரமான நாற்றுகள், இயற்கை உரம் மற்றும் இந்திய விவசாயிகளுக்கான நியாயமான, வெளிப்படையான சந்தையாக மாற்றுகிறது.",
    "hero.cta1": "சந்தையை பார்",
    "hero.cta2": "எங்கள் கதை",
    "footer.tag": "பழ சந்தை கழிவை விதைகள், நாற்றுகள், உரம் மற்றும் விவசாயிகளின் நியாயமான வருமானமாக மாற்றும் மாணவர் புதுமை.",
    "footer.explore": "ஆராய",
    "footer.project": "திட்டம்",
    "lang.label": "மொழி",
  },
  te: {
    "nav.home": "హోమ్",
    "nav.about": "మా గురించి",
    "nav.marketplace": "మార్కెట్",
    "nav.smart": "స్మార్ట్ వ్యవసాయం",
    "nav.manure": "ఎరువు",
    "nav.products": "ఉత్పత్తులు",
    "nav.contact": "సంప్రదించండి",
    "hero.chip": "సుస్థిర వ్యవసాయం కోసం విద్యార్థి ఆవిష్కరణ",
    "hero.title1": "భవిష్యత్తును పెంచుతూ,",
    "hero.title2": "ఒక విత్తనం నుండి.",
    "hero.sub": "అగ్రివియో పారేసిన పండ్ల విత్తనాలు, వ్యవసాయ వ్యర్థాలను నాణ్యమైన మొక్కలు, సేంద్రియ ఎరువు మరియు భారతీయ రైతులకు న్యాయమైన, పారదర్శక మార్కెట్‌గా మారుస్తుంది.",
    "hero.cta1": "మార్కెట్ చూడండి",
    "hero.cta2": "మా కథ",
    "footer.tag": "పండ్ల మార్కెట్ వ్యర్థాలను విత్తనాలు, మొక్కలు, ఎరువు మరియు రైతుల న్యాయమైన ఆదాయంగా మార్చే విద్యార్థి ఆవిష్కరణ.",
    "footer.explore": "అన్వేషించండి",
    "footer.project": "ప్రాజెక్ట్",
    "lang.label": "భాష",
  },
  mr: {
    "nav.home": "मुख्यपृष्ठ",
    "nav.about": "आमच्याबद्दल",
    "nav.marketplace": "बाजार",
    "nav.smart": "स्मार्ट शेती",
    "nav.manure": "खत",
    "nav.products": "उत्पादने",
    "nav.contact": "संपर्क",
    "hero.chip": "शाश्वत शेतीसाठी विद्यार्थ्यांचा नवोपक्रम",
    "hero.title1": "भविष्य वाढवत आहोत,",
    "hero.title2": "एका बीजापासून.",
    "hero.sub": "अ‍ॅग्रिव्हिओ टाकून दिलेल्या फळांच्या बिया आणि शेती कचऱ्याचे दर्जेदार रोपे, सेंद्रिय खत आणि भारतीय शेतकऱ्यांसाठी न्याय्य, पारदर्शक बाजारात रूपांतर करतो.",
    "hero.cta1": "बाजार पहा",
    "hero.cta2": "आमची कहाणी",
    "footer.tag": "फळ बाजारातील कचऱ्याचे बिया, रोपे, खत आणि शेतकऱ्यांच्या न्याय्य उत्पन्नात रूपांतर करणारा विद्यार्थ्यांचा नवोपक्रम.",
    "footer.explore": "एक्सप्लोर",
    "footer.project": "प्रकल्प",
    "lang.label": "भाषा",
  },
  gu: {
    "nav.home": "હોમ",
    "nav.about": "અમારા વિશે",
    "nav.marketplace": "બજાર",
    "nav.smart": "સ્માર્ટ ખેતી",
    "nav.manure": "ખાતર",
    "nav.products": "ઉત્પાદનો",
    "nav.contact": "સંપર્ક",
    "hero.chip": "ટકાઉ ખેતી માટે વિદ્યાર્થી નવીનતા",
    "hero.title1": "ભવિષ્ય ઉગાડીએ,",
    "hero.title2": "એક બીજથી.",
    "hero.sub": "એગ્રિવિયો ફેંકી દેવાયેલા ફળના બીજ અને ખેતીના કચરાને ગુણવત્તાયુક્ત રોપા, જૈવિક ખાતર અને ભારતીય ખેડૂતો માટે ન્યાયી, પારદર્શક બજારમાં ફેરવે છે.",
    "hero.cta1": "બજાર જુઓ",
    "hero.cta2": "અમારી વાર્તા",
    "footer.tag": "ફળ બજારના કચરાને બીજ, રોપા, ખાતર અને ખેડૂતોની ન્યાયી આવકમાં ફેરવતી વિદ્યાર્થી નવીનતા.",
    "footer.explore": "શોધો",
    "footer.project": "પ્રોજેક્ટ",
    "lang.label": "ભાષા",
  },
  kn: {
    "nav.home": "ಮುಖಪುಟ",
    "nav.about": "ನಮ್ಮ ಬಗ್ಗೆ",
    "nav.marketplace": "ಮಾರುಕಟ್ಟೆ",
    "nav.smart": "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
    "nav.manure": "ಗೊಬ್ಬರ",
    "nav.products": "ಉತ್ಪನ್ನಗಳು",
    "nav.contact": "ಸಂಪರ್ಕ",
    "hero.chip": "ಸುಸ್ಥಿರ ಕೃಷಿಗಾಗಿ ವಿದ್ಯಾರ್ಥಿ ನಾವೀನ್ಯತೆ",
    "hero.title1": "ಭವಿಷ್ಯವನ್ನು ಬೆಳೆಸೋಣ,",
    "hero.title2": "ಒಂದು ಬೀಜದಿಂದ.",
    "hero.sub": "ಅಗ್ರಿವಿಯೊ ಎಸೆದ ಹಣ್ಣಿನ ಬೀಜ ಮತ್ತು ಕೃಷಿ ತ್ಯಾಜ್ಯವನ್ನು ಗುಣಮಟ್ಟದ ಸಸಿ, ಸಾವಯವ ಗೊಬ್ಬರ ಮತ್ತು ಭಾರತೀಯ ರೈತರಿಗೆ ನ್ಯಾಯಯುತ, ಪಾರದರ್ಶಕ ಮಾರುಕಟ್ಟೆಯಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ.",
    "hero.cta1": "ಮಾರುಕಟ್ಟೆ ನೋಡಿ",
    "hero.cta2": "ನಮ್ಮ ಕಥೆ",
    "footer.tag": "ಹಣ್ಣಿನ ಮಾರುಕಟ್ಟೆ ತ್ಯಾಜ್ಯವನ್ನು ಬೀಜ, ಸಸಿ, ಗೊಬ್ಬರ ಮತ್ತು ರೈತರ ನ್ಯಾಯಯುತ ಆದಾಯವಾಗಿ ಪರಿವರ್ತಿಸುವ ವಿದ್ಯಾರ್ಥಿ ನಾವೀನ್ಯತೆ.",
    "footer.explore": "ಅನ್ವೇಷಿಸಿ",
    "footer.project": "ಯೋಜನೆ",
    "lang.label": "ಭಾಷೆ",
  },
  ml: {
    "nav.home": "ഹോം",
    "nav.about": "ഞങ്ങളെപ്പറ്റി",
    "nav.marketplace": "മാർക്കറ്റ്",
    "nav.smart": "സ്മാർട്ട് കൃഷി",
    "nav.manure": "വളം",
    "nav.products": "ഉൽപ്പന്നങ്ങൾ",
    "nav.contact": "ബന്ധപ്പെടുക",
    "hero.chip": "സുസ്ഥിര കൃഷിക്കായുള്ള വിദ്യാർത്ഥി നൂതനത്വം",
    "hero.title1": "ഭാവി വളർത്തുന്നു,",
    "hero.title2": "ഒരു വിത്തിൽ നിന്ന്.",
    "hero.sub": "അഗ്രിവിയോ വലിച്ചെറിഞ്ഞ പഴവിത്തുകളും കാർഷിക അവശിഷ്ടങ്ങളും ഗുണനിലവാരമുള്ള തൈകൾ, ജൈവ വളം, ഇന്ത്യൻ കർഷകർക്ക് ന്യായവും സുതാര്യവുമായ വിപണിയാക്കി മാറ്റുന്നു.",
    "hero.cta1": "മാർക്കറ്റ് കാണുക",
    "hero.cta2": "ഞങ്ങളുടെ കഥ",
    "footer.tag": "പഴച്ചന്തയിലെ മാലിന്യത്തെ വിത്ത്, തൈ, വളം, കർഷകരുടെ ന്യായമായ വരുമാനം ആക്കുന്ന വിദ്യാർത്ഥി നൂതനത്വം.",
    "footer.explore": "പര്യവേക്ഷണം",
    "footer.project": "പദ്ധതി",
    "lang.label": "ഭാഷ",
  },
  pa: {
    "nav.home": "ਹੋਮ",
    "nav.about": "ਸਾਡੇ ਬਾਰੇ",
    "nav.marketplace": "ਬਾਜ਼ਾਰ",
    "nav.smart": "ਸਮਾਰਟ ਖੇਤੀ",
    "nav.manure": "ਖਾਦ",
    "nav.products": "ਉਤਪਾਦ",
    "nav.contact": "ਸੰਪਰਕ",
    "hero.chip": "ਟਿਕਾਊ ਖੇਤੀ ਲਈ ਵਿਦਿਆਰਥੀ ਨਵੀਨਤਾ",
    "hero.title1": "ਭਵਿੱਖ ਉਗਾਈਏ,",
    "hero.title2": "ਇੱਕ ਬੀਜ ਤੋਂ।",
    "hero.sub": "ਐਗਰੀਵੀਓ ਸੁੱਟੇ ਗਏ ਫਲਾਂ ਦੇ ਬੀਜ ਅਤੇ ਖੇਤੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਨੂੰ ਗੁਣਵੱਤਾ ਵਾਲੇ ਬੂਟੇ, ਜੈਵਿਕ ਖਾਦ ਅਤੇ ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਨਿਆਂਪੂਰਨ, ਪਾਰਦਰਸ਼ੀ ਬਾਜ਼ਾਰ ਵਿੱਚ ਬਦਲਦਾ ਹੈ।",
    "hero.cta1": "ਬਾਜ਼ਾਰ ਵੇਖੋ",
    "hero.cta2": "ਸਾਡੀ ਕਹਾਣੀ",
    "footer.tag": "ਫਲ ਬਾਜ਼ਾਰ ਦੇ ਕੂੜੇ ਨੂੰ ਬੀਜ, ਬੂਟੇ, ਖਾਦ ਅਤੇ ਕਿਸਾਨਾਂ ਦੀ ਨਿਆਂਪੂਰਨ ਆਮਦਨ ਵਿੱਚ ਬਦਲਦੀ ਵਿਦਿਆਰਥੀ ਨਵੀਨਤਾ।",
    "footer.explore": "ਖੋਜੋ",
    "footer.project": "ਪ੍ਰੋਜੈਕਟ",
    "lang.label": "ਭਾਸ਼ਾ",
  },
  or: {
    "nav.home": "ମୂଳପୃଷ୍ଠା",
    "nav.about": "ଆମ ବିଷୟରେ",
    "nav.marketplace": "ବଜାର",
    "nav.smart": "ସ୍ମାର୍ଟ କୃଷି",
    "nav.manure": "ଖତ",
    "nav.products": "ଉତ୍ପାଦ",
    "nav.contact": "ଯୋଗାଯୋଗ",
    "hero.chip": "ସ୍ଥାୟୀ କୃଷି ପାଇଁ ଛାତ୍ର ନବସୃଜନ",
    "hero.title1": "ଭବିଷ୍ୟତ ବଢାଇବା,",
    "hero.title2": "ଏକ ମଞ୍ଜିରୁ।",
    "hero.sub": "ଅଗ୍ରିଭିଓ ପକାଇଦିଆଯାଇଥିବା ଫଳ ମଞ୍ଜି ଓ କୃଷି ବର୍ଜ୍ୟକୁ ଗୁଣାତ୍ମକ ଚାରା, ଜୈବିକ ଖତ ଓ ଭାରତୀୟ କୃଷକଙ୍କ ପାଇଁ ନ୍ୟାୟ୍ୟ, ସ୍ୱଚ୍ଛ ବଜାରରେ ପରିଣତ କରେ।",
    "hero.cta1": "ବଜାର ଦେଖନ୍ତୁ",
    "hero.cta2": "ଆମ କାହାଣୀ",
    "footer.tag": "ଫଳ ବଜାରର ବର୍ଜ୍ୟକୁ ମଞ୍ଜି, ଚାରା, ଖତ ଓ କୃଷକଙ୍କ ନ୍ୟାୟ୍ୟ ଆୟରେ ପରିଣତ କରୁଥିବା ଛାତ୍ର ନବସୃଜନ।",
    "footer.explore": "ଅନ୍ୱେଷଣ",
    "footer.project": "ପ୍ରକଳ୍ପ",
    "lang.label": "ଭାଷା",
  },
  as: {
    "nav.home": "ঘৰ",
    "nav.about": "আমাৰ বিষয়ে",
    "nav.marketplace": "বজাৰ",
    "nav.smart": "স্মাৰ্ট কৃষি",
    "nav.manure": "সাৰ",
    "nav.products": "সামগ্ৰী",
    "nav.contact": "যোগাযোগ",
    "hero.chip": "টেকসই কৃষিৰ বাবে ছাত্ৰ উদ্ভাৱন",
    "hero.title1": "ভৱিষ্যত গঢ়িছোঁ,",
    "hero.title2": "এটা বীজেৰে।",
    "hero.sub": "এগ্ৰিভিঅ' পেলাই দিয়া ফলৰ বীজ আৰু কৃষি বৰ্জ্যক গুণসম্পন্ন পুলি, জৈৱিক সাৰ আৰু ভাৰতীয় কৃষকৰ বাবে ন্যায্য, স্বচ্ছ বজাৰলৈ ৰূপান্তৰ কৰে।",
    "hero.cta1": "বজাৰ চাওক",
    "hero.cta2": "আমাৰ কাহিনী",
    "footer.tag": "ফল বজাৰৰ বৰ্জ্যক বীজ, পুলি, সাৰ আৰু কৃষকৰ ন্যায্য উপাৰ্জনলৈ ৰূপান্তৰকাৰী ছাত্ৰ উদ্ভাৱন।",
    "footer.explore": "অন্বেষণ",
    "footer.project": "প্ৰকল্প",
    "lang.label": "ভাষা",
  },
  ur: {
    "nav.home": "ہوم",
    "nav.about": "ہمارے بارے میں",
    "nav.marketplace": "بازار",
    "nav.smart": "اسمارٹ کاشتکاری",
    "nav.manure": "کھاد",
    "nav.products": "مصنوعات",
    "nav.contact": "رابطہ",
    "hero.chip": "پائیدار کاشتکاری کے لیے طلبہ کی اختراع",
    "hero.title1": "مستقبل اُگاتے ہیں،",
    "hero.title2": "ایک بیج سے۔",
    "hero.sub": "ایگریویو پھینکے گئے پھلوں کے بیج اور زرعی فضلے کو معیاری پودوں، نامیاتی کھاد اور بھارتی کسانوں کے لیے منصفانہ، شفاف بازار میں بدلتا ہے۔",
    "hero.cta1": "بازار دیکھیں",
    "hero.cta2": "ہماری کہانی",
    "footer.tag": "پھلوں کے بازار کے فضلے کو بیج، پودوں، کھاد اور کسانوں کی منصفانہ آمدنی میں بدلنے والی طلبہ اختراع۔",
    "footer.explore": "دریافت کریں",
    "footer.project": "منصوبہ",
    "lang.label": "زبان",
  },
};

type Ctx = { lang: LangCode; setLang: (l: LangCode) => void; t: (key: string) => string; dir: "ltr" | "rtl" };
const LangContext = createContext<Ctx | null>(null);

const RTL: LangCode[] = ["ur"];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("agrivio-lang") as LangCode | null;
      if (saved && T[saved]) setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const dir = RTL.includes(lang) ? "rtl" : "ltr";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang]);

  const setLang = (l: LangCode) => {
    setLangState(l);
    try { localStorage.setItem("agrivio-lang", l); } catch {}
  };

  const t = (key: string) => T[lang][key] ?? T.en[key] ?? key;
  const dir: "ltr" | "rtl" = RTL.includes(lang) ? "rtl" : "ltr";

  return <LangContext.Provider value={{ lang, setLang, t, dir }}>{children}</LangContext.Provider>;
}

export function useT() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}
