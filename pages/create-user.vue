<template>
  <div class="create-user-page">
    <!-- Header con botón de regreso -->
    <div class="header-section">
      <button @click="goBack" class="back-button">
        ← Volver a Usuarios
      </button>
      <h1>Crear Nuevo Usuario</h1>
    </div>

    <!-- Formulario -->
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="user-form">
        
        <!-- Campo Nombre -->
        <div class="form-group">
          <label for="name">Nombre Completo *</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Ingresa el nombre completo"
            :disabled="isSubmitting"
          />
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>

        <!-- Campo Email -->
        <div class="form-group">
          <label for="email">Correo Electrónico *</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="ejemplo@correo.com"
            :disabled="isSubmitting"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <!-- Campo Fecha de Nacimiento -->
        <div class="form-group">
          <label for="birthdate">Fecha de Nacimiento</label>
          <input
            id="birthdate"
            v-model="form.birthdate"
            type="date"
            :disabled="isSubmitting"
          />
          <span v-if="errors.birthdate" class="error-message">{{ errors.birthdate }}</span>
        </div>

        <!-- Mensaje de error general -->
        <div v-if="generalError" class="general-error">
          {{ generalError }}
        </div>

        <!-- Mensaje de éxito -->
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <!-- Botones -->
        <div class="form-actions">
          <button 
            type="button" 
            @click="goBack" 
            class="cancel-button"
            :disabled="isSubmitting"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            class="submit-button"
            :disabled="isSubmitting || !isFormValid"
          >
            <span v-if="isSubmitting">Creando...</span>
            <span v-else>✅ Crear Usuario</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { createUser } from '~/services/userService';
import type { CreateUserDto } from '~/types/user';

// Estados del formulario
const form = ref<CreateUserDto>({
  name: '',
  email: '',
  birthdate: ''
});

const errors = ref<Partial<CreateUserDto>>({});
const generalError = ref<string>('');
const successMessage = ref<string>('');
const isSubmitting = ref(false);

// Validación del formulario
const isFormValid = computed(() => {
  return form.value.name.trim() !== '' && 
         form.value.email.trim() !== '' && 
         isValidEmail(form.value.email);
});

// Función para validar email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para limpiar errores
const clearErrors = () => {
  errors.value = {};
  generalError.value = '';
};

// Función para validar campos individuales
const validateForm = (): boolean => {
  clearErrors();
  let isValid = true;

  // Validar nombre
  if (!form.value.name.trim()) {
    errors.value.name = 'El nombre es obligatorio';
    isValid = false;
  } else if (form.value.name.trim().length < 2) {
    errors.value.name = 'El nombre debe tener al menos 2 caracteres';
    isValid = false;
  }

  // Validar email
  if (!form.value.email.trim()) {
    errors.value.email = 'El email es obligatorio';
    isValid = false;
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = 'Ingresa un email válido';
    isValid = false;
  }

  // Validar fecha de nacimiento (opcional pero si se ingresa debe ser válida)
  if (form.value.birthdate) {
    // Usar la misma lógica para evitar problemas de zona horaria
    const date = new Date(form.value.birthdate + 'T00:00:00');
    const today = new Date();
    
    // Comparar solo las fechas, no las horas
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    if (dateOnly > todayOnly) {
      errors.value.birthdate = 'La fecha de nacimiento no puede ser futura';
      isValid = false;
    }
    
    const age = today.getFullYear() - date.getFullYear();
    if (age > 120) {
      errors.value.birthdate = 'La fecha de nacimiento no es válida';
      isValid = false;
    }
  }

  return isValid;
};

// Función para formatear la fecha correctamente (evitar problemas de zona horaria)
const formatDateForBackend = (dateString: string): string => {
  if (!dateString) return '';
  
  // Crear la fecha interpretándola como local (sin conversión UTC)
  const date = new Date(dateString + 'T00:00:00');
  
  // Formatear en formato YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

// Función para manejar el envío del formulario
const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  clearErrors();

  try {
    // Preparar datos con fecha corregida
    const userData = {
      ...form.value,
      birthdate: formatDateForBackend(form.value.birthdate)
    };
    
    console.log('Enviando usuario:', userData);
    
    const newUser = await createUser(userData);
    
    console.log('Usuario creado exitosamente:', newUser);
    successMessage.value = '¡Usuario creado exitosamente!';
    
    // Limpiar formulario
    form.value = { name: '', email: '', birthdate: '' };
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
      goBack();
    }, 2000);
    
  } catch (error: any) {
    console.error('Error creating user:', error);
    generalError.value = error.message || 'Error al crear el usuario. Inténtalo de nuevo.';
  } finally {
    isSubmitting.value = false;
  }
};

// Función para regresar a la lista de usuarios
const goBack = () => {
  window.location.href = '/users';
};
</script>

<style scoped>
.create-user-page {
  padding: 2rem;
  max-width: 600px;
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

.back-button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
  margin-bottom: 1rem;
}

.back-button:hover {
  background-color: #5a6268;
}

.form-container {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.form-group input {
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #8384DF;
  box-shadow: 0 0 0 3px rgba(131, 132, 223, 0.1);
}

.form-group input:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  font-weight: 500;
}

.general-error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #f5c6cb;
  font-weight: 500;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #c3e6cb;
  font-weight: 500;
  text-align: center;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.cancel-button {
  background-color: #f8f9fa;
  color: #6c757d;
  border: 2px solid #6c757d;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cancel-button:hover:not(:disabled) {
  background-color: #6c757d;
  color: white;
}

.cancel-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  background-color: #218838;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .create-user-page {
    padding: 1rem;
  }
  
  .form-container {
    padding: 1.5rem;
  }
  
  .header-section h1 {
    font-size: 2rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .cancel-button,
  .submit-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
