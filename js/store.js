/**
 * Krushi Seva Kendra - State & Data Store (Offline-first localStorage Engine)
 * No database or SQL required. Runs completely client-side.
 */

const Store = {
  KEYS: {
    USERS: 'ksk_user_accounts',
    PRODUCTS: 'ksk_products',
    CART: 'ksk_cart',
    UDHARI: 'ksk_udhari_records',
    FARMERS: 'ksk_registered_farmers',
    ORDERS: 'ksk_orders',
    CURRENT_USER: 'ksk_current_user',
    LANG: 'ksk_lang',
    THEME: 'ksk_theme'
  },

  // -------------------------------------------------------------
  // Default Pre-Seeded Catalog & Data
  // -------------------------------------------------------------
  initialProducts: [
    {
      id: 'prod-001',
      name_en: 'Neem Coated Urea (45 kg)',
      name_mr: 'निम कोटेड युरिया (४५ किलो)',
      category: 'fertilizers',
      brand: 'IFFCO / आरसीएफ',
      price: 266,
      originalPrice: 280,
      stock: 120,
      unit: 'बॅग (Bag)',
      dosage_mr: '४५ किलो प्रति एकर (पेरणी व खुरपणी नंतर विभागून)',
      dosage_en: '45 kg per acre in split doses during sowing and vegetative stage',
      composition: 'Nitrogen (N) 46%',
      crop_mr: 'सर्व पिके (कांदा, कपाशी, ऊस, गहू)',
      crop_en: 'All crops (Onion, Cotton, Sugarcane, Wheat)',
      expiryDate: '2028-06-30',
      batchNo: 'UREA-2026-B12',
      barcode: '890123400101',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2c6e6?auto=format&fit=crop&w=600&q=80',
      badge: 'शासकीय अनुदानित / Subsidized'
    },
    {
      id: 'prod-002',
      name_en: 'DAP 18:46:0 Fertilizer (50 kg)',
      name_mr: 'डीएपी १८:४६:० खत (५० किलो)',
      category: 'fertilizers',
      brand: 'Coromandel / कोरोमंडल',
      price: 1350,
      originalPrice: 1450,
      stock: 65,
      unit: 'बॅग (Bag)',
      dosage_mr: '५० किलो प्रति एकर पेरणीच्या वेळी मुळाजवळ',
      dosage_en: '50 kg per acre applied near roots at the time of sowing',
      composition: 'Nitrogen 18%, Phosphorus (P2O5) 46%',
      crop_mr: 'सोयाबीन, कपाशी, मका, हरभरा',
      crop_en: 'Soybean, Cotton, Maize, Gram',
      expiryDate: '2028-10-15',
      batchNo: 'DAP-2026-X8',
      barcode: '890123400102',
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80',
      badge: 'बेस्ट सेलर / Best Seller'
    },
    {
      id: 'prod-003',
      name_en: 'Sardar 10:26:26 NPK (50 kg)',
      name_mr: 'सरदार १०:२६:२६ एनपीके (५० किलो)',
      category: 'fertilizers',
      brand: 'GSFC',
      price: 1470,
      originalPrice: 1550,
      stock: 40,
      unit: 'बॅग (Bag)',
      dosage_mr: '५० किलो प्रति एकर फळधारणा व फुलोरा काळात',
      dosage_en: '50 kg per acre during flowering and fruit setting stage',
      composition: 'Nitrogen 10%, Phosphorus 26%, Potash 26%',
      crop_mr: 'कांदा, द्राक्षे, डाळिंब, भाजीपाला',
      crop_en: 'Onion, Grapes, Pomegranate, Vegetables',
      expiryDate: '2028-12-01',
      batchNo: 'GSFC-1026-77',
      barcode: '890123400103',
      image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80',
      badge: 'गुणवत्तापूर्ण / Premium'
    },
    {
      id: 'prod-004',
      name_en: 'Coragen Insecticide (60 ml)',
      name_mr: 'कोराजन कीटकनाशक (६० मिली)',
      category: 'pesticides',
      brand: 'FMC',
      price: 980,
      originalPrice: 1050,
      stock: 45,
      unit: 'बाटली (Bottle)',
      dosage_mr: '६ मिली प्रति १५ लिटर पाण्याचा पंप (बोंडअळी व खोडकिड्यावर अत्यंत प्रभावी)',
      dosage_en: '6 ml per 15 liter water pump. Effective against bollworm and borer',
      composition: 'Chlorantraniliprole 18.5% SC',
      crop_mr: 'कपाशी, ऊस, मका, सोयाबीन',
      crop_en: 'Cotton, Sugarcane, Maize, Soybean',
      expiryDate: '2027-09-30',
      batchNo: 'FMC-COR-449',
      barcode: '890123400104',
      image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80',
      badge: '१००% अस्सल / 100% Genuine'
    },
    {
      id: 'prod-005',
      name_en: 'Glyphosate 41% SL Weedicide (1 Liter)',
      name_mr: 'ग्लायफोसेट ४१% एसएल तणनाशक (१ लिटर)',
      category: 'pesticides',
      brand: 'Excel Crop Care / एक्सेल',
      price: 490,
      originalPrice: 550,
      stock: 50,
      unit: 'लिटर (Liter)',
      dosage_mr: '१०० मिली प्रति १५ लिटर पाणी (फक्त बांधावरील व रिकाम्या शेतातील तण नष्ट करण्यासाठी)',
      dosage_en: '100 ml per 15L water spray pump for non-crop and bund weed control',
      composition: 'Glyphosate 41% SL Non-selective herbicide',
      crop_mr: 'शेतातील बांध, फळबागांच्या ओळी',
      crop_en: 'Field bunds, Orchard inter-spaces',
      expiryDate: '2027-04-12',
      batchNo: 'GLY-41-998',
      barcode: '890123400105',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
      badge: 'धडाकेबाज तणनाशक'
    },
    {
      id: 'prod-006',
      name_en: 'Mahyco Bollgard II Cotton Seeds (475g)',
      name_mr: 'माहिको बोलगार्ड २ कपाशी बियाणे (४७५ ग्रॅम)',
      category: 'seeds',
      brand: 'Mahyco / माहिको',
      price: 864,
      originalPrice: 910,
      stock: 80,
      unit: 'पाकीट (Packet)',
      dosage_mr: '१ ते २ पाकीट प्रति एकर (४x२ किंवा ५x२ फूट अंतर)',
      dosage_en: '1-2 packets per acre spaced at 4x2 or 5x2 feet',
      composition: 'BG-II Hybrid Cotton Treated Seeds',
      crop_mr: 'कपाशी (Cotton)',
      crop_en: 'Cotton',
      expiryDate: '2027-05-15',
      batchNo: 'MHY-BG2-2026',
      barcode: '890123400106',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
      badge: 'उच्च उत्पादनक्षम / High Yield'
    },
    {
      id: 'prod-007',
      name_en: 'Panchaganga Fursungi Red Onion Seeds (500g)',
      name_mr: 'पंचगंगा फुर्सुंगी लाल कांदा बियाणे (५०० ग्रॅम)',
      category: 'seeds',
      brand: 'Panchaganga Seeds',
      price: 1150,
      originalPrice: 1300,
      stock: 35,
      unit: 'डबा / टिन (Tin)',
      dosage_mr: '३ ते ४ किलो बियाणे प्रति एकर पुनर्लागवडीसाठी',
      dosage_en: '3-4 kg seed per acre for nursery & transplanting',
      composition: 'Certified Fursungi Red Onion Seed (98% germination)',
      crop_mr: 'कांदा (Onion)',
      crop_en: 'Onion',
      expiryDate: '2027-07-20',
      batchNo: 'PG-FUR-500G',
      barcode: '890123400107',
      image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&w=600&q=80',
      badge: 'नाशिक प्रसिद्ध / Nashik Famous'
    },
    {
      id: 'prod-008',
      name_en: 'Jain Inline Drip Pipe 16mm (400 Meters)',
      name_mr: 'जैन इनलाईन ठिबक नळी १६ मिमी (४०० मीटर)',
      category: 'irrigation',
      brand: 'Jain Irrigation / जैन ठिबक',
      price: 3450,
      originalPrice: 3800,
      stock: 22,
      unit: 'बंडल (Bundle)',
      dosage_mr: '४० सेमी ड्रिपर अंतर, २ लिटर प्रति तास डिस्चार्ज',
      dosage_en: '40 cm dripper spacing, 2 LPH discharge rate',
      composition: 'Virgin Virgin LLDPE, UV Stabilized',
      crop_mr: 'कांदा, भाजीपाला, कपाशी, ऊस',
      crop_en: 'Onion, Vegetables, Cotton, Sugarcane',
      expiryDate: '2032-12-31',
      batchNo: 'JAIN-DRP-400M',
      barcode: '890123400108',
      image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80',
      badge: 'शासकीय महाडीबीटी अनुदानास पात्र'
    },
    {
      id: 'prod-009',
      name_en: 'Aspee 16-Liter Battery Spray Pump',
      name_mr: 'अस्पी १६ लिटर बॅटरी फवारणी पंप',
      category: 'tools',
      brand: 'Aspee / अस्पी',
      price: 2850,
      originalPrice: 3200,
      stock: 15,
      unit: 'नग (Piece)',
      dosage_mr: '१२V १२AH हेवी ड्युटी रिचार्जेबल बॅटरी, ४ वेगवेगळ्या नोझल्ससह',
      dosage_en: '12V 12AH heavy rechargeable battery, continuous 25 pumps on full charge',
      composition: 'Virgin HDPE Tank, Double Motor, Brass Lance',
      crop_mr: 'सर्व पिकांच्या फवारणीसाठी',
      crop_en: 'For all crop spraying needs',
      expiryDate: '2030-12-31',
      batchNo: 'ASP-BAT-16L',
      barcode: '890123400109',
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
      badge: '१ वर्ष वॉरंटी / 1 Yr Warranty'
    },
    {
      id: 'prod-010',
      name_en: 'Sanjivani Bio-NPK Liquid Consortia (1 Liter)',
      name_mr: 'संजीवनी बायो-एनपीके जिवाणू खत (१ लिटर)',
      category: 'organic',
      brand: 'Saptashrungi Agro Bio',
      price: 360,
      originalPrice: 420,
      stock: 40,
      unit: 'बाटली (Bottle)',
      dosage_mr: '१ लिटर प्रति एकर ठिबकद्वारे किंवा २०० लिटर पाण्यातून जमिनीत सोडावे',
      dosage_en: '1 Liter per acre through drip or soil drenching in 200L water',
      composition: 'Azotobacter, PSB and KMB bacterial count 1x10^9 CFU/ml',
      crop_mr: 'सर्व सेंद्रिय व रासायनिक शेती',
      crop_en: 'All organic & conventional farming',
      expiryDate: '2027-11-20',
      batchNo: 'BIO-NPK-101',
      barcode: '890123400110',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80',
      badge: '१००% सेंद्रिय / 100% Organic'
    },
    {
      id: 'prod-011',
      name_en: 'Syngenta Amistar Top Fungicide (200 ml)',
      name_mr: 'सिंजेन्टा अमिस्टार टॉप बुरशीनाशक (२०० मिली)',
      category: 'pesticides',
      brand: 'Syngenta / सिजेंटा',
      price: 1120,
      originalPrice: 1220,
      stock: 30,
      unit: 'बाटली (Bottle)',
      dosage_mr: '१५ ते २० मिली प्रति १५ लिटर पाण्याचा पंप (करपा व भुरी रोगावर रामबाण)',
      dosage_en: '15-20 ml per 15L water pump. Excellent for blight and powdery mildew',
      composition: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
      crop_mr: 'कांदा, टोमॅटो, द्राक्षे, मिरची',
      crop_en: 'Onion, Tomato, Grapes, Chilli',
      expiryDate: '2027-08-30',
      batchNo: 'SYN-AMI-200',
      barcode: '890123400111',
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80',
      badge: 'सर्वोत्तम बुरशीनाशक'
    },
    {
      id: 'prod-012',
      name_en: 'Falcon High Carbon Steel Sickle / विळा',
      name_mr: 'फाल्कन शेती विळा / कोयता',
      category: 'tools',
      brand: 'Falcon',
      price: 240,
      originalPrice: 280,
      stock: 55,
      unit: 'नग (Piece)',
      dosage_mr: 'सोयाबीन, बाजरी, गवत व गहू कापणीसाठी टिकाऊ दातेरी पाते',
      dosage_en: 'Serrated carbon steel blade for harvesting grain & grass',
      composition: 'High Grade Tempered Carbon Steel with wooden grip',
      crop_mr: 'कापणी कामे',
      crop_en: 'Harvesting',
      expiryDate: '2035-12-31',
      batchNo: 'FAL-SCK-09',
      barcode: '890123400112',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
      badge: 'मजबूत व टिकाऊ'
    }
  ],

  initialFarmers: [
    {
      id: 'KSK-9822012345',
      name: 'रमेश सखाराम पाटील (Ramesh Patil)',
      phone: '9822012345',
      password: 'farmer123',
      role: 'farmer',
      village: 'वैजापूर (Vaijapur)',
      taluka: 'वैजापूर (Vaijapur)',
      district: 'छत्रपती संभाजीनगर (Chh. Sambhajinagar)',
      gatNo: '142/2',
      landAcres: 5.5,
      crops: 'कपाशी, कांदा, सोयाबीन (Cotton, Onion, Soybean)',
      registeredDate: '2026-03-15',
      creditLimit: 25000,
      totalPurchases: 32400,
      currentUdhariDue: 8450
    },
    {
      id: 'KSK-9823456789',
      name: 'सुरेश बाबुराव देशमुख (Suresh Deshmukh)',
      phone: '9823456789',
      password: 'farmer123',
      role: 'farmer',
      village: 'कोपरगाव (Kopargaon)',
      taluka: 'कोपरगाव (Kopargaon)',
      district: 'अहमदनगर (Ahmednagar)',
      gatNo: '88/A',
      landAcres: 8.0,
      crops: 'ऊस, मका, गहू (Sugarcane, Maize, Wheat)',
      registeredDate: '2026-04-10',
      creditLimit: 40000,
      totalPurchases: 54100,
      currentUdhariDue: 14200
    },
    {
      id: 'KSK-9850123456',
      name: 'गणेश तुकाराम शिंदे (Ganesh Shinde)',
      phone: '9850123456',
      password: 'farmer123',
      role: 'farmer',
      village: 'सिन्नर (Sinnar)',
      taluka: 'सिन्नर (Sinnar)',
      district: 'नाशिक (Nashik)',
      gatNo: '215',
      landAcres: 3.5,
      crops: 'कांदा, टोमॅटो, द्राक्षे (Onion, Tomato, Grapes)',
      registeredDate: '2026-05-22',
      creditLimit: 20000,
      totalPurchases: 18900,
      currentUdhariDue: 0
    },
    {
      id: 'KSK-9764512345',
      name: 'अनिता विठ्ठल जाधव (Anita Jadhav)',
      phone: '9764512345',
      password: 'farmer123',
      role: 'farmer',
      village: 'येवला (Yeola)',
      taluka: 'येवला (Yeola)',
      district: 'नाशिक (Nashik)',
      gatNo: '73/1',
      landAcres: 4.0,
      crops: 'कांदा, बाजरी, हरभरा (Onion, Bajra, Gram)',
      registeredDate: '2026-06-05',
      creditLimit: 30000,
      totalPurchases: 22800,
      currentUdhariDue: 4500
    }
  ],

  initialUdhariRecords: [
    {
      id: 'UDH-1001',
      farmerPhone: '9822012345',
      farmerName: 'रमेश सखारam पाटील',
      date: '2026-08-10',
      voucherNo: 'BILL-8891',
      description_mr: '२ पोती डीएपी खत + १ बाटली कोराजन',
      description_en: '2 Bags DAP + 1 Bottle Coragen',
      debit: 3680,
      credit: 0,
      balance: 3680,
      status: 'Active',
      dueDate: '2026-11-30'
    },
    {
      id: 'UDH-1002',
      farmerPhone: '9822012345',
      farmerName: 'रमेश सखाराम पाटील',
      date: '2026-09-02',
      voucherNo: 'BILL-9042',
      description_mr: '४ पोती निम कोटेड युरिया',
      description_en: '4 Bags Neem Coated Urea',
      debit: 1064,
      credit: 0,
      balance: 4744,
      status: 'Active',
      dueDate: '2026-11-30'
    },
    {
      id: 'UDH-1003',
      farmerPhone: '9822012345',
      farmerName: 'रमेश सखाराम पाटील',
      date: '2026-09-20',
      voucherNo: 'RCPT-114',
      description_mr: 'रोख जमा (कपाशी विक्री ऍडव्हान्स)',
      description_en: 'Cash payment received (Cotton harvest)',
      debit: 0,
      credit: 2000,
      balance: 2744,
      status: 'Settled',
      dueDate: '-'
    },
    {
      id: 'UDH-1004',
      farmerPhone: '9822012345',
      farmerName: 'रमेश सखाराम पाटील',
      date: '2026-10-15',
      voucherNo: 'BILL-9320',
      description_mr: '१ बंडल जैन ड्रिप १६ मिमी नळी + फिटिंग्ज',
      description_en: '1 Bundle Jain Drip 16mm Pipe + Fittings',
      debit: 5706,
      credit: 0,
      balance: 8450,
      status: 'Active',
      dueDate: '2026-12-15'
    },
    // Suresh Deshmukh entries
    {
      id: 'UDH-2001',
      farmerPhone: '9823456789',
      farmerName: 'सुरेश बाबुराव देशमुख',
      date: '2026-07-25',
      voucherNo: 'BILL-8710',
      description_mr: '१० पोती १०:२६:२६ सरदार खत',
      description_en: '10 Bags 10:26:26 Sardar Fertilizer',
      debit: 14700,
      credit: 0,
      balance: 14700,
      status: 'Overdue',
      dueDate: '2026-09-30'
    },
    {
      id: 'UDH-2002',
      farmerPhone: '9823456789',
      farmerName: 'सुरेश बाबुराव देशमुख',
      date: '2026-08-30',
      voucherNo: 'RCPT-102',
      description_mr: 'गुगल पे (UPI द्वारे जमा)',
      description_en: 'Google Pay UPI Payment Received',
      debit: 0,
      credit: 5000,
      balance: 9700,
      status: 'Active',
      dueDate: '-'
    },
    {
      id: 'UDH-2003',
      farmerPhone: '9823456789',
      farmerName: 'सुरेश बाबुराव देशमुख',
      date: '2026-10-05',
      voucherNo: 'BILL-9210',
      description_mr: '४ बाटल्या तणनाशक + १ बॅटरी पंप',
      description_en: '4 Bottles Weedicide + 1 Battery Pump',
      debit: 4500,
      credit: 0,
      balance: 14200,
      status: 'Active',
      dueDate: '2026-11-25'
    },
    // Anita Jadhav
    {
      id: 'UDH-3001',
      farmerPhone: '9764512345',
      farmerName: 'अनिता विठ्ठल जाधव',
      date: '2026-09-18',
      voucherNo: 'BILL-9122',
      description_mr: '३ डबे पंचगंगा फुर्सुंगी कांदा बियाणे',
      description_en: '3 Tins Panchaganga Onion Seed',
      debit: 3450,
      credit: 0,
      balance: 3450,
      status: 'Active',
      dueDate: '2026-11-15'
    },
    {
      id: 'UDH-3002',
      farmerPhone: '9764512345',
      farmerName: 'अनिता विठ्ठल जाधव',
      date: '2026-10-02',
      voucherNo: 'BILL-9250',
      description_mr: '२ पोती युरिया + १ बुरशीनाशक',
      description_en: '2 Bags Urea + 1 Fungicide',
      debit: 1050,
      credit: 0,
      balance: 4500,
      status: 'Active',
      dueDate: '2026-12-05'
    }
  ],

  initialOrders: [
    {
      orderId: 'KSK-ORD-8812',
      date: '2026-10-28',
      farmerPhone: '9822012345',
      farmerName: 'रमेश सखाराम पाटील',
      village: 'वैजापूर',
      taluka: 'वैजापूर',
      items: [
        { id: 'prod-001', name_mr: 'निम कोटेड युरिया', price: 266, qty: 2 },
        { id: 'prod-004', name_mr: 'कोराजन कीटकनाशक', price: 980, qty: 1 }
      ],
      subtotal: 1512,
      discount: 50,
      total: 1462,
      paymentMethod: 'Store Credit (उधारी)',
      status: 'Delivered',
      status_mr: 'पोहोचवले'
    },
    {
      orderId: 'KSK-ORD-8809',
      date: '2026-10-25',
      farmerPhone: '9823456789',
      farmerName: 'सुरेश बाबुराव देशमुख',
      village: 'कोपरगाव',
      taluka: 'कोपरगाव',
      items: [
        { id: 'prod-008', name_mr: 'जैन इनलाईन ठिबक नळी १६ मिमी', price: 3450, qty: 1 }
      ],
      subtotal: 3450,
      discount: 200,
      total: 3250,
      paymentMethod: 'UPI QR',
      status: 'Delivered',
      status_mr: 'पोहोचवले'
    }
  ],

  // -------------------------------------------------------------
  // Initialization & Storage Sync
  // -------------------------------------------------------------
  init() {
    if (!localStorage.getItem(this.KEYS.PRODUCTS)) {
      localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(this.initialProducts));
    }
    if (!localStorage.getItem(this.KEYS.FARMERS)) {
      localStorage.setItem(this.KEYS.FARMERS, JSON.stringify(this.initialFarmers));
    }
    if (!localStorage.getItem(this.KEYS.UDHARI)) {
      localStorage.setItem(this.KEYS.UDHARI, JSON.stringify(this.initialUdhariRecords));
    }
    if (!localStorage.getItem(this.KEYS.ORDERS)) {
      localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(this.initialOrders));
    }
    if (!localStorage.getItem(this.KEYS.CART)) {
      localStorage.setItem(this.KEYS.CART, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.LANG)) {
      localStorage.setItem(this.KEYS.LANG, 'mr');
    }
    if (!localStorage.getItem(this.KEYS.THEME)) {
      localStorage.setItem(this.KEYS.THEME, 'light');
    }

    // Default admin user
    const users = this.getUsers();
    const hasAdmin = users.some(u => u.role === 'admin');
    if (!hasAdmin) {
      users.push({
        id: 'KSK-ADMIN-01',
        name: 'सप्तशृंगी ॲग्रो व्यवस्थापक (Admin)',
        phone: '9876543210',
        email: 'admin@ksk.com',
        password: 'admin123',
        role: 'admin',
        village: 'सिन्नर',
        taluka: 'सिन्नर'
      });
      this.saveUsers(users);
    }

    // Sync live database from Supabase
    this.syncFromSupabase();
  },

  async syncFromSupabase() {
    if (typeof SupabaseAPI === 'undefined') return;

    try {
      // 1. Sync Products
      const spProducts = await SupabaseAPI.get('products');
      if (Array.isArray(spProducts) && spProducts.length > 0) {
        const formatted = spProducts.map(p => ({
          id: p.id,
          name_mr: p.name_mr,
          name_en: p.name_en,
          category: p.category,
          brand: p.brand || '',
          unit: p.unit || '',
          price: Number(p.price),
          originalPrice: p.original_price ? Number(p.original_price) : Number(p.price),
          stock: Number(p.stock) || 0,
          batchNo: p.batch_no || '',
          expiryDate: p.expiry_date || '',
          image: p.image || '',
          composition: p.composition || '',
          dosage_mr: p.dosage || '',
          dosage_en: p.dosage || '',
          crop_mr: 'कांदा, कपाशी, सोयाबीन, ऊस',
          crop_en: 'Onion, Cotton, Soybean, Sugarcane'
        }));
        localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(formatted));
        this.notifyChange(this.KEYS.PRODUCTS, formatted);
      }

      // 2. Sync Farmers
      const spFarmers = await SupabaseAPI.get('farmers');
      if (Array.isArray(spFarmers) && spFarmers.length > 0) {
        const existing = this.getRegisteredFarmers();
        const formattedF = spFarmers.map(f => {
          const match = existing.find(e => e.phone === f.phone) || {};
          return {
            id: f.id,
            name: f.name,
            name_en: f.name_en || f.name,
            phone: f.phone,
            password: match.password || 'farmer123',
            village: f.village || '',
            taluka: f.taluka || '',
            district: f.district || 'नाशिक',
            landAcres: parseFloat(f.land_area) || 2.0,
            crops: f.crops || '',
            creditLimit: Number(f.credit_limit) || 25000,
            role: f.role || 'farmer',
            totalPurchases: match.totalPurchases || 0,
            currentUdhariDue: match.currentUdhariDue || 0
          };
        });
        localStorage.setItem(this.KEYS.FARMERS, JSON.stringify(formattedF));
        this.notifyChange(this.KEYS.FARMERS, formattedF);
      }

      // 3. Sync Orders
      const spOrders = await SupabaseAPI.get('orders');
      if (Array.isArray(spOrders) && spOrders.length > 0) {
        const formattedO = spOrders.map(o => ({
          orderId: o.order_id,
          farmerPhone: o.farmer_phone,
          farmerName: o.farmer_name,
          village: o.village || '',
          taluka: o.taluka || '',
          items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items,
          total: Number(o.total),
          paymentMethod: o.payment_method,
          status: o.status,
          date: o.date
        }));
        localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(formattedO));
        this.notifyChange(this.KEYS.ORDERS, formattedO);
      }

      // 4. Sync Udhari Records
      const spUdhari = await SupabaseAPI.get('udhari_records');
      if (Array.isArray(spUdhari) && spUdhari.length > 0) {
        const formattedU = spUdhari.map(u => ({
          id: 'UDH-' + (u.id || Math.floor(1000 + Math.random() * 9000)),
          voucherNo: u.voucher_no,
          farmerPhone: u.farmer_phone,
          farmerName: u.farmer_name || '',
          date: u.date,
          description: u.description,
          description_mr: u.description,
          description_en: u.description_en || u.description,
          debit: Number(u.debit) || 0,
          credit: Number(u.credit) || 0,
          dueDate: u.due_date || '',
          status: u.status || 'Active'
        }));
        localStorage.setItem(this.KEYS.UDHARI, JSON.stringify(formattedU));
        this.notifyChange(this.KEYS.UDHARI, formattedU);
      }
      console.log('☁️ Live Supabase data synced to Store');
    } catch (err) {
      console.warn('Supabase sync error:', err);
    }
  },

  notifyChange(key, value) {
    try {
      window.dispatchEvent(new StorageEvent('storage', {
        key: key,
        newValue: JSON.stringify(value),
        url: window.location.href
      }));
      window.dispatchEvent(new CustomEvent('ksk_state_updated', {
        detail: { key, value }
      }));
    } catch (e) {
      console.warn('StorageEvent dispatch error:', e);
    }
  },

  // -------------------------------------------------------------
  // Products API
  // -------------------------------------------------------------
  getProducts() {
    return JSON.parse(localStorage.getItem(this.KEYS.PRODUCTS) || '[]');
  },

  getProductById(id) {
    return this.getProducts().find(p => p.id === id);
  },

  saveProducts(products) {
    localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(products));
    this.notifyChange(this.KEYS.PRODUCTS, products);
  },

  addProduct(product) {
    const products = this.getProducts();
    product.id = 'prod-' + Date.now().toString().slice(-6);
    products.unshift(product);
    this.saveProducts(products);

    if (typeof SupabaseAPI !== 'undefined') {
      SupabaseAPI.insert('products', [{
        id: product.id,
        name_mr: product.name_mr,
        name_en: product.name_en || product.name_mr,
        category: product.category,
        brand: product.brand || '',
        unit: product.unit || '',
        price: product.price,
        original_price: product.originalPrice || product.price,
        stock: product.stock || 0,
        batch_no: product.batchNo || '',
        expiry_date: product.expiryDate || '',
        image: product.image || '',
        composition: product.composition || '',
        dosage: product.dosage_mr || product.dosage_en || ''
      }]);
    }
    return product;
  },

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...updatedFields };
      this.saveProducts(products);

      if (typeof SupabaseAPI !== 'undefined') {
        const p = products[idx];
        SupabaseAPI.update('products', 'id', id, {
          price: p.price,
          original_price: p.originalPrice || p.price,
          stock: p.stock || 0,
          batch_no: p.batchNo || '',
          expiry_date: p.expiryDate || ''
        });
      }
      return products[idx];
    }
    return null;
  },

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
  },

  // -------------------------------------------------------------
  // Users & Auth API
  // -------------------------------------------------------------
  getUsers() {
    return JSON.parse(localStorage.getItem(this.KEYS.USERS) || '[]');
  },

  saveUsers(users) {
    localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    this.notifyChange(this.KEYS.USERS, users);
  },

  getRegisteredFarmers() {
    return JSON.parse(localStorage.getItem(this.KEYS.FARMERS) || '[]');
  },

  saveRegisteredFarmers(farmers) {
    localStorage.setItem(this.KEYS.FARMERS, JSON.stringify(farmers));
    this.notifyChange(this.KEYS.FARMERS, farmers);
  },

  getCurrentUser() {
    try {
      const sessionUser = sessionStorage.getItem(this.KEYS.CURRENT_USER);
      if (sessionUser) {
        return JSON.parse(sessionUser);
      }
      const localUser = localStorage.getItem(this.KEYS.CURRENT_USER);
      if (localUser) {
        const parsed = JSON.parse(localUser);
        if (!parsed.sessionId) {
          parsed.sessionId = 'ksk_sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        }
        sessionStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(parsed));
        return parsed;
      }
    } catch (e) {
      console.error('Error reading current user session:', e);
    }
    return null;
  },

  setCurrentUser(user) {
    if (user) {
      if (!user.sessionId) {
        user.sessionId = 'ksk_sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      }
      const userStr = JSON.stringify(user);
      sessionStorage.setItem(this.KEYS.CURRENT_USER, userStr);
      localStorage.setItem(this.KEYS.CURRENT_USER, userStr);
    } else {
      sessionStorage.removeItem(this.KEYS.CURRENT_USER);
      localStorage.removeItem(this.KEYS.CURRENT_USER);
    }
    this.notifyChange(this.KEYS.CURRENT_USER, user);
  },

  login(phone, password) {
    // Check in admin list
    const users = this.getUsers();
    const admin = users.find(u => (u.phone === phone || u.email === phone) && u.password === password);
    if (admin) {
      this.setCurrentUser(admin);
      return { success: true, user: admin };
    }

    // Check in farmers list
    const farmers = this.getRegisteredFarmers();
    const farmer = farmers.find(f => f.phone === phone && f.password === password);
    if (farmer) {
      this.setCurrentUser(farmer);
      return { success: true, user: farmer };
    }

    return { success: false, message_mr: 'मोबाईल क्रमांक किंवा पासवर्ड चुकीचा आहे!', message_en: 'Invalid mobile number or password!' };
  },

  registerFarmer(data) {
    const farmers = this.getRegisteredFarmers();
    if (farmers.some(f => f.phone === data.phone)) {
      return { success: false, message_mr: 'हा मोबाईल क्रमांक आधीच नोंदणीकृत आहे!', message_en: 'This mobile number is already registered!' };
    }

    const newFarmer = {
      id: 'KSK-' + data.phone,
      name: data.name,
      phone: data.phone,
      password: data.password || 'farmer123',
      role: 'farmer',
      village: data.village || 'गाव',
      taluka: data.taluka || 'तालुका',
      district: data.district || 'नाशिक',
      gatNo: data.gatNo || '१२/अ',
      landAcres: parseFloat(data.landAcres) || 2.0,
      crops: data.crops || 'कांदा, कपाशी',
      registeredDate: new Date().toISOString().split('T')[0],
      creditLimit: 25000,
      totalPurchases: 0,
      currentUdhariDue: 0
    };

    farmers.unshift(newFarmer);
    this.saveRegisteredFarmers(farmers);
    this.setCurrentUser(newFarmer);

    // Sync new farmer to Supabase
    if (typeof SupabaseAPI !== 'undefined') {
      SupabaseAPI.insert('farmers', [{
        id: newFarmer.id,
        name: newFarmer.name,
        name_en: newFarmer.name,
        phone: newFarmer.phone,
        village: newFarmer.village,
        taluka: newFarmer.taluka,
        district: newFarmer.district,
        land_area: String(newFarmer.landAcres),
        crops: newFarmer.crops,
        credit_limit: newFarmer.creditLimit,
        role: 'farmer'
      }]);
    }

    return { success: true, user: newFarmer };
  },

  logout() {
    this.setCurrentUser(null);
  },

  // -------------------------------------------------------------
  // Cart API
  // -------------------------------------------------------------
  getCart() {
    return JSON.parse(localStorage.getItem(this.KEYS.CART) || '[]');
  },

  saveCart(cart) {
    localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
    this.notifyChange(this.KEYS.CART, cart);
  },

  addToCart(productId, qty = 1) {
    const cart = this.getCart();
    const prod = this.getProductById(productId);
    if (!prod) return false;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: prod.id,
        name_mr: prod.name_mr,
        name_en: prod.name_en,
        price: prod.price,
        originalPrice: prod.originalPrice,
        image: prod.image,
        unit: prod.unit,
        qty: qty
      });
    }
    this.saveCart(cart);
    return true;
  },

  updateCartQty(productId, qty) {
    let cart = this.getCart();
    if (qty <= 0) {
      cart = cart.filter(item => item.id !== productId);
    } else {
      const item = cart.find(i => i.id === productId);
      if (item) item.qty = qty;
    }
    this.saveCart(cart);
  },

  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
  },

  clearCart() {
    this.saveCart([]);
  },

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.qty, 0);
  },

  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  },

  // -------------------------------------------------------------
  // Udhari (Credit Ledger) API
  // -------------------------------------------------------------
  getUdhariRecords() {
    return JSON.parse(localStorage.getItem(this.KEYS.UDHARI) || '[]');
  },

  saveUdhariRecords(records) {
    localStorage.setItem(this.KEYS.UDHARI, JSON.stringify(records));
    this.notifyChange(this.KEYS.UDHARI, records);
  },

  getFarmerLedger(phone) {
    const records = this.getUdhariRecords().filter(r => r.farmerPhone === phone);
    // Sort chronological
    return records.sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  getFarmerBalance(phone) {
    const records = this.getFarmerLedger(phone);
    let totalDebit = 0;
    let totalCredit = 0;
    records.forEach(r => {
      totalDebit += (r.debit || 0);
      totalCredit += (r.credit || 0);
    });
    return {
      totalDebit,
      totalCredit,
      balance: totalDebit - totalCredit
    };
  },

  addUdhariEntry(entry) {
    const records = this.getUdhariRecords();
    const newEntry = {
      id: 'UDH-' + Date.now().toString().slice(-6),
      farmerPhone: entry.farmerPhone,
      farmerName: entry.farmerName,
      date: entry.date || new Date().toISOString().split('T')[0],
      voucherNo: entry.voucherNo || ('BILL-' + Math.floor(1000 + Math.random() * 9000)),
      description_mr: entry.description_mr || entry.description,
      description_en: entry.description_en || entry.description,
      debit: parseFloat(entry.debit) || 0,
      credit: parseFloat(entry.credit) || 0,
      status: entry.status || (entry.debit > 0 ? 'Active' : 'Settled'),
      dueDate: entry.dueDate || '-'
    };

    records.push(newEntry);
    this.saveUdhariRecords(records);

    // Sync to Supabase
    if (typeof SupabaseAPI !== 'undefined') {
      SupabaseAPI.insert('udhari_records', [{
        voucher_no: newEntry.voucherNo,
        farmer_phone: newEntry.farmerPhone,
        date: newEntry.date,
        description: newEntry.description_mr || newEntry.description,
        description_en: newEntry.description_en || newEntry.description,
        debit: newEntry.debit,
        credit: newEntry.credit,
        due_date: newEntry.dueDate || '',
        status: newEntry.status
      }]);
    }

    // Update farmer's currentUdhariDue and totalPurchases
    const farmers = this.getRegisteredFarmers();
    const fIdx = farmers.findIndex(f => f.phone === entry.farmerPhone);
    if (fIdx !== -1) {
      const bal = this.getFarmerBalance(entry.farmerPhone);
      farmers[fIdx].currentUdhariDue = bal.balance;
      if (newEntry.debit > 0) {
        farmers[fIdx].totalPurchases = (farmers[fIdx].totalPurchases || 0) + newEntry.debit;
      }
      this.saveRegisteredFarmers(farmers);
    }

    return newEntry;
  },

  recordPayment(phone, amount, notes = 'UPI Payment / रोख जमा') {
    const farmers = this.getRegisteredFarmers();
    const farmer = farmers.find(f => f.phone === phone);
    const farmerName = farmer ? farmer.name : 'शेतकरी';

    const entry = this.addUdhariEntry({
      farmerPhone: phone,
      farmerName: farmerName,
      date: new Date().toISOString().split('T')[0],
      voucherNo: 'RCPT-' + Math.floor(100 + Math.random() * 900),
      description_mr: `खात्यावर जमा रक्कम (${notes})`,
      description_en: `Payment Received on Account (${notes})`,
      debit: 0,
      credit: parseFloat(amount),
      status: 'Settled',
      dueDate: '-'
    });

    return entry;
  },

  // -------------------------------------------------------------
  // Orders API
  // -------------------------------------------------------------
  getOrders() {
    return JSON.parse(localStorage.getItem(this.KEYS.ORDERS) || '[]');
  },

  saveOrders(orders) {
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
    this.notifyChange(this.KEYS.ORDERS, orders);
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    const orderId = 'KSK-ORD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      orderId,
      date: new Date().toISOString().split('T')[0],
      farmerPhone: orderData.farmerPhone,
      farmerName: orderData.farmerName,
      village: orderData.village,
      taluka: orderData.taluka,
      items: orderData.items,
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      status: 'Pending',
      status_mr: 'प्रलंबित (स्वीकारले)'
    };

    orders.unshift(newOrder);
    this.saveOrders(orders);

    // Sync to Supabase
    if (typeof SupabaseAPI !== 'undefined') {
      SupabaseAPI.insert('orders', [{
        order_id: newOrder.orderId,
        farmer_phone: newOrder.farmerPhone,
        farmer_name: newOrder.farmerName,
        village: newOrder.village || '',
        taluka: newOrder.taluka || '',
        items: newOrder.items,
        total: newOrder.total,
        payment_method: newOrder.paymentMethod,
        status: newOrder.status,
        date: newOrder.date
      }]);
    }

    // If payment method is Udhari, automatically create an Udhari debit entry!
    if (orderData.paymentMethod.includes('उधारी') || orderData.paymentMethod.toLowerCase().includes('credit')) {
      const itemDesc = orderData.items.map(i => `${i.qty}x ${i.name_mr || i.name_en}`).join(', ');
      this.addUdhariEntry({
        farmerPhone: orderData.farmerPhone,
        farmerName: orderData.farmerName,
        date: new Date().toISOString().split('T')[0],
        voucherNo: orderId,
        description_mr: `खरेदी: ${itemDesc}`,
        description_en: `Purchase: ${itemDesc}`,
        debit: orderData.total,
        credit: 0,
        status: 'Active',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }

    // Deduct stock for ordered products
    const products = this.getProducts();
    orderData.items.forEach(item => {
      const p = products.find(prod => prod.id === item.id);
      if (p) {
        p.stock = Math.max(0, p.stock - item.qty);
      }
    });
    this.saveProducts(products);

    // Clear cart
    this.clearCart();

    return newOrder;
  },

  updateOrderStatus(orderId, status, status_mr) {
    const orders = this.getOrders();
    const o = orders.find(ord => ord.orderId === orderId);
    if (o) {
      o.status = status;
      o.status_mr = status_mr;
      this.saveOrders(orders);

      if (typeof SupabaseAPI !== 'undefined') {
        SupabaseAPI.update('orders', 'order_id', orderId, { status: status });
      }
    }
  }
};

// Initialize store on script load
Store.init();
