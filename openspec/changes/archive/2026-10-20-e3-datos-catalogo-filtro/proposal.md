# Proposal

## Why

El Ejercicio 3 ya está implementado en el frontend local, pero no tiene un
cambio OpenSpec ni un archivo histórico como los de los Ejercicios 1 y 2. Hay
que formalizar su contrato de datos, catálogo y filtro para conservarlo y
archivarlo. Ese contrato no debe depender de APIs ni de persistencia.

## What Changes

- Registrar el modelo de datos local: `EDITORIALES`, `GENEROS`, `AUTORES`,
  `LIBROS` y `CLIENTES` declarados como variables de JavaScript en
  `js/datos.js`, con ids estables y relaciones por id.
- Registrar la generación del catálogo a partir de la variable `LIBROS` y el
  filtro por título (normalizado, parcial, vacío y sin coincidencias).
- Establecer que en este ejercicio los datos viven sólo en memoria: no se usa
  API, backend, `fetch`, red ni `localStorage`. Recargar la página vuelve a
  los datos iniciales.
- Preparar los artefactos necesarios para archivar formalmente el Ejercicio 3.

## Capabilities

### New Capabilities

- `catalogo-datos-locales`: define los datos iniciales en memoria, sus
  relaciones y el catálogo con filtro por título del frontend de la librería.

### Modified Capabilities

- Ninguna.

## Impact

- Código observado: `js/datos.js`, `js/catalogo.js` y la sección `#catalogo`
  de `index.html`.
- El cambio no agrega API, backend, servidor, dependencias, módulos ES, CDNs
  ni recursos remotos.
- Fuera de alcance: la persistencia con `localStorage` corresponde al
  Ejercicio 6 y se registra en su propio cambio. Este ejercicio no la requiere
  ni la modifica.
