# Guía de Deployment en Railway

## ✅ Pre-requisitos Completados

Tu API ya tiene todo lo necesario para Railway:

- ✅ `package.json` con script `start`
- ✅ Variables de entorno configuradas
- ✅ CORS configurado para producción
- ✅ Cookies configuradas para producción
- ✅ Rate limiting implementado
- ✅ Manejo de errores robusto

## 🚀 Pasos para Deploy

### 1. Preparar Repositorio Git

```bash
# Si aún no has inicializado git
git init
git add .
git commit -m "Initial commit"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/tu-usuario/api-curso.git
git branch -M main
git push -u origin main
```

### 2. Crear Proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Click en "Start a New Project"
3. Selecciona "Deploy from GitHub repo"
4. Autoriza Railway a acceder a tu GitHub
5. Selecciona el repositorio `api-curso`

### 3. Agregar Base de Datos MySQL

1. En tu proyecto, click en "+ New"
2. Selecciona "Database"
3. Elige "Add MySQL"
4. Railway creará automáticamente la base de datos

### 4. Configurar Variables de Entorno

En la pestaña "Variables" de tu servicio API, agrega:

```env
# Base de Datos (Railway auto-completa esto)
DB_URL=${{MySQL.DATABASE_URL}}

# Puerto (Railway auto-completa esto)
PORT=${{PORT}}

# JWT Secrets (GENERA VALORES SEGUROS)
JWT_SECRET=tu_secreto_jwt_super_seguro_minimo_32_caracteres
JWT_REFRESH_SECRET=tu_secreto_refresh_diferente_minimo_32_caracteres

# Frontend URL (tu app Vue en producción)
FRONTEND_URL=https://tu-app-vue.vercel.app

# Entorno
NODE_ENV=production
```

**💡 Tip:** Para generar secretos seguros:

```bash
# En tu terminal local
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 5. Ejecutar Script de Base de Datos

#### Opción A: Usando Railway CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Conectar al proyecto
railway link

# Conectar a MySQL
railway connect MySQL

# Ejecutar script
source db/database.sql
```

#### Opción B: Usando MySQL Workbench

1. En Railway, ve a tu base de datos MySQL
2. Click en "Connect" → Copia las credenciales
3. Abre MySQL Workbench
4. Crea nueva conexión con las credenciales de Railway
5. Abre y ejecuta `db/database.sql`

#### Opción C: Desde Railway Dashboard

1. Ve a tu base de datos MySQL en Railway
2. Click en "Data" → "Query"
3. Copia y pega el contenido de `db/database.sql`
4. Ejecuta

### 6. Verificar Deployment

Railway desplegará automáticamente. Verás:

- ✅ Build logs
- ✅ Deploy logs
- ✅ URL pública: `https://tu-proyecto.up.railway.app`

## 🔧 Troubleshooting

### Error: CORS

**Problema:** Vue no puede hacer requests a la API

**Solución:** Verifica que `FRONTEND_URL` en Railway apunte a tu app Vue en producción

### Error: Cookies no se guardan

**Problema:** Las cookies no persisten entre requests

**Solución:**

1. Asegúrate de usar `withCredentials: true` en axios
2. Verifica que `NODE_ENV=production` esté configurado en Railway
3. Ambas apps (Vue y API) deben estar en HTTPS en producción

### Error: 429 Too Many Requests

**Problema:** Rate limiting bloqueando requests

**Solución:** Ajusta los límites en `src/app.js` si es necesario

## 📊 Monitoreo

Railway proporciona:

- 📈 Logs en tiempo real
- 💾 Uso de recursos (CPU, RAM)
- 🌐 Métricas de red
- 🔄 Historial de deployments

## 🎉 ¡Listo!

Tu API está ahora en producción y lista para ser consumida por tu aplicación Vue.js tanto en desarrollo local como en producción.
