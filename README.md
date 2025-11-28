# API Curso - Node.js REST API

API RESTful construida con Node.js, Express y MySQL para gestión de usuarios y pokemons con autenticación JWT.

## 🚀 Características

- ✅ Autenticación con JWT (Access + Refresh Tokens)
- ✅ Gestión de usuarios (CRUD con soft delete)
- ✅ Gestión de pokemons con slugs automáticos
- ✅ Rate limiting para protección contra ataques
- ✅ CORS configurado para desarrollo y producción
- ✅ Cookies HttpOnly para seguridad
- ✅ Validación de datos y manejo de errores
- ✅ Arquitectura modular

## 📋 Requisitos

- Node.js >= 18.x
- MySQL >= 8.x
- npm o yarn

## 🛠️ Instalación Local

1. **Clonar el repositorio**

```bash
git clone <tu-repo>
cd api-curso
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Copia `.env.example` a `.env` y configura las variables:

```env
DB_URL=mysql://user:password@localhost:3306/database_name
PORT=3000
JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_REFRESH_SECRET=tu_secreto_refresh_super_seguro_aqui
FRONTEND_URL=http://localhost:5173
# si es desarrollo, NO USAR EN PRODUCCION
NODE_ENV=development
```

4. **Crear la base de datos**

Ejecuta el script SQL en `db/database.sql`:

```bash
source db/database.sql
```

5. **Iniciar el servidor**

```bash
# Desarrollo (con hot reload)
npm run dev

# Producción
npm start
```

## 🚂 Deployment en Railway

### 1. Preparación

1. Asegúrate de que tu código esté en GitHub
2. Crea una cuenta en [Railway.app](https://railway.app)

### 2. Crear Proyecto en Railway

1. Click en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Autoriza Railway y selecciona tu repositorio

### 3. Configurar Base de Datos MySQL

1. En tu proyecto Railway, click en "+ New"
2. Selecciona "Database" → "Add MySQL"
3. Railway creará automáticamente la base de datos

### 4. Configurar Variables de Entorno

En la sección "Variables" de tu servicio, agrega:

```env
DB_URL=${{MySQL.DATABASE_URL}}
PORT=${{PORT}}
JWT_SECRET=genera_un_secreto_aleatorio_seguro_aqui
JWT_REFRESH_SECRET=genera_otro_secreto_diferente_aqui
FRONTEND_URL=https://tu-frontend-en-produccion.com
NODE_ENV=production
```

**Importante:**

- `DB_URL` se auto-completa con `${{MySQL.DATABASE_URL}}`
- `PORT` se auto-completa con `${{PORT}}`
- Genera secretos seguros para JWT (usa herramientas como `openssl rand -base64 32`)

### 5. Ejecutar Script de Base de Datos

1. Conéctate a tu base de datos MySQL en Railway
2. Ejecuta el contenido de `db/database.sql`

Puedes hacerlo desde:

- Railway CLI
- MySQL Workbench
- Cualquier cliente MySQL usando las credenciales de Railway

### 6. Deploy

Railway desplegará automáticamente tu aplicación. Obtendrás una URL como:

```
https://tu-proyecto.up.railway.app
```

## 📚 API Endpoints

### Autenticación

| Método | Endpoint         | Descripción       | Auth         |
| ------ | ---------------- | ----------------- | ------------ |
| POST   | `/auth/register` | Registrar usuario | No           |
| POST   | `/auth/login`    | Iniciar sesión    | No           |
| POST   | `/auth/logout`   | Cerrar sesión     | No           |
| POST   | `/auth/refresh`  | Renovar token     | Sí (Refresh) |

### Usuarios

| Método | Endpoint            | Descripción              | Auth |
| ------ | ------------------- | ------------------------ | ---- |
| GET    | `/me`               | Obtener info del usuario | Sí   |
| PUT    | `/users/softdelete` | Desactivar cuenta        | Sí   |
| PUT    | `/users/active`     | Activar cuenta           | Sí   |

### Pokemons

| Método | Endpoint          | Descripción                 | Auth |
| ------ | ----------------- | --------------------------- | ---- |
| GET    | `/pokemons`       | Listar pokemons del usuario | Sí   |
| GET    | `/pokemons/:slug` | Obtener pokemon por slug    | Sí   |
| POST   | `/pokemons`       | Crear pokemon               | Sí   |
| PUT    | `/pokemons/:id`   | Actualizar pokemon          | Sí   |
| DELETE | `/pokemons/:id`   | Eliminar pokemon            | Sí   |

## 🔒 Seguridad

- **Rate Limiting**: 100 requests/15min general, 5 requests/15min para login
- **JWT Tokens**: Access token (15min), Refresh token (30 días)
- **HttpOnly Cookies**: Tokens almacenados en cookies seguras
- **CORS**: Configurado para orígenes específicos
- **Passwords**: Hasheados con bcrypt (10 rounds)
- **Validación**: Todos los inputs son validados

## 🧪 Testing

Para probar la API localmente, puedes usar:

- Postman
- Thunder Client (VS Code)
- cURL

Ejemplo con cURL:

```bash
# Registro
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  -c cookies.txt

# Crear Pokemon (requiere cookies del login)
curl -X POST http://localhost:3000/pokemons \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name":"Pikachu","type":"Electric","image":"url","icon":"url"}'
```

## 📦 Dependencias Principales

- **express**: Framework web
- **mysql2**: Cliente MySQL
- **jsonwebtoken**: Autenticación JWT
- **bcryptjs**: Hashing de passwords
- **cors**: Manejo de CORS
- **cookie-parser**: Parsing de cookies
- **express-rate-limit**: Rate limiting
- **slugify**: Generación de slugs
- **dotenv**: Variables de entorno

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

ISC

## 👤 Autor

Aaron Leon
