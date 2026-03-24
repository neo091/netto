<div align="center">

# 🚖 Netto - App de Liquidación para Taxistas

### Optimiza tu jornada, controla tus ganancias.

[![Desplegado en CubePath](https://img.shields.io/badge/Desplegado%20en-CubePath-00C853?style=for-the-badge&logo=cloud&logoColor=white)](https://cubepath.com)
[![VITE](https://img.shields.io/badge/Vite-FFF?style=for-the-badge&logo=vite&logoColor=#3e63dd)](https://vite.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

[🚀 Ver Demo en Vivo](https://netto.paginaweb.pro/) | [📂 Repositorio](https://github.com/neo091/netto)

</div>

---

## 📝 Descripción del Proyecto

**Netto** es una Progressive Web App (PWA) diseñada específicamente para taxistas que necesitan gestionar su liquidación diaria de forma rápida y profesional.

En el sector del taxi, el conductor suele trabajar bajo una comisión (comúnmente el 40%). El problema surge al mezclar cobros en efectivo (que el taxista guarda en su bolsillo) y cobros con tarjeta (que van directos a la empresa). **Netto calcula en tiempo real cuánto dinero debe entregar el taxista o cuánto le debe la empresa**, eliminando errores de cálculo manual.

### ✨ Características Principales

- **Sistema de Estados**: Gestión de estados (Libre, Ocupado, Pagando, Descanso).
- **Cálculo Inteligente**: Lógica contable basada en porcentaje configurable (Regla del 40% por defecto).
- **Diseño Premium**: Interfaz Dark Mode con acentos Esmeralda y efectos Glassmorphism.
- **Offline First**: Como PWA, permite un acceso rápido desde el inicio del móvil.
- **Historial Detallado**: Registro de viajes con filtros inteligentes (Hoy, Semana, Mes).

---

## 📸 Capturas de Pantalla

<div align="center">
  <img src="/src/assets/home.png" alt="Home" width="30%" />
  <img src="/src/assets/configuracion.png" alt="Configuración" width="30%" />
  <img src="/src/assets/historial.png" alt="Historial" width="30%" />
</div>

---

## 🛠️ Instalación Local

1. **Clona el repositorio**:

```bash
git clone [https://github.com/neo091/netto.git](https://github.com/neo091/netto.git)
cd netto
```

2. Instala las dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```env
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_key
VITE_N8N_API_BASE=tu_api (yo use n8n por eso le puse ese nombre)
```

4. Iniciar servidor de desarrollo:

```bash
npm run dev
```

## ⚙️ Implementación Técnica

### Stack Tecnológico & Arquitectura

Netto no es solo una aplicación de frontend; es un ecosistema de microservicios diseñado para la alta disponibilidad en movilidad.

- **Frontend**: React 18 con Vite.
- **Estilos**: Tailwind CSS con diseño Glassmorphism y modo oscuro nativo.
- **Base de Datos & Auth**: Supabase.
- **Gestión de Estado**: React Context + useReducer (Arquitectura robusta sin dependencias pesadas).
- **Notificaciones**: Sonner para feedback en tiempo real.

### Arquitectura de Datos

El proyecto utiliza una capa de API centralizada en `lib/api.ts` para interactuar con Supabase, asegurando que la lógica de negocio esté separada de la interfaz de usuario.

### 🚀 Despliegue e Infraestructura (Dockploy)

La aplicación se gestiona mediante una arquitectura de proyectos independientes dentro de Dockploy, optimizando recursos y escalabilidad:

- **App Engine (Railpack):** El frontend de Netto se despliega mediante Railpack. Este sistema detecta automáticamente el entorno de Vite, optimizando la build de producción y sirviéndola con latencia mínima, ideal para conductores en zonas de baja cobertura.
- **Automation Engine (n8n):** Instancia de n8n autogestionada en un proyecto paralelo de Dockploy. Actúa como el "cerebro" logístico de la aplicación.
- **Pipeline de Datos:**
  - **Webhooks:** n8n recibe los registros y feedbacks en tiempo real.
  - **SheetBest API:** Conecta el flujo de n8n con Google Sheets, permitiendo una gestión administrativa transparente y ágil de la lista de espera (Beta).

<div align="center">
  <img src="/src/assets/n8n-1.png" alt="Home" width="100%" />
</div>

---

## 🗄️ Backend & Persistencia

- **BaaS:** Supabase (PostgreSQL) para la gestión de usuarios, autenticación y almacenamiento del historial de viajes.

- **Storage:** Google Sheets (vía n8n + SheetBest) para el control administrativo de nuevos conductores.

## ☁️ Uso de CubePath

Netto ha sido desplegado en **CubePath** aprovechando su infraestructura escalable para aplicaciones modernas.

- Baja Latencia: Crucial para el registro de viajes en milisegundos.

- PWA Ready: Configuración de servidor optimizada para el registro de Service Workers.

- Seguridad: Variables de entorno críticas gestionadas de forma segura desde el panel de CubePath.

---

## 🧪 Acceso de Prueba (Modo Demo)

Para facilitar la evaluación de la interfaz y la lógica de liquidación, se ha habilitado un usuario con datos precargados.

**email**: test@netto.paginaweb.pro\
**password**: B6KHJKYs8cb

[Acceder](https://netto.paginaweb.pro/login)

> [!NOTE]
> Por seguridad, las funciones de cambio de contraseña y acceso a ajustes críticos están restringidas para este perfil.

---

<div align="center">

Proyecto creado para la Hackatón CubePath 2026 🚀

</div>
