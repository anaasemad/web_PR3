import { Project, Review } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'stockit',
    title: 'StockIt',
    client: 'Logistics Core Inc.',
    description: 'Implementación integral de un sistema de gestión de almacenes inteligente. Automatización completa mediante Robots Antropomórficos',
    fullDescription: 'StockIt representa la culminación de la logística autónoma. El proyecto consistió en la transformación de un centro de distribución de 15,000m² en un ecosistema totalmente automatizado. Integramos un UR5 sobre un carril movil, coordinado con una base de datos y un sistema de gestión de pedidos para que, de esta forma, el almacenaje y recogida de stock fuese de una forma eficiente y dinámico.',
    image: '/src/assets/images/stockit_ur5_implementation.png',
    tags: ['Cobots', 'UR5', 'Mobile Rail', 'Logística Inteligente'],
    features: [
      'Cobots UR5 de alta precisión sobre eje lineal móvil',
      'Integración síncrona con bases de datos de stock',
      'Visión artificial para identificación de SKU dinámica',
      'Sistema de gestión de pedidos en tiempo real'
    ],
    results: [
      '75% reducción en errores de picking',
      'Optimización del espacio de almacenaje en un 40%',
      'Trazabilidad total punto a punto del stock'
    ]
  },
  {
    id: 'laptop-assembly',
    title: 'Ensamblaje Laptop Avanzado',
    client: 'TechNova Manufacturing',
    description: 'Automatización de la planta de ensamblaje de portátiles con sistema dual para modelos estándar y gaming.',
    fullDescription: 'La línea de TechNova es un hito en la fabricación de portatiles. Diseñamos un sistema de creación de kits individuales y personalizados para cada modelo y su posterior ensamblaje lineal mediante robots antropomórficos. Esto permite una producción mixta sin interrupciones.',
    image: '/src/assets/images/laptop_assembly_1779103444487.png',
    tags: ['Robótica Colaborativa', 'Visión Artificial', 'Multi-model'],
    features: [
      'Células de trabajo con Universal Robots',
      'Visión 3D para control de calidad',
      'Atornillado de precisión con control de torque digital',
      'Testeo térmico automatizado integrado'
    ],
    results: [
      'Capacidad de 1,200 unidades por turno',
      'Reducción de scrap (desperdicio) en un 80%',
      'Flexibilidad para introducir nuevos modelos en semanas, no meses'
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    company: 'Logistics Core Inc.',
    rating: 5,
    comment: 'La implementación de StockIt ha revolucionado nuestra operativa diaria. La precisión es quirúrgica.',
    date: '2024-03-12'
  },
  {
    id: '2',
    name: 'Elena Martínez',
    company: 'TechNova Manufacturing',
    rating: 5,
    comment: 'MARS entendió perfectamente la complejidad de nuestras líneas de portátiles gaming. Un socio tecnológico impecable.',
    date: '2024-04-05'
  },
  {
    id: '3',
    name: 'Javier Sanz',
    company: 'Global Industry Solutions',
    rating: 4,
    comment: 'Líderes en automatización. Su enfoque técnico y soporte post-proyecto son de otro nivel.',
    date: '2024-05-10'
  }
];
