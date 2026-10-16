import Image from "next/image";

const brands = [
  { name: "New PGA", src: "/brands/new-pga.png" },
  { name: "BDG Buenos Aires", src: "/brands/bdg.png" },
  {
    "name": "CHER.",
    "src": "/brands/cher.svg"
  },
  {
    "name": "BEN SIMON",
    "src": "/brands/ben-simon.svg"
  },
  {
    "name": "SARKANY",
    "src": "/brands/sarkany.svg"
  },
  {
    "name": "TUCCI",
    "src": "/brands/tucci.svg"
  },
  {
    "name": "medicube",
    "src": "/brands/medicube.svg"
  },
  {
    "name": "Dr. Melaxin",
    "src": "/brands/dr-melaxin.svg"
  },
  {
    "name": "PANTENE",
    "src": "/brands/pantene.svg"
  },
  {
    "name": "Herbal Essences",
    "src": "/brands/herbal-essences.svg"
  },
  {
    "name": "Avianca",
    "src": "/brands/avianca.svg"
  },
  {
    "name": "GOL",
    "src": "/brands/gol.svg"
  },
  {
    "name": "VTH",
    "src": "/brands/vth.svg"
  },
  {
    "name": "Biferdil",
    "src": "/brands/biferdil.svg"
  },
  {
    "name": "BARBIERI",
    "src": "/brands/barbieri.svg"
  },
  {
    "name": "FERA",
    "src": "/brands/fera.svg"
  },
  {
    "name": "MIA",
    "src": "/brands/mia.svg"
  },
  {
    "name": "Cdimex",
    "src": "/brands/cdimex.svg"
  },
  {
    "name": "AL SHAMS",
    "src": "/brands/al-shams.svg"
  },
  {
    "name": "Calvin Klein",
    "src": "/brands/calvin-klein.svg"
  },
  {
    "name": "RIMMEL",
    "src": "/brands/rimmel.svg"
  },
  {
    "name": "adidas",
    "src": "/brands/adidas.svg"
  },
  {
    "name": "COTY",
    "src": "/brands/coty.svg"
  },
  {
    "name": "turopeo",
    "src": "/brands/turopeo.svg"
  }
];

export function Brands() {
  return (
    <section aria-label="Marcas que confían en nosotros" className="overflow-hidden bg-[#f7f7f5] px-5 py-6 md:px-10 md:py-8">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[22px] bg-white py-8 md:py-10">
        <div className="brand-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center">
              {brands.map((brand) => (
                <div key={brand.src} className="flex h-16 w-[180px] shrink-0 items-center justify-center px-7 md:h-20 md:w-[220px] md:px-9">
                  <Image src={brand.src} alt={copy === 0 ? brand.name : ""} width={160} height={64} className="h-[80%] w-[80%] object-contain" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
