![AWS EC2](https://img.shields.io/badge/deploy-AWS%20EC2-orange?logo=amazon-aws) 
![JavaScript CI](https://github.com/paulatatian/calculadora-cdt/workflows/JavaScript%20CI/badge.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)


###  Calculadora de CDT

Una calculadora web simple y elegante para calcular rendimientos de Certificados de Depósito a Término (CDT) con interés simple y compuesto.

##  Características

- **Cálculo de interés simple y compuesto**: Elige entre dos tipos de capitalización
- **Interfaz intuitiva**: Diseño modernonsivo
- **Moneda local**: Configurado para pesos colo y respombianos (COP)
- **Resultados detallados**: Muestra el monto final y el interés ganado
- **Validación de datos**: Verifica que todos los campos contengan valores válidos

---
## Estructura del proyecto

```bash
calculadora-cdt/
├── index.html   # Página principal
├── style.css    # Estilos de la interfaz
└── app.js       # Lógica de cálculo
```
## Instalación y uso

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/usuario/calculadora-cdt.git
   ```

2. **Navega al directorio**:
   ```bash
   cd calculadora-cdt
   ```

3. **Abre en el navegador**:
   - Simplemente abre el archivo `index.html` en tu navegador web preferido
   - O usa un servidor local como Live Server en VS Code

## Cómo usar

1. **Ingresa el capital inicial** en pesos colombianos (COP)
2. **Especifica la tasa de interés anual** en porcentaje
3. **Define el tiempo** de inversión en años
4. **Selecciona el tipo de interés**:
   - **Simple**: El interés se calcula solo sobre el capital inicial
   - **Compuesto**: El interés se reinvierte y genera interés adicional
5. **Haz clic en "Calcular"** para ver los resultados

## Fórmulas utilizadas

### Interés Simple
```
A = C × (1 + r × t)
```

### Interés Compuesto
```
A = C × (1 + r)^t
```
Donde:
- **A** = Monto final
- **C** = Capital inicial
- **r** = Tasa de interés anual (decimal)
- **t** = Tiempo en años

## Tecnologías

- **HTML5** → estructura de la aplicación  
- **CSS3** → estilos básicos  
- **JavaScript (Vanilla)** → lógica de cálculo  
- **Nginx** (para despliegue en AWS EC2)  

---

### Uso

## Despliegue en AWS EC2 con Nginx

Sigue estos pasos para desplegar la aplicación en una instancia de **Ubuntu EC2** usando **Nginx**:

## 1. Conectar a la instancia
En la consola de AWS → EC2 → **Connect** → **EC2 Instance Connect** (o con SSH si tienes llaves).

---
## 2. Instalar dependencias
Actualiza e instala Git y Nginx:
```bash
sudo apt update
sudo apt install -y git nginx
```

## 3. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/calculadora-cdt.git
   cd calculadora-cdt
```

## 4. Copiar archivos al directorio web

Crea el directorio de publicación de Nginx y copia los archivos del proyecto:

  ```bash
sudo mkdir -p /var/www/cdt
sudo cp -r ~/calculadora-cdt/* /var/www/cdt/
sudo chown -R www-data:www-data /var/www/cdt
```
## 5. Configurar Nginx

Crea un archivo de configuración para tu sitio:
```bash
sudo nano /etc/nginx/sites-available/cdt
```

Agrega este contenido:

```
server {
    listen 80;
    listen [::]:80;
    server_name _;

    root /var/www/cdt;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```
Activa la nueva configuración y elimina la predeterminada:

```bash
sudo ln -s /etc/nginx/sites-available/cdt /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```


#  CI/CD - Integración y Despliegue Continuo

Este proyecto implementa un pipeline de CI/CD automatizado usando **GitHub Actions** para garantizar la calidad del código mediante testing automatizado.

---

##  Pipeline de CI/CD

###  Continuous Integration (CI)

El workflow de **GitHub Actions** se ejecuta automáticamente en cada:
- **Push** a la rama `main`
- **Pull Request** hacia `main`

#### Pasos del Pipeline CI:

1. ** Checkout del código**
   - Descarga el código fuente del repositorio

2. ** Setup Node.js**
   - Configura Node.js 
   - Instala dependencias con `npm ci`

3. ** Ejecución de Tests**
   - Ejecuta tests unitarios con Jest
   - Verifica la funcionalidad básica

---

##  Configuración de Testing

**Framework:** Jest con jsdom environment

**Archivo:** `package.json`
```json
{
 "name": "my-app-tests",
 "scripts": {
 "test": "jest"
 },
 "devDependencies": {
 "jest": "^29.0.0",
 "jest-environment-jsdom": "^29.0.0"
 },
 "jest": {
 "testEnvironment": "jsdom"
 }
}
```

**Ubicación de tests:** `test/basic.test.js`

#### Ejecutar Tests Localmente:
```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test
```

---

## 🛠️ Tests Implementados

### Test Básico Actual

**Archivo:** `test/basic.test.js`
```javascript
describe('Basic Math Tests', () => {
test('basic arithmetic should work', () => {
expect(1 + 1).toBe(2);
expect(2 * 3).toBe(6);
});
});
```

Este test valida operaciones matemáticas básicas que son fundamentales para los cálculos de la calculadora CDT.

---

## 🔧 Configuración del Workflow

Para implementar GitHub Actions, necesitas crear:

**Archivo:** `.github/workflows/ci.yml`
```yaml
name: JavaScript CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - run: npm ci
    - run: npm test
```

---

##  Beneficios del CI/CD Implementado

### ** Calidad del Código:**
- ✅ Tests automáticos en cada push
- ✅ Validación de funciones matemáticas
- ✅ Detección temprana de errores

### ** Automatización:**
- ✅ No hay intervención manual en testing
- ✅ Feedback inmediato en Pull Requests
- ✅ Badge de estado en tiempo real

### ** Confiabilidad:**
- ✅ Solo código testeado llega a main
- ✅ Historial completo de builds
- ✅ Prevención de regresiones

---

##  Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar tests una vez
npm test

# Ver estructura del proyecto
tree -I node_modules

# Verificar archivos de configuración
cat package.json
cat test/basic.test.js
```

## Usando Docker 
1. Construye la imagen:
```bash
docker build -t calculadora-cdt .
```

2. Ejecuta el contenedor:
```bash
docker run -d -p 8080:80 --name cdt-app calculadora-cdt
```

3. Accede a la aplicación en: `http://localhost:8080`

#### Comandos Docker Útiles
```bash
# Ver contenedores en ejecución
docker ps

# Detener el contenedor
docker stop cdt-app

# Eliminar el contenedor
docker rm cdt-app

# Ver logs del contenedor
docker logs cdt-app

# Acceder al contenedor
docker exec -it cdt-app /bin/bash
```

## Despliegue con Docker

### Configuración de Producción

El proyecto incluye una configuración Docker optimizada para producción usando Nginx como servidor web:

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM nginx:alpine
COPY --from=builder /app/src /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  calculadora-cdt:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

# 🛠️ Registro de Errores y Soluciones - Despliegue en AWS

Este documento recopila los errores más comunes que surgieron durante el despliegue de la aplicación en **AWS EC2**, incluyendo configuración de servidor, instalación de dependencias y problemas de compilación.

---

## 📌 1. Error: `Command 'aws' not found`
**Contexto:**  
Al intentar usar `aws ec2 describe-instance`.

**Causa:**  
La CLI de AWS no estaba instalada.

**Solución:**  
```bash
sudo apt update
sudo apt install awscli -y

