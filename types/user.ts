
// Type User para los datos del usuario
export interface User {
  id?: string; 
  name: string;
  email: string;
  birthdate: string | null; 
  created_at?: string | null;
}


// DTO para crear un nuevo usuario unicamente con los campos necesarios
export interface CreateUserDto {
  name: string;
  email: string;
  birthdate: string;
}