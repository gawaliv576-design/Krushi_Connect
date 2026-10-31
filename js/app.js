/**
 * Krushi Seva Kendra - Main Application UI Controller & Bilingual Engine
 * Comprehensive Marathi (मराठी) & English (EN) Real-time Translation System
 */

const I18N_DICTIONARY = {
  // General & Nav
  'मुखपृष्ठ': 'Home',
  'उत्पादने': 'Products',
  'वर्गवारी': 'Categories',
  'खत गणक': 'Fertilizer Calc',
  'हवामान सल्ला': 'Weather Advisory',
  'शेती सल्ले': 'Farming Tips',
  'उधारी खातावही': 'Khata Ledger',
  'लॉगिन': 'Login',
  'नोंदणी': 'Register',
  'डॅशबोर्ड': 'Dashboard',
  'लॉगआउट करा': 'Logout',
  'शेतकरी हेल्पलाइन': 'Farmer Helpline',
  'सिन्नर-शिर्डी हायवे, जि. नाशिक (महाराष्ट्र)': 'Sinnar-Shirdi Highway, Dist. Nashik (Maharashtra)',
  'सर्व उत्पादने': 'All Products',
  'उत्पादन वर्गवारी': 'Categories',
  'खत मात्रा गणक': 'Fertilizer Calculator',
  'हवामान व फवारणी सल्ला': 'Weather & Spray Advisory',
  'पीक संरक्षण व शेती सल्ले': 'Crop Advisory & Tips',
  'शेतकरी उधारी खातावही': 'Farmer Credit Ledger',
  'दुकानदार / ॲडमिन पॅनल': 'Store Admin Panel',
  'माझी कार्ट': 'My Cart',
  'कार्ट': 'Cart',
  'खरेदी': 'Shop',
  'खातावही': 'Khata',

  // Storefront & Home
  'उत्तम बियाणे, दर्जेदार खते आणि योग्य कृषी सल्ला!': 'Premium Seeds, Quality Fertilizers & Expert Agri Guidance!',
  'कपाशी, कांदा, सोयाबीन व सर्व पिकांसाठी शासकीय अनुदानित दरात खते, औषधे व ठिबक साहित्य थेट आपल्या बांधावर.': 'Certified seeds, subsidized fertilizers and modern irrigation systems delivered directly to your farm.',
  'शोधा': 'Search',
  'लोकप्रिय:': 'Popular:',
  'युरिया खत': 'Urea Fertilizer',
  'कांदा बियाणे': 'Onion Seeds',
  'जैन ठिबक': 'Jain Drip',
  'प्रमुख वर्गवारी निवडा': 'Browse by Categories',
  'सर्व वर्गवारी पहा': 'View All',
  'बियाणे': 'Seeds',
  'रासायनिक खते': 'Chemical Fertilizers',
  'कीटकनाशके': 'Pesticides',
  'ठिबक व सिंचन': 'Drip & Irrigation',
  'कृषी अवजारे': 'Agri Tools',
  'सेंद्रिय खते': 'Organic Bio',
  'हंगामातील विशेष उत्पादने': 'Seasonal Highlights',
  'शेतकऱ्यांची पहिली पसंती': 'Featured Agro Products',
  'सर्व उत्पादने पहा': 'View All Products',
  'कार्टमध्ये जोडा': 'Add to Cart',
  'माहिती व प्रमाण': 'Dosage & Details',
  '१००% अस्सल उत्पादने': '100% Genuine Products',
  'थेट शेतात पोहोच सेवा': 'Direct Farm Delivery',
  'शासकीय परवानाधारक': 'Govt. Certified Retailer',
  'मोफत कृषी सल्ला': 'Free Agri Consultation',
  'शेतकरी बंधूंचे अनुभव': 'Farmer Testimonials',
  'सप्तशृंगी ॲग्रो सेवेवर शेतकऱ्यांचा विश्वास': 'Trusted by Progressive Farmers',

  // Catalog & Products
  'कृषी उत्पादने व औषध दालन': 'Agricultural Products Catalog',
  'फिल्टर्स': 'Filters',
  'रीसेट करा': 'Reset',
  'शोध (Search)': 'Search Product',
  'वर्गवारी (Category)': 'Category',
  'पीक प्रकार (Crop Suitability)': 'Crop Suitability',
  'कमाल किंमत': 'Max Price',
  'फक्त उपलब्ध साठा (In-Stock Only)': 'In-Stock Only',
  'सर्व वर्गवारी (All Categories)': 'All Categories',
  'सर्व पिके (All Crops)': 'All Crops',
  'कांदा (Onion)': 'Onion',
  'कपाशी (Cotton)': 'Cotton',
  'सोयाबीन (Soybean)': 'Soybean',
  'ऊस (Sugarcane)': 'Sugarcane',
  'द्राक्षे / फळबागा (Grapes / Fruits)': 'Grapes / Fruits',
  'भाजीपाला (Vegetables)': 'Vegetables',
  'उपलब्ध': 'Available',
  'मर्यादित साठा': 'Low Stock',
  'साठा संपला': 'Out of Stock',
  'साठा संपला (Out of Stock)': 'Out of Stock',
  'कोणतेही उत्पादन सापडले नाही!': 'No products found!',
  'कृपया वेगळा शोध शब्द किंवा फिल्टर बदलून पहा.': 'Try another search term or reset filters.',

  // Cart & Checkout
  'माझी खरेदी कार्ट': 'My Shopping Cart',
  'कार्ट रिकामे करा': 'Clear Cart',
  'तुमची खरेदी कार्ट रिकामी आहे!': 'Your shopping cart is empty!',
  'उत्पादने खरेदी करा (Shop Now)': 'Shop Products Now',
  'उत्पादन (Product)': 'Product',
  'दर (Price)': 'Price',
  'नग / प्रमाण (Qty)': 'Qty',
  'एकूण (Total)': 'Total',
  'कृती': 'Action',
  'अनुदान व डिस्काउंट कूपन': 'Subsidy & Discount Coupon',
  'लागू करा': 'Apply',
  'खरेदी सारांश (Order Summary)': 'Order Summary',
  'एकूण किंमत (Subtotal):': 'Subtotal:',
  'कूपन सूट (Discount):': 'Coupon Discount:',
  'डिलिव्हरी शुल्क (Delivery):': 'Delivery Charges:',
  'मोफत (FREE)': 'FREE',
  'देय एकूण रक्कम:': 'Total Payable:',
  'ऑर्डर अंतिम करा (Checkout)': 'Proceed to Checkout',
  'आणखी उत्पादने जोडा': 'Add More Products',
  'डिलिव्हरी पत्ता व पेमेंट चेकआउट': 'Delivery Address & Payment',
  '१. शेतकरी व डिलिव्हरी पत्ता': '1. Farmer & Delivery Details',
  'शेतकऱ्याचे पूर्ण नाव (Full Name) *': 'Full Name *',
  '१०-अंकी मोबाईल नंबर (Mobile No) *': '10-digit Mobile Number *',
  'गाव / वस्ती (Village) *': 'Village *',
  'तालुका (Taluka) *': 'Taluka *',
  'जिल्हा (District) *': 'District *',
  'गट क्र. (Gat No)': 'Gat / Survey No',
  'पिन कोड (Pin Code)': 'Pin Code',
  '२. पेमेंट पद्धत निवडा (Payment Method)': '2. Select Payment Method',
  'घरपोच / शेतात माल आल्यावर रोख पैसे (Cash on Delivery)': 'Cash on Delivery (Pay at farm)',
  'ऑनलाइन UPI QR कोड (Google Pay / PhonePe / Paytm)': 'Online UPI QR Code (GPay/PhonePe)',
  'खात्यावर उधारी नोंदवा (Store Credit / Khata)': 'Store Credit / Khata Ledger',
  'ऑर्डर तपशील (Order Items)': 'Order Items',
  'अंतिम देय रक्कम:': 'Final Amount Due:',
  'ऑर्डर पक्की करा (Place Order)': 'Confirm & Place Order',
  'ऑर्डर यशस्वीरित्या नोंदवली गेली!': 'Order placed successfully!',
  'पावती प्रिंट करा (Print Receipt)': 'Print Receipt',
  'मुख्य पानावर जा': 'Back to Home',

  // Fertilizer Calculator
  'पीकनिहाय संतुलित खत मात्रा गणक': 'Crop-Specific Fertilizer Dosage Calculator',
  'शेती व पीक माहिती भरा': 'Enter Crop & Field Info',
  'पीक निवडा (Select Crop) *': 'Select Crop *',
  'क्षेत्र एकक (Area Unit) *': 'Area Unit *',
  'एकर (Acre)': 'Acre',
  'गुंठा (Guntha - ४० गुंठे = १ एकर)': 'Guntha (40 Guntha = 1 Acre)',
  'शेतीचे एकूण क्षेत्र (Area Size) *': 'Area Size *',
  'जमिनीचा प्रकार (Soil Type)': 'Soil Type',
  'मध्यम काळी जमीन (Medium Black Soil)': 'Medium Black Soil',
  'भारी काळी / कसदार जमीन (Heavy Black Soil)': 'Heavy Black Soil',
  'हलकी / मुरमाड जमीन (Light Murmad Soil)': 'Light / Murmad Soil',
  'खतांचे प्रमाण मोजा (Calculate)': 'Calculate Fertilizer Dose',
  'शिफारस केलेले खत प्रमाण व वेळापत्रक': 'Recommended Dosage & Schedule',
  'निम कोटेड युरिया (४५kg)': 'Neem Coated Urea (45kg)',
  'डीएपी १८:४६:० (५०kg)': 'DAP 18:46:0 (50kg)',
  'पोटॅश MOP (५०kg)': 'Potash MOP (50kg)',
  'पोती': 'Bags',
  'किलो': 'Kg',
  'खत देण्याचे योग्य वेळापत्रक (Split Schedule):': 'Fertilizer Split Schedule:',
  'ही सर्व खते १-क्लिक मध्ये कार्टमध्ये जोडा (Add Recommended Bags to Cart)': 'Add Recommended Bags to Cart (1-Click)',

  // Weather & Spraying
  'हवामान अंदाज व फवारणी सल्लागार': 'Weather Forecast & Spray Timing Advisory',
  'फवारणीसाठी अनुकूल व उत्तम वेळ (Safe for Spraying)': 'Safe & Ideal Time for Spraying',
  'आगामी ७ दिवसांचा कृषी हवामान अंदाज': 'Upcoming 7-Day Agricultural Forecast',
  'पावसाची शक्यता': 'Rain Probability',
  'हवेतील आर्द्रता': 'Air Humidity',
  'वाऱ्याचा वेग': 'Wind Speed',
  'दव बिंदू (Dew)': 'Dew Point',
  'आजची फवारणी मार्गदर्शक तत्त्वे': "Today's Spray Guidelines",
  '🟢 उत्तम वेळ': '🟢 Safe Time',
  '🟡 सावधगिरीने': '🟡 Caution',
  '🔴 फवारणी टाळा': '🔴 Avoid Spraying',

  // Farmer Portal & Khata
  'शेतकरी डॅशबोर्ड': 'Farmer Dashboard',
  'डिजिटल उधारी पासबुक': 'Digital Khata Passbook',
  'एकूण ऑर्डर्स (Orders)': 'Total Orders',
  'एकूण खरेदी (Purchases)': 'Total Purchases',
  'चालू बाकी उधारी (Due)': 'Current Pending Due',
  'मंजूर उधारी मर्यादा': 'Approved Credit Limit',
  'मागील ऑर्डर्स (Recent Orders)': 'Recent Orders',
  'डिजिटल खातावही सारांश (Ledger Preview)': 'Digital Ledger Preview',
  'संपूर्ण पासबुक पहा': 'View Full Passbook',
  'उधारी घरबसल्या UPI ने भरा': 'Pay Credit Due via Instant UPI',
  'आत्ताच उधारी भरा (Pay Now)': 'Pay Due Now (UPI)',
  'पुन्हा मागवा (Quick Re-order)': 'Quick Re-order',
  'खातावही नोंदवही (Transaction Statement)': 'Transaction Statement Ledger',
  'एकूण खरेदी (नावे / Total Purchases)': 'Total Purchases (Debit)',
  'एकूण भरणा (जमा / Total Paid)': 'Total Paid (Credit)',
  'चालू शिल्लक बाकी (उधारी देय / Balance Due)': 'Current Balance Due',
  'तारीख': 'Date',
  'व्हाउचर / बिल क्र.': 'Voucher / Bill No.',
  'खरेदी तपशील (Description)': 'Description',
  'नावे रक्कम (₹)': 'Debit (₹)',
  'जमा रक्कम (₹)': 'Credit (₹)',
  'शिल्लक रक्कम (₹)': 'Balance (₹)',
  'मुदत / देय दिनांक': 'Due Date',
  'स्थिती': 'Status',
  'UPI ने उधारी जमा करा (Pay Due)': 'Pay Credit via UPI QR',
  'पासबुक प्रिंट करा': 'Print Passbook',
  'जमा करावयाची रक्कम (₹) *': 'Amount to Pay (₹) *',
  'पेमेंट यशस्वी झाले (नोंद जमा करा)': 'Payment Successful (Record Credit)',

  // Admin Dashboard & Customer Dashboard Additions
  'दुकान व्यवस्थापन नियंत्रण कक्ष': 'Store Admin Control Center',
  'मासिक विक्री (Monthly Revenue)': 'Monthly Revenue',
  'मासिक विक्री': 'Monthly Revenue',
  'एकूण बाकी उधारी (Pending Dues)': 'Total Outstanding Dues',
  'एकूण बाकी उधारी': 'Total Outstanding Dues',
  'कमी साठा अलर्ट (Low Stock)': 'Low Stock Alerts',
  'कमी साठा अलर्ट': 'Low Stock Alerts',
  'नोंदणीकृत शेतकरी बंधू': 'Registered Farmers Count',
  'नोंदणीकृत शेतकरी': 'Registered Farmers',
  'नवीन उत्पादन जोडा': 'Add New Product',
  'नवीन उधारी नोंदवा': 'Record New Credit Due',
  'थकीत उधारी शेतकरी (Outstanding Debtors)': 'Outstanding Debtors List',
  'थकीत उधारी शेतकरी': 'Outstanding Debtors List',
  'सर्व उधारी खाती': 'All Credit Ledgers',
  'साठा व एक्सपायरी अलर्ट': 'Stock & Expiry Alerts',
  'साठा व्यवस्थापन': 'Stock Management',
  'नुकत्याच आलेल्या ग्राहक ऑर्डर्स (Recent Store Orders)': 'Recent Store Orders',
  'नुकत्याच आलेल्या ग्राहक ऑर्डर्स': 'Recent Store Orders',
  'सर्व ऑर्डर्स पहा': 'View All Orders',
  'तगादा मेसेज': 'WhatsApp Reminder',
  'नवीन शेतकरी जोडा (Add Farmer)': 'Add New Farmer',
  'नवीन शेतकरी जोडा': 'Add New Farmer',
  'उत्पादने सूची व साठा व्यवस्थापन': 'Product Inventory & Stock',
  'शेतकरी ग्राहक नोंदवही': 'Farmer Customers Register',
  'सप्तशृंगी ॲग्रो • मुख्य व्यवस्थापक नियंत्रण कक्ष (Store Admin Console)': 'Saptashrungi Agro • Store Admin Console',
  'सप्तशृंगी ॲग्रो • मुख्य व्यवस्थापक नियंत्रण कक्ष': 'Saptashrungi Agro • Store Admin Console',
  'सप्तशृंगी ॲग्रो • शेतकरी ग्राहक नोंदवही': 'Saptashrungi Agro • Farmer Customers Register',
  'सप्तशृंगी ॲग्रो • साठा व इन्व्हेंटरी व्यवस्थापन': 'Saptashrungi Agro • Stock & Inventory Management',
  'सप्तशृंगी ॲग्रो • ग्राहक ऑर्डर्स व डिलिव्हरी व्यवस्थापन': 'Saptashrungi Agro • Orders & Delivery Management',
  'सप्तशृंगी ॲग्रो • उधारी खातावही व्यवस्थापन': 'Saptashrungi Agro • Credit Ledger Management',
  'ग्राहक दालन (Storefront)': 'Storefront',
  'ग्राहक दालन': 'Storefront',
  'दुकान व्यवस्थापक': 'Store Manager',
  'डॅशबोर्ड (Overview)': 'Dashboard Overview',
  'उत्पादने व साठा (Inventory)': 'Products & Stock',
  'उधारी खातावही (Credit Ledger)': 'Credit Ledger',
  'ऑर्डर्स व विक्री (Orders)': 'Store Orders',
  'नोंदणीकृत शेतकरी (Farmers)': 'Registered Farmers',
  'दुकान पहा (Live Store)': 'View Storefront',
  'लॉगआउट (Logout)': 'Logout',
  'शेतकरी बंधू': 'Respected Farmer',
  'शेतकरी डॅशबोर्ड': 'Farmer Dashboard',
  'मागील ऑर्डर्स': 'Recent Orders',
  'नवीन खरेदी करा': 'Shop Products',
  'डिजिटल खातावही सारांश': 'Digital Ledger Preview',
  'पुन्हा मागवा': 'Quick Re-order',
  'पुन्हा मागवा (Quick Re-order)': 'Quick Re-order',
  'पुन्हा मागवा (त्वरित खरेदी)': 'Quick Re-order',
  'उधारी घरबसल्या UPI ने भरा': 'Pay Credit Due Online via UPI',
  'आजचा सल्ला': 'Daily Advisory',
  'कपाशी बोंडअळी सर्वेक्षण': 'Cotton Bollworm Scouting',
  'नोंदणीकृत शेतकरी ग्राहक नोंदवही': 'Registered Farmer Customers Register',
  'सर्व नोंदणीकृत शेतकऱ्यांची माहिती, शेतीचे क्षेत्र, मुख्य पिके व खरेदी आकडेवारी': 'Directory of registered farmers, land area, primary crops, and purchase records',
  'उधारी यादी प्रिंट करा': 'Print Ledger List',
  'नवीन उधारी बिल नोंदवा': 'Record New Credit Invoice',
  'शेतकरी उधारी खातावही व्यवस्थापन': 'Farmer Credit Ledger Management',
  'शेतकऱ्यांची थकीत उधारी, जमा रक्कम आणि डिजिटल पासबुक खाती': 'Track pending credit dues, payments received, and farmer passbooks',
  'ग्राहक ऑर्डर्स व डिलिव्हरी नियंत्रण': 'Customer Orders & Delivery Management',
  'शेतकऱ्यांनी दिलेल्या ऑर्डर्सची स्थिती व घरपोच डिलिव्हरी ट्रॅकिंग': 'Order fulfillment tracking and farm doorstep delivery status',
  'किंमत, साठा प्रमाण, मुदत दिनांक आणि नवीन उत्पादने व्यवस्थापन': 'Manage product prices, stock levels, batch numbers, and expiry dates',
  'आजची विक्री, उधारी वसुली, आणि उत्पादनांच्या साठ्याची अद्ययावत माहिती': 'Live sales overview, credit ledger dues, and stock inventory'
};

const App = {
  currentLang: 'mr',
  currentTheme: 'light',
  originalTextMap: new WeakMap(),

  init() {
    this.initLanguage();
    this.initTheme();
    this.updateCartBadge();
    this.updateUserSessionUI();
    this.setupEventListeners();
    setTimeout(() => {
      this.applyLanguage(this.currentLang);
    }, 60);
  },

  // -------------------------------------------------------------
  // Bilingual Engine
  // -------------------------------------------------------------
  initLanguage() {
    this.currentLang = localStorage.getItem('ksk_lang') || 'mr';
    this.applyLanguage(this.currentLang);
  },

  setLang(lang) {
    this.currentLang = lang;
    localStorage.setItem('ksk_lang', lang);
    this.applyLanguage(lang);
    window.dispatchEvent(new CustomEvent('ksk_lang_changed', { detail: { lang } }));
  },

  getLang() {
    return this.currentLang;
  },

  applyLanguage(lang) {
    document.body.classList.remove('lang-mr', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
    document.documentElement.lang = lang;

    // Update buttons
    const btnMr = document.getElementById('btnLangMr');
    const btnEn = document.getElementById('btnLangEn');
    if (btnMr && btnEn) {
      if (lang === 'mr') {
        btnMr.className = 'btn btn-xs py-0 px-2 btn-success text-white rounded-pill fw-bold shadow-sm';
        btnEn.className = 'btn btn-xs py-0 px-2 btn-outline-secondary rounded-pill fw-bold';
      } else {
        btnEn.className = 'btn btn-xs py-0 px-2 btn-success text-white rounded-pill fw-bold shadow-sm';
        btnMr.className = 'btn btn-xs py-0 px-2 btn-outline-secondary rounded-pill fw-bold';
      }
    }

    // Apply real-time translation across all text nodes and inputs
    this.translateDOM(lang);
  },

  translateDOM(lang) {
    const isEn = lang === 'en';

    // 1. Inputs & Textareas Placeholders
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(el => {
      if (isEn) {
        if (!el.dataset.origPlaceholder && el.placeholder) {
          el.dataset.origPlaceholder = el.placeholder;
        }
        if (el.placeholder) {
          for (const [mrText, enText] of Object.entries(I18N_DICTIONARY)) {
            if (el.placeholder.includes(mrText)) {
              el.placeholder = el.placeholder.replace(mrText, enText);
            }
          }
        }
      } else if (el.dataset.origPlaceholder) {
        el.placeholder = el.dataset.origPlaceholder;
      }
    });

    // 2. Select Option elements
    const options = document.querySelectorAll('option');
    options.forEach(opt => {
      const text = opt.textContent.trim();
      if (isEn) {
        if (!opt.dataset.origText) opt.dataset.origText = text;
        if (I18N_DICTIONARY[text]) {
          opt.textContent = I18N_DICTIONARY[text];
        }
      } else if (opt.dataset.origText) {
        opt.textContent = opt.dataset.origText;
      }
    });

    // 3. Scan and translate text nodes that don't have .lang-mr / .lang-en classes
    const walk = (node) => {
      // Skip script, style, code, and elements that already have language classes
      if (!node) return;
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (['SCRIPT', 'STYLE', 'CODE', 'PRE', 'INPUT', 'TEXTAREA'].includes(node.tagName)) return;
        if (node.classList.contains('lang-mr') || node.classList.contains('lang-en')) return;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue.trim();
        if (text && I18N_DICTIONARY[text]) {
          if (isEn) {
            if (!this.originalTextMap.has(node)) {
              this.originalTextMap.set(node, node.nodeValue);
            }
            node.nodeValue = node.nodeValue.replace(text, I18N_DICTIONARY[text]);
          } else if (this.originalTextMap.has(node)) {
            node.nodeValue = this.originalTextMap.get(node);
          }
        }
      } else {
        for (let child = node.firstChild; child; child = child.nextSibling) {
          walk(child);
        }
      }
    };

    walk(document.body);
  },

  // -------------------------------------------------------------
  // Theme Engine
  // -------------------------------------------------------------
  initTheme() {
    this.currentTheme = localStorage.getItem('ksk_theme') || 'light';
    this.applyTheme(this.currentTheme);
  },

  toggleTheme() {
    const next = this.currentTheme === 'light' ? 'dark' : 'light';
    this.currentTheme = next;
    localStorage.setItem('ksk_theme', next);
    this.applyTheme(next);
  },

  applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.querySelectorAll('.theme-icon').forEach(i => {
        i.className = 'bi bi-sun-fill text-warning theme-icon';
      });
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.querySelectorAll('.theme-icon').forEach(i => {
        i.className = 'bi bi-moon-stars-fill theme-icon';
      });
    }
  },

  // -------------------------------------------------------------
  // Cart Badge & User Session UI
  // -------------------------------------------------------------
  updateCartBadge() {
    const count = Store.getCartCount();
    document.querySelectorAll('.cart-badge').forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  },

  updateUserSessionUI() {
    const user = Store.getCurrentUser();
    const container = document.getElementById('headerUserSection');
    if (!container) return;

    if (user) {
      const isFarmer = user.role === 'farmer';
      const link = isFarmer ? 'farmer-dashboard.html' : 'admin-dashboard.html';
      const roleText = isFarmer ? '<span class="lang-mr">शेतकरी</span><span class="lang-en">Farmer</span>' : '<span class="lang-mr">व्यवस्थापक</span><span class="lang-en">Admin</span>';

      container.innerHTML = `
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-success rounded-pill px-3 py-1 dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
            <i class="bi bi-person-circle fs-5"></i>
            <span class="fw-bold">${user.name.split(' ')[0]}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2">
            <li class="px-3 py-2 border-bottom">
              <div class="fw-bold text-truncate" style="max-width: 180px;">${user.name}</div>
              <small class="text-muted">${user.phone}</small>
              <div class="mt-1"><span class="badge bg-success-subtle text-success border border-success-subtle">${roleText}</span></div>
            </li>
            <li><a class="dropdown-item py-2" href="${link}"><i class="bi bi-speedometer2 me-2 text-success"></i><span class="lang-mr">डॅशबोर्ड</span><span class="lang-en">Dashboard</span></a></li>
            ${isFarmer ? `<li><a class="dropdown-item py-2" href="farmer-udhari.html"><i class="bi bi-book-half me-2 text-warning"></i><span class="lang-mr">उधारी पासबुक</span><span class="lang-en">Credit Ledger</span></a></li>` : ''}
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item py-2 text-danger" href="javascript:void(0)" onclick="App.handleLogout()"><i class="bi bi-box-arrow-right me-2"></i><span class="lang-mr">लॉगआउट करा</span><span class="lang-en">Logout</span></a></li>
          </ul>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="d-flex align-items-center gap-2">
          <a href="login.html" class="btn btn-sm btn-outline-success rounded-pill px-3 py-1 fw-bold">
            <i class="bi bi-person-fill me-1"></i>
            <span class="lang-mr">लॉगिन</span><span class="lang-en">Login</span>
          </a>
          <a href="register.html" class="btn btn-sm btn-ksk-primary rounded-pill px-3 py-1 fw-bold text-white d-none d-sm-inline-block">
            <i class="bi bi-person-plus-fill me-1"></i>
            <span class="lang-mr">नोंदणी</span><span class="lang-en">Register</span>
          </a>
        </div>
      `;
    }
  },

  handleLogout() {
    Store.logout();
    this.showToast('आपण यशस्वीरित्या लॉगआउट झाला आहात!', 'Successfully logged out!', 'info');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 600);
  },

  // -------------------------------------------------------------
  // Toast Alerts
  // -------------------------------------------------------------
  showToast(msgMr, msgEn = '', type = 'success') {
    let container = document.getElementById('kskToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'kskToastContainer';
      container.className = 'ksk-toast-container';
      document.body.appendChild(container);
    }

    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'danger' ? 'bg-danger text-white' : type === 'info' ? 'bg-info text-white' : 'bg-success text-white';
    const icon = type === 'danger' ? 'bi-exclamation-octagon-fill' : type === 'info' ? 'bi-info-circle-fill' : 'bi-check-circle-fill';

    const toastEl = document.createElement('div');
    toastEl.id = toastId;
    toastEl.className = `toast align-items-center border-0 shadow-lg ${bgClass} mb-2 show`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');

    toastEl.innerHTML = `
      <div class="d-flex p-3">
        <i class="bi ${icon} fs-4 me-3"></i>
        <div class="toast-body p-0 flex-grow-1">
          <div class="lang-mr fw-semibold">${msgMr}</div>
          <div class="lang-en fw-semibold">${msgEn || msgMr}</div>
        </div>
        <button type="button" class="btn-close btn-close-white me-1 m-auto" data-bs-dismiss="toast" onclick="this.closest('.toast').remove()"></button>
      </div>
    `;

    container.appendChild(toastEl);
    setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => toastEl.remove(), 400);
    }, 3800);
  },

  setupEventListeners() {
    window.addEventListener('storage', () => {
      this.updateCartBadge();
      // Only re-sync user UI if this tab does not have an active isolated tab session
      const hasTabSession = !!sessionStorage.getItem(Store.KEYS.CURRENT_USER);
      if (!hasTabSession) {
        this.updateUserSessionUI();
      }
    });

    window.addEventListener('ksk_state_updated', () => {
      this.updateCartBadge();
      this.updateUserSessionUI();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
