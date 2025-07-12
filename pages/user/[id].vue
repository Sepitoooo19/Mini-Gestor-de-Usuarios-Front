<template>
  <div class="user-detail-page">
    <!-- Botón de regreso -->
    <div class="header-section">
      <h1>Detalles del Usuario</h1>
    </div>

    <!-- Estado de carga -->
    <div v-if="loading" class="loading-state">
      <p>Cargando detalles del usuario...</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="error-state">
      <p>Error al cargar usuario: {{ error }}</p>
      <button @click="retryLoad" class="retry-button">Reintentar</button>
    </div>

    <!-- Detalles del usuario -->
    <div v-else-if="user" class="user-details-card">
      <div class="user-info-grid">
        <div class="info-item">
          <label>ID de Usuario:</label>
          <span>{{ user.id }}</span>
        </div>
        
        <div class="info-item">
          <label>Nombre Completo:</label>
          <span>{{ user.name || 'N/A' }}</span>
        </div>
        
        <div class="info-item">
          <label>Correo Electrónico:</label>
          <span>{{ user.email || 'N/A' }}</span>
        </div>
        
        <div class="info-item">
          <label>Fecha de Nacimiento:</label>
          <span>{{ formatDate(user.birthdate) }}</span>
        </div>
        
        <div class="info-item">
          <label>Fecha de Registro:</label>
          <span>{{ formatDateTime(user.created_at) }}</span>
        </div>
      </div>

      <!-- Acciones adicionales -->
      <div class="actions-section">
        <button @click="goBack" class="secondary-button">
          Volver a la Lista
        </button>
        <!-- Aquí puedes agregar más botones como Editar, Eliminar, etc. -->
      </div>
    </div>

    <!-- Estado cuando no se encuentra el usuario -->
    <div v-else class="not-found-state">
      <p>Usuario no encontrado</p>
      <button @click="goBack" class="back-button">Volver a Usuarios</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUserById } from '~/services/userService';
import { formatDate, formatDateTime } from '~/utils/dateFormatter';
import type { User } from '~/types/user';

// Obtener el ID de la URL actual
const getCurrentUserId = (): string => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    const segments = path.split('/');
    return segments[segments.length - 1];
  }
  return '';
};

const userId = ref<string>('');

// Estados reactivos
const user = ref<User | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

/**
 * Carga los detalles de un usuario específico por su ID
 */
const loadUserDetails = async () => {
  try {
    loading.value = true;
    error.value = null;
    user.value = await getUserById(userId.value);
  } catch (err: any) {
    if (err.message.includes('fetch')) {
      error.value = 'No se puede conectar con el servidor. Verifica que el backend esté ejecutándose en http://localhost:8080';
    } else if (err.message.includes('Usuario no encontrado')) {
      error.value = 'El usuario solicitado no existe';
    } else {
      error.value = err.message || 'Error desconocido al cargar los detalles del usuario';
    }
  } finally {
    loading.value = false;
  }
};

/**
 * Reintenta cargar los detalles del usuario en caso de error
 */
const retryLoad = () => {
  loadUserDetails();
};

// Función para regresar a la lista de usuarios
const goBack = () => {
  window.location.href = '/users';
};

// Cargar detalles al montar el componente
onMounted(() => {
  userId.value = getCurrentUserId();
  if (userId.value) {
    loadUserDetails();
  } else {
    error.value = 'ID de usuario no válido';
    loading.value = false;
  }
});
</script>

<style scoped>
.user-detail-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.header-section {
  margin-bottom: 2rem;
}

.header-section h1 {
  color: #8384DF;
  margin: 1rem 0;
  font-size: 2.5rem;
  text-align: center;
}



.back-button:hover {
  background-color: #5a6268;
}

.loading-state,
.error-state,
.not-found-state {
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 2rem 0;
}

.loading-state p {
  color: #6c757d;
  font-size: 1.1rem;
}

.error-state p,
.not-found-state p {
  color: #dc3545;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.retry-button {
  background-color: #8384DF;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
}

.retry-button:hover {
  background-color: #6c6fdd;
}

.user-details-card {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.user-info-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item label {
  font-weight: 600;
  color: #8384DF;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-item span {
  font-size: 1.1rem;
  color: #333;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.actions-section {
  border-top: 1px solid #e9ecef;
  padding-top: 2rem;
  text-align: center;
}

.secondary-button {
  background-color: #f8f9fa;
  color: #8384DF;
  border: 2px solid #8384DF;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.secondary-button:hover {
  background-color: #8384DF;
  color: white;
}
</style>
