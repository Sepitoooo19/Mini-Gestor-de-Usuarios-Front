<template>
  <div class="app-layout">
    <!-- Header -->
    <header class="app-header">
      <div class="header-container">
        <!-- Logo/Nombre del proyecto -->
        <div class="logo-section">
          <NuxtLink to="/" class="logo">
            <h2>👥 UserManager</h2>
          </NuxtLink>
        </div>

        <!-- Navegación -->
        <nav class="navigation">
          <NuxtLink to="/" class="nav-link">
            🏠 Inicio
          </NuxtLink>
          <NuxtLink to="/users" class="nav-link">
            👥 Usuarios
          </NuxtLink>
          <NuxtLink to="/create-user" class="nav-link">
            ➕ Crear Usuario
          </NuxtLink>
        </nav>

      </div>
    </header>

    <!-- Contenido principal -->
    <main class="app-main">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-content">
          <p>&copy; {{ currentYear }} UserManager. Todos los derechos reservados.</p>
          <p class="footer-subtitle">Sistema de gestión de usuarios desarrollado con Nuxt 3</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Año actual para el footer
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #8384DF;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo-section .logo {
  text-decoration: none;
  color: white;
}

.logo h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navigation {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

:deep(.router-link-active) {
  background-color: rgba(255, 255, 255, 0.2) !important;
  font-weight: 600 !important;
}

.app-main {
  flex: 1;
  background-color: #f8f9fa;
  min-height: calc(100vh - 140px);
}

.app-footer {
  background-color: #343a40;
  color: white;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  text-align: center;
}

.footer-content p {
  margin: 0.25rem 0;
}

.footer-subtitle {
  font-size: 0.875rem;
  color: #adb5bd;
  font-style: italic;
}
</style>
