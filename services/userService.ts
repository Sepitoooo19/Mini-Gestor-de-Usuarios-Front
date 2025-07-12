import type { User, CreateUserDto } from '~/types/user';

/**
 * Crea un nuevo usuario en el backend
 * @param userData - Datos del usuario a crear
 * @returns Usuario creado
 */
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const config = useRuntimeConfig();
  return await $fetch('/users', {
    method: 'POST',
    body: userData,
    baseURL: config.public.apiBaseUrl,
  });
};

/**
 * Obtiene todos los usuarios del backend
 * @returns Lista de usuarios
 */
export const getAllUsers = async (): Promise<User[]> => {
  const config = useRuntimeConfig();
  return await $fetch('/users', {
    method: 'GET',
    baseURL: config.public.apiBaseUrl,
  });
};

/**
 * Obtiene un usuario específico por su ID
 * @param id - ID del usuario a buscar
 * @returns Usuario encontrado
 */
export const getUserById = async (id: string): Promise<User> => {
  const config = useRuntimeConfig();
  return await $fetch(`/users/${id}`, {
    method: 'GET',
    baseURL: config.public.apiBaseUrl,
  });
};