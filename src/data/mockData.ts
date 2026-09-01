import { Product, Transaction, ChartDataPoint } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1NK8AcYKnQYrjOsni9H014aEJ3bmFLqAxa11Pvb_yeQnZEXzxgOP-eKU4rMyo5-XpKT_itOfGoTHgB5fxFYgn0KvZWkgvHNqa8QPqSIBeDd68VjfNpNwoK6RjVcL1AcmEwIn5o1DncD9MxnokInW5jKBlpUbYG6jFaAXXzkiJdDMtlZjEFz42_BZpR-Idqainw0D4KnuYKPipPRmo2TeK04g73243scAITrhGe7rV1xj-nmAghTOL',
  profileAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhutcSB9BQe7XImExaqP7IEL7QvFXSvT3INalQICqnFaiN7zk6EvQxToeL4BzPpiAv0nI1GTOq_4GI_AEiiNCYG0MtTRytimCojDk9IrxcalK5TeNlzw6QQq6lkKv-PWfY0pa5mKvpSr5bIgqFFhWi-GLjGg07J6wvvhVYgZlwV7H3wsQ1S2GOTFhP3hGPmLYKiFH8p3JQkSJxcnIJhPWapZxERcLmKWk9QTYvuVm0K1viDcnv_zhe',
  cashierAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0Byr_kgENy1cHkWJlBG7Xe3oTieK0KQGPny3T3MafmG56y8Q2XOOiGLh1HStJ9NCoOq3Ht7pkXkuGLrquwDmhIYihwLq3wk-mn9vfOFzSq67YYX13b4TprSA2RSls9YO3QE_WrNdogooiAB0lItqUBGAJYT1bqWCKG5hXIcaa0iMBSH1b4zci5pvYV0oTvBdoZHb9M2TPsLM5gqvIN9e7cHCnE1preHFtsmlhs4ewgtY--FKoN3jT',
  cappuccino: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9Bwa4FId6NIwNtL27W3LPzcY_goJ7SBv4im2x4NE5SU0-wi0tn935P0ONqdwwZAEcNwPKEp0n0qu106wXCtgoQj8XDxj8NQuSisYX21ZWOjLGv3dF-iDZcIHxpExUjgPGksbqHlS3H52TFmhJNqNeNSMnz5djXpe4R5T4sCu-nEO-K7rNxoW-4vwyR_iMsVTqgoekoe5fW8t9N2-WmRuF19UEy6o_HuhXTXZ5sPMywPGOq3Ljehbj',
  matcha: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS4r42gBvr_Vzrb-BO8m11LlbanDLGWW1HMIPnUFw_NrsfMQewACct2OAhSUZzaluomzyTea7SAztpy1tf0eW-FYWzl-QVkIXtDYWSIbu2HEX3Ncnp0fYOvkzFL7ANUrQTRpJNSwCtj9e7T9nG5iQvaAo0McKEcEoUZXASvHvCfSpgqM_lxcHjEPlBqdJ_JXtdZxRkCMvfqn5oPp1sPuP4cZP5tuCoY9D_NqG3yPzyscr9U3vYgCJ6',
  croissant: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrT8V7xbuqX7DS2KgCtHOLfbOg488pK_10EaE6yORHA7t2z6OwmPh3as3E8cL4KB2af9j6vxA_mkjVzA0zt0SA6zBJarxKe1T5pQf90on86se2KEjUgqhVQ4r85l4Df-Fjsrvcn5j9oX1MGh4m0qKkyMiIGUsTKu-rsdzN13dYhS5IRyzfqqLEGRbBWHWElHs9rgCsMuOcARo2chCAnDrUWolCEXQDlewOntMQK3lfTzArlDyRYc4J',
  kopiGulaAren: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOj4ZTO5-JGWswT6mGE7AvB1yq9-JqA7xGoC5qk28XUUe5aUk7iEtbScWD2lYIPhsJLrQpDO-fqSd9JAKVPrOhcKosQChtHcVZFeWMZPO7IppdEz94fuqATC042kEaZGIDoOdmLZqpjIgtcAH9rv6o17NmuzYMhpKSIONXRrRf3PJBGG7LIvuDdyvJbNIeg-GcwgwwxlElzlSX1njRgtp6O7Z8WJFzXgdobS9SEWYUKBtNiEgSMltZ',
  chocolateCake: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc8FyKlM5gU41KEOEElwRGJ2EwSkqpHSi5QM01NhJuBeosNY2xUHs1Yz6qaUZJmIdQx59lqq3S_PWVPvAGloU4zTXV_aKopDglDPB_bsbeJh1XAAI-GDhSPQGQlcliI2CGioaAzxygOzFw3GbgsbnWJ5I2ZAFP-Ul_Rp3BzFoKuae5aVN5DvlcVwhfeg3cVQ5I38HnzdhouX5aOLjUHnJMkDn_aswIs4Hy88hIatKm9ZfTA7DcJjvx',
  pinkMug: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Xw1aBlSJDrKvzp0uJsAAaO5VU89Y5iWYTRxkbu2oK-xRIXnwiRFmScDbB_nEOzwcTB2xgLicz2RTCQSt-A3vcCXOYcF70FqWhhEGdpT9T4Ne_p4hV4bEjvIqwLBJAnOncXV_vH1Uh5-2Zt8oPsvD1Z1Nclcro6mkI0MpUFST2w72UkyTnA81MSQgyZ8jb0dvIa0VTeeE5GRr10hFzaxo6im4Q_RW4HysYwrJjMrQIbXMs-ZfJi2s',
  notebook: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5cahocRmBxl1Afh-sLyWRoTDGBfZdAxhoGOa60zVsHM_pXO_C2rstCUc4LAbsPSwsIG7lAH2KEW6-6ixP2X1jXTntY6ZqwgEgfV-PUoyPQ9J3F3IFhCi0eJYKgYOv3zWJFYbirzR72ETMI-r8peWly9TD7ZrszdvZlcsbeAjzX361pbo5_VnOg90ZTPsyIzWJxZU_FcyVHDksXK43O02CW5rzqj7rBzHlJ7PAbI16k3qNOLiQ2hSe',
  deskLamp: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTcNgUS1weIgNbZUOK_ze_d8dqwssHUcBGA9-fOgjwQF2MOTmggZm1Qbzx3kkFAwGbHYv_Fmx4zOtAF2AJI66WnrLJo_i07ADOB-z36t4qLNINaf5o8UHPVIljFjJdgbklX9_nR3LCdqzPVGHCrwtJ38t87KzuxJZZkS3NprQV6MSAcKfYgxUju-3BgXIKBvmVvzZvPnhn8KLgHZBLfNr8Fecqc7ElcfdxCUeZsqARNzmxHPi4kE9P'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'KOP-01',
    name: 'Cappuccino Hot',
    category: 'Kopi',
    price: 28000,
    stock: 45,
    image: ASSETS.cappuccino,
    description: 'Kopi espresso dengan susu steamed dan foam tebal yang creamy.'
  },
  {
    id: 'prod-2',
    sku: 'NKO-02',
    name: 'Matcha Latte Iced',
    category: 'Non-Kopi',
    price: 32000,
    stock: 30,
    image: ASSETS.matcha,
    description: 'Bubuk matcha Uji premium dengan susu segar dingin dan pemanis alami.'
  },
  {
    id: 'prod-3',
    sku: 'MAK-01',
    name: 'Butter Croissant',
    category: 'Makanan',
    price: 22000,
    stock: 12,
    image: ASSETS.croissant,
    description: 'Pastry khas Perancis berlapis renyah dengan aroma butter wangi.'
  },
  {
    id: 'prod-4',
    sku: 'KOP-04',
    name: 'Americano Hot',
    category: 'Kopi',
    price: 20000,
    stock: 2,
    image: '',
    description: 'Double shot espresso murni dengan air panas, bold dan kaya rasa.'
  },
  {
    id: 'prod-5',
    sku: 'KSG-001',
    name: 'Kopi Susu Gula Aren',
    category: 'Minuman',
    price: 25000,
    stock: 45,
    image: ASSETS.kopiGulaAren,
    description: 'Espresso robusta & arabica blend dengan susu creamy dan gula aren organik.'
  },
  {
    id: 'prod-6',
    sku: 'FOD-042',
    name: 'Chocolate Cake Slice',
    category: 'Makanan',
    price: 35000,
    stock: 12,
    image: ASSETS.chocolateCake,
    description: 'Kue cokelat moist berlapis ganache dark chocolate Belgia.'
  },
  {
    id: 'prod-7',
    sku: 'SNK-011',
    name: 'Keripik Kentang Original',
    category: 'Snack',
    price: 15000,
    stock: 0,
    image: '',
    description: 'Keripik kentang renyah dengan taburan garam laut alami.'
  },
  {
    id: 'prod-8',
    sku: 'DES-003',
    name: 'Gelato Vanilla',
    category: 'Snack',
    price: 65000,
    stock: 18,
    image: '',
    description: 'Gelato artisan dari biji vanila Madagaskar asli.'
  },
  {
    id: 'prod-9',
    sku: 'MRK-001',
    name: 'Mug Keramik Pink',
    category: 'Merchandise',
    price: 45000,
    stock: 42,
    image: ASSETS.pinkMug,
    description: 'Mug keramik handmade berkapasitas 350ml warna pastel rose.'
  },
  {
    id: 'prod-10',
    sku: 'MRK-002',
    name: 'Notebook Premium',
    category: 'Merchandise',
    price: 120000,
    stock: 38,
    image: ASSETS.notebook,
    description: 'Buku catatan hardcover dengan kertas 100gsm ramah pena tinta.'
  },
  {
    id: 'prod-11',
    sku: 'MRK-003',
    name: 'Lampu Meja Modern',
    category: 'Merchandise',
    price: 250000,
    stock: 25,
    image: ASSETS.deskLamp,
    description: 'Lampu meja LED minimalis dengan 3 mode temperatur cahaya.'
  },
  {
    id: 'prod-12',
    sku: 'KOP-02',
    name: 'Vanilla Latte Iced',
    category: 'Kopi',
    price: 30000,
    stock: 28,
    image: ASSETS.kopiGulaAren,
    description: 'Espresso segar dengan sirup vanila dan susu dingin.'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '#TRX-0842',
    date: '24 Okt 2023',
    time: '14:30 WIB',
    customerName: 'Siti Rahma',
    cashierName: 'Kasir 1',
    paymentMethod: 'QRIS',
    status: 'Sukses',
    subtotal: 150000,
    tax: 15000,
    discount: 15000,
    total: 150000,
    amountPaid: 150000,
    change: 0,
    items: [
      {
        product: INITIAL_PRODUCTS[4], // Kopi Susu Gula Aren
        quantity: 2,
        price: 25000
      },
      {
        product: INITIAL_PRODUCTS[2], // Butter Croissant
        quantity: 1,
        price: 35000
      },
      {
        product: INITIAL_PRODUCTS[7], // Gelato Vanilla
        quantity: 1,
        price: 65000
      }
    ]
  },
  {
    id: '#TRX-0841',
    date: '24 Okt 2023',
    time: '13:15 WIB',
    customerName: 'Bambang Sudiro',
    cashierName: 'Kasir 1',
    paymentMethod: 'Tunai',
    status: 'Sukses',
    subtotal: 45000,
    tax: 0,
    discount: 0,
    total: 45000,
    amountPaid: 50000,
    change: 5000,
    items: [
      {
        product: INITIAL_PRODUCTS[8], // Mug Keramik Pink
        quantity: 1,
        price: 45000
      }
    ]
  },
  {
    id: '#TRX-0840',
    date: '24 Okt 2023',
    time: '11:50 WIB',
    customerName: 'Rendy Pratama',
    cashierName: 'Kasir 2',
    paymentMethod: 'Kartu Debit',
    status: 'Sukses',
    subtotal: 210000,
    tax: 0,
    discount: 0,
    total: 210000,
    amountPaid: 210000,
    change: 0,
    items: [
      {
        product: INITIAL_PRODUCTS[9], // Notebook Premium
        quantity: 1,
        price: 120000
      },
      {
        product: INITIAL_PRODUCTS[0], // Cappuccino Hot
        quantity: 2,
        price: 28000
      },
      {
        product: INITIAL_PRODUCTS[1], // Matcha Latte
        quantity: 1,
        price: 32000
      }
    ]
  },
  {
    id: '#TRX-0839',
    date: '24 Okt 2023',
    time: '10:20 WIB',
    customerName: 'Dina Kusuma',
    cashierName: 'Kasir 1',
    paymentMethod: 'Tunai',
    status: 'Sukses',
    subtotal: 85000,
    tax: 0,
    discount: 0,
    total: 85000,
    amountPaid: 100000,
    change: 15000,
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Cappuccino
        quantity: 1,
        price: 28000
      },
      {
        product: INITIAL_PRODUCTS[2], // Butter Croissant
        quantity: 1,
        price: 22000
      },
      {
        product: INITIAL_PRODUCTS[5], // Chocolate cake
        quantity: 1,
        price: 35000
      }
    ]
  },
  {
    id: '#TRX-0838',
    date: '24 Okt 2023',
    time: '09:05 WIB',
    customerName: 'Hendra Gunawan',
    cashierName: 'Kasir 1',
    paymentMethod: 'QRIS',
    status: 'Sukses',
    subtotal: 320000,
    tax: 0,
    discount: 0,
    total: 320000,
    amountPaid: 320000,
    change: 0,
    items: [
      {
        product: INITIAL_PRODUCTS[10], // Lampu Meja
        quantity: 1,
        price: 250000
      },
      {
        product: INITIAL_PRODUCTS[5], // Chocolate cake
        quantity: 2,
        price: 35000
      }
    ]
  },
  {
    id: '#TRX-0982',
    date: 'Hari Ini',
    time: '10:45 AM',
    customerName: 'Umum (Guest)',
    cashierName: 'Kasir 1',
    paymentMethod: 'QRIS',
    status: 'Sukses',
    subtotal: 165000,
    tax: 0,
    discount: 0,
    total: 165000,
    amountPaid: 165000,
    change: 0,
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 3,
        price: 32000
      },
      {
        product: INITIAL_PRODUCTS[5],
        quantity: 2,
        price: 35000
      }
    ]
  },
  {
    id: '#TRX-0981',
    date: 'Hari Ini',
    time: '10:12 AM',
    customerName: 'Budi Santoso',
    cashierName: 'Kasir 1',
    paymentMethod: 'QRIS',
    status: 'Sukses',
    subtotal: 450000,
    tax: 0,
    discount: 0,
    total: 450000,
    amountPaid: 450000,
    change: 0,
    items: [
      {
        product: INITIAL_PRODUCTS[10],
        quantity: 1,
        price: 250000
      },
      {
        product: INITIAL_PRODUCTS[9],
        quantity: 1,
        price: 120000
      },
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 2,
        price: 28000
      },
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1,
        price: 20000
      }
    ]
  },
  {
    id: '#TRX-0980',
    date: 'Hari Ini',
    time: '09:30 AM',
    customerName: 'Anita Wijaya',
    cashierName: 'Kasir 1',
    paymentMethod: 'Tunai',
    status: 'Tertunda',
    subtotal: 85000,
    tax: 0,
    discount: 0,
    total: 85000,
    amountPaid: 0,
    change: 0,
    items: [
      {
        product: INITIAL_PRODUCTS[4],
        quantity: 2,
        price: 25000
      },
      {
        product: INITIAL_PRODUCTS[5],
        quantity: 1,
        price: 35000
      }
    ]
  }
];

export const SALES_CHART_DATA: ChartDataPoint[] = [
  { day: 'Sen', fullDate: 'Senin, 18 Okt', sales: 2100000, transactions: 65 },
  { day: 'Sel', fullDate: 'Selasa, 19 Okt', sales: 1800000, transactions: 54 },
  { day: 'Rab', fullDate: 'Rabu, 20 Okt', sales: 3200000, transactions: 92 },
  { day: 'Kam', fullDate: 'Kamis, 21 Okt', sales: 2500000, transactions: 78 },
  { day: 'Jum', fullDate: 'Jumat, 22 Okt', sales: 3800000, transactions: 110 },
  { day: 'Sab', fullDate: 'Sabtu, 23 Okt', sales: 4500000, transactions: 135 },
  { day: 'Min', fullDate: 'Minggu, 24 Okt', sales: 4250000, transactions: 128 }
];

export const MONTH_CHART_DATA: ChartDataPoint[] = [
  { day: 'Mgg 1', fullDate: '1-7 Okt', sales: 18400000, transactions: 540 },
  { day: 'Mgg 2', fullDate: '8-14 Okt', sales: 22100000, transactions: 670 },
  { day: 'Mgg 3', fullDate: '15-21 Okt', sales: 25800000, transactions: 780 },
  { day: 'Mgg 4', fullDate: '22-28 Okt', sales: 29500000, transactions: 890 }
];

export const YEAR_CHART_DATA: ChartDataPoint[] = [
  { day: 'Jan', sales: 65000000, transactions: 1950 },
  { day: 'Feb', sales: 72000000, transactions: 2100 },
  { day: 'Mar', sales: 84000000, transactions: 2450 },
  { day: 'Apr', sales: 79000000, transactions: 2300 },
  { day: 'Mei', sales: 91000000, transactions: 2700 },
  { day: 'Jun', sales: 88000000, transactions: 2600 },
  { day: 'Jul', sales: 95000000, transactions: 2850 },
  { day: 'Agu', sales: 104000000, transactions: 3100 },
  { day: 'Sep', sales: 112000000, transactions: 3300 },
  { day: 'Okt', sales: 125000000, transactions: 3750 }
];

export const TOP_PRODUCTS = [
  {
    product: INITIAL_PRODUCTS[8], // Mug Keramik Pink
    sold: 42,
    revenue: 42 * 45000
  },
  {
    product: INITIAL_PRODUCTS[9], // Notebook Premium
    sold: 38,
    revenue: 38 * 120000
  },
  {
    product: INITIAL_PRODUCTS[10], // Lampu Meja Modern
    sold: 25,
    revenue: 25 * 250000
  }
];

export const formatIDR = (amount: number): string => {
  return 'Rp ' + amount.toLocaleString('id-ID');
};
