# SEO de Kairos Beluga

Configuración preparada el 30 de septiembre de 2026.

## Identidad y posicionamiento

Título: **Kairos Beluga | Diseño y construcción de stands**.

Descripción: Diseño, construcción y montaje de stands para ferias, góndolas y espacios comerciales en Buenos Aires. Kairos Beluga: del render a la realidad.

La guía de procesos constructivos muestra renders, construcción y proyectos terminados de Barbieri, VTH, Argental, Fera y Biferdil. Informa la razón social Kairos Beluga S.A. y la dirección Perito Moreno 1155, Canning. Se usó para definir actividad, identidad y ubicación; no se reemplazaron las descripciones de los proyectos de la web con datos de versiones anteriores del portfolio.

## Competencia revisada

| Empresa | Enfoque observado | Aplicación en Kairos |
| --- | --- | --- |
| [Stands Company](https://standscompany.com.ar/) | Diseño y construcción de stands en Argentina; proceso integral y portfolio de ferias. | Describir explícitamente el servicio y mostrar evidencia de obras. |
| [Arquitectura Creativa](https://www.arquitecturacreativa.com.ar/) | Stands para ferias, espacios comerciales y Buenos Aires. | Incluir tipo de espacio y ubicación de forma natural. |
| [CUATRO+D](https://cuatromasd.com/) | Diseño y construcción de stands y locales comerciales; portfolio de exposiciones. | Relacionar servicios, proyectos y ferias sin copiar textos. |

Es una comparación de contenido y posicionamiento declarado, no una medición de tráfico, rankings ni volumen de búsquedas.

## Palabras clave

Principales: diseño de stands; construcción de stands; montaje de stands; stands para ferias; stands para exposiciones; stands Buenos Aires.

Complementarias: arquitectura comercial; góndolas comerciales; exhibidores a medida; espacios comerciales; procesos constructivos; stands Canning; Kairos Beluga.

Se incorporaron en título, descripción y textos visibles relevantes, evitando repetirlas artificialmente. La etiqueta `keywords` se incluyó por pedido del usuario, pero [Google no la utiliza para posicionamiento](https://developers.google.com/search/docs/crawling-indexing/special-tags).

## Implementación

- `app/favicon.ico`: favicon suministrado y referencia explícita en metadata.
- `lib/seo.ts`: título, descripción, keywords, URL canónica, robots, Open Graph y Twitter.
- `app/opengraph-image.tsx`: imagen social de 1200 × 630 con fotografía real de Barbieri, marca y texto del proceso constructivo.
- `app/layout.tsx`: idioma español de Argentina y datos estructurados LocalBusiness con dirección, email, ambos teléfonos, redes y servicios.
- `app/sitemap.ts`: sitemap de la página real, con imágenes. Las secciones con `#` no se presentan como páginas independientes.
- `app/robots.ts`: robots y referencia al sitemap.
- Verificación opcional de Search Console mediante `GOOGLE_SITE_VERIFICATION`.

## Dominio y publicación

Definir `NEXT_PUBLIC_SITE_URL` con el dominio definitivo, incluyendo `https://`, antes de compilar y publicar. En Vercel también se admite `VERCEL_PROJECT_PRODUCTION_URL` como respaldo.

Mientras no haya un dominio configurado, se omite la canónica, el sitemap queda vacío y se mantiene `noindex` para no indexar direcciones de desarrollo. `.env.example` documenta los valores necesarios.

Después de publicar: comprobar las URLs públicas `/favicon.ico`, `/opengraph-image`, `/robots.txt` y `/sitemap.xml`, verificar la propiedad en Search Console y enviar el sitemap. La inscripción en Search Console y Google Business Profile necesita acceso a las cuentas del propietario; no se realizó desde esta tarea.

## Verificación

Compilación de producción y tipos verificados. Comprobación HTTP local de metadata, datos estructurados y rutas del favicon, sitemap, robots e imagen social. Previsualización social renderizada y revisada visualmente.
