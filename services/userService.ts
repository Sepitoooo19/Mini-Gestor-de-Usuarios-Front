import type { User, CreateUserDto } from '~/types/user';

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const config = useRuntimeConfig();
  return await $fetch('/users', {
    method: 'POST',
    body: userData,
    baseURL: config.public.apiBaseUrl,
  });
};

export const getAllUsers = async (): Promise<User[]> => {
  const config = useRuntimeConfig();
  return await $fetch('/users', {
    method: 'GET',
    baseURL: config.public.apiBaseUrl,
  });
};

export const getUserById = async (id: string): Promise<User> => {
  const config = useRuntimeConfig();
  return await $fetch(`/users/${id}`, {
    method: 'GET',
    baseURL: config.public.apiBaseUrl,
  });
};