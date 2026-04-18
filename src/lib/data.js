export const categories = [
  { id: 'ninera', name: 'Niñera', icon: '👶', description: 'Cuidado de niños y bebés por horas' },
  { id: 'plomero', name: 'Plomero', icon: '🔧', description: 'Reparación de tuberías y filtraciones' },
  { id: 'carpintero', name: 'Carpintero', icon: '🪚', description: 'Muebles, puertas y arreglos de madera' },
  { id: 'cerrajero', name: 'Cerrajero', icon: '🔑', description: 'Apertura de puertas y cambio de chapas' },
  { id: 'electricista', name: 'Electricista', icon: '⚡', description: 'Instalaciones y arreglos eléctricos' },
  { id: 'paseador', name: 'Paseador de perros', icon: '🐕', description: 'Paseos diarios y cuidado de mascotas' },
  { id: 'limpieza', name: 'Limpieza', icon: '🧹', description: 'Aseo de casas, oficinas y profunda' },
  { id: 'ayudante', name: 'Ayudante General', icon: '💪', description: 'Ayuda con mudanzas, cargar peso, etc.' },
  { id: 'jardinero', name: 'Jardinero', icon: '🪴', description: 'Mantenimiento de jardines y poda' },
  { id: 'mesero', name: 'Mesero / Barman', icon: '🍽️', description: 'Atención para eventos y fiestas' }
];

export const mockWorkers = [
  {
    id: 'w1',
    name: 'Carlos Mendoza',
    categoryId: 'plomero',
    isOnline: true,
    rating: 4.8,
    reviewsCount: 124,
    completedJobs: 340,
    pricePerHour: 15,
    bio: 'Más de 10 años de experiencia arreglando tuberías de todo tipo. Rápido y limpio.',
    recentReviews: [
      { author: 'María', rating: 5, text: 'Llegó en 15 minutos y arregló la fuga rapidísimo.' },
      { author: 'Juan P.', rating: 4, text: 'Buen trabajo, un poco caro pero valió la pena.' }
    ]
  },
  {
    id: 'w2',
    name: 'Ana Sofia',
    categoryId: 'ninera',
    isOnline: true,
    rating: 5.0,
    reviewsCount: 89,
    completedJobs: 150,
    pricePerHour: 12,
    bio: 'Estudiante de pedagogía, me encantan los niños. Cuento con curso de primeros auxilios.',
    recentReviews: [
      { author: 'Lucía', rating: 5, text: 'Mis hijos la adoran. Muy responsable.' }
    ]
  },
  {
    id: 'w3',
    name: 'Roberto Gómez',
    categoryId: 'electricista',
    isOnline: false,
    rating: 4.6,
    reviewsCount: 56,
    completedJobs: 110,
    pricePerHour: 18,
    bio: 'Especialista en cortocircuitos y nuevas instalaciones.',
    recentReviews: [
      { author: 'Diego', rating: 5, text: 'Me salvó, se había ido la luz en toda la casa.' }
    ]
  },
  {
    id: 'w4',
    name: 'Luisa Fernanda',
    categoryId: 'limpieza',
    isOnline: true,
    rating: 4.9,
    reviewsCount: 210,
    completedJobs: 450,
    pricePerHour: 10,
    bio: 'Detallista y puntual. Llevo mis propios productos si es necesario.',
    recentReviews: [
      { author: 'Pedro', rating: 5, text: 'La casa quedó impecable.' },
      { author: 'Carmen', rating: 5, text: 'Muy confiable y trabajadora.' }
    ]
  },
  {
    id: 'w5',
    name: 'Javier',
    categoryId: 'paseador',
    isOnline: true,
    rating: 4.7,
    reviewsCount: 34,
    completedJobs: 80,
    pricePerHour: 8,
    bio: 'Corredor aficionado, tu perro volverá cansado y feliz.',
    recentReviews: [
      { author: 'Sofía', rating: 4, text: 'A mi perro le cae muy bien.' }
    ]
  }
];
