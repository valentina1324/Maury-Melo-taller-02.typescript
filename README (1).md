  # Taller #2: TypeScript Fundamentals 👤

**Modalidad:** Individual
**Fecha de entrega:** 28 de septiembre, 2025
**Calificación:** 0.0 a 5.0

## 🎯 Objetivo del Taller

Desarrollar habilidades fundamentales en TypeScript aplicando conceptos de tipos, interfaces, clases, herencia e inyección de dependencias para crear un sistema básico de gestión de empleados.

## 📚 Competencias a Evaluar

- Configuración básica de proyectos TypeScript
- Definición de tipos e interfaces
- Implementación de clases y herencia
- Inyección de dependencias básica
- Consumo de APIs externas con TypeScript

## 📋 Enunciado

### Parte 1: Configuración del Proyecto (1.0 puntos)

**Situación:** Vas a crear un sistema simple de gestión de empleados que consulta información de usuarios desde una API externa.

#### Actividades:

1. **Configuración Básica** (1.0 puntos)
   - Inicializa un proyecto Node.js con TypeScript
   - Configura `tsconfig.json` básico
   - Instala las dependencias necesarias: `typescript`, `ts-node`, `@types/node`
   - Agrega script `dev` en `package.json` para ejecutar con `ts-node`

### Parte 2: Definición de Tipos e Interfaces (1.0 puntos)

2. **Interfaces Básicas** (1.0 puntos)

   ```typescript
   // Define las siguientes interfaces:

   interface User {
     name: string;
     age: number;
     email: string;
     gender: string;
   }

   interface Employee extends User {
     id: number;
     position: string;
     department: string;
     salary: number;
   }

   enum Department {
     IT = "IT",
     HR = "HR",
     SALES = "SALES",
     MARKETING = "MARKETING",
   }
   ```

### Parte 3: Clases y Herencia (2.0 puntos)

3. **Clase Base Employee** (1.0 puntos)

   ```typescript
   abstract class BaseEmployee {
     protected id: number;
     protected name: string;
     protected age: number;
     protected email: string;
     protected gender: string;
     protected department: Department;

     constructor(user: User, id: number, department: Department) {
       // TODO: Implementar constructor
     }

     abstract getDetails(): string;
     abstract calculateSalary(): number;
   }
   ```

4. **Clases Derivadas** (1.0 puntos)

   ```typescript
   class Developer extends BaseEmployee {
     private programmingLanguages: string[];

     constructor(user: User, id: number, languages: string[]) {
       // TODO: Implementar - siempre será del departamento IT
     }

     getDetails(): string {
       // TODO: Retornar información del desarrollador
     }

     calculateSalary(): number {
       // TODO: Salario base 3000 + 200 por cada lenguaje
     }
   }

   class Manager extends BaseEmployee {
     private teamSize: number;

     constructor(user: User, id: number, department: Department, teamSize: number) {
       // TODO: Implementar
     }

     getDetails(): string {
       // TODO: Retornar información del manager
     }

     calculateSalary(): number {
       // TODO: Salario base 4000 + 300 por cada miembro del equipo
     }
   }
   ```

### Parte 4: Inyección de Dependencias y API (2.0 puntos)

5. **Servicio de API** (1.0 puntos)

   ```typescript
   class ApiService {
     private apiUrl = "https://dummyjson.com/users";

     async getUsers(): Promise<User[]> {
       // TODO: Hacer fetch a la API y mapear solo name, age, email, gender
       // Usar try-catch para manejo de errores
     }

     async getUserById(id: number): Promise<User | null> {
       // TODO: Obtener un usuario específico de la API
     }
   }
   ```

6. **Servicio de Empleados con Inyección** (1.0 puntos)

   ```typescript
   class EmployeeService {
     private employees: BaseEmployee[] = [];

     constructor(private apiService: ApiService) {
       // TODO: Inyectar ApiService
     }

     async loadEmployeesFromApi(): Promise<void> {
       // TODO: Cargar usuarios desde API y convertir algunos a empleados
       // Crear 2 developers y 1 manager usando los datos de la API
     }

     getEmployeeById(id: number): BaseEmployee | undefined {
       // TODO: Buscar empleado por ID
     }

     getAllEmployees(): BaseEmployee[] {
       // TODO: Retornar todos los empleados
     }

     addEmployee(employee: BaseEmployee): void {
       // TODO: Agregar nuevo empleado
     }
   }
   ```

### Parte 5: Aplicación Principal (1.0 puntos)

7. **Archivo main.ts** (1.0 puntos)

   ```typescript
   // main.ts - Punto de entrada de la aplicación
   async function main(): Promise<void> {
     try {
       // TODO: Crear instancias de los servicios (inyección de dependencias)
       const apiService = new ApiService();
       const employeeService = new EmployeeService(apiService);

       // TODO: Cargar empleados desde la API
       await employeeService.loadEmployeesFromApi();

       // TODO: Mostrar información de todos los empleados
       const employees = employeeService.getAllEmployees();

       console.log("=== SISTEMA DE EMPLEADOS ===");
       // TODO: Mostrar detalles y salarios de cada empleado
     } catch (error) {
       console.error("Error:", error);
     }
   }

   main();
   ```

## 📝 Entregables

### Entregables Específicos:

1. **Repositorio GitHub público** que contenga:

   - Estructura del proyecto funcionando
   - Código TypeScript compilando sin errores
   - README.md del proyecto con instrucciones
   - Historial de commits visible

2. **Estructura del proyecto**:

   ```
   taller-02-typescript/
   ├── src/
   │   ├── interfaces/
   │   │   └── types.ts
   │   ├── classes/
   │   │   ├── BaseEmployee.ts
   │   │   ├── Developer.ts
   │   │   └── Manager.ts
   │   ├── services/
   │   │   ├── ApiService.ts
   │   │   └── EmployeeService.ts
   │   └── main.ts
   ├── package.json
   ├── tsconfig.json
   └── README.md
   ```

3. **Capturas de pantalla** (en carpeta `screenshots/`):

   - Terminal mostrando `npm run dev` ejecutándose
   - Salida del programa mostrando empleados cargados
   - Código compilando sin errores de TypeScript

4. **Documentación** (`DESARROLLO.md`):
   - Explicación de cada clase implementada
   - Descripción de la inyección de dependencias usada
   - Dificultades encontradas y cómo se resolvieron

## 🎯 Criterios de Evaluación

| Criterio                   | Excelente (5.0)                                         | Sobresaliente (4.0-4.9)                      | Aceptable (3.0-3.9)            | Insuficiente (0.0-2.9)                |
| -------------------------- | ------------------------------------------------------- | -------------------------------------------- | ------------------------------ | ------------------------------------- |
| **Configuración TS**       | Proyecto configurado correctamente, compila sin errores | Configuración correcta con errores menores   | Configuración básica funcional | No compila o configuración errónea    |
| **Tipos e Interfaces**     | Interfaces bien definidas, tipos correctos              | Buena implementación de tipos básicos        | Implementación básica correcta | Errores en definición de tipos        |
| **Clases y Herencia**      | Herencia implementada correctamente, métodos abstractos | Buena implementación de clases               | Clases básicas funcionando     | Errores en herencia o clases          |
| **Inyección Dependencias** | Inyección clara y bien implementada                     | Buena implementación de servicios            | Servicios básicos funcionando  | No implementa inyección correctamente |
| **Consumo de API**         | API integrada correctamente, manejo de errores          | API funcionando con manejo básico de errores | API consumida básicamente      | No funciona o errores críticos        |

## 🚀 Retos Adicionales (Puntos Extra)

### Reto 1: Validaciones (+0.3 puntos)

Agrega validaciones básicas:

- Validar email con regex simple
- Validar que la edad sea positiva
- Validar que el salario no sea negativo

### Reto 2: Más Tipos de Empleados (+0.4 puntos)

Crea una nueva clase:

- `Intern` que extienda `BaseEmployee`
- Salario fijo de 1000
- Método especial `getInternshipDuration()`

### Reto 3: Persistencia Simple (+0.3 puntos)

Implementa funciones para:

- Guardar empleados en un archivo JSON
- Cargar empleados desde archivo JSON

## 💡 Recursos de Apoyo

### Comandos esenciales:

```bash
# Configuración inicial
npm init -y
npm install -D typescript @types/node ts-node

# Inicializar TypeScript
npx tsc --init

# Desarrollo
npm run dev        # ts-node src/main.ts
npm run build      # tsc (opcional)
```

### Configuración básica tsconfig.json:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Ejemplo de package.json scripts:

```json
{
  "scripts": {
    "dev": "ts-node src/main.ts",
    "build": "tsc"
  }
}
```

## ⏰ Fechas Importantes

- **Fecha de publicación:** 21 de septiembre, 2025
- **Fecha límite consultas:** 26 de septiembre, 2025
- **Fecha de entrega:** 28 de septiembre, 2025

## 📧 Forma de Entrega

### Requisitos Obligatorios:

1. **Repositorio GitHub público** con:

   - Nombre del repositorio: `[tu-apellido]-taller02-typescript`
   - Estructura de carpetas como se especifica arriba
   - README.md del proyecto con instrucciones de ejecución
   - Código funcionando sin errores de compilación
   - Historial de commits visible

2. **Capturas de pantalla** (en carpeta `screenshots/`):

   - Terminal mostrando `npm run dev` ejecutándose correctamente
   - Salida del programa con empleados cargados desde la API
   - Evidencia de que el código compila sin errores

3. **Video demostrativo** (máximo 3 minutos):

   - Muestra la ejecución del programa funcionando
   - Explica brevemente las clases implementadas
   - Demuestra la inyección de dependencias
   - Sube el video al repositorio o comparte enlace

4. **Documentación DESARROLLO.md**:
   - Explicación personal de cada parte implementada
   - Descripción de la herencia utilizada
   - Cómo implementaste la inyección de dependencias
   - Dificultades encontradas y soluciones

### 📧 Envío:

- Envía el enlace del repositorio GitHub al correo del curso
- Formato del email:
  - Asunto: "Taller #2 - [Tu Nombre Completo]"
  - Contenido: URL del repositorio + enlace al video
- Verificar que el repositorio sea completamente público antes de enviar

**¡Éxito en tu segundo taller con TypeScript!** 🎉
