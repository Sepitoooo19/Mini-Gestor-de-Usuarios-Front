# Mini-Gestor-de-Usuarios-Front

Aplicación web frontend para la gestión de usuarios desarrollada con Nuxt 3 y TypeScript.

## Requisitos previos

- Node.js 18.0 o superior
- npm o yarn
- API Backend ejecutándose en localhost:8080
- Puerto 3000 disponible
- IDE recomendado: VS Code

## Instalación y ejecución

### 1. Clonar el repositorio

**Usando Git desde terminal:**
```bash
git clone https://github.com/Sepitoooo19/Mini-Gestor-de-Usuarios-Front.git
cd Mini-Gestor-de-Usuarios-Front
```

**Usando GitKraken:**
1. Abrir GitKraken
2. Hacer clic en "Clone a repo"
3. Seleccionar "Clone with URL"
4. Pegar la URL: `https://github.com/Sepitoooo19/Mini-Gestor-de-Usuarios-Front.git`
5. Elegir la carpeta de destino
6. Hacer clic en "Clone the repo!"

### 2. Instalar dependencias
```bash
npm install
```
Este comando descarga e instala todas las dependencias necesarias del proyecto.

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

### 4. Compilar para producción
```bash
npm run build
```

### 5. Previsualizar build de producción
```bash
npm run start
```

La aplicación se iniciará en `http://localhost:3000`

## Páginas disponibles

- `/` - Página de inicio con información del proyecto
- `/users` - Lista de todos los usuarios
- `/create-user` - Formulario para crear nuevos usuarios
- `/user/[id]` - Detalles de un usuario específico

## Estructura del proyecto

```
├── components/      # Componentes Vue reutilizables
├── layouts/         # Layouts de la aplicación
│   ├── default.vue        # Layout principal con navegación
│   └── default-clean.vue  # Layout limpio sin navegación
├── pages/           # Páginas de la aplicación (rutas automáticas)
│   ├── index.vue          # Página de inicio
│   ├── users.vue          # Lista de usuarios
│   ├── create-user.vue    # Crear usuario
│   └── user/
│       └── [id].vue       # Detalles de usuario
├── services/        # Servicios para consumir API
│   └── userService.ts     # Operaciones CRUD de usuarios
├── types/           # Definiciones de tipos TypeScript
│   └── user.ts            # Tipos de usuario
├── utils/           # Utilidades y helpers
│   └── dateFormatter.ts   # Formateo de fechas
├── plugins/         # Plugins de Nuxt
├── public/          # Archivos estáticos
├── nuxt.config.ts   # Configuración de Nuxt
├── package.json     # Dependencias del proyecto
└── tsconfig.json    # Configuración TypeScript
```

## Tecnologías utilizadas

- **Nuxt 3** - Framework Vue.js con SSR/SSG
- **TypeScript** - Tipado estático para JavaScript
- **Vue 3** - Framework frontend reactivo
- **$fetch** - Cliente HTTP nativo de Nuxt para consumir APIs
- **CSS Scoped** - Estilos encapsulados por componente

## Configuración

### Variables de entorno

El proyecto utiliza las siguientes variables de configuración:

- `API_BASE_URL` - URL base de la API backend (por defecto: `http://localhost:8080`)

### Configurar la URL de la API

1. Crear archivo `.env` en la raíz del proyecto:
```env
API_BASE_URL=http://localhost:8080
```

2. O modificar directamente en `nuxt.config.ts`:
```typescript
runtimeConfig: {
  public: {
    apiBaseUrl: 'http://tu-api-url:puerto'
  }
}
```

## Funcionalidades

- ✅ **Lista de usuarios** - Visualización de todos los usuarios registrados
- ✅ **Crear usuario** - Formulario con validaciones para registrar nuevos usuarios
- ✅ **Detalles de usuario** - Vista individual con información completa
- ✅ **Navegación responsive** - Interfaz adaptada para diferentes dispositivos
- ✅ **Manejo de errores** - Gestión de errores de conexión y validación
- ✅ **Formateo de fechas** - Visualización amigable de fechas
- ✅ **TypeScript** - Tipado fuerte para mayor robustez del código