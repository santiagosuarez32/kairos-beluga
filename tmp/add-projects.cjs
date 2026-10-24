const fs = require('fs');
const file = 'lib/projects.ts';
const source = fs.readFileSync(file, 'utf8');
const projects = JSON.parse(source.slice(source.indexOf('['), source.indexOf('];') + 1));
const additions = [
  { name: 'Caramel Store', slug: 'caramel-store', category: 'Góndola', location: 'Shopping Unicenter', surface: '12 m²', phases: ['Obra terminada', 'Montaje', 'Construcción', 'Construcción'], description: 'Góndola comercial con mobiliario a medida, revestimientos personalizados, iluminación integrada y exhibidores para golosinas, bebidas y productos de merchandising.' },
  { name: 'Zero Gluten', slug: 'zero-gluten', category: 'Local gastronómico', location: 'Río Gallegos', surface: '100 m²', phases: ['Obra terminada', 'Interior', 'Interior', 'Detalle', 'Construcción', 'Estado previo'], description: 'Local gastronómico con fachada intervenida, marquesina y gráfica corpórea. Interiorismo a medida con mobiliario personalizado, exhibidores, heladera circular, elementos en impresión 3D, detalles en herrería, iluminación cálida y revestimientos decorativos.' },
  { name: 'Moon Bell', slug: 'moon-bell', category: 'Local comercial', location: 'Río Gallegos', surface: '36 m²', phases: ['Obra terminada', 'Interior', 'Interior', 'Construcción'], description: 'Local comercial estilo neoclásico/contemporáneo: fachada blanca, techos a dos aguas oscuros, zócalos de madera, amplios ventanales e iluminación cálida LED focalizada.' },
  { name: 'Kiosco XD', slug: 'kiosco-xd', category: 'Local comercial', location: 'Río Gallegos', surface: '53 m²', phases: ['Obra terminada', 'Montaje', 'Interior', 'Detalle'], description: 'Local comercial con fachada temática, estructura curva, iluminación LED integrada, gráfica corpórea y mobiliario a medida para exhibición de productos y atención al público.' },
];
for (const item of additions) {
 const images = item.phases.map((_, i) => `/projects-hq/${item.slug}/${String(i + 1).padStart(2, '0')}-hq.jpg`);
 projects.push({ number: String(projects.length + 1).padStart(2, '0'), name: item.name, brands: item.name, category: item.category, location: item.location, year: '', surface: item.surface, contractor: '', image: images[0], images, phases: item.phases, position: 'center', description: item.description });
}
fs.writeFileSync(file, 'export const projects = ' + JSON.stringify(projects, null, 2) + ';\n\nexport type Project = (typeof projects)[number];\n');

