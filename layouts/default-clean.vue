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

        <!-- Menú móvil (hamburguesa) -->
        <button @click="toggleMobileMenu" class="mobile-menu-btn" :class="{ active: isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- Menú móvil desplegable -->
      <div v-if="isMobileMenuOpen" class="mobile-nav">
        <NuxtLink to="/" class="mobile-nav-link" @click="closeMobileMenu">
          🏠 Inicio
        </NuxtLink>
        <NuxtLink to="/users" class="mobile-nav-link" @click="closeMobileMenu">
          👥 Usuarios
        </NuxtLink>
        <NuxtLink to="/create-user" class="mobile-nav-link" @click="closeMobileMenu">
          ➕ Crear Usuario
        </NuxtLink>
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

// Estado del menú móvil
const isMobileMenuOpen = ref(false)

// Año actual para el footer
const currentYear = computed(() => new Date().getFullYear())

// Funciones para el menú móvil
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
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

/* Estilo especial para links activos usando router-link-active */
:deep(.router-link-active) {
  background-color: rgba(255, 255, 255, 0.2) !important;
  font-weight: 600 !important;
}

/* Menú móvil */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 3px;
}

.mobile-menu-btn span {
  width: 25px;
  height: 3px;
  background-color: white;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.mobile-nav {
  display: none;
  background-color: #6c6fdd;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-nav-link {
  display: block;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.mobile-nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Main content */
.app-main {
  flex: 1;
  background-color: #f8f9fa;
  min-height: calc(100vh - 140px);
}

/* Footer */
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

/* Responsive */
@media (max-width: 768px) {
  .header-container {
    padding: 0 1rem;
  }
  
  .logo h2 {
    font-size: 1.25rem;
  }
  
  .navigation {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .mobile-nav {
    display: block;
  }
  
  .app-main {
    min-height: calc(100vh - 160px);
  }
  
  .footer-content p {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    height: 60px;
    padding: 0 0.75rem;
  }
  
  .logo h2 {
    font-size: 1.1rem;
  }
  
  .mobile-nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
  
  .footer-content p {
    font-size: 0.8rem;
  }
  
  .footer-subtitle {
    font-size: 0.75rem;
  }
}
</style>
