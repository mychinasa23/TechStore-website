const products = [
    {
        id: 1, 
        name: 'Portable Bluetooth Speaker',
        price: 129.99,
        rating: 3.5, 
        reviewCount: 327,
        category: 'Audio',
        image: 'images/speaker.jpeg',
        description: 'Take your music anywhere with this powerful portable speaker. Delivers rich, immersive sound with deep bass. Waterproof design perfect for outdoor adventures and pool parties.',
        keyHighlights: [
            { label: 'Output Power:', value: '20W' },
            { label: 'Battery Life:', value: '15 hours' },
            { label: 'Water Rating:', value: 'IPX7' }
        ],
        specifications: {
            'Output Power': '20W',
            'Battery Life': '15 hours',
            'Water Rating': 'IPX7',
            'Bluetooth': '5.2',
            'Range': '30 meters',
            'Charging': 'USB-C'
        },
        gallery: ['images/speaker.jpeg', 'images/speaker.jpeg', 'images/speaker.jpeg']
    },

    {
        id: 2, 
        name: 'Premium Wireless Headphones',
        price: 299.99,
        rating: 5, 
        reviewCount: 327,
        category: 'Audio',
        image: 'images/wireless.jpeg',
        description: 'Experience immersive audio with our premium wireless headphones. Featuring advanced noise cancellation, 40-hour battery life, and studio-quality sound. Perfect for music enthusiasts and professionals who demand the best audio experience.',
        keyHighlights: [
            { label: 'Battery Life:', value: '40 hours' },
            { label: 'Connectivity:', value: 'Bluetooth 5.3' },
            { label: 'Noise Cancellation:', value: 'Active ANC' }
        ],
        specifications: {
            'Battery Life': '40 hours',
            'Connectivity': 'Bluetooth 5.3',
            'Noise Cancellation': 'Active ANC',
            'Driver Size': '40mm',
            'Weight': '250g',
            'Charging Time': '2 hours'
        },
        gallery: ['images/wireless.jpeg', 'images/wireless.jpeg', 'images/wireless.jpeg']
    },

    {
        id: 3, 
        name: 'Professional DSLR Camera',
        price: 2499.99,
        rating: 5, 
        reviewCount: 327,
        category: 'Photography',
        image: 'images/camera.jpeg',
        description: 'Capture stunning images with this professional-grade DSLR camera. Features a full-frame sensor, 4K video recording, and exceptional low-light performance. Perfect for serious photographers and videographers.',
        keyHighlights: [
            { label: 'Sensor:', value: '45MP Full-Frame' },
            { label: 'Video:', value: '4K 60fps' },
            { label: 'ISO Range:', value: '100-51200' }
        ],
        specifications: {
            'Sensor': '45MP Full-Frame',
            'Video': '4K 60fps',
            'ISO Range': '100-51200',
            'Autofocus Points': '693',
            'Burst Speed': '10 fps',
            'Display': '3.2" Tilting Touchscreen'
        },
        gallery: ['images/camera.jpeg', 'images/camera.jpeg', 'images/camera.jpeg']
    },

    {
        id: 4, 
        name: 'Professional Laptop Pro',
        price: 1899.99,
        rating: 4.5, 
        reviewCount: 327,
        category: 'Computers',
        image: 'images/laptop.jpeg',
        description: 'Powerful performance meets sleek design in this professional laptop. Equipped with the latest processor, stunning display, and all-day battery life. Ideal for creative professionals and power users.',
        keyHighlights: [
            { label: 'Processor:', value: 'Intel Core i9' },
            { label: 'RAM:', value: '32GB DDR5' },
            { label: 'Storage:', value: '1TB SSD' }
        ],
        specifications: {
            'Processor': 'Intel Core i9',
            'RAM': '32GB DDR5',
            'Storage': '1TB SSD',
            'Display': '15.6" 4K OLED',
            'Graphics': 'NVIDIA RTX 4060',
            'Battery': '12 hours'
        },
        gallery: ['images/laptop.jpeg', 'images/laptop.jpeg', 'images/laptop.jpeg']
    },

    {
        id: 5, 
        name: 'Smart Fitness Watch Ultra',
        price: 449.99,
        rating: 4, 
        reviewCount: 327,
        category: 'Wearables',
        image: 'images/watch.jpeg',
        description: 'Track your fitness goals with precision and style. Features advanced health monitoring, GPS tracking, and a vibrant always-on display. Water-resistant and built for active lifestyles.',
        keyHighlights: [
            { label: 'Display:', value: '1.9" AMOLED' },
            { label: 'Battery Life:', value: '7 days' },
            { label: 'Water Resistance:', value: '50m' }
        ],
        specifications: {
            'Display': '1.9" AMOLED',
            'Battery Life': '7 days',
            'Water Resistance': '50m',
            'GPS': 'Built-in',
            'Heart Rate Monitor': 'Continuous',
            'Charging': 'Magnetic USB'
        },
        gallery: ['images/watch.jpeg', 'images/watch.jpeg', 'images/watch.jpeg']
    },

    {
        id: 6, 
        name: 'Ultra-Thin Tablet Pro',
        price: 799.99,
        rating: 4.5, 
        reviewCount: 327,
        category: 'Tablets',
        image: 'images/tablet.jpeg',
        description: 'Experience productivity and entertainment on a stunning display. This ultra-thin tablet features powerful performance, all-day battery, and support for stylus input. Perfect for work and play.',
        keyHighlights: [
            { label: 'Display:', value: '12.9" Liquid Retina' },
            { label: 'Processor:', value: 'M2 Chip' },
            { label: 'Storage:', value: '256GB' }
        ],
        specifications: {
            'Display': '12.9" Liquid Retina',
            'Processor': 'M2 Chip',
            'Storage': '256GB',
            'RAM': '8GB',
            'Battery': '10 hours',
            'Stylus Support': 'Yes'
        },
        gallery: ['images/tablet.jpeg', 'images/tablet.jpeg', 'images/tablet.jpeg']
    },

    {
        "id": 7,
        "name": "Sony Wireless Headphones",
        "price": 399.99,
        "rating": 4.5,
        "reviewCount": 12450,
        "category": "Audio",
        "image": "images/sony.jpeg",
        "description": "Industry-leading noise cancellation with Auto NC Optimizer. 30-hour battery life, crystal-clear hands-free calling, and LDAC for high-resolution audio. Perfect for travel and daily use.",
        "keyHighlights": [
            { "label": "Noise Cancellation:", "value": "Industry-leading" },
            { "label": "Battery Life:", "value": "30 hours" },
            { "label": "Charging:", "value": "USB-C, 3 min = 3 hours" }
        ],
        "specifications": {
            "Driver Size": "30mm carbon fiber",
            "Bluetooth": "5.3",
            "Codecs": "LDAC, AAC, SBC",
            "Weight": "250g",
            "Foldable": "Yes"
        },
        "gallery": ["images/sony.jpeg", "images/sony.jpeg", "images/sony.jpeg"]
    },

    {
        "id": 8,
        "name": "JBL Boombox 3",
        "price": 499.99,
        "rating": 4.5,
        "reviewCount": 8320,
        "category": "Audio",
        "image": "images/jbl.jpeg",
        "description": "Monstrous portable speaker with deep bass, 24 hours of playtime, and IP67 waterproof rating. Perfect for parties, beach, and outdoor adventures.",
        "keyHighlights": [
            { "label": "Power:", "value": "80W RMS" },
            { "label": "Battery:", "value": "24 hours" },
            { "label": "Waterproof:", "value": "IP67" }
        ],
        "specifications": {
            "Drivers": "2x 80mm woofers, 2x tweeters",
            "Bluetooth": "5.3",
            "Charging": "USB-C + power bank mode",
            "Weight": "6.7 kg",
            "App": "JBL Portable"
        },
        "gallery": ["images/jbl.jpeg", "images/jbl.jpeg", "images/jbl.jpeg"]
    }, 

    {
        "id": 9,
        "name": "MacBook Air 13",
        "price": 1099.99,
        "rating": 5,
        "reviewCount": 18450,
        "category": "Computers",
        "image": "images/macbook.jpeg",
        "description": "Ultra-thin laptop with M2 chip, 13.6\" Liquid Retina display, and all-day battery life. Silent, powerful, and built for productivity.",
        "keyHighlights": [
            { "label": "Chip:", "value": "Apple M2" },
            { "label": "RAM:", "value": "8GB unified" },
            { "label": "Storage:", "value": "256GB SSD" }
        ],
        "specifications": {
            "Display": "13.6\" Liquid Retina",
            "Weight": "1.24 kg",
            "Battery": "Up to 18 hours",
            "Ports": "2x USB-C, MagSafe 3",
            "Camera": "1080p"
        },
        "gallery": ["images/macbook.jpeg", "images/macbook.jpeg", "images/macbook.jpeg"]
    }, 

    {
        "id": 10,
        "name": "GoPro HERO12",
        "price": 399.99,
        "rating": 4.5,
        "reviewCount": 15200,
        "category": "Photography",
        "image": "images/gopro.jpeg",
        "description": "Ultimate action camera with 5.3K video, HyperSmooth 6.0 stabilization, and waterproof up to 10m. Perfect for adventure and sports.",
        "keyHighlights": [
            { "label": "Video:", "value": "5.3K60" },
            { "label": "Photo:", "value": "27MP" },
            { "label": "Waterproof:", "value": "10m" }
        ],
        "specifications": {
            "Stabilization": "HyperSmooth 6.0",
            "Battery": "1720 mAh",
            "Screen": "2.27\" touch rear",
            "Weight": "154g",
            "Mount": "Built-in folding fingers"
        },
        "gallery": ["images/gopro.jpeg", "images/gopro.jpeg", "images/gopro.jpeg"]
    },

    {
        "id": 11,
        "name": "Samsung Watch 6",
        "price": 329.99,
        "rating": 4.5,
        "reviewCount": 18700,
        "category": "Wearables",
        "image": "images/samsung_watch.jpeg",
        "description": "Premium smartwatch with sapphire crystal glass, rotating bezel, and advanced sleep tracking. Works with Android and iOS.",
        "keyHighlights": [
            { "label": "Screen:", "value": "1.5\" Super AMOLED" },
            { "label": "Battery:", "value": "40 hours" },
            { "label": "Material:", "value": "Sapphire crystal" }
        ],
        "specifications": {
            "GPS": "Built-in",
            "Health": "BP, ECG, Sleep",
            "Water": "5 ATM + IP68",
            "Weight": "52g",
            "Charging": "Fast wireless"
        },
        "gallery": ["images/samsung_watch.jpeg", "images/samsung_watch.jpeg", "images/samsung_watch.jpeg"]
    }
]