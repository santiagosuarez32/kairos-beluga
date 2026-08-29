const brands = ["NEXA", "PUNTO NORTE", "ORBITA", "LUMEN", "TRAMA", "FORMA"];

function BrandSymbol({ index }: { index: number }) {
  const styles = ["h-6 w-6 rounded-full border-[3px] border-current", "h-6 w-6 rotate-45 rounded-[5px] border-[3px] border-current", "h-6 w-6 rounded-full border-[3px] border-current border-t-transparent", "h-6 w-6 rounded-full bg-current", "h-6 w-6 rotate-45 border-[3px] border-current", "h-6 w-6 rounded-full border-[3px] border-current border-l-transparent"];
  return <span aria-hidden className={`inline-block w-6 shrink-0 ${styles[index % styles.length]}`} />;
}

export function Brands() {
  const loop = [...brands, ...brands];
  return (
    <section className="overflow-hidden bg-[#f7f7f5] px-5 py-6 md:px-10 md:py-8">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[22px] bg-white py-8 md:py-10">
        <div className="brand-track flex w-max items-center gap-14 px-8 text-[#191919] md:gap-24 md:px-12">
          {loop.map((brand, index) => <div key={`${brand}-${index}`} className="flex items-center gap-3 text-xl font-bold tracking-[-0.05em] md:text-2xl"><BrandSymbol index={index} />{brand}</div>)}
        </div>
      </div>
    </section>
  );
}
