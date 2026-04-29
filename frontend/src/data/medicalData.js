export const medicalProviders = [
  {
    id: 1,
    name: 'Dr. Elena Rostova',
    specialty: 'General Practitioner',
    fullSpecialty: 'General Practice & Travel Medicine Specialist',
    type: 'individual',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    clinicImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    reviews: 128,
    tags: [{ label: 'Top Rated', type: 'success' }],
    languages: 'English, Japanese, Russian',
    languagesList: ['English (Fluent)', 'Spanish'],
    location: 'Central District, Kyoto',
    address: '12-4 Nakagyo Ward, Kyoto, 604-8004, Japan',
    phone: '+81 75-123-4567',
    email: 'info@rostovaclinic.jp',
    price: 45,
    priceFrom: '$85 USD',
    priceUnit: 'visit',
    actionText: 'Book',
    primary: true,
    description: 'Specializing in treating international travelers. Equipped to handle travel-related illnesses, routine check-ups, and emergency prescriptions. Highly rated by solo female travelers for her attentive and secure environment.',
    availability: 'Today, 2:00 PM',
    services: [
      { title: 'Prescription Refills', desc: 'International prescriptions translated and filled.' },
      { title: 'Travel Vaccinations', desc: 'Full suite of recommended local immunizations.' },
      { title: 'Telehealth Consult', desc: 'Remote follow-ups available via secure portal.' },
      { title: 'Accessibility Assured', desc: 'Ground floor access, elevator, and clear signage.' }
    ],
    pricing: [
      { name: 'Standard Consultation', time: '30 mins', cost: '$85.00' },
      { name: 'Urgent Care Visit', time: '45 mins', cost: '$120.00' },
      { name: 'Prescription Translation', time: 'N/A', cost: '$25.00' },
      { name: 'Basic Blood Panel', time: '15 mins', cost: '$60.00' }
    ],
    reviewsData: [
      { name: 'Sarah J.', tag: 'Solo Traveler', time: '2 weeks ago', rating: 5, text: '"Felt incredibly safe and understood. Dr. Rostova speaks perfect English and explained the local medication equivalents clearly."', color: 'bg-amber-500' },
      { name: 'Marcus K.', tag: 'Digital Nomad', time: '1 month ago', rating: 4, text: '"Quick, transparent pricing (no hidden tourist fees), and very professional."', color: 'bg-rose-500' }
    ]
  },
  {
    id: 2,
    name: 'Dr. Marcus Lin',
    specialty: 'Dentist',
    fullSpecialty: 'Advanced Cosmetic & Emergency Dentistry',
    type: 'individual',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop',
    clinicImage: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    reviews: 94,
    tags: [{ label: 'Vetted', type: 'neutral' }],
    languages: 'English, Mandarin, Cantonese',
    languagesList: ['English (Native)', 'Mandarin'],
    location: 'Shimogyo Ward, Kyoto',
    address: '88-2 Karasuma St, Shimogyo Ward, Kyoto, Japan',
    phone: '+81 75-987-6543',
    email: 'contact@smile-studio.jp',
    price: 60,
    priceFrom: '$60 USD',
    priceUnit: 'exam',
    actionText: 'View Profile',
    primary: false,
    description: 'Expert dental care for expats and travelers. We handle everything from sudden toothaches to aesthetic enhancements with state-of-the-art equipment and painless procedures.',
    availability: 'Tomorrow, 10:30 AM',
    services: [
      { title: 'Emergency Repair', desc: 'Fast treatment for broken teeth or lost fillings.' },
      { title: 'Professional Cleaning', desc: 'Deep scaling and polishing for a fresh smile.' },
      { title: 'Dental X-Rays', desc: 'Digital imaging for precise diagnosis.' },
      { title: 'Pain Management', desc: 'Safe and effective local anesthesia options.' }
    ],
    pricing: [
      { name: 'General Checkup', time: '40 mins', cost: '$60.00' },
      { name: 'Emergency Filling', time: '60 mins', cost: '$150.00' },
      { name: 'Teeth Whitening', time: '90 mins', cost: '$300.00' },
      { name: 'Deep Cleaning', time: '45 mins', cost: '$120.00' }
    ],
    reviewsData: [
      { name: 'Jason T.', tag: 'Business Traveler', time: '3 days ago', rating: 5, text: '"Fixed a chipped tooth in less than an hour. Extremely professional and the facility is spotless."', color: 'bg-blue-500' }
    ]
  },
  {
    id: 3,
    name: 'Metro Urgent Care',
    specialty: 'Walk-in Clinic',
    fullSpecialty: '24/7 International Emergency & Walk-in Center',
    type: 'clinic',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    clinicImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7,
    reviews: 210,
    tags: [{ label: 'Vetted', type: 'neutral' }],
    languages: 'English, French, German, Spanish',
    languagesList: ['English', 'French', 'German'],
    location: 'Gion District, Kyoto',
    address: '456 Yamato St, Higashiyama Ward, Kyoto, Japan',
    phone: '+81 75-111-2222',
    email: 'support@metrourgent.jp',
    price: 85,
    priceFrom: '$85 USD',
    priceUnit: 'Base Consultation',
    waitTime: '~ 15 mins',
    actionText: 'Details',
    primary: false,
    description: 'The primary choice for tourists in Kyoto. We offer round-the-clock medical assistance with no prior appointment needed. Multi-lingual staff and direct insurance billing available.',
    availability: 'Open 24/7',
    services: [
      { title: 'Walk-in Triage', desc: 'Immediate assessment by nursing staff.' },
      { title: 'Diagnostic Lab', desc: 'On-site blood work and rapid testing.' },
      { title: 'Pharmacy', desc: 'Instant fulfillment of essential medications.' },
      { title: 'Insurance Support', desc: 'Assistance with international claim forms.' }
    ],
    pricing: [
      { name: 'Consultation Fee', time: 'N/A', cost: '$85.00' },
      { name: 'Rapid Flu Test', time: '15 mins', cost: '$45.00' },
      { name: 'IV Hydration', time: '60 mins', cost: '$110.00' },
      { name: 'Minor Wound Care', time: '30 mins', cost: '$95.00' }
    ],
    reviewsData: [
      { name: 'Emma W.', tag: 'Family Trip', time: '1 week ago', rating: 4, text: '"Longer wait than expected but the care was excellent. They handled our insurance perfectly."', color: 'bg-emerald-500' }
    ]
  },
  {
    id: 4,
    name: 'Dr. Sarah Johnson',
    specialty: 'Pediatrician',
    fullSpecialty: 'Pediatric Care & Adolescent Medicine',
    type: 'individual',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
    clinicImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    reviews: 156,
    tags: [{ label: 'Vetted', type: 'neutral' }],
    languages: 'English, French',
    languagesList: ['English', 'French'],
    location: 'KidsFirst Med, 2.5 miles away',
    address: '22 Sakura Blvd, Nakagyo Ward, Kyoto',
    phone: '+81 75-222-3333',
    email: 'sarah.j@kidsfirst.jp',
    price: 55,
    priceFrom: '$55 USD',
    priceUnit: 'visit',
    actionText: 'Book',
    primary: false,
    description: 'A friendly and warm environment for your little ones. We specialize in pediatric care for traveling families, ensuring your children stay healthy and happy on the road.',
    availability: 'Today, 4:00 PM',
    services: [
      { title: 'Child Wellness', desc: 'Routine check-ups and growth monitoring.' },
      { title: 'Sick Child Visit', desc: 'Same-day appointments for acute illnesses.' },
      { title: 'Vaccinations', desc: 'Up-to-date pediatric immunization schedules.' }
    ],
    pricing: [
      { name: 'Standard Visit', time: '30 mins', cost: '$55.00' },
      { name: 'School Physical', time: '45 mins', cost: '$75.00' }
    ],
    reviewsData: [
      { name: 'Liam P.', tag: 'Traveling Family', time: '5 days ago', rating: 5, text: '"Amazing with kids. My daughter was very comfortable and the treatment was spot on."', color: 'bg-purple-500' }
    ]
  },
  {
    id: 5,
    name: 'City Vision Center',
    specialty: 'Optometrist',
    fullSpecialty: 'Full Service Optometry & Optical Boutique',
    type: 'clinic',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1974&auto=format&fit=crop',
    clinicImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    rating: 4.6,
    reviews: 82,
    tags: [],
    languages: 'English, Spanish',
    languagesList: ['English', 'Spanish'],
    location: 'City Center, Kyoto',
    address: '101 Market St, Kyoto, Japan',
    phone: '+81 75-444-5555',
    email: 'eyes@cityvision.jp',
    price: 40,
    priceFrom: '$40 USD',
    priceUnit: 'Eye Exam',
    waitTime: '~ 10 mins',
    actionText: 'Details',
    primary: false,
    description: 'Comprehensive eye care and fashionable eyewear. Whether you need an emergency contact lens replacement or a full eye exam, we are here to help.',
    availability: 'Open Now',
    services: [
      { title: 'Eye Exam', desc: 'Thorough assessment of vision and eye health.' },
      { title: 'Contact Lenses', desc: 'Fitting and supply of various contact lens types.' },
      { title: 'Glasses Repair', desc: 'Quick fixes for broken frames.' }
    ],
    pricing: [
      { name: 'Basic Eye Exam', time: '20 mins', cost: '$40.00' },
      { name: 'Contact Lens Fit', time: '30 mins', cost: '$60.00' }
    ],
    reviewsData: [
      { name: 'Noah G.', tag: 'Solo Traveler', time: '2 weeks ago', rating: 4, text: '"Got my glasses fixed in 15 minutes. Great service and very friendly staff."', color: 'bg-green-500' }
    ]
  }
];
