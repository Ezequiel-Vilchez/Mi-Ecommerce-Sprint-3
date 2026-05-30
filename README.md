# 🛒 Mi Ecommerce - Sprint 3 (Migración a Base de Datos)

Bienvenido/a al **Sprint 3** de Mi Ecommerce. En esta etapa, el proyecto da un salto arquitectónico importante: hemos dejado atrás la persistencia de datos basada en archivos estáticos (`.json`) para implementar una **Base de Datos Relacional local utilizando SQLite**.

Todo este proceso de refactorización se realizó manteniendo intacta la experiencia del usuario; las vistas y el funcionamiento interno operan exactamente igual, pero ahora respaldados por un motor de base de datos real.

---

## 🎯 Objetivos del Sprint
El objetivo principal fue robustecer la capa de persistencia de la aplicación. Para lograrlo, nos enfocamos en:
1. Configurar una base de datos SQLite y su esquema inicial.
2. Desarrollar un script de migración para trasladar los datos existentes.
3. Refactorizar los servicios (`services`) para que ejecuten sentencias SQL.
4. Eliminar por completo la dependencia y existencia de archivos JSON.
5. Dejar el terreno preparado estructuralmente para implementar autenticación de usuarios en el próximo sprint.

---

## 🚀 Funcionalidades y Tareas Implementadas

A lo largo de 7 User Stories, se logró lo siguiente:

### 🗄️ Configuración y Migración a SQLite
* **Inicialización de Base de Datos:** Creación del directorio `/db` y configuración de la conexión utilizando `better-sqlite3`.
* **Esquema Inicial (`schema.sql`):** Definición de las tablas necesarias (`products`, `categories`, `users`, `orders`, `order_items`).
* **Script de Migración (`migrate.js`):** Desarrollo de un script automatizado que lee los datos del antiguo `products.json` y los inserta en la tabla `products` de SQLite, utilizando sentencias como `INSERT OR IGNORE` para evitar duplicados si se ejecuta accidentalmente más de una vez.

### ⚙️ Refactorización de Servicios (Capa Lógica)
* **Servicio de Productos:** El archivo `productsService.js` fue reescrito por completo. Ahora todas las operaciones (obtener todos, buscar por ID, filtrar por categoría, ordenar, etc.) se realizan mediante consultas SQL a la base de datos.
* **Servicio de Carrito:** La lógica del carrito (que sigue viviendo en `express-session`) se actualizó para que los cálculos de precios totales y validaciones de existencia consulten directamente la base de datos SQLite en tiempo real, garantizando precios y datos actualizados.

### 🛡️ Seguridad, Limpieza y Futuro
* **Normalización de IDs Estricta:** La función `normalizeId()` ahora no solo verifica que el ID tenga un formato numérico válido, sino que consulta directamente a la base de datos para asegurar que el recurso realmente exista, devolviendo un error `400` o `404` según corresponda.
* **Depuración de Código:** Se eliminó permanentemente el archivo `products.json` y todo el código muerto o lógica heredada relacionada con la lectura del sistema de archivos (`fs`).
* **Preparación para Autenticación (Sprint 4):** Se creó la estructura de la tabla `users` (con campos como `id`, `name`, `email`, `password_hash`, `created_at`) lista para integrar el registro y login real en la próxima etapa.

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js, Express.js
* **Base de Datos:** SQLite (`better-sqlite3`)
* **Frontend:** HTML5, CSS3, Javascript (Vistas renderizadas con **EJS**)
* **Manejo de Sesiones:** express-session
* **Arquitectura:** MVC (Modelo-Vista-Controlador)

---
