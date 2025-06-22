const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const products = [
  {
    name: "iPhone 15 Pro Max",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    price: 1199.99,
    originalPrice: 1299.99,
    category: "Electronics",
    brand: "Apple",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    ],
    stock: 50,
    rating: 4.8,
    numReviews: 125,
    features: ["A17 Pro chip", "Titanium design", "48MP camera", "USB-C"],
    specifications: {
      "Screen Size": "6.7 inches",
      "Storage": "256GB",
      "Color": "Natural Titanium",
      "Battery": "4441mAh"
    },
    isFeatured: true,
    discount: 8,
    tags: ["smartphone", "apple", "iphone", "5g"],
    shippingWeight: 0.221,
    dimensions: { length: 6.29, width: 3.02, height: 0.32 }
  },
  {
    name: "Samsung 65\" QLED 4K Smart TV",
    description: "Quantum dot technology with HDR and smart features",
    price: 1299.99,
    originalPrice: 1499.99,
    category: "Electronics",
    brand: "Samsung",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500"
    ],
    stock: 25,
    rating: 4.6,
    numReviews: 89,
    features: ["4K Resolution", "QLED Technology", "HDR", "Smart TV"],
    specifications: {
      "Screen Size": "65 inches",
      "Resolution": "4K Ultra HD",
      "Refresh Rate": "120Hz",
      "Smart Platform": "Tizen"
    },
    isFeatured: true,
    discount: 13,
    tags: ["tv", "samsung", "4k", "smart"],
    shippingWeight: 45.2,
    dimensions: { length: 57.1, width: 32.7, height: 2.4 }
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max technology",
    price: 129.99,
    originalPrice: 150.00,
    category: "Clothing",
    brand: "Nike",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    ],
    stock: 100,
    rating: 4.5,
    numReviews: 234,
    features: ["Air Max technology", "Breathable mesh", "Cushioned sole"],
    specifications: {
      "Material": "Mesh and synthetic",
      "Sole": "Rubber",
      "Closure": "Lace-up",
      "Style": "Running"
    },
    discount: 13,
    tags: ["shoes", "nike", "running", "sports"],
    shippingWeight: 1.2,
    dimensions: { length: 12, width: 4, height: 6 }
  },
  {
    name: "The Great Gatsby",
    description: "Classic American novel by F. Scott Fitzgerald",
    price: 12.99,
    originalPrice: 15.99,
    category: "Books",
    brand: "Scribner",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
    ],
    stock: 200,
    rating: 4.7,
    numReviews: 567,
    features: ["Paperback", "Classic literature", "1920s setting"],
    specifications: {
      "Pages": "180",
      "Language": "English",
      "ISBN": "978-0743273565",
      "Publisher": "Scribner"
    },
    discount: 19,
    tags: ["book", "classic", "fiction", "literature"],
    shippingWeight: 0.5,
    dimensions: { length: 8, width: 5.5, height: 0.8 }
  },
  {
    name: "KitchenAid Stand Mixer",
    description: "Professional stand mixer for baking and cooking",
    price: 399.99,
    originalPrice: 449.99,
    category: "Home & Garden",
    brand: "KitchenAid",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"
    ],
    stock: 30,
    rating: 4.9,
    numReviews: 156,
    features: ["5-quart bowl", "10 speeds", "Planetary mixing", "Attachments included"],
    specifications: {
      "Power": "325W",
      "Bowl Capacity": "5 quarts",
      "Speeds": "10",
      "Color": "Empire Red"
    },
    isFeatured: true,
    discount: 11,
    tags: ["kitchen", "mixer", "baking", "appliance"],
    shippingWeight: 12.5,
    dimensions: { length: 14.5, width: 8.5, height: 15.5 }
  },
  {
    name: "Wilson Tennis Racket",
    description: "Professional tennis racket for advanced players",
    price: 89.99,
    originalPrice: 120.00,
    category: "Sports",
    brand: "Wilson",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500"
    ],
    stock: 75,
    rating: 4.4,
    numReviews: 98,
    features: ["Graphite frame", "Synthetic strings", "Grip included"],
    specifications: {
      "Head Size": "100 sq inches",
      "Weight": "300g",
      "String Pattern": "16x19",
      "Grip Size": "4 3/8"
    },
    discount: 25,
    tags: ["tennis", "racket", "sports", "wilson"],
    shippingWeight: 0.8,
    dimensions: { length: 27, width: 10, height: 1 }
  },
  {
    name: "L'Oreal Paris Foundation",
    description: "Long-lasting foundation with natural finish",
    price: 24.99,
    originalPrice: 29.99,
    category: "Beauty",
    brand: "L'Oreal",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500"
    ],
    stock: 150,
    rating: 4.3,
    numReviews: 342,
    features: ["24-hour wear", "Oil-free", "SPF 17", "Natural finish"],
    specifications: {
      "Volume": "30ml",
      "Coverage": "Medium to full",
      "Finish": "Natural",
      "SPF": "17"
    },
    discount: 17,
    tags: ["makeup", "foundation", "beauty", "loreal"],
    shippingWeight: 0.2,
    dimensions: { length: 2, width: 1, height: 4 }
  },
  {
    name: "LEGO Star Wars Millennium Falcon",
    description: "Iconic Star Wars spaceship building set",
    price: 159.99,
    originalPrice: 179.99,
    category: "Toys",
    brand: "LEGO",
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500"
    ],
    stock: 40,
    rating: 4.8,
    numReviews: 203,
    features: ["1,329 pieces", "Minifigures included", "Display stand"],
    specifications: {
      "Pieces": "1,329",
      "Age Range": "9+",
      "Dimensions": "19 x 13 x 3 inches",
      "Minifigures": "7"
    },
    isFeatured: true,
    discount: 11,
    tags: ["lego", "star wars", "toy", "building"],
    shippingWeight: 3.2,
    dimensions: { length: 19, width: 13, height: 3 }
  },
  {
    name: "Car Dashboard Camera",
    description: "HD dash cam with night vision and GPS",
    price: 89.99,
    originalPrice: 129.99,
    category: "Automotive",
    brand: "Garmin",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
    ],
    stock: 60,
    rating: 4.6,
    numReviews: 178,
    features: ["1080p HD", "Night vision", "GPS", "Loop recording"],
    specifications: {
      "Resolution": "1080p HD",
      "Field of View": "140°",
      "Storage": "Up to 64GB",
      "Battery": "Built-in"
    },
    discount: 31,
    tags: ["dash cam", "camera", "automotive", "safety"],
    shippingWeight: 0.3,
    dimensions: { length: 2.5, width: 1.5, height: 1.2 }
  },
  {
    name: "Vitamix Blender",
    description: "Professional blender for smoothies and food processing",
    price: 449.99,
    originalPrice: 499.99,
    category: "Home & Garden",
    brand: "Vitamix",
    images: [
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500",
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500",
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500"
    ],
    stock: 20,
    rating: 4.9,
    numReviews: 234,
    features: ["2.2 HP motor", "10 variable speeds", "64-ounce container"],
    specifications: {
      "Power": "2.2 HP",
      "Container": "64 oz",
      "Speeds": "10 variable",
      "Warranty": "7 years"
    },
    discount: 10,
    tags: ["blender", "kitchen", "smoothie", "appliance"],
    shippingWeight: 8.5,
    dimensions: { length: 8.5, width: 7.5, height: 17.5 }
  },
  {
    name: "Adidas Ultraboost Running Shoes",
    description: "Premium running shoes with Boost technology",
    price: 179.99,
    originalPrice: 220.00,
    category: "Clothing",
    brand: "Adidas",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    ],
    stock: 80,
    rating: 4.7,
    numReviews: 189,
    features: ["Boost midsole", "Primeknit upper", "Continental rubber"],
    specifications: {
      "Weight": "310g",
      "Drop": "10mm",
      "Type": "Neutral",
      "Surface": "Road"
    },
    discount: 18,
    tags: ["running", "shoes", "adidas", "sports"],
    shippingWeight: 1.1,
    dimensions: { length: 12, width: 4, height: 6 }
  },
  {
    name: "MacBook Air M2",
    description: "Lightweight laptop with Apple M2 chip",
    price: 1199.99,
    originalPrice: 1299.99,
    category: "Electronics",
    brand: "Apple",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"
    ],
    stock: 35,
    rating: 4.8,
    numReviews: 156,
    features: ["M2 chip", "13.6-inch display", "18-hour battery"],
    specifications: {
      "Processor": "Apple M2",
      "Memory": "8GB",
      "Storage": "256GB SSD",
      "Display": "13.6-inch"
    },
    isFeatured: true,
    discount: 8,
    tags: ["laptop", "macbook", "apple", "computer"],
    shippingWeight: 2.7,
    dimensions: { length: 11.97, width: 8.46, height: 0.44 }
  },
  {
    name: "Harry Potter Complete Collection",
    description: "All 7 Harry Potter books in a beautiful box set",
    price: 89.99,
    originalPrice: 120.00,
    category: "Books",
    brand: "Scholastic",
    images: [
      "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?w=500",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
      "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?w=500"
    ],
    stock: 45,
    rating: 4.9,
    numReviews: 456,
    features: ["Complete series", "Hardcover", "Collector's edition"],
    specifications: {
      "Books": "7",
      "Format": "Hardcover",
      "Pages": "4,100+",
      "Box Set": "Yes"
    },
    discount: 25,
    tags: ["harry potter", "books", "fantasy", "collection"],
    shippingWeight: 8.5,
    dimensions: { length: 9, width: 6, height: 8 }
  },
  {
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with alignment lines",
    price: 49.99,
    originalPrice: 69.99,
    category: "Sports",
    brand: "Lululemon",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"
    ],
    stock: 120,
    rating: 4.5,
    numReviews: 234,
    features: ["Non-slip surface", "Alignment lines", "Eco-friendly"],
    specifications: {
      "Length": "72 inches",
      "Width": "24 inches",
      "Thickness": "5mm",
      "Material": "PVC-free"
    },
    discount: 29,
    tags: ["yoga", "mat", "fitness", "exercise"],
    shippingWeight: 2.5,
    dimensions: { length: 72, width: 24, height: 0.2 }
  },
  {
    name: "Dyson V15 Detect Vacuum",
    description: "Cordless vacuum with laser technology",
    price: 699.99,
    originalPrice: 799.99,
    category: "Home & Garden",
    brand: "Dyson",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
    ],
    stock: 25,
    rating: 4.7,
    numReviews: 167,
    features: ["Laser technology", "60-minute runtime", "HEPA filtration"],
    specifications: {
      "Runtime": "60 minutes",
      "Suction": "240 AW",
      "Filter": "HEPA",
      "Weight": "6.8 lbs"
    },
    discount: 13,
    tags: ["vacuum", "dyson", "cleaning", "cordless"],
    shippingWeight: 6.8,
    dimensions: { length: 10, width: 10, height: 49 }
  },
  {
    name: "Sony WH-1000XM4 Headphones",
    description: "Wireless noise-canceling headphones",
    price: 349.99,
    originalPrice: 399.99,
    category: "Electronics",
    brand: "Sony",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    ],
    stock: 40,
    rating: 4.8,
    numReviews: 298,
    features: ["Noise canceling", "30-hour battery", "Touch controls"],
    specifications: {
      "Battery": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "254g",
      "Driver": "40mm"
    },
    isFeatured: true,
    discount: 13,
    tags: ["headphones", "sony", "wireless", "audio"],
    shippingWeight: 0.6,
    dimensions: { length: 7.3, width: 3.0, height: 10.0 }
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "7-in-1 electric pressure cooker",
    price: 89.99,
    originalPrice: 119.99,
    category: "Home & Garden",
    brand: "Instant Pot",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"
    ],
    stock: 65,
    rating: 4.6,
    numReviews: 445,
    features: ["7 functions", "6-quart capacity", "Safety features"],
    specifications: {
      "Capacity": "6 quarts",
      "Functions": "7",
      "Power": "1000W",
      "Material": "Stainless steel"
    },
    discount: 25,
    tags: ["pressure cooker", "instant pot", "cooking", "appliance"],
    shippingWeight: 11.8,
    dimensions: { length: 13.4, width: 12.2, height: 12.5 }
  },
  {
    name: "Nintendo Switch OLED",
    description: "Gaming console with OLED screen",
    price: 349.99,
    originalPrice: 399.99,
    category: "Electronics",
    brand: "Nintendo",
    images: [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500",
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500",
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500"
    ],
    stock: 30,
    rating: 4.7,
    numReviews: 234,
    features: ["7-inch OLED screen", "64GB storage", "Joy-Con controllers"],
    specifications: {
      "Screen": "7-inch OLED",
      "Storage": "64GB",
      "Battery": "4.5-9 hours",
      "Resolution": "720p handheld"
    },
    discount: 13,
    tags: ["nintendo", "switch", "gaming", "console"],
    shippingWeight: 0.71,
    dimensions: { length: 9.5, width: 0.55, height: 4 }
  },
  {
    name: "Organic Green Tea",
    description: "Premium organic green tea leaves",
    price: 19.99,
    originalPrice: 24.99,
    category: "Food",
    brand: "Twinings",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"
    ],
    stock: 200,
    rating: 4.4,
    numReviews: 178,
    features: ["Organic", "Antioxidants", "Caffeine-free option"],
    specifications: {
      "Weight": "100g",
      "Type": "Green tea",
      "Origin": "Japan",
      "Organic": "Yes"
    },
    discount: 20,
    tags: ["tea", "green tea", "organic", "beverage"],
    shippingWeight: 0.3,
    dimensions: { length: 4, width: 2, height: 6 }
  },
  {
    name: "Canon EOS R5 Camera",
    description: "Professional mirrorless camera with 8K video",
    price: 3899.99,
    originalPrice: 4299.99,
    category: "Electronics",
    brand: "Canon",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    ],
    stock: 15,
    rating: 4.9,
    numReviews: 89,
    features: ["45MP sensor", "8K video", "Dual card slots", "Weather sealed"],
    specifications: {
      "Sensor": "45MP Full-frame",
      "Video": "8K RAW",
      "Autofocus": "1053 points",
      "Battery": "490 shots"
    },
    isFeatured: true,
    discount: 9,
    tags: ["camera", "canon", "mirrorless", "photography"],
    shippingWeight: 1.6,
    dimensions: { length: 5.4, width: 3.8, height: 3.5 }
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight leg jeans in authentic denim",
    price: 79.99,
    originalPrice: 99.99,
    category: "Clothing",
    brand: "Levi's",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
    ],
    stock: 150,
    rating: 4.6,
    numReviews: 567,
    features: ["100% cotton", "Straight leg", "Classic fit", "Authentic denim"],
    specifications: {
      "Material": "100% Cotton",
      "Fit": "Straight leg",
      "Rise": "Mid-rise",
      "Wash": "Medium wash"
    },
    discount: 20,
    tags: ["jeans", "levis", "denim", "clothing"],
    shippingWeight: 0.8,
    dimensions: { length: 12, width: 8, height: 1 }
  },
  {
    name: "Starbucks Coffee Beans",
    description: "Premium Arabica coffee beans for home brewing",
    price: 14.99,
    originalPrice: 18.99,
    category: "Food",
    brand: "Starbucks",
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"
    ],
    stock: 300,
    rating: 4.5,
    numReviews: 234,
    features: ["Arabica beans", "Medium roast", "Freshly roasted", "1lb bag"],
    specifications: {
      "Weight": "1lb",
      "Roast": "Medium",
      "Origin": "Latin America",
      "Type": "Arabica"
    },
    discount: 21,
    tags: ["coffee", "beans", "starbucks", "beverage"],
    shippingWeight: 1.1,
    dimensions: { length: 6, width: 4, height: 8 }
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Create admin user
   const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }

};
seedDatabase(); 