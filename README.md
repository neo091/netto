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

## ⚙️ Implementación Técnica

### Stack Tecnológico

- **Frontend**: React 18 con Vite.
- **Estilos**: Tailwind CSS con animaciones personalizadas.
- **Base de Datos & Auth**: Supabase.
- **Estado Global**: React Context + `useReducer`.
- **Testing**: Vitest para la lógica de liquidación.
- **Notificaciones**: Sonner para feedback en tiempo real.

### Arquitectura de Datos

El proyecto utiliza una capa de API centralizada en `lib/api.ts` para interactuar con Supabase, asegurando que la lógica de negocio esté separada de la interfaz de usuario.

---

## ☁️ Uso de CubePath

Netto ha sido desplegado en **CubePath** aprovechando su infraestructura escalable para aplicaciones modernas.

- **Servidor**: Desplegado en un servidor **Nano** optimizado para React.
- **Proceso**: Se configuró mediante el panel de CubePath para servir la build estática de Vite.
- **Beneficio**: La baja latencia de CubePath permite que el taxista registre sus viajes al instante, incluso con conexiones móviles inestables.

---

## 🧪 Acceso de Prueba (Modo Demo)

Para facilitar la evaluación de la interfaz y la lógica de liquidación, se ha habilitado un usuario con datos precargados.

**email**: test@netto.paginaweb.pro\
**password**: B6KHJKYs8cb

[Acceder](https://netto.paginaweb.pro/login)

> [!NOTE]
> Por seguridad, las funciones de cambio de contraseña y acceso a ajustes críticos están restringidas para este perfil.

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

<div align="center">

Proyecto creado para la Hackatón CubePath 2026 🚀

</div>
