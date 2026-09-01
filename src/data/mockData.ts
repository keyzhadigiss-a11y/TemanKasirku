import { Product, Transaction, ChartDataPoint } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1NK8AcYKnQYrjOsni9H014aEJ3bmFLqAxa11Pvb_yeQnZEXzxgOP-eKU4rMyo5-XpKT_itOfGoTHgB5fxFYgn0KvZWkgvHNqa8QPqSIBeDd68VjfNpNwoK6RjVcL1AcmEwIn5o1DncD9MxnokInW5jKBlpUbYG6jFaAXXzkiJdDMtlZjEFz42_BZpR-Idqainw0D4KnuYKPipPRmo2TeK04g73243scAITrhGe7rV1xj-nmAghTOL',
  // Founder Keyzha profile avatar
  profileAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  cashierAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  
  // High quality beauty, makeup & skincare imagery
  // Lip Tints & Care
  tintPeachMochi: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
  tintBerryChiffon: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  tintSpicedCinnamon: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=600&q=80',
  tintRoseMilkshake: 'https://images.unsplash.com/photo-1599732487610-3e1f590da897?auto=format&fit=crop&w=600&q=80',
  tintPlumBubblegum: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=600&q=80',
  tintApricotSorbet: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
  tintRubyCaramel: 'https://images.unsplash.com/photo-1512290900672-1f55b0a297e6?auto=format&fit=crop&w=600&q=80',
  tintStrawberryGlaze: 'https://images.unsplash.com/photo-1590156206657-e170425a74e5?auto=format&fit=crop&w=600&q=80',
  tintVintageFig: 'https://images.unsplash.com/photo-1631730486784-5456119f69ae?auto=format&fit=crop&w=600&q=80',
  tintBarePetal: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
  
  lipButter: 'https://images.unsplash.com/photo-1629732047847-50219e9c5aef?auto=format&fit=crop&w=600&q=80',
  lipScrub: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
  lipSleepingMask: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
  lipOil: 'https://images.unsplash.com/photo-1590156206657-e170425a74e5?auto=format&fit=crop&w=600&q=80',
  lipPlumper: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',

  // Facial Wash
  bubbleCleanser: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
  mochiJellyWash: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
  pinkClayWash: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
  oatCleansingBalm: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
  aminoAcidWash: 'https://images.unsplash.com/photo-1556228722-d0b5d120a16c?auto=format&fit=crop&w=600&q=80',

  // Moisturizers
  cloudCushionMoist: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
  watermelonPudding: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
  berryBarrierCream: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
  hydroPuddingCream: 'https://images.unsplash.com/photo-1556228722-d0b5d120a16c?auto=format&fit=crop&w=600&q=80',
  velvetMatteCream: 'https://images.unsplash.com/photo-1567928815104-b7980ee070bf?auto=format&fit=crop&w=600&q=80',

  // Serums
  glassSkinSerum: 'https://images.unsplash.com/photo-1608248597359-00977d24dc04?auto=format&fit=crop&w=600&q=80',
  pinkCollagenDrops: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
  calmingCicaSerum: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
  retinolNightDrop: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
  spotOffNectar: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',

  // Sunscreen
  sunscreenShield: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
  rosyToneUpSun: 'https://images.unsplash.com/photo-1567928815104-b7980ee070bf?auto=format&fit=crop&w=600&q=80',
  velvetTouchSunStick: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
  aquaGelSunMist: 'https://images.unsplash.com/photo-1608248597359-00977d24dc04?auto=format&fit=crop&w=600&q=80',
  mildPhysicalSun: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=600&q=80',

  // Masks
  strawberrySheetMask: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
  sugarWhippedClayMask: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
  roseWaterSleepingMask: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
  peelOffPinkMask: 'https://images.unsplash.com/photo-1567928815104-b7980ee070bf?auto=format&fit=crop&w=600&q=80',
  bubbleResetPack: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',

  // Body Serum & Hand Cream
  velvetBodyMilk: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
  pinkPeonyLotion: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  silkSoftHandCream: 'https://images.unsplash.com/photo-1629732047847-50219e9c5aef?auto=format&fit=crop&w=600&q=80',
  exfoliatingBodyDrops: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
  barrierRepairHandLotion: 'https://images.unsplash.com/photo-1556228722-d0b5d120a16c?auto=format&fit=crop&w=600&q=80',

  // Bundling / Paket Hemat
  bundleUltimateGlow: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
  bundlePinkyLipParty: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
  bundleSweetDreams: 'https://images.unsplash.com/photo-1567928815104-b7980ee070bf?auto=format&fit=crop&w=600&q=80',
  bundleStarterKit: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80'
};

export const INITIAL_PRODUCTS: Product[] = [
  // =========================================================================
  // 1. BEST SELLER (Produk Paling Favorit & Flagship)
  // =========================================================================
  {
    id: 'prod-best-moist',
    sku: 'BB-MST-01',
    name: 'Baby Bloom Cloud Cushion Moist',
    category: 'Pelembap',
    price: 89000,
    stock: 85,
    image: ASSETS.cloudCushionMoist,
    isBestSeller: true,
    volume: '50 g',
    rating: 5.0,
    reviewCount: 2480,
    shadeColor: '#FCE7EF',
    packageColor: '#fec1d6',
    keyIngredients: '5X Ceramide Micro-Lipid, Hyaluronic 8D, Marshmallow Root Extract, Shea Butter',
    description: 'Krim pelembap viral dengan tekstur busa awan ultra-ringan yang meleleh di kulit, mengunci kelembapan hingga 48 jam dan memperbaiki skin barrier rusak tanpa rasa lengket.',
    benefits: [
      'Tekstur cloud cushion yang super lembut & langsung meleleh',
      'Memperbaiki dan memperkuat skin barrier yang dehidrasi',
      'Kunci hidrasi 48 jam dengan sensasi segar sejuk',
      'Non-comedogenic & aman untuk kulit berjerawat dan sensitif'
    ],
    howToUse: 'Ambil secukupnya, aplikasikan merata pada wajah bersih setelah serum di pagi & malam hari.'
  },
  {
    id: 'prod-best-tint',
    sku: 'BB-TINT-02',
    name: 'Baby Bloom Berry Milk Dewy Tint - #02 Berry Chiffon',
    category: 'Produk Bibir',
    price: 49000,
    stock: 95,
    image: ASSETS.tintBerryChiffon,
    isBestSeller: true,
    volume: '4.5 ml',
    rating: 4.9,
    reviewCount: 3120,
    shadeName: '#02 Berry Chiffon',
    shadeColor: '#E55982',
    packageColor: '#E55982',
    keyIngredients: 'Berry Seed Oil, Vitamin E, Hyaluronic Beads, Jojoba Oil',
    description: 'Lip tint dewy warna pink murni cerah & segar terfavorit. Memberikan efek kilau kaca berkilau tanpa rasa lengket, bibir tampak sehat kenyal seperti mochi.',
    benefits: [
      'Warna pink murni cerah segar menyegarkan aura wajah seketika',
      'Dewy glaze finish dengan formula film anti-geser',
      'Melembapkan bibir pecah-pecah seharian',
      'Tahan lama hingga 12 jam dengan stain natural'
    ],
    howToUse: 'Oleskan merata pada bibir. Biarkan 1 menit agar formula glassy coat terbentuk sempurna.'
  },
  {
    id: 'prod-best-sun',
    sku: 'BB-SUN-01',
    name: 'Baby Bloom Invisible Sun Milk SPF 50+',
    category: 'Tabir Surya',
    price: 75000,
    stock: 90,
    image: ASSETS.sunscreenShield,
    isBestSeller: true,
    volume: '50 ml',
    rating: 4.9,
    reviewCount: 2890,
    shadeColor: '#FFF3F6',
    packageColor: '#805062',
    keyIngredients: 'Hybrid Broad Spectrum UV Filters, Niacinamide, Milk Protein, Cica Extract',
    description: 'Tabir surya cair tanpa warna (zero whitecast) bertekstur susu ringan yang meresap dalam 3 detik, memberikan perlindungan SPF 50+ PA++++ optimal.',
    benefits: [
      'Tekstur milky cair seringan air tanpa rasa lengket',
      'Zero whitecast & no greasy feel',
      'Dermatologically tested & tidak pedih di mata',
      'Perlindungan lengkap dari sinar UVA, UVB, & Blue Light'
    ],
    howToUse: 'Kocok sebelum digunakan. Oleskan 2 ruas jari merata pada wajah dan leher sebelum terpapar matahari.'
  },
  {
    id: 'prod-best-serum',
    sku: 'BB-SRM-01',
    name: 'Baby Bloom Glass Skin Glow Serum',
    category: 'Serum Wajah',
    price: 115000,
    stock: 70,
    image: ASSETS.glassSkinSerum,
    isBestSeller: true,
    volume: '30 ml',
    rating: 5.0,
    reviewCount: 1950,
    shadeColor: '#FFEBF1',
    packageColor: '#fec1d6',
    keyIngredients: 'Niacinamide 10%, Alpha Arbutin 2%, Centella Asiatica, Peptides Complex',
    description: 'Serum ajaib pencerah wajah untuk hasil kulit glowing sebening kaca (glass skin). Memudarkan flek hitam, bekas jerawat, dan meratakan tekstur kulit.',
    benefits: [
      'Kulit tampak sebening kaca dan bercahaya dalam 14 hari',
      'Menyamarkan noda hitam bekas jerawat (PIH/PIE)',
      'Mengecilkan tampilan pori-pori dan menghaluskan tekstur',
      'Tekstur water-essence yang sangat cepat meresap'
    ],
    howToUse: 'Teteskan 3-4 tetes pada telapak tangan, tepuk perlahan ke seluruh wajah hingga meresap.'
  },

  // =========================================================================
  // 2. 💄 PRODUK BIBIR (LIP CARE & LIP COLOR)
  // =========================================================================
  // Lip Care (5 Items)
  {
    id: 'prod-lipcare-01',
    sku: 'BB-LIP-01',
    name: 'Baby Bloom Marshmallow Lip Butter',
    category: 'Produk Bibir',
    price: 45000,
    stock: 65,
    image: ASSETS.lipButter,
    volume: '15 g',
    rating: 4.8,
    reviewCount: 640,
    shadeColor: '#FCE4EC',
    keyIngredients: 'Marshmallow Root Extract, Shea Butter, Vitamin E, Squalane',
    description: 'Pelembap bibir ekstra lembut selembut marshmallow yang melenyapkan bibir kering & pecah-pecah seketika.',
    benefits: [
      'Menghidrasi dan melembutkan tekstur bibir kering',
      'Kaya antioksidan dan nutrisi pelembap alami',
      'Bisa digunakan sebagai primer sebelum lip tint'
    ],
    howToUse: 'Oleskan secukupnya pada bibir setiap saat bibir terasa kering.'
  },
  {
    id: 'prod-lipcare-02',
    sku: 'BB-LIP-02',
    name: 'Baby Bloom Sugar Jelly Lip Scrub',
    category: 'Produk Bibir',
    price: 42000,
    stock: 55,
    image: ASSETS.lipScrub,
    volume: '15 g',
    rating: 4.8,
    reviewCount: 520,
    shadeColor: '#F8BBD0',
    keyIngredients: 'Natural Cane Sugar Crystals, Jojoba Beads, Strawberry Extract',
    description: 'Eksfoliasi bibir rasa permen manis yang lembut mengangkat sel kulit mati tanpa rasa perih, membuat bibir halus merona.',
    benefits: [
      'Butiran gula mikro alami yang tidak melukai bibir',
      'Mengembalikan rona pink alami bibir kusam',
      'Aroma permen buah manis yang menyenangkan'
    ],
    howToUse: 'Pijat lembut pada bibir basah dengan gerakan memutar selama 1 menit, lalu bilas air bersih.'
  },
  {
    id: 'prod-lipcare-03',
    sku: 'BB-LIP-03',
    name: 'Baby Bloom Midnight Sleeping Lip Mask',
    category: 'Produk Bibir',
    price: 68000,
    stock: 50,
    image: ASSETS.lipSleepingMask,
    isBestSeller: true,
    volume: '20 g',
    rating: 4.9,
    reviewCount: 1420,
    shadeColor: '#9C27B0',
    packageColor: '#7A3654',
    keyIngredients: 'Berry Antioxidant Complex, Hyaluronic Acid, Murumuru Butter',
    description: 'Masker bibir malam hari yang intensif menutrisi, melelehkan sel kulit mati saat tidur, dan menghasilkan bibir kenyal plumpy saat pagi.',
    benefits: [
      'Perawatan malam hari intensif untuk bibir sangat kering',
      'Bangun pagi dengan bibir lembut, kenyal, dan pink cerah',
      'Tekstur balm kaya nutrisi yang nyaman dipakai tidur'
    ],
    howToUse: 'Oleskan tebal pada bibir sebelum tidur malam menggunakan aplikator.'
  },
  {
    id: 'prod-lipcare-04',
    sku: 'BB-LIP-04',
    name: 'Baby Bloom Dewy Nectar Lip Oil',
    category: 'Produk Bibir',
    price: 48000,
    stock: 45,
    image: ASSETS.lipOil,
    volume: '6 ml',
    rating: 4.8,
    reviewCount: 430,
    shadeColor: '#FFCDD2',
    keyIngredients: 'Camellia Seed Oil, Rosa Canina Fruit Oil, Vitamin C & E',
    description: 'Minyak bibir nutrisi tinggi dengan efek kilau glossy bening bercahaya tanpa rasa berat atau lengket.',
    benefits: [
      'Memberikan efek glossy kaca berkilau mewah',
      'Mengunci kelembapan dan menutrisi lapisan bibir',
      'Dapat diaplikasikan mandiri atau di atas lip tint'
    ],
    howToUse: 'Gunakan aplikator doe-foot untuk mengoleskan minyak bibir secara merata.'
  },
  {
    id: 'prod-lipcare-05',
    sku: 'BB-LIP-05',
    name: 'Baby Bloom Cushion Plumper Lip Balm',
    category: 'Produk Bibir',
    price: 46000,
    stock: 40,
    image: ASSETS.lipPlumper,
    volume: '10 g',
    rating: 4.7,
    reviewCount: 390,
    shadeColor: '#F48FB1',
    keyIngredients: 'Volulip™ Peptide Complex, Menthol Breeze, Hyaluronic Filling Spheres',
    description: 'Balm penambah volume bibir instan dengan sensasi sejuk menyegarkan yang membuat bibir tampak penuh berisi alami.',
    benefits: [
      'Efek plumping bervolume instan tanpa jarum suntik',
      'Sensasi sejuk mint menyegarkan',
      'Menyamarkan kerutan dan garis halus pada bibir'
    ],
    howToUse: 'Oleskan pada bibir dan rasakan sensasi plumping sejuk bekerja dalam beberapa detik.'
  },

  // Baby Bloom Berry Milk Dewy Tint (10 Pilihan Warna Unik)
  {
    id: 'prod-tint-01',
    sku: 'BB-TINT-01',
    name: 'Baby Bloom Berry Milk Dewy Tint - #01 Peach Mochi',
    category: 'Produk Bibir',
    price: 49000,
    stock: 60,
    image: ASSETS.tintPeachMochi,
    volume: '4.5 ml',
    rating: 4.8,
    reviewCount: 890,
    shadeName: '#01 Peach Mochi',
    shadeColor: '#E88574',
    packageColor: '#E88574',
    keyIngredients: 'Peach Extract, Vitamin E, Hyaluronic Beads, Jojoba Oil',
    description: 'Pilihan warna coral kemerahan lembut yang manis dan feminin, cocok untuk tampilan sehari-hari yang segar dan hangat.',
    benefits: [
      'Warna coral kemerahan lembut yang manis natural',
      'Dewy glaze finish dengan formula film anti-geser',
      'Melembapkan bibir hingga 12 jam'
    ],
    howToUse: 'Aplikasikan merata pada bibir atau tepuk di bagian tengah untuk tampilan ombre lips.'
  },
  {
    id: 'prod-tint-03',
    sku: 'BB-TINT-03',
    name: 'Baby Bloom Berry Milk Dewy Tint - #03 Spiced Cinnamon',
    category: 'Produk Bibir',
    price: 49000,
    stock: 50,
    image: ASSETS.tintSpicedCinnamon,
    volume: '4.5 ml',
    rating: 4.9,
    reviewCount: 780,
    shadeName: '#03 Spiced Cinnamon',
    shadeColor: '#B85C4B',
    packageColor: '#B85C4B',
    keyIngredients: 'Cinnamon Bark Extract, Vitamin E, Argan Oil',
    description: 'Cokelat bata hangat dengan nuansa nude yang elegan dan berkelas, sangat pas untuk semua jenis warna kulit.',
    benefits: [
      'Warna nude kecokelatan hangat yang menawan',
      'Cocok untuk base ombre atau full lips berkarakter',
      'Ringan di bibir dan tahan lama'
    ],
    howToUse: 'Ratakan di bibir dengan kuas aplikator presisi.'
  },
  {
    id: 'prod-tint-04',
    sku: 'BB-TINT-04',
    name: 'Baby Bloom Berry Milk Dewy Tint - #04 Rose Milkshake',
    category: 'Produk Bibir',
    price: 49000,
    stock: 55,
    image: ASSETS.tintRoseMilkshake,
    volume: '4.5 ml',
    rating: 4.8,
    reviewCount: 650,
    shadeName: '#04 Rose Milkshake',
    shadeColor: '#C26786',
    packageColor: '#C26786',
    keyIngredients: 'Rosehip Oil, Damask Rose Water, Vitamin E',
    description: 'Pink keunguan dusky gaya K-beauty yang chic dan modern, memberikan kesan anggun dan manis.',
    benefits: [
      'Warna pink dusky khas idol Korea',
      'Finishing kilau dewy memukau',
      'Tidak membuat bibir kering'
    ],
    howToUse: 'Oleskan 1-2 lapis pada bibir.'
  },
  {
    id: 'prod-tint-05',
    sku: 'BB-TINT-05',
    name: 'Baby Bloom Berry Milk Dewy Tint - #05 Plum Bubblegum',
    category: 'Produk Bibir',
    price: 49000,
    stock: 45,
    image: ASSETS.tintPlumBubblegum,
    volume: '4.5 ml',
    rating: 4.7,
    reviewCount: 420,
    shadeName: '#05 Plum Bubblegum',
    shadeColor: '#7A3654',
    packageColor: '#7A3654',
    keyIngredients: 'Blackberry Extract, Vitamin E, Jojoba Oil',
    description: 'Ungu plum gelap bertema manis yang eksotis dan memikat, memberikan sentuhan riasan bold yang cantik.',
    benefits: [
      'Warna plum manis berkarakter mewah',
      'Pigmentasi tinggi dengan stain tahan luntur',
      'Tekstur nyaman tanpa rasa lengket'
    ],
    howToUse: 'Baurkan di bagian dalam bibir untuk efek vampy ombre.'
  },
  {
    id: 'prod-tint-06',
    sku: 'BB-TINT-06',
    name: 'Baby Bloom Berry Milk Dewy Tint - #06 Apricot Sorbet',
    category: 'Produk Bibir',
    price: 49000,
    stock: 40,
    image: ASSETS.tintApricotSorbet,
    volume: '4.5 ml',
    rating: 4.8,
    reviewCount: 510,
    shadeName: '#06 Apricot Sorbet',
    shadeColor: '#F29671',
    packageColor: '#F29671',
    keyIngredients: 'Apricot Kernel Oil, Squalane, Vitamin E',
    description: 'Oranye pastel berembun yang ceria dan segar, memberikan rona musim panas yang hangat dan menyenangkan.',
    benefits: [
      'Warna oranye pastel cerah menyegarkan wajah',
      'Kilau dewy glassy yang memantulkan cahaya',
      'Menutrisi bibir dengan minyak aprikot'
    ],
    howToUse: 'Oleskan merata pada bibir.'
  },
  {
    id: 'prod-tint-07',
    sku: 'BB-TINT-07',
    name: 'Baby Bloom Berry Milk Dewy Tint - #07 Ruby Caramel',
    category: 'Produk Bibir',
    price: 49000,
    stock: 60,
    image: ASSETS.tintRubyCaramel,
    isBestSeller: true,
    volume: '4.5 ml',
    rating: 4.9,
    reviewCount: 940,
    shadeName: '#07 Ruby Caramel',
    shadeColor: '#C04944',
    packageColor: '#C04944',
    keyIngredients: 'Caramel Essence, Red Berry Complex, Shea Butter',
    description: 'Merah karamel hangat dengan kilau keemasan yang mempesona, membuat tampilan wajah langsung cerah bercahaya.',
    benefits: [
      'Warna merah karamel hangat mempesona',
      'Membuat gigi tampak lebih putih bersih',
      'Tahan lama dan tidak mudah transfer'
    ],
    howToUse: 'Aplikasikan secukupnya di seluruh bibir.'
  },
  {
    id: 'prod-tint-08',
    sku: 'BB-TINT-08',
    name: 'Baby Bloom Berry Milk Dewy Tint - #08 Strawberry Glaze',
    category: 'Produk Bibir',
    price: 49000,
    stock: 50,
    image: ASSETS.tintStrawberryGlaze,
    volume: '4.5 ml',
    rating: 4.8,
    reviewCount: 680,
    shadeName: '#08 Strawberry Glaze',
    shadeColor: '#D63658',
    packageColor: '#D63658',
    keyIngredients: 'Strawberry Seed Oil, Pearl Micro-Shimmer, Vitamin E',
    description: 'Merah stoberi bening ber-glitter halus yang juicy menggemaskan, memberikan kilau bibir manis menggoda.',
    benefits: [
      'Kilau glitter mikro stroberi yang berkilauan cantik',
      'Efek juicy lips ala glazed donut',
      'Aroma buah stroberi yang manis'
    ],
    howToUse: 'Oleskan sebagai layer akhir untuk kilau berkilau maksimal.'
  },
  {
    id: 'prod-tint-09',
    sku: 'BB-TINT-09',
    name: 'Baby Bloom Berry Milk Dewy Tint - #09 Vintage Fig',
    category: 'Produk Bibir',
    price: 49000,
    stock: 45,
    image: ASSETS.tintVintageFig,
    volume: '4.5 ml',
    rating: 4.8,
    reviewCount: 560,
    shadeName: '#09 Vintage Fig',
    shadeColor: '#9E4E56',
    packageColor: '#9E4E56',
    keyIngredients: 'Fig Fruit Extract, Argan Oil, Hyaluronic Acid',
    description: 'Cokelat kemerahan buah tin bernuansa vintage yang estetik dan hangat, sangat cocok untuk gaya kasual maupun formal.',
    benefits: [
      'Nuansa vintage fig yang anggun & berkelas',
      'Menutupi warna bibir gelap secara sempurna',
      'Formula melembapkan tidak menggumpal'
    ],
    howToUse: 'Baurkan di bibir secara merata.'
  },
  {
    id: 'prod-tint-10',
    sku: 'BB-TINT-10',
    name: 'Baby Bloom Berry Milk Dewy Tint - #10 Bare Petal',
    category: 'Produk Bibir',
    price: 49000,
    stock: 70,
    image: ASSETS.tintBarePetal,
    isBestSeller: true,
    volume: '4.5 ml',
    rating: 4.9,
    reviewCount: 1100,
    shadeName: '#10 Bare Petal',
    shadeColor: '#F3B2BE',
    packageColor: '#F3B2BE',
    keyIngredients: 'Camellia Petal Extract, Jojoba Oil, Vitamin E',
    description: 'Pink pucat alami transparan (MLBB) yang super natural, memberikan rona segar tanpa terasa memakai riasan tebal.',
    benefits: [
      'Pink pucat lembut transparan alami tercantik',
      'Sangat cocok untuk no-makeup makeup look sekolah / kerja',
      'Menghidrasi dan mencerahkan bibir kusam'
    ],
    howToUse: 'Gunakan setiap hari untuk rona bibir pink alami.'
  },

  // =========================================================================
  // 3. 🧼 PEMBERSIH WAJAH (FACIAL WASH)
  // =========================================================================
  {
    id: 'prod-wash-01',
    sku: 'BB-WSH-01',
    name: 'Baby Bloom Fluffy Bubble Cleanser',
    category: 'Pembersih Wajah',
    price: 68000,
    stock: 65,
    image: ASSETS.bubbleCleanser,
    volume: '120 ml',
    rating: 4.9,
    reviewCount: 1250,
    shadeColor: '#E1F5FE',
    packageColor: '#fec1d6',
    keyIngredients: 'Amino Foam Micelles, Rice Milk, Hyaluronic Acid, Chamomile',
    description: 'Busa pembersih selembut awan yang membersihkan pori-pori dari debu polusi dan sisa makeup tanpa membuat kulit kering tertarik.',
    benefits: [
      'Busa tebal dan lembut selembut busa awan',
      'Membersihkan hingga ke dalam pori-pori tanpa rasa kesat',
      'pH seimbang 5.5 menjaga kelembapan alami kulit'
    ],
    howToUse: 'Pompa 1-2 kali busa ke telapak tangan, usapkan dan pijat lembut ke wajah basah, lalu bilas hingga bersih.'
  },
  {
    id: 'prod-wash-02',
    sku: 'BB-WSH-02',
    name: 'Baby Bloom Milk Mochi Jelly Gel Wash',
    category: 'Pembersih Wajah',
    price: 65000,
    stock: 55,
    image: ASSETS.mochiJellyWash,
    volume: '100 ml',
    rating: 4.8,
    reviewCount: 890,
    shadeColor: '#FFF8E1',
    packageColor: '#805062',
    keyIngredients: 'Oat Milk Protein, Konjac Jelly Beads, Panthenol B5',
    description: 'Pembersih tekstur jelly kenyal seperti mochi dengan butiran konjac halus yang menyegarkan dan melembapkan kulit wajah.',
    benefits: [
      'Tekstur mochi jelly yang kenyal dan menyenangkan',
      'Eksfoliasi mikro harian yang sangat ramah di kulit',
      'Membuat kulit kenyal, cerah, dan lembap'
    ],
    howToUse: 'Tuangkan secukupnya, gosok dengan sedikit air hingga berbusa halus, lalu bilas.'
  },
  {
    id: 'prod-wash-03',
    sku: 'BB-WSH-03',
    name: 'Baby Bloom Pink Clay Gentle Wash',
    category: 'Pembersih Wajah',
    price: 69000,
    stock: 45,
    image: ASSETS.pinkClayWash,
    volume: '100 g',
    rating: 4.8,
    reviewCount: 620,
    shadeColor: '#F8BBD0',
    packageColor: '#fec1d6',
    keyIngredients: 'French Pink Kaolin Clay, Calamine, Witch Hazel',
    description: 'Pembersih berbahan tanah liat pink lembut untuk membersihkan minyak berlebih dan mengecilkan pori-pori halus.',
    benefits: [
      'Mengontrol sebum berlebih tanpa mengikis minyak alami',
      'Mengecilkan dan membersihkan pori-pori halus',
      'Menenangkan kulit yang rentan berjerawat'
    ],
    howToUse: 'Baurkan di wajah basah, pijat perlahan di area T-Zone, lalu bilas air hangat.'
  },
  {
    id: 'prod-wash-04',
    sku: 'BB-WSH-04',
    name: 'Baby Bloom Soothing Oat Cleansing Balm',
    category: 'Pembersih Wajah',
    price: 85000,
    stock: 40,
    image: ASSETS.oatCleansingBalm,
    volume: '80 g',
    rating: 4.9,
    reviewCount: 780,
    shadeColor: '#FFE0B2',
    packageColor: '#805062',
    keyIngredients: 'Colloidal Oat, Sweet Almond Oil, Sunflower Seed Oil',
    description: 'Pembersih riasan melt-in-skin yang meleleh dari balm menjadi minyak sutra, mengangkat waterproof makeup dalam 15 detik.',
    benefits: [
      'Melelehkan maskara waterproof & sunscreen tebal tanpa perih di mata',
      'Mengemulsi sempurna menjadi susu saat terkena air',
      'Meninggalkan kulit bersih lembut ternutrisi'
    ],
    howToUse: 'Ambil spatula secukupnya pada tangan kering, pijat ke wajah kering hingga makeup larut, lalu bilas air.'
  },
  {
    id: 'prod-wash-05',
    sku: 'BB-WSH-05',
    name: 'Baby Bloom Amino Acid Gentle Wash',
    category: 'Pembersih Wajah',
    price: 72000,
    stock: 50,
    image: ASSETS.aminoAcidWash,
    volume: '150 ml',
    rating: 4.8,
    reviewCount: 540,
    shadeColor: '#E0F2F1',
    packageColor: '#fec1d6',
    keyIngredients: 'Pure Amino Acid Surfactants, 7X Ceramide, Centella Asiatica',
    description: 'Pembersih formulasi asam amino murni yang menjaga dan merawat kekuatan skin barrier kulit sensitif.',
    benefits: [
      'Formula teruji dermatologi bebas sulfat (SLS/SLES)',
      'Menjaga dan memperkuat lapisan skin barrier',
      'Aman untuk kulit eczema, rosacea, dan pasca-treatment'
    ],
    howToUse: 'Gunakan setiap pagi dan malam hari untuk pembersihan yang lembut.'
  },

  // =========================================================================
  // 4. 💦 PELEMBAP (MOISTURIZER)
  // =========================================================================
  {
    id: 'prod-moist-02',
    sku: 'BB-MST-02',
    name: 'Baby Bloom Pink Watermelon Pudding Gel',
    category: 'Pelembap',
    price: 85000,
    stock: 60,
    image: ASSETS.watermelonPudding,
    volume: '50 g',
    rating: 4.8,
    reviewCount: 910,
    shadeColor: '#FF80AB',
    packageColor: '#fec1d6',
    keyIngredients: 'Watermelon Extract 70%, Niacinamide 3%, Aloe Vera Leaf Juice',
    description: 'Gel segar penenang kulit bertekstur puding semangka yang memberikan sensasi dingin dan meredakan kulit terbakar matahari.',
    benefits: [
      'Sensasi sejuk instan meredakan kulit panas & kemerahan',
      'Tekstur pudding gel ringan non-oily',
      'Mencerahkan wajah kusam dengan ekstrak semangka'
    ],
    howToUse: 'Oleskan merata pada wajah atau area kulit yang membutuhkan kesegaran ekstra.'
  },
  {
    id: 'prod-moist-03',
    sku: 'BB-MST-03',
    name: 'Baby Bloom Berry Barrier Cream',
    category: 'Pelembap',
    price: 89000,
    stock: 45,
    image: ASSETS.berryBarrierCream,
    volume: '50 g',
    rating: 4.9,
    reviewCount: 840,
    shadeColor: '#F48FB1',
    packageColor: '#805062',
    keyIngredients: 'Mixed Berries Antioxidants, Ceramide NP, Squalane',
    description: 'Krim penguat lapisan kulit yang mengunci kelembapan mendalam dan menangkal radikal bebas lingkungan polusi.',
    benefits: [
      'Memperbaiki lapisan lipid pelindung kulit',
      'Melindungi dari stres oksidatif lingkungan',
      'Memberikan elastisitas kenyal dan kenyamanan tahan lama'
    ],
    howToUse: 'Gunakan pagi dan malam setelah essence atau serum.'
  },
  {
    id: 'prod-moist-04',
    sku: 'BB-MST-04',
    name: 'Baby Bloom Hydro Pudding Sleeping Cream',
    category: 'Pelembap',
    price: 92000,
    stock: 40,
    image: ASSETS.hydroPuddingCream,
    volume: '50 g',
    rating: 4.8,
    reviewCount: 670,
    shadeColor: '#E1BEE7',
    packageColor: '#805062',
    keyIngredients: 'Hydro-Ion Water, Marine Collagen, Lavender Flower Oil',
    description: 'Krim malam penambah kadar air yang meregenerasi sel kulit saat kamu tidur, bangun dengan wajah plumpy dan kenyal bersinar.',
    benefits: [
      'Mengisi ulang cadangan air kulit secara intensif semalaman',
      'Aroma lavender lembut yang menenangkan tidur',
      'Mencegah timbulnya garis halus akibat dehidrasi'
    ],
    howToUse: 'Oleskan tebal pada wajah sebelum tidur sebagai langkah akhir skincare malam.'
  },
  {
    id: 'prod-moist-05',
    sku: 'BB-MST-05',
    name: 'Baby Bloom Velvet Matte Oil Control Cream',
    category: 'Pelembap',
    price: 84000,
    stock: 50,
    image: ASSETS.velvetMatteCream,
    volume: '50 g',
    rating: 4.8,
    reviewCount: 590,
    shadeColor: '#D7CCC8',
    packageColor: '#fec1d6',
    keyIngredients: 'Silica Powder Micro-matrix, Zinc PCA, Tea Tree Extract',
    description: 'Pelembap kontrol minyak dengan hasil akhir velvet matte lembut, menjaga wajah bebas kilap seharian hingga 12 jam.',
    benefits: [
      'Mengontrol produksi minyak dan sebum berlebih',
      'Finishing velvet matte bebas kilap seperti bedak halus',
      'Mencegah pori tersumbat dan komedo'
    ],
    howToUse: 'Gunakan setiap pagi pada wajah bersih sebelum makeup.'
  },

  // =========================================================================
  // 5. ✨ SERUM WAJAH (FACIAL SERUM)
  // =========================================================================
  {
    id: 'prod-serum-02',
    sku: 'BB-SRM-02',
    name: 'Baby Bloom Pink Collagen Drops',
    category: 'Serum Wajah',
    price: 119000,
    stock: 55,
    image: ASSETS.pinkCollagenDrops,
    volume: '30 ml',
    rating: 4.9,
    reviewCount: 920,
    shadeColor: '#F8BBD0',
    packageColor: '#805062',
    keyIngredients: 'Low Molecular Marine Collagen 10%, Rose Peptide, Hyaluronic Acid',
    description: 'Serum pengenyal kulit berkonsentrasi tinggi yang mengembalikan elastisitas, mengencangkan pori, dan membuat kulit kenyal kenyal seperti pipi bayi.',
    benefits: [
      'Meningkatkan produksi kolagen alami kulit',
      'Mengencangkan kulit kendur dan menyamarkan garis halus',
      'Memberikan efek kulit kenyal dan bouncy instan'
    ],
    howToUse: 'Teteskan 3-4 tetes pada wajah pagi dan malam, tepuk hingga terserap.'
  },
  {
    id: 'prod-serum-03',
    sku: 'BB-SRM-03',
    name: 'Baby Bloom Calming Cica Milk Serum',
    category: 'Serum Wajah',
    price: 105000,
    stock: 60,
    image: ASSETS.calmingCicaSerum,
    volume: '30 ml',
    rating: 4.8,
    reviewCount: 760,
    shadeColor: '#E8F5E9',
    packageColor: '#fec1d6',
    keyIngredients: 'Centella Asiatica Extract 65%, Madecassoside, Rice Milk Ceramide',
    description: 'Serum penenang kemerahan bertekstur susu lembut untuk meredakan iritasi, inflamasi jerawat, dan kulit sensitif yang reaktif.',
    benefits: [
      'Meredakan kemerahan jerawat dalam 24 jam',
      'Mendinginkan suhu kulit yang terbakar atau stres',
      'Mempercepat penyembuhan bekas luka jerawat'
    ],
    howToUse: 'Gunakan pada wajah yang kemerahan atau berjerawat setelah toner.'
  },
  {
    id: 'prod-serum-04',
    sku: 'BB-SRM-04',
    name: 'Baby Bloom Gentle Retinol Night Drop',
    category: 'Serum Wajah',
    price: 125000,
    stock: 40,
    image: ASSETS.retinolNightDrop,
    volume: '30 ml',
    rating: 4.9,
    reviewCount: 880,
    shadeColor: '#EDE7F6',
    packageColor: '#805062',
    keyIngredients: 'Encapsulated Retinol 1%, Bakuchiol 2%, Squalane, Ceramide',
    description: 'Serum pemudaan kulit lembut dengan teknologi enkapsulasi canggih untuk meregenerasi sel kulit tanpa risiko iritasi atau pengelupasan berlebih.',
    benefits: [
      'Menyamarkan kerutan dan garis senyum di wajah',
      'Mencerahkan flek hitam & meratakan tekstur kulit',
      'Minim risiko iritasi (gentle for beginner)'
    ],
    howToUse: 'Gunakan hanya pada malam hari 2-3 kali seminggu. Wajib sunscreen di pagi hari.'
  },
  {
    id: 'prod-serum-05',
    sku: 'BB-SRM-05',
    name: 'Baby Bloom Spot-Off Brightening Nectar',
    category: 'Serum Wajah',
    price: 118000,
    stock: 45,
    image: ASSETS.spotOffNectar,
    volume: '30 ml',
    rating: 4.8,
    reviewCount: 670,
    shadeColor: '#FFF9C4',
    packageColor: '#fec1d6',
    keyIngredients: 'Tranexamic Acid 3%, Niacinamide 5%, Licorice Root Nectar',
    description: 'Serum penyamar noda hitam yang bekerja tepat sasaran memudarkan flek hitam membandel, melasma, dan bekas jerawat kehitaman.',
    benefits: [
      'Memudarkan hiperpigmentasi dan noda hitam membandel',
      'Mencegah pembentukan melanin baru akibat sinar matahari',
      'Meratakan warna kulit wajah yang belang'
    ],
    howToUse: 'Aplikasikan merata atau totol pada area noda hitam di pagi & malam hari.'
  },

  // =========================================================================
  // 6. ☀️ TABIR SURYA (SUNSCREEN)
  // =========================================================================
  {
    id: 'prod-sun-02',
    sku: 'BB-SUN-02',
    name: 'Baby Bloom Rosy Tone-Up Sun Screen',
    category: 'Tabir Surya',
    price: 78000,
    stock: 65,
    image: ASSETS.rosyToneUpSun,
    volume: '50 ml',
    rating: 4.8,
    reviewCount: 920,
    shadeColor: '#FFCDD2',
    packageColor: '#fec1d6',
    keyIngredients: 'Pink Calamine, Niacinamide 2%, SPF 50+ PA++++, Peach Blossom Extract',
    description: 'Sunscreen mencerahkan seketika dengan sentuhan rona pink alami yang membuat kulit glowing berseri tanpa terlihat abu-abu.',
    benefits: [
      'Mencerahkan wajah 1 tingkat seketika dengan rona rosy glow',
      'Bisa berfungsi sebagai makeup primer ringan',
      'Mengontrol kilap minyak berlebih'
    ],
    howToUse: 'Ratakan 2 ruas jari pada wajah sebelum bepergian.'
  },
  {
    id: 'prod-sun-03',
    sku: 'BB-SUN-03',
    name: 'Baby Bloom Velvet Touch Sun Stick',
    category: 'Tabir Surya',
    price: 82000,
    stock: 50,
    image: ASSETS.velvetTouchSunStick,
    volume: '20 g',
    rating: 4.8,
    reviewCount: 610,
    shadeColor: '#FFF3E0',
    packageColor: '#805062',
    keyIngredients: 'Silica Powder, Cica, Vitamin E, SPF 50+ PA++++',
    description: 'Sunscreen bentuk stik praktis yang mudah dioles kapan saja untuk re-apply di atas makeup tanpa menggeser riasan.',
    benefits: [
      'Sangat praktis untuk re-apply di mana saja',
      'Tidak menggeser foundation atau riasan makeup',
      'Hasil akhir matte halus bebas lengket'
    ],
    howToUse: 'Buka tutup, putar bagian bawah, dan usapkan merata pada wajah.'
  },
  {
    id: 'prod-sun-04',
    sku: 'BB-SUN-04',
    name: 'Baby Bloom Aqua Gel Sun Mist',
    category: 'Tabir Surya',
    price: 79000,
    stock: 45,
    image: ASSETS.aquaGelSunMist,
    volume: '80 ml',
    rating: 4.7,
    reviewCount: 480,
    shadeColor: '#E0F7FA',
    packageColor: '#fec1d6',
    keyIngredients: 'Aloe Vera Water, Hyaluronic 5D, UV Protection Mist',
    description: 'Sunscreen semprot berembun halus yang memberikan perlindungan kilat dan sensasi segar dingin seketika.',
    benefits: [
      'Semprotan mikro halus yang menyebar rata di wajah',
      'Sensasi sejuk instan meredakan panas matahari',
      'Bisa disemprotkan langsung di atas makeup'
    ],
    howToUse: 'Kocok dan semprotkan dengan jarak 20 cm dari wajah dengan mata tertutup.'
  },
  {
    id: 'prod-sun-05',
    sku: 'BB-SUN-05',
    name: 'Baby Bloom Mild Physical Sun Cream',
    category: 'Tabir Surya',
    price: 85000,
    stock: 40,
    image: ASSETS.mildPhysicalSun,
    volume: '50 ml',
    rating: 4.8,
    reviewCount: 530,
    shadeColor: '#F5F5F5',
    packageColor: '#805062',
    keyIngredients: '100% Non-Nano Zinc Oxide & Titanium Dioxide, Centella Asiatica, Allantoin',
    description: 'Sunscreen khusus kulit sensitif berbahan mineral 100% physical yang aman untuk ibu hamil, menyusui, dan kulit berjerawat meradang.',
    benefits: [
      '100% mineral physical filters tanpa risiko iritasi',
      'Memberikan proteksi instan begitu diaplikasikan',
      'Aman untuk bayi & kulit super sensitif'
    ],
    howToUse: 'Baurkan merata pada wajah dan leher.'
  },

  // =========================================================================
  // 7. 🎭 MASKER WAJAH (FACE MASK)
  // =========================================================================
  {
    id: 'prod-mask-01',
    sku: 'BB-MSK-01',
    name: 'Baby Bloom Strawberry Milk Sheet Mask',
    category: 'Masker Wajah',
    price: 18000,
    stock: 120,
    image: ASSETS.strawberrySheetMask,
    isBestSeller: true,
    volume: '1 Lembar (25 ml)',
    rating: 4.9,
    reviewCount: 1640,
    shadeColor: '#FFCDD2',
    packageColor: '#fec1d6',
    keyIngredients: 'Real Strawberry Extract, Milk Protein, Niacinamide, Hyaluronic Acid',
    description: 'Masker lembar nutrisi susu stroberi yang melembapkan intensif, mencerahkan kulit lelah dalam 15 menit dan memberikan rona segar merona.',
    benefits: [
      'Kulit langsung glowing & super plumpy dalam 15 menit',
      'Lembaran tencel biodegradable ekstra lembut pas di lekuk wajah',
      'Essence susu berlimpah 25ml yang menutrisi mendalam'
    ],
    howToUse: 'Tempelkan pada wajah bersih selama 15-20 menit. Lepaskan dan tepuk sisa essence.'
  },
  {
    id: 'prod-mask-02',
    sku: 'BB-MSK-02',
    name: 'Baby Bloom Soft Sugar Whipped Clay Mask',
    category: 'Masker Wajah',
    price: 78000,
    stock: 45,
    image: ASSETS.sugarWhippedClayMask,
    volume: '80 g',
    rating: 4.8,
    reviewCount: 710,
    shadeColor: '#F8BBD0',
    packageColor: '#805062',
    keyIngredients: 'Whipped Pink Clay, Cane Sugar, Rosehip Extract',
    description: 'Masker lumpur pink halus bertekstur whipped cream yang membersihkan pori-pori dan komedo tanpa membuat kulit kering pecah.',
    benefits: [
      'Tekstur whipped clay yang empuk dan tidak retak di wajah',
      'Mengangkat komedo dan minyak di pori-pori',
      'Membuat kulit halus lembut selembut sutra'
    ],
    howToUse: 'Oleskan merata pada wajah, diamkan 10 menit, lalu bilas air hangat.'
  },
  {
    id: 'prod-mask-03',
    sku: 'BB-MSK-03',
    name: 'Baby Bloom Rose Water Sleeping Mask',
    category: 'Masker Wajah',
    price: 85000,
    stock: 50,
    image: ASSETS.roseWaterSleepingMask,
    volume: '80 ml',
    rating: 4.8,
    reviewCount: 650,
    shadeColor: '#FCE4EC',
    packageColor: '#fec1d6',
    keyIngredients: 'Damask Rose Water 70%, Hyaluronic Acid 8D, Peptides',
    description: 'Masker tidur aroma mawar mewah yang mengunci hidrasi semalaman, bangun pagi dengan wajah bercahaya berseri.',
    benefits: [
      'Aroma bunga mawar Damask alami yang menenangkan pikiran',
      'Mengembalikan elastisitas dan kekenyalan kulit',
      'Tidak lengket dan tidak mengotori sarung bantal'
    ],
    howToUse: 'Gunakan sebagai langkah akhir perawatan malam, bilas pagi hari.'
  },
  {
    id: 'prod-mask-04',
    sku: 'BB-MSK-04',
    name: 'Baby Bloom Peel-Off Gold & Pink Mask',
    category: 'Masker Wajah',
    price: 75000,
    stock: 40,
    image: ASSETS.peelOffPinkMask,
    volume: '60 ml',
    rating: 4.7,
    reviewCount: 490,
    shadeColor: '#FFE082',
    packageColor: '#805062',
    keyIngredients: '24K Gold Flakes, Pink Pearl Powder, Collagen',
    description: 'Masker kelupas berkilau dengan partikel emas dan mutiara pink yang mengangkat sel kulit mati dan kotoran menempel.',
    benefits: [
      'Mengangkat sel kulit mati secara tuntas',
      'Wajah langsung terasa lebih kencang dan halus',
      'Sensasi peeling yang memuaskan dan berkilau mewah'
    ],
    howToUse: 'Oleskan tipis merata, tunggu 20 menit hingga kering sempurna, lalu kelupas perlahan dari bawah ke atas.'
  },
  {
    id: 'prod-mask-05',
    sku: 'BB-MSK-05',
    name: 'Baby Bloom Bubble Reset Wash-Off Pack',
    category: 'Masker Wajah',
    price: 82000,
    stock: 35,
    image: ASSETS.bubbleResetPack,
    volume: '70 g',
    rating: 4.8,
    reviewCount: 530,
    shadeColor: '#E1F5FE',
    packageColor: '#fec1d6',
    keyIngredients: 'Oxygen Micro-Bubble Complex, Charcoal, Tea Tree',
    description: 'Masker busa pembersih racun yang berubah menjadi ribuan gelembung oksigen mikro untuk mendetoksifikasi kulit dari polusi berat.',
    benefits: [
      'Efek gelembung mikro menggelitik yang menyenangkan',
      'Mendetoksifikasi pori-pori dari sisa polusi dan racun',
      'Menyegarkan wajah lelah dalam 5 menit'
    ],
    howToUse: 'Oleskan ke wajah, biarkan gelembung busa mengembang selama 5 menit, pijat lembut lalu bilas.'
  },

  // =========================================================================
  // 8. 🧴 PERAWATAN TUBUH (BODY SERUM & HAND CREAM)
  // =========================================================================
  {
    id: 'prod-body-01',
    sku: 'BB-BOD-01',
    name: 'Baby Bloom Velvet Body Milk Serum',
    category: 'Perawatan Tubuh',
    price: 85000,
    stock: 75,
    image: ASSETS.velvetBodyMilk,
    isBestSeller: true,
    volume: '250 ml',
    rating: 4.9,
    reviewCount: 1480,
    shadeColor: '#FFF8E1',
    packageColor: '#805062',
    keyIngredients: 'Milk Protein, Niacinamide 5%, Glutathione, UV Filter',
    description: 'Body serum tekstur susu lembut yang meratakan kulit tubuh belang, mencerahkan secara instan, dan mengharumkan tubuh sepanjang hari.',
    benefits: [
      'Mencerahkan kulit tubuh belang dalam 7 hari',
      'Cepat meresap tanpa rasa lengket sama sekali',
      'Aroma vanila susu manis yang memikat tahan 8 jam'
    ],
    howToUse: 'Usapkan merata ke seluruh tubuh setiap selesai mandi pagi & sore.'
  },
  {
    id: 'prod-body-02',
    sku: 'BB-BOD-02',
    name: 'Baby Bloom Pink Peony Brightening Lotion',
    category: 'Perawatan Tubuh',
    price: 82000,
    stock: 55,
    image: ASSETS.pinkPeonyLotion,
    volume: '250 ml',
    rating: 4.8,
    reviewCount: 820,
    shadeColor: '#F8BBD0',
    packageColor: '#fec1d6',
    keyIngredients: 'Peony Flower Extract, Arbutin, Vitamin C, Shea Butter',
    description: 'Lotion tubuh beraroma bunga peoni Perancis mewah yang melembapkan kulit kering dan memberikan rona cerah berseri.',
    benefits: [
      'Aroma mewah parfum bunga peony feminin',
      'Mengunci kelembapan kulit tubuh hingga 24 jam',
      'Menghaluskan area siku dan lutut yang kasar'
    ],
    howToUse: 'Gunakan secara teratur setiap hari di seluruh tubuh.'
  },
  {
    id: 'prod-body-03',
    sku: 'BB-BOD-03',
    name: 'Baby Bloom Silk Soft Hand Cream',
    category: 'Perawatan Tubuh',
    price: 35000,
    stock: 80,
    image: ASSETS.silkSoftHandCream,
    volume: '40 ml',
    rating: 4.8,
    reviewCount: 750,
    shadeColor: '#FFE0B2',
    packageColor: '#805062',
    keyIngredients: 'Sweet Bakery Vanilla Extract, Macadamia Oil, Keratin',
    description: 'Krim tangan beraroma sweet bakery manis yang melembutkan telapak tangan kasar dan menguatkan kuku agar tidak mudah patah.',
    benefits: [
      'Menjadikan tangan selembut sutra seketika',
      'Aroma kue vanila manis yang bikin nagih',
      'Kemasan praktis travel-friendly mudah dibawa di tas'
    ],
    howToUse: 'Oleskan secukupnya pada tangan dan kuku kapan saja dibutuhkan.'
  },
  {
    id: 'prod-body-04',
    sku: 'BB-BOD-04',
    name: 'Baby Bloom Exfoliating Glow Body Drops',
    category: 'Perawatan Tubuh',
    price: 89000,
    stock: 45,
    image: ASSETS.exfoliatingBodyDrops,
    volume: '200 ml',
    rating: 4.8,
    reviewCount: 630,
    shadeColor: '#FFF3E0',
    packageColor: '#fec1d6',
    keyIngredients: 'Glycolic Acid AHA 5%, Salicylic Acid BHA 1%, Jojoba Oil',
    description: 'Serum badan penghalus kulit untuk mengatasi tekstur kulit kasar, beruntusan di lengan (chicken skin), dan mencerahkan lipatan tubuh.',
    benefits: [
      'Menghaluskan beruntusan pada lengan dan paha',
      'Mencerahkan lipatan ketiak, leher, dan siku',
      'Mengangkat sel kulit mati tanpa perlu digosok keras'
    ],
    howToUse: 'Gunakan pada malam hari 3 kali seminggu sebelum tidur.'
  },
  {
    id: 'prod-body-05',
    sku: 'BB-BOD-05',
    name: 'Baby Bloom Barrier Repair Hand Lotion',
    category: 'Perawatan Tubuh',
    price: 38000,
    stock: 50,
    image: ASSETS.barrierRepairHandLotion,
    volume: '50 ml',
    rating: 4.7,
    reviewCount: 420,
    shadeColor: '#E0F2F1',
    packageColor: '#805062',
    keyIngredients: 'Ceramide Complex, Centella Asiatica, Panthenol B5',
    description: 'Krim tangan pelindung kelembapan khusus tangan yang sering terkena sabun cuci, hand sanitizer, atau berada di ruangan ber-AC.',
    benefits: [
      'Memperbaiki lapisan pelindung kulit tangan yang pecah-pecah',
      'Cepat meresap dan tidak licin saat memegang ponsel',
      'Memberikan kelembapan intensif tahan lama'
    ],
    howToUse: 'Oleskan pada tangan setelah mencuci tangan atau menggunakan hand sanitizer.'
  },

  // =========================================================================
  // 9. 🎁 PAKET HEMAT (BUNDLING SET)
  // =========================================================================
  {
    id: 'prod-bundle-01',
    sku: 'BB-BDL-01',
    name: '🎁 Paket 1: "The Ultimate Glow Set" (Paket Glowing Bening)',
    category: 'Paket Hemat',
    price: 299000,
    stock: 35,
    image: ASSETS.bundleUltimateGlow,
    isBestSeller: true,
    isBundle: true,
    volume: '4 Produk Full Size',
    rating: 5.0,
    reviewCount: 1850,
    shadeColor: '#FCE4EC',
    packageColor: '#805062',
    bundleItems: [
      '1x Baby Bloom Fluffy Bubble Cleanser (120ml)',
      '1x Baby Bloom Glass Skin Glow Serum (30ml)',
      '1x Baby Bloom Cloud Cushion Moist (50g)',
      '1x Baby Bloom Invisible Sun Milk SPF 50+ (50ml)'
    ],
    keyIngredients: 'Complete 4-Step Regimen: Amino Acid, Niacinamide 10%, 5X Ceramide, Hybrid UV SPF 50+',
    description: 'Rangkaian 4 langkah paling lengkap & viral untuk mendapatkan wajah glowing sebening kaca (glass skin)! Menuntaskan kulit kusam, memperbaiki skin barrier, dan melindungi dari sinar matahari. Hemat Rp 48.000 dibanding beli satuan.',
    benefits: [
      'Hemat Rp 48.000 dibanding harga satuan',
      '4 Langkah lengkap perawatan kulit glowing dari pagi hingga malam',
      'Termasuk produk Best Seller nomor 1 pilihan Founder Keyzha',
      'Bonus Pouch Kosmetik Baby Bloom Eksklusif'
    ],
    howToUse: 'Urutan pemakaian: Fluffy Bubble Cleanser -> Glass Skin Glow Serum -> Cloud Cushion Moist -> Invisible Sun Milk (pagi hari).'
  },
  {
    id: 'prod-bundle-02',
    sku: 'BB-BDL-02',
    name: '🎁 Paket 2: "Pinky Lip Party Set" (Paket Bibir Sehat & Cantik)',
    category: 'Paket Hemat',
    price: 159000,
    stock: 40,
    image: ASSETS.bundlePinkyLipParty,
    isBestSeller: true,
    isBundle: true,
    volume: '4 Produk Perawatan Bibir',
    rating: 4.9,
    reviewCount: 1420,
    shadeColor: '#F8BBD0',
    packageColor: '#fec1d6',
    bundleItems: [
      '1x Baby Bloom Sugar Jelly Lip Scrub (15g)',
      '1x Baby Bloom Marshmallow Lip Butter (15g)',
      '1x Baby Bloom Berry Milk Dewy Tint #02 Berry Chiffon',
      '1x Baby Bloom Berry Milk Dewy Tint #01 Peach Mochi'
    ],
    keyIngredients: 'Berry Seed Oil, Cane Sugar, Shea Butter, Squalane',
    description: 'Paket terlengkap untuk bibir sehat, plumpy, dan cantik merona setiap hari! Mengangkat sel kulit mati, melembapkan, dan memberikan 2 pilihan warna dewy tint terfavorit. Hemat Rp 26.000.',
    benefits: [
      'Hemat Rp 26.000 dari harga normal',
      'Kombinasi eksfoliasi + pelembap + 2 warna dewy tint best seller',
      'Bibir sehat bebas pecah-pecah & selalu on-point'
    ],
    howToUse: 'Gunakan Lip Scrub 2x seminggu, aplikasikan Lip Butter sebelum tidur / sebelum makeup, dan poleskan Dewy Tint untuk riasan harian.'
  },
  {
    id: 'prod-bundle-03',
    sku: 'BB-BDL-03',
    name: '🎁 Paket 3: "Sweet Dreams Sleep Kit" (Paket Perawatan Malam)',
    category: 'Paket Hemat',
    price: 189000,
    stock: 30,
    image: ASSETS.bundleSweetDreams,
    isBundle: true,
    volume: 'Set Perawatan Tidur',
    rating: 4.9,
    reviewCount: 980,
    shadeColor: '#EDE7F6',
    packageColor: '#805062',
    bundleItems: [
      '1x Baby Bloom Hydro Pudding Sleeping Cream (50g)',
      '1x Baby Bloom Midnight Sleeping Lip Mask (20g)',
      '3x Baby Bloom Strawberry Milk Sheet Mask (3 pcs)'
    ],
    keyIngredients: 'Lavender Oil, Berry Antioxidants, Hydro-Ion Water, Milk Protein',
    description: 'Ritual perawatan relaksasi malam hari sebelum tidur untuk mengembalikan hidrasi kulit dan bibir saat kamu terlelap. Bangun pagi dengan wajah fresh glowing dan bibir kenyal! Hemat Rp 25.000.',
    benefits: [
      'Hemat Rp 25.000 + bonus sleeping eye mask lembut',
      'Intensif meregenerasi sel kulit dan bibir sepanjang malam',
      'Aroma relaksasi menenangkan tidur'
    ],
    howToUse: 'Gunakan Sheet Mask selama 15 menit, lanjutkan dengan Hydro Pudding Sleeping Cream di wajah dan Midnight Lip Mask di bibir sebelum tidur.'
  },
  {
    id: 'prod-bundle-04',
    sku: 'BB-BDL-04',
    name: '🎁 Paket 4: "Baby Bloom Starter Kit" (Paket Pemula Wajah Halus)',
    category: 'Paket Hemat',
    price: 215000,
    stock: 45,
    image: ASSETS.bundleStarterKit,
    isBestSeller: true,
    isBundle: true,
    volume: '3 Produk Basic Skincare',
    rating: 4.9,
    reviewCount: 1150,
    shadeColor: '#FFE0B2',
    packageColor: '#fec1d6',
    bundleItems: [
      '1x Baby Bloom Milk Mochi Jelly Gel Wash (100ml)',
      '1x Baby Bloom Cloud Cushion Moist (50g)',
      '1x Baby Bloom Rosy Tone-Up Sun Screen (50ml)'
    ],
    keyIngredients: 'Oat Milk, 5X Ceramide, Pink Calamine SPF 50+',
    description: 'Paket basic skincare 3 langkah wajib bagi pemula untuk kulit halus, lembap terlindungi, dan cerah merona seketika. Sangat mudah digunakan setiap hari! Hemat Rp 17.000.',
    benefits: [
      'Rangkaian basic skincare praktis 3 langkah',
      'Aman untuk pemula dan semua jenis kulit',
      'Hemat Rp 17.000'
    ],
    howToUse: 'Pagi: Mochi Jelly Wash -> Cloud Cushion Moist -> Rosy Tone-Up Sunscreen. Malam: Mochi Jelly Wash -> Cloud Cushion Moist.'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '#TRX-0982',
    date: 'Hari Ini',
    time: '14:32 WIB',
    customerName: 'Dina Pratiwi',
    cashierName: 'Keyzha (Founder)',
    paymentMethod: 'QRIS',
    status: 'Sukses',
    subtotal: 138000,
    tax: 0,
    discount: 0,
    total: 138000,
    amountPaid: 138000,
    change: 0,
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Berry Chiffon Tint
        quantity: 1,
        price: 49000
      },
      {
        product: INITIAL_PRODUCTS[0], // Cloud Cushion Moist
        quantity: 1,
        price: 89000
      }
    ]
  },
  {
    id: '#TRX-0981',
    date: 'Hari Ini',
    time: '13:15 WIB',
    customerName: 'Siti Rahmawati',
    cashierName: 'Keyzha (Founder)',
    paymentMethod: 'Tunai',
    status: 'Sukses',
    subtotal: 299000,
    tax: 0,
    discount: 0,
    total: 299000,
    amountPaid: 300000,
    change: 1000,
    items: [
      {
        product: INITIAL_PRODUCTS[39], // Paket 1 Ultimate Glow Set
        quantity: 1,
        price: 299000
      }
    ]
  },
  {
    id: '#TRX-0980',
    date: 'Hari Ini',
    time: '11:45 WIB',
    customerName: 'Budi Santoso',
    cashierName: 'Keyzha (Founder)',
    paymentMethod: 'Kartu Debit',
    status: 'Sukses',
    subtotal: 159000,
    tax: 0,
    discount: 0,
    total: 159000,
    amountPaid: 159000,
    change: 0,
    items: [
      {
        product: INITIAL_PRODUCTS[40], // Paket 2 Pinky Lip Party Set
        quantity: 1,
        price: 159000
      }
    ]
  },
  {
    id: '#TRX-0979',
    date: 'Hari Ini',
    time: '10:20 WIB',
    customerName: 'Clara Anindya',
    cashierName: 'Keyzha (Founder)',
    paymentMethod: 'Tunai',
    status: 'Sukses',
    subtotal: 190000,
    tax: 0,
    discount: 0,
    total: 190000,
    amountPaid: 200000,
    change: 10000,
    items: [
      {
        product: INITIAL_PRODUCTS[2], // Invisible Sun Milk SPF 50+
        quantity: 1,
        price: 75000
      },
      {
        product: INITIAL_PRODUCTS[3], // Glass Skin Glow Serum
        quantity: 1,
        price: 115000
      }
    ]
  },
  {
    id: '#TRX-0978',
    date: 'Hari Ini',
    time: '09:05 WIB',
    customerName: 'Alya Sabrina',
    cashierName: 'Keyzha (Founder)',
    paymentMethod: 'QRIS',
    status: 'Sukses',
    subtotal: 98000,
    tax: 0,
    discount: 0,
    total: 98000,
    amountPaid: 98000,
    change: 0,
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Berry Chiffon Tint
        quantity: 1,
        price: 49000
      },
      {
        product: INITIAL_PRODUCTS[8], // #01 Peach Mochi Tint
        quantity: 1,
        price: 49000
      }
    ]
  }
];

export const SALES_CHART_DATA: ChartDataPoint[] = [
  { day: 'Sen', fullDate: 'Senin, 25 Okt', sales: 3850000, transactions: 52 },
  { day: 'Sel', fullDate: 'Selasa, 26 Okt', sales: 4200000, transactions: 58 },
  { day: 'Rab', fullDate: 'Rabu, 27 Okt', sales: 5100000, transactions: 71 },
  { day: 'Kam', fullDate: 'Kamis, 28 Okt', sales: 4800000, transactions: 65 },
  { day: 'Jum', fullDate: 'Jumat, 29 Okt', sales: 6400000, transactions: 89 },
  { day: 'Sab', fullDate: 'Sabtu, 30 Okt', sales: 8200000, transactions: 124 },
  { day: 'Min', fullDate: 'Minggu, 31 Okt', sales: 7600000, transactions: 112 }
];

export const MONTH_CHART_DATA: ChartDataPoint[] = [
  { day: 'Mgg 1', fullDate: '1-7 Okt', sales: 28400000, transactions: 440 },
  { day: 'Mgg 2', fullDate: '8-14 Okt', sales: 35500000, transactions: 540 },
  { day: 'Mgg 3', fullDate: '15-21 Okt', sales: 41900000, transactions: 650 },
  { day: 'Mgg 4', fullDate: '22-28 Okt', sales: 49200000, transactions: 780 }
];

export const YEAR_CHART_DATA: ChartDataPoint[] = [
  { day: 'Jan', fullDate: 'Januari 2026', sales: 112000000, transactions: 1850 },
  { day: 'Feb', fullDate: 'Februari 2026', sales: 135000000, transactions: 2190 },
  { day: 'Mar', fullDate: 'Maret 2026', sales: 154000000, transactions: 2480 },
  { day: 'Apr', fullDate: 'April 2026', sales: 168000000, transactions: 2750 },
  { day: 'Mei', fullDate: 'Mei 2026', sales: 182000000, transactions: 2980 },
  { day: 'Jun', fullDate: 'Juni 2026', sales: 210000000, transactions: 3450 }
];

export const TOP_PRODUCTS = [
  {
    product: INITIAL_PRODUCTS[1], // #02 Berry Chiffon Tint (Best Seller)
    sold: 482,
    revenue: 482 * 49000
  },
  {
    product: INITIAL_PRODUCTS[0], // Cloud Cushion Moist (Best Seller)
    sold: 395,
    revenue: 395 * 89000
  },
  {
    product: INITIAL_PRODUCTS[2], // Invisible Sun Milk SPF 50+
    sold: 341,
    revenue: 341 * 75000
  },
  {
    product: INITIAL_PRODUCTS[3], // Glass Skin Glow Serum
    sold: 310,
    revenue: 310 * 115000
  },
  {
    product: INITIAL_PRODUCTS[39], // Paket The Ultimate Glow Set
    sold: 188,
    revenue: 188 * 299000
  }
];

export const formatIDR = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatRupiah = formatIDR;
