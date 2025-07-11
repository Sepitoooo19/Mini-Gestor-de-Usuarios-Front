# Test API Connection

Este script puede ayudarte a verificar que el backend esté funcionando:

## Verificar si el backend está corriendo:

```bash
curl http://localhost:8080/ping
```

O en PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/ping" -Method GET
```

## Verificar usuarios:

```bash
curl http://localhost:8080/users
```

O en PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/users" -Method GET
```

## Crear un usuario de prueba:

```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","birthdate":"1990-01-01"}'
```

O en PowerShell:
```powershell
$headers = @{ "Content-Type" = "application/json" }
$body = @{
    name = "Test User"
    email = "test@example.com"
    birthdate = "1990-01-01"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/users" -Method POST -Headers $headers -Body $body
```

## Configuración

El frontend está configurado para usar la URL del backend desde:
1. Variable de entorno `API_BASE_URL` en el archivo `.env`
2. Fallback a `http://localhost:8080` si no está configurada

Para cambiar la URL del backend, edita el archivo `.env`:
```
API_BASE_URL=http://localhost:8080
```
