# Evidencia de validación E3

Sesión 20/10/2026. Chromium (Playwright) sobre `index.html` de la raíz,
abierto con `file://` en un perfil limpio. Node v22.22.0 para la suite CJS.

La verificación se ejecutó en dos modos:

- **Sólo variables:** con `__E6_NO_AUTOINICIALIZAR__ = true` y un contador de
  accesos a `Storage`, para comprobar que el Ejercicio 3 funciona sólo con los
  datos en memoria.
- **Página completa:** apertura normal, para comprobar que el resto del
  proyecto no altera el catálogo.

Ambos modos dieron los mismos resultados.

## Navegador

| Tarea | Verificación | Resultado observado |
|---|---|---|
| 1.1 | Variables de datos | `LIBROS` 6, `CLIENTES` 3, `EDITORIALES` 2, `GENEROS` 2, `AUTORES` 3; ids `LI-1` … `LI-6`. **PASS** |
| 1.1 | Relaciones | `validarRelacionesLibros(LIBROS)` → 0 problemas. **PASS** |
| 1.2 | Catálogo inicial | 6 tarjetas y «Mostrando los 6 libros del catálogo.». Ejemplo: «El viento del Aconcagua · ISBN 978-950-000-001-1 · Editorial Cordillera · Género Novela · Autores Lucía Benavídez · $ 18.500,00». **PASS** |
| 1.2 | Libro sin género | «Cuaderno de viaje» muestra «Sin clasificar». **PASS** |
| 1.2 | Búsqueda `"  VIEN  "` | 1 tarjeta: «1 libro coincide con «VIEN».». **PASS** |
| 1.2 | Búsqueda `"DE"` | 5 coincidencias parciales. **PASS** |
| 1.2 | Búsqueda con sólo espacios | Catálogo completo (6). **PASS** |
| 1.2 | Búsqueda `"zzz inexistente"` | 0 tarjetas y «Sin resultados: ningún título contiene «zzz inexistente». Probá con otra palabra o borrá la búsqueda.». **PASS** |
| 1.2 | Búsqueda `<img src=x onerror=alert(1)>` | Se muestra literal en el mensaje; 0 elementos `img` creados. **PASS** |
| 1.2 | Enter en el buscador | No recarga la página (misma URL) y mantiene el filtro. **PASS** |
| 1.2 | Botón «Mostrar todo el catálogo» | Vuelven las 6 tarjetas y el foco regresa al buscador. **PASS** |
| 1.3 | Accesos a `Storage` (modo sólo variables) | 0. **PASS** |
| 1.3 | Peticiones de red | 10 recursos, todos `file://`; 0 externos. **PASS** |
| 2.2 | Recorrido con Tab | 12 controles recorridos, todos con foco visible. **PASS** |
| 2.2 | Anchos | Sin desplazamiento horizontal de la página en 320 px ni en 1280 px. **PASS** |
| 2.2 | Consola | 0 errores y 0 advertencias. **PASS** |

## Suite CJS

`node --test tests/*.test.cjs` → **22/22 PASS**, 0 fallas. Incluye los casos
de baseline «E3: datos iniciales y relaciones coherentes» y «E3: filtro
normalizado, vacío y sin coincidencias».

## Límites

- No se modificó código funcional: el cambio formaliza y verifica el
  comportamiento existente.
- La persistencia con `localStorage` que hoy contiene `js/datos.js` pertenece
  al Ejercicio 6 y queda fuera de este contrato. La verificación demostró que
  el Ejercicio 3 no la necesita.
- El cambio se archivó sin la CLI de OpenSpec (no se pudo instalar en el
  entorno): la sincronización y el archivo se hicieron a mano siguiendo los
  pasos de `openspec-sync-specs` y `openspec-archive-change`, por lo que no se
  ejecutó `openspec validate`.
