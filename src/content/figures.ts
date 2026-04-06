export interface Figure {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  layout?: 'inline' | 'outset' | 'full';
}

export const figures: Figure[] = [
  {
    id: 'fig-1',
    src: '/images/figures/fig-1.jpg',
    alt: 'Taddeo di Bartolo, Last Judgment, Collegiata di Santa Maria Assunta, San Gimignano',
    caption:
      'Figure 1. Taddeo di Bartolo, <em>Last Judgment</em>, 1393, fresco, Collegiata di Santa Maria Assunta, San Gimignano.',
    width: 1200,
    height: 900,
    layout: 'full',
  },
  {
    id: 'fig-2',
    src: '/images/figures/fig-2.jpg',
    alt: 'Taddeo di Bartolo, Hell, detail of the Last Judgment',
    caption:
      'Figure 2. Taddeo di Bartolo, <em>Hell</em>, detail of the <em>Last Judgment</em>, 1393, fresco, Collegiata di Santa Maria Assunta, San Gimignano.',
    width: 1200,
    height: 900,
    layout: 'full',
  },
  {
    id: 'fig-3',
    src: '/images/figures/fig-3.jpg',
    alt: 'Map of San Gimignano showing locations of Augustinian and Dominican establishments',
    caption:
      'Figure 3. Map of San Gimignano showing the locations of the principal Augustinian and Dominican establishments.',
    width: 1000,
    height: 800,
    layout: 'outset',
  },
  {
    id: 'fig-4',
    src: '/images/figures/fig-4.jpg',
    alt: 'Taddeo di Bartolo, detail of Lucifer devouring sinners',
    caption:
      'Figure 4. Taddeo di Bartolo, detail of Lucifer devouring sinners, <em>Hell</em>, 1393, fresco, Collegiata di Santa Maria Assunta, San Gimignano.',
    width: 1000,
    height: 800,
    layout: 'inline',
  },
  {
    id: 'fig-5',
    src: '/images/figures/fig-5.jpg',
    alt: 'Corpulent sinner in Taddeo di Bartolo\'s Hell',
    caption:
      'Figure 5. Taddeo di Bartolo, detail of a corpulent sinner, <em>Hell</em>, 1393, fresco, Collegiata di Santa Maria Assunta, San Gimignano.',
    width: 800,
    height: 1000,
    layout: 'inline',
  },
  {
    id: 'fig-6',
    src: '/images/figures/fig-6.jpg',
    alt: 'Detail of gluttonous sinners being force-fed by demons',
    caption:
      'Figure 6. Taddeo di Bartolo, detail of gluttonous sinners being force-fed by demons, <em>Hell</em>, 1393, fresco, Collegiata di Santa Maria Assunta, San Gimignano.',
    width: 1000,
    height: 800,
    layout: 'outset',
  },
  {
    id: 'fig-7',
    src: '/images/figures/fig-7.jpg',
    alt: 'Comparison of corpulent figures in Taddeo di Bartolo\'s fresco',
    caption:
      'Figure 7. Taddeo di Bartolo, comparison of corpulent figures, <em>Hell</em>, 1393, fresco, Collegiata di Santa Maria Assunta, San Gimignano.',
    width: 1200,
    height: 600,
    layout: 'outset',
  },
  {
    id: 'fig-8',
    src: '/images/figures/fig-8.jpg',
    alt: 'Nardo di Cione, Hell, fresco in the Strozzi Chapel, Santa Maria Novella, Florence',
    caption:
      'Figure 8. Nardo di Cione, <em>Hell</em>, c. 1354–57, fresco, Strozzi Chapel, Santa Maria Novella, Florence.',
    width: 1000,
    height: 800,
    layout: 'inline',
  },
  {
    id: 'fig-9',
    src: '/images/figures/fig-9.jpg',
    alt: 'Giovanni di Paolo, Dante and Virgil in Hell, illumination',
    caption:
      'Figure 9. Giovanni di Paolo, <em>Dante and Virgil witnessing the punishment of the gluttons</em>, c. 1444–50, illumination from the <em>Divina Commedia</em>.',
    width: 800,
    height: 1000,
    layout: 'inline',
  },
  {
    id: 'fig-10',
    src: '/images/figures/fig-10.jpg',
    alt: 'Detail of the inscription identifying sins in Taddeo di Bartolo\'s Hell',
    caption:
      'Figure 10. Taddeo di Bartolo, detail of inscription identifying sins, <em>Hell</em>, 1393, fresco, Collegiata di Santa Maria Assunta, San Gimignano.',
    width: 1000,
    height: 600,
    layout: 'inline',
  },
  {
    id: 'fig-11',
    src: '/images/figures/fig-11.jpg',
    alt: 'Dominican friar depicted among the damned in Taddeo di Bartolo\'s Hell',
    caption:
      'Figure 11. Taddeo di Bartolo, detail of a Dominican friar among the damned, <em>Hell</em>, 1393, fresco, Collegiata di Santa Maria Assunta, San Gimignano.',
    width: 800,
    height: 1000,
    layout: 'inline',
  },
  {
    id: 'fig-12',
    src: '/images/figures/fig-12.jpg',
    alt: 'Taddeo di Bartolo, detail of the punishment of gluttony with corpulent sinners',
    caption:
      'Figure 12. Taddeo di Bartolo, detail of the punishment of gluttony showing corpulent sinners and demons, <em>Hell</em>, 1393, fresco, Collegiata di Santa Maria Assunta, San Gimignano.',
    width: 1200,
    height: 800,
    layout: 'outset',
  },
];
