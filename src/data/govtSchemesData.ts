export interface GovtScheme {
  id: string;
  name: string;
  nameHi: string;
  shortCode: string;
  category: 'financial' | 'insurance' | 'solar' | 'machinery' | 'storage' | 'organic' | 'horticulture';
  categoryLabel: string;
  categoryLabelHi: string;
  authority: string;
  authorityHi: string;
  financialBenefit: string;
  financialBenefitHi: string;
  subsidyRate: string;
  eligibility: string[];
  eligibilityHi: string[];
  landholdingCriteria: 'All Farmers' | 'Marginal & Small (< 2 Ha)' | 'Any Landholder';
  documentsRequired: string[];
  documentsRequiredHi: string[];
  howToApply: string;
  howToApplyHi: string;
  portalUrl: string;
  helpline: string;
  featured: boolean;
  activeStatus: 'Active' | 'Open for Applications' | 'Year-round';
}

export const GOVT_SCHEMES_DATA: GovtScheme[] = [
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    nameHi: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)",
    shortCode: "PM-KISAN",
    category: "financial",
    categoryLabel: "Direct Income Support",
    categoryLabelHi: "प्रत्यक्ष आय सहायता",
    authority: "Ministry of Agriculture & Farmers Welfare, Govt. of India",
    authorityHi: "कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार",
    financialBenefit: "₹6,000 per year directly transferred to bank account in 3 equal installments of ₹2,000 every 4 months.",
    financialBenefitHi: "₹6,000 प्रति वर्ष 3 समान किस्तों (₹2,000 प्रति 4 माह) में सीधे आधार-लिंक्ड बैंक खाते में।",
    subsidyRate: "100% Central DBT Grant",
    eligibility: [
      "All landholding farmer families with cultivable land recorded in their names",
      "Valid Aadhaar linked with active bank account",
      "Excludes institutional landholders, income tax payees, and constitutional post holders"
    ],
    eligibilityHi: [
      "सभी भूमिधारक किसान परिवार जिनके नाम कृषि योग्य भूमि दर्ज है",
      "सक्रिय बैंक खाते से लिंक वैध आधार कार्ड",
      "आयकर दाता, संस्थागत भूमिधारक एवं सरकारी पेंशनभोगी (₹10,000+) इसमें शामिल नहीं हैं"
    ],
    landholdingCriteria: "All Farmers",
    documentsRequired: [
      "Aadhaar Card",
      "Land Ownership Documents (7/12, 8A / RoR / Khasra-Khatauni)",
      "Bank Account Passbook (IFSC & A/C Number)",
      "Mobile Number linked to Aadhaar"
    ],
    documentsRequiredHi: [
      "आधार कार्ड",
      "जमीन के दस्तावेज (7/12, 8A / खतौनी / जमाबंदी)",
      "बैंक पासबुक (IFSC कोड व खाता संख्या)",
      "आधार से जुड़ा मोबाइल नंबर"
    ],
    howToApply: "Apply online at pmkisan.gov.in under 'Farmer Corner' or via Common Service Centres (CSC) / Village Agriculture Officer.",
    howToApplyHi: "pmkisan.gov.in पोर्टल पर 'Farmer Corner' के अंतर्गत नया किसान पंजीकरण करें या नजदीकी सीएससी (CSC) केंद्र पर जाएं।",
    portalUrl: "https://pmkisan.gov.in",
    helpline: "155261 / 1800-115-526",
    featured: true,
    activeStatus: "Year-round"
  },
  {
    id: "pmfby",
    name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    nameHi: "पीएमएफबीवाई (प्रधानमंत्री फसल बीमा योजना)",
    shortCode: "PMFBY",
    category: "insurance",
    categoryLabel: "Crop Insurance & Risk Shield",
    categoryLabelHi: "फसल बीमा एवं जोखिम सुरक्षा",
    authority: "Ministry of Agriculture & Farmers Welfare",
    authorityHi: "कृषि एवं किसान कल्याण मंत्रालय",
    financialBenefit: "Comprehensive crop loss protection against droughts, floods, unseasonal rain, hailstorms, pests, and post-harvest localized losses at nominal farmer premium rates.",
    financialBenefitHi: "सूखा, बाढ़, बेमौसम बारिश, ओलावृष्टि और कीट प्रकोप से होने वाले फसल नुकसान की शत-प्रतिशत पारदर्शी क्षतिपूर्ति।",
    subsidyRate: "Farmer pays only 2% (Kharif), 1.5% (Rabi), and 5% (Commercial/Horticultural)",
    eligibility: [
      "All farmers growing notified crops in notified areas",
      "Available for both loanee (KCC holders) and non-loanee farmers",
      "Sharecroppers and tenant farmers with sowing certificates also eligible"
    ],
    eligibilityHi: [
      "अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान",
      "ऋणी (KCC धारक) और गैर-ऋणी दोनों किसानों के लिए उपलब्ध",
      "बटाईदार और पट्टेदार किसान भी बुवाई घोषणा पत्र के साथ पात्र हैं"
    ],
    landholdingCriteria: "All Farmers",
    documentsRequired: [
      "Aadhaar Card",
      "Land Record (7/12, 8A / RoR)",
      "Sowing Certificate / Self-Declaration",
      "Bank Account Passbook / Cancelled Cheque"
    ],
    documentsRequiredHi: [
      "आधार कार्ड",
      "भूमि स्वामित्व प्रमाणपत्र (7/12, 8A)",
      "फसल बुवाई प्रमाणपत्र / स्व-घोषणा पत्र",
      "बैंक पासबुक की प्रति / रद्द चेक"
    ],
    howToApply: "Enroll on pmfby.gov.in within sowing cut-off dates, through your bank branch, or via the PMFBY Crop Insurance mobile app.",
    howToApplyHi: "pmfby.gov.in पर ऑनलाइन या बैंक शाखा, सीएससी अथवा 'Crop Insurance' मोबाइल ऐप के माध्यम से कट-ऑफ तिथि से पूर्व आवेदन करें।",
    portalUrl: "https://pmfby.gov.in",
    helpline: "1800-180-1551 (Kisan Call Centre)",
    featured: true,
    activeStatus: "Open for Applications"
  },
  {
    id: "pm-kusum",
    name: "PM-KUSUM (Solar Agricultural Pumps Scheme)",
    nameHi: "पीएम-कुसुम (सौर कृषि पंप एवं ऊर्जा योजना)",
    shortCode: "PM-KUSUM",
    category: "solar",
    categoryLabel: "Solar & Clean Irrigation",
    categoryLabelHi: "सौर ऊर्जा एवं स्वच्छ सिंचाई",
    authority: "Ministry of New and Renewable Energy (MNRE)",
    authorityHi: "नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE)",
    financialBenefit: "Up to 60% direct capital subsidy (30% Central + 30% State) for standalone solar water pumps (3 to 7.5 HP) and solarization of existing grid-connected tubewells. Bank loan available for 30%; farmer contribution only 10%.",
    financialBenefitHi: "स्टैंडअलोन सोलर पंप (3 से 7.5 HP) लगाने हेतु 60% सरकारी सब्सिडी (30% केंद्र + 30% राज्य)। 30% बैंक ऋण, किसान को केवल 10% अंशदान देना होगा।",
    subsidyRate: "60% Government Subsidy (Farmer pays 10%)",
    eligibility: [
      "Individual farmers having farmland with assured water source (borewell, well, farm pond)",
      "Farmers having no electricity connection or wishing to replace costly diesel pumps",
      "Water User Associations (WUAs), FPOs, and village cooperatives"
    ],
    eligibilityHi: [
      "ऐसे व्यक्तिगत किसान जिनके पास जल स्रोत (कुआं, बोरवेल, शेततळे) उपलब्ध है",
      "जहां ग्रिड बिजली नहीं है या डीजल पंपों के महंगे खर्च से मुक्ति चाहते हैं",
      "जल उपभोक्ता संस्थाएं और किसान उत्पादक संगठन (FPO)"
    ],
    landholdingCriteria: "All Farmers",
    documentsRequired: [
      "Aadhaar Card",
      "Land Ownership Records (7/12 & 8A / Jamabandi)",
      "Proof of Water Source / NOC from Groundwater Authority if notified",
      "Bank Account Details",
      "Passport size photo"
    ],
    documentsRequiredHi: [
      "आधार कार्ड",
      "जमीन के कागजात (7/12 व 8A)",
      "जल स्रोत का प्रमाण (कुआं/बोरवेल)",
      "बैंक खाता विवरण",
      "पासपोर्ट साइज फोटो"
    ],
    howToApply: "Apply on the State Renewable Energy Development Agency portal (e.g. Mahaurja in Maharashtra, RREC in Rajasthan) or pmkusum.mnre.gov.in.",
    howToApplyHi: "राज्य अक्षय ऊर्जा निगम पोर्टल (जैसे महाराष्ट्र में महाऊर्जा, यूपी नेडा) अथवा pmkusum.mnre.gov.in पर ऑनलाइन आवेदन करें।",
    portalUrl: "https://pmkusum.mnre.gov.in",
    helpline: "1800-180-3333",
    featured: true,
    activeStatus: "Open for Applications"
  },
  {
    id: "aif",
    name: "AIF (Agriculture Infrastructure Fund)",
    nameHi: "एआईएफ (कृषि अवसंरचना कोष)",
    shortCode: "AIF",
    category: "storage",
    categoryLabel: "Post-Harvest & Cold Storage",
    categoryLabelHi: "फसल उपरांत भंडारण एवं कोल्ड चेन",
    authority: "Department of Agriculture and Farmers Welfare (DA&FW)",
    authorityHi: "कृषि एवं किसान कल्याण विभाग",
    financialBenefit: "3% per annum interest subvention on institutional bank loans up to ₹2 Crore for up to 7 years. Credit guarantee coverage under CGTMSE for loans up to ₹2 Crore with zero third-party collateral.",
    financialBenefitHi: "₹2 करोड़ तक के बैंक ऋण पर प्रति वर्ष 3% ब्याज छूट (7 वर्षों तक)। ₹2 करोड़ तक सीजीटीएमएसई के तहत बिना अतिरिक्त गारंटी के सुरक्षित ऋण।",
    subsidyRate: "3% Interest Subvention + CGTMSE Fee Waiver",
    eligibility: [
      "Farmers, Farmer Producer Organizations (FPOs), PACS, Agri-entrepreneurs, Startups",
      "Projects for: Cold storage, dry warehouses, sorting & grading units, packhouses, ripening chambers, e-marketing hubs"
    ],
    eligibilityHi: [
      "किसान, कृषक उत्पादक संगठन (FPO), पैक्स (PACS), कृषि उद्यमी एवं स्टार्टअप",
      "परियोजनाएं: कोल्ड स्टोरेज, साइलो, आधुनिक गोदाम, ग्रेडिंग/सॉर्टिंग यूनिट, पैकहाउस"
    ],
    landholdingCriteria: "Any Landholder",
    documentsRequired: [
      "Detailed Project Report (DPR) / Quotation",
      "Land Documents / Lease Deed (minimum 10 years)",
      "Farmer / Promoter KYC (Aadhaar & PAN)",
      "In-principle bank sanction or bank branch choice"
    ],
    documentsRequiredHi: [
      "विस्तृत प्रोजेक्ट रिपोर्ट (DPR)",
      "जमीन के मालिकाना हक या 10+ वर्ष लीज के कागजात",
      "केवाईसी दस्तावेज (आधार और पैन कार्ड)",
      "बैंक शाखा चयन एवं बैंक अनुमति पत्र"
    ],
    howToApply: "Register and submit online DPR on agriinfra.dac.gov.in portal. Selected participating bank reviews and disburses loan with integrated subvention.",
    howToApplyHi: "agriinfra.dac.gov.in पोर्टल पर पंजीकरण करें और ऑनलाइन प्रोजेक्ट रिपोर्ट जमा करें। चुनी गई बैंक शाखा सब्सिडी सहित ऋण स्वीकृत करेगी।",
    portalUrl: "https://agriinfra.dac.gov.in",
    helpline: "011-23381012 / 1800-180-1551",
    featured: true,
    activeStatus: "Year-round"
  },
  {
    id: "smam",
    name: "SMAM (Sub-Mission on Agricultural Mechanization)",
    nameHi: "एसएमएएम (कृषि यंत्रीकरण उप-मिशन)",
    shortCode: "SMAM",
    category: "machinery",
    categoryLabel: "Farm Machinery Subsidy",
    categoryLabelHi: "कृषि उपकरण एवं ट्रैक्टर सब्सिडी",
    authority: "Ministry of Agriculture & Farmers Welfare",
    authorityHi: "कृषि एवं किसान कल्याण मंत्रालय",
    financialBenefit: "40% to 50% capital subsidy on purchase of modern farm equipment including tractors, power tillers, rotavators, drone sprayers, laser levellers, and seed drills. Up to 80% subsidy for village Custom Hiring Centres.",
    financialBenefitHi: "ट्रैक्टर, रोटावेटर, पावर टिलर, ड्रोन स्प्रेयर, रीपर और थ्रेशर खरीदने पर 40% से 50% तक सरकारी अनुदान। गांव में कस्टम हायरिंग सेंटर हेतु 80% तक सहायता।",
    subsidyRate: "40% to 50% Subsidy (Up to 80% for CHC hubs)",
    eligibility: [
      "Small and marginal farmers (< 2 hectares) get maximum 50% subsidy",
      "Special priority and enhanced quotas for women farmers and SC/ST farmers",
      "General farmers eligible for standard 40% subsidy"
    ],
    eligibilityHi: [
      "छोटे और सीमांत किसान (2 हेक्टेयर से कम) को अधिकतम 50% सब्सिडी",
      "महिला किसानों और एससी/एसटी वर्ग के किसानों को प्राथमिकता व अतिरिक्त छूट",
      "सामान्य वर्ग के किसानों को 40% तक का अनुदान"
    ],
    landholdingCriteria: "Marginal & Small (< 2 Ha)",
    documentsRequired: [
      "Aadhaar Card",
      "Land Record (7/12, 8A / Khatauni)",
      "Caste Certificate (for SC/ST quota)",
      "Quotation / Proforma Invoice from authorized machinery dealer",
      "Bank Account Details"
    ],
    documentsRequiredHi: [
      "आधार कार्ड",
      "जमीन के कागजात (7/12, खतौनी)",
      "जाति प्रमाणपत्र (यदि आरक्षित वर्ग से हैं)",
      "अधिकृत डीलर से कोटेशन (प्रोफॉर्मा चालान)",
      "बैंक पासबुक"
    ],
    howToApply: "Register on agrimachinery.nic.in (or state DBTs like MahaDBT / UP Agriculture). After lottery / approval, buy machinery and submit tax invoice for DBT.",
    howToApplyHi: "agrimachinery.nic.in अथवा राज्य डीबीटी पोर्टल (जैसे MahaDBT) पर पंजीकरण करें। चयन होने पर उपकरण खरीदकर बिल अपलोड करें, सब्सिडी सीधे बैंक में आएगी।",
    portalUrl: "https://agrimachinery.nic.in",
    helpline: "1800-180-1551",
    featured: true,
    activeStatus: "Open for Applications"
  },
  {
    id: "kcc",
    name: "KCC (Kisan Credit Card Scheme)",
    nameHi: "केसीसी (किसान क्रेडिट कार्ड योजना)",
    shortCode: "KCC",
    category: "financial",
    categoryLabel: "Institutional Credit & Crop Loans",
    categoryLabelHi: "रियायती फसली ऋण",
    authority: "Reserve Bank of India & NABARD",
    authorityHi: "भारतीय रिजर्व बैंक एवं नाबार्ड",
    financialBenefit: "Concessional short-term crop loans up to ₹3 Lakh at an effective interest rate of only 4% per annum (7% normal rate minus 3% prompt repayment incentive). Collateral-free loan limit up to ₹1.60 Lakh.",
    financialBenefitHi: "समय पर भुगतान करने पर मात्र 4% वार्षिक ब्याज दर पर ₹3 लाख तक का फसली ऋण। ₹1.60 लाख तक का ऋण बिना किसी जमीन बंधक (Collateral-free) के उपलब्ध।",
    subsidyRate: "4% Effective Interest Rate (3% Prompt Rebate)",
    eligibility: [
      "Owner cultivators having agricultural land",
      "Tenant farmers, oral lessees, and sharecroppers with cultivation proof",
      "Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers",
      "Also extended to dairy, poultry, and fisheries farmers"
    ],
    eligibilityHi: [
      "खेती की जमीन के मालिक किसान",
      "बटाईदार, पट्टेदार और किराये पर खेती करने वाले किसान",
      "संयुक्त देयता समूह (JLG) और स्वयं सहायता समूह (SHG)",
      "डेयरी, पशुपालन और मत्स्य पालन करने वाले किसान भी पात्र हैं"
    ],
    landholdingCriteria: "All Farmers",
    documentsRequired: [
      "Filled KCC Application Form",
      "Identity Proof (Aadhaar / Voter ID / Driving License)",
      "Land Ownership Record certified by Revenue Authorities",
      "Affidavit of crops grown in the current agricultural season"
    ],
    documentsRequiredHi: [
      "भरा हुआ केसीसी आवेदन पत्र",
      "पहचान प्रमाण पत्र (आधार कार्ड)",
      "राजस्व अधिकारी द्वारा सत्यापित भू-अभिलेख (7/12 / खतौनी)",
      "वर्तमान सत्र में बोई गई फसलों का विवरण"
    ],
    howToApply: "Visit any commercial bank, Regional Rural Bank (RRB), or District Central Cooperative Bank, or apply online via bank portals / PM-KISAN portal.",
    howToApplyHi: "अपनी निकटतम बैंक शाखा, ग्रामीण बैंक अथवा सहकारी बैंक में जाकर एक पन्ने का KCC फॉर्म जमा करें।",
    portalUrl: "https://www.nabard.org",
    helpline: "1800-222-990",
    featured: false,
    activeStatus: "Year-round"
  },
  {
    id: "pkvy",
    name: "PKVY (Paramparagat Krishi Vikas Yojana - Organic Farming)",
    nameHi: "पीकेवीवाई (परंपरागत कृषि विकास योजना - जैविक खेती)",
    shortCode: "PKVY",
    category: "organic",
    categoryLabel: "Organic & Natural Farming",
    categoryLabelHi: "प्राकृतिक एवं जैविक खेती",
    authority: "Ministry of Agriculture & Farmers Welfare",
    authorityHi: "कृषि एवं किसान कल्याण मंत्रालय",
    financialBenefit: "Financial assistance of ₹50,000 per hectare for 3 years. ₹31,000/ha is given directly to farmers via DBT for organic seeds, bio-fertilizers, vermicompost, and botanical extracts, plus ₹8,800 for certification and packing.",
    financialBenefitHi: "3 वर्षों में ₹50,000 प्रति हेक्टेयर की आर्थिक सहायता। जैविक बीज, जीवामृत, वर्मीकम्पोस्ट और जैव उर्वरकों हेतु ₹31,000/हेक्टेयर सीधे डीबीटी से मिलते हैं।",
    subsidyRate: "₹50,000 / hectare over 3 years",
    eligibility: [
      "Farmers willing to form clusters of 20 or more hectares (around 20-50 farmers)",
      "Commitment to chemical-free natural farming for at least 3 years",
      "PGS-India (Participatory Guarantee System) peer certification"
    ],
    eligibilityHi: [
      "कम से कम 20 हेक्टेयर या 20-50 किसानों के समूह (क्लस्टर) में शामिल किसान",
      "रासायनिक खाद और कीटनाशकों का त्याग कर पूर्ण जैविक विधि अपनाने का संकल्प",
      "पीजीएस-इंडिया जैविक प्रमाणीकरण में सहभागिता"
    ],
    landholdingCriteria: "All Farmers",
    documentsRequired: [
      "Aadhaar Card",
      "Land Ownership Documents",
      "Cluster Group Resolution Agreement",
      "Bank Account Details"
    ],
    documentsRequiredHi: [
      "आधार कार्ड",
      "जमीन के कागजात",
      "क्लस्टर समूह का सहमति पत्र",
      "बैंक खाता विवरण"
    ],
    howToApply: "Approach the Block Agriculture Development Officer (ADO) or register group on jaivikkheti.in and pgspdf.gov.in.",
    howToApplyHi: "अपने ब्लॉक कृषि अधिकारी (ADO/KVK) से संपर्क कर क्लस्टर बनाएं या jaivikkheti.in पोर्टल पर समूह पंजीकृत करें।",
    portalUrl: "https://jaivikkheti.in",
    helpline: "011-23382012",
    featured: false,
    activeStatus: "Open for Applications"
  },
  {
    id: "midh",
    name: "MIDH (Mission for Integrated Development of Horticulture)",
    nameHi: "एमआईडीएच (एकीकृत बागवानी विकास मिशन)",
    shortCode: "MIDH",
    category: "horticulture",
    categoryLabel: "Horticulture & Greenhouses",
    categoryLabelHi: "बागवानी एवं पॉलीहाउस संरक्षण",
    authority: "National Horticulture Board (NHB) & State Horticulture Missions",
    authorityHi: "राष्ट्रीय बागवानी बोर्ड (NHB) एवं राज्य बागवानी मिशन",
    financialBenefit: "Up to 50% capital subsidy on establishment of polyhouses, shade net houses, high-density orchards (grapes, pomegranate, citrus, mango), drip micro-irrigation, pack houses, cold rooms, and mushroom units.",
    financialBenefitHi: "पॉलीहाउस, शेडनेट हाउस, ड्रिप सिंचाई और उन्नत बागवानी (अंगूर, अनार, आम, सब्जियां) लगाने पर 50% तक की भारी सरकारी सब्सिडी।",
    subsidyRate: "Up to 50% Project Cost Subsidy",
    eligibility: [
      "Individual horticultural farmers, growers associations, FPOs, and cooperative societies",
      "Farmers having land suitable for protected cultivation and assured water source"
    ],
    eligibilityHi: [
      "व्यक्तिगत किसान, बागवानी उत्पादक और एफपीओ (FPO)",
      "जिनके पास संरक्षित खेती (पॉलीहाउस/शेडनेट) हेतु उपयुक्त जमीन और पानी उपलब्ध है"
    ],
    landholdingCriteria: "All Farmers",
    documentsRequired: [
      "Aadhaar Card & PAN Card",
      "7/12 & 8A Land extracts (with horticulture crop entry if existing)",
      "Soil and water quality laboratory test report",
      "Technical quotation from empanelled vendor"
    ],
    documentsRequiredHi: [
      "आधार व पैन कार्ड",
      "7/12 व 8A नकल (जमीन का विवरण)",
      "मिट्टी एवं सिंचाई जल परीक्षण रिपोर्ट",
      "अधिकृत निर्माण एजेंसी से तकनीकी कोटेशन"
    ],
    howToApply: "Apply on the State Horticulture Department portal or National Horticulture Board portal (nhb.gov.in) before commencing construction.",
    howToApplyHi: "राज्य बागवानी विभाग पोर्टल अथवा राष्ट्रीय बागवानी बोर्ड (nhb.gov.in) पर निर्माण शुरू करने से पूर्व ऑनलाइन आवेदन जमा करें।",
    portalUrl: "https://midh.gov.in",
    helpline: "0124-2342992 / 1800-180-1551",
    featured: true,
    activeStatus: "Open for Applications"
  },
  {
    id: "soil-health",
    name: "Soil Health Card Scheme",
    nameHi: "मृदा स्वास्थ्य कार्ड योजना (सॉइल हेल्थ कार्ड)",
    shortCode: "SHC",
    category: "organic",
    categoryLabel: "Soil Testing & Fertility",
    categoryLabelHi: "मिट्टी जांच एवं उर्वरता सुधार",
    authority: "Ministry of Agriculture & Farmers Welfare",
    authorityHi: "कृषि एवं किसान कल्याण मंत्रालय",
    financialBenefit: "Free scientific testing of farm soil across 12 crucial parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) with personalized fertilizer dosage and organic manure recommendations to lower input costs by 15-25%.",
    financialBenefitHi: "खेत की मिट्टी की 12 रासायनिक व सूक्ष्म पोषक तत्वों की निःशुल्क जांच। वैज्ञानिक सलाह से खाद खर्च में 15 से 25% तक की बचत।",
    subsidyRate: "100% Free Government Laboratory Testing",
    eligibility: [
      "All farmers across every state and union territory in India",
      "Soil samples collected by village agriculture assistants every 2 years"
    ],
    eligibilityHi: [
      "देश के सभी राज्यों के सभी किसान",
      "प्रत्येक 2 वर्ष में कृषि विभाग द्वारा खेत से मिट्टी के नमूने लेकर जांच की जाती है"
    ],
    landholdingCriteria: "All Farmers",
    documentsRequired: [
      "Aadhaar Card",
      "Land Survey Number / Khasra Number",
      "Mobile Number"
    ],
    documentsRequiredHi: [
      "आधार कार्ड",
      "खेत का सर्वे नंबर / खसरा नंबर",
      "मोबाइल नंबर"
    ],
    howToApply: "Contact village Krishi Sahayak / Agriculture Extension Officer or download existing card online from soilhealth.dac.gov.in using your Aadhaar/survey number.",
    howToApplyHi: "ग्राम कृषि सहायक से संपर्क करें अथवा soilhealth.dac.gov.in पर जाकर अपने सर्वे नंबर या मोबाइल नंबर से कार्ड डाउनलोड करें।",
    portalUrl: "https://soilhealth.dac.gov.in",
    helpline: "011-24305591 / 1800-180-1551",
    featured: false,
    activeStatus: "Year-round"
  },
  {
    id: "enam-mandi",
    name: "e-NAM (National Agriculture Market)",
    nameHi: "ई-नाम (राष्ट्रीय कृषि बाजार)",
    shortCode: "e-NAM",
    category: "financial",
    categoryLabel: "Digital Market Integration",
    categoryLabelHi: "राष्ट्रीय डिजिटल मंडी व्यापार",
    authority: "Small Farmers' Agri-Business Consortium (SFAC)",
    authorityHi: "लघु कृषक कृषि व्यापार संघ (SFAC)",
    financialBenefit: "Access to 1,361+ integrated mandis across 27 States/UTs. Free assaying and electronic grading inside mandis, nationwide competitive bidding, and online direct payment directly into bank account with zero middleman deduction.",
    financialBenefitHi: "देश की 1,361+ मंडियों से सीधा जुड़ाव। निशुल्क वैज्ञानिक गुणवत्ता जांच (Assaying), अखिल भारतीय पारदर्शी नीलामी और बिना बिचौलिए के सीधे बैंक में भुगतान।",
    subsidyRate: "Free Farmer Registration & Zero Commission",
    eligibility: [
      "Any farmer with produce visiting an e-NAM registered APMC mandi",
      "Farmers having e-NWR warehouse receipts can trade remotely without physical transit"
    ],
    eligibilityHi: [
      "कोई भी किसान जो ई-नाम से जुड़ी मंडी में अपनी फसल लाता है",
      "ई-एनडब्ल्यूआर (e-NWR) रसीद वाले किसान घर बैठे भी दूरस्थ मंडियों में बोली लगा सकते हैं"
    ],
    landholdingCriteria: "All Farmers",
    documentsRequired: [
      "Aadhaar Card",
      "Bank Account Details / Passbook Copy",
      "Mobile Number",
      "Mandi Gate Entry Slip"
    ],
    documentsRequiredHi: [
      "आधार कार्ड",
      "बैंक पासबुक की प्रति",
      "मोबाइल नंबर",
      "मंडी गेट प्रवेश पर्ची"
    ],
    howToApply: "Register at the APMC Mandi e-NAM facilitation desk or online at enam.gov.in or download the e-NAM mobile app.",
    howToApplyHi: "मंडी के ई-नाम सहायता केंद्र पर पंजीकरण कराएं अथवा enam.gov.in पोर्टल / e-NAM मोबाइल ऐप से स्वयं रजिस्टर करें।",
    portalUrl: "https://enam.gov.in",
    helpline: "1800-270-0224",
    featured: false,
    activeStatus: "Year-round"
  }
];

export const SCHEME_CATEGORIES = [
  { id: 'all', label: 'All Schemes', labelHi: 'सभी योजनाएं' },
  { id: 'financial', label: 'Direct Income & Credit', labelHi: 'आय सहायता व ऋण' },
  { id: 'insurance', label: 'Crop Insurance', labelHi: 'फसल बीमा' },
  { id: 'solar', label: 'Solar & Irrigation', labelHi: 'सौर पंप व सिंचाई' },
  { id: 'machinery', label: 'Farm Machinery', labelHi: 'कृषि यंत्र सब्सिडी' },
  { id: 'storage', label: 'Storage & Cold Chain', labelHi: 'गोदाम व कोल्ड स्टोरेज' },
  { id: 'organic', label: 'Organic & Soil', labelHi: 'जैविक खेती व मिट्टी' },
  { id: 'horticulture', label: 'Horticulture', labelHi: 'बागवानी व पॉलीहाउस' }
];
