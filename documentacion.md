Taller #2: TypeScript Fundamentals - Documentación del Desarrollo
Este documento explica las decisiones de diseño y la implementación de las clases, la herencia, y el uso de la inyección de dependencias en mi proyecto de gestión de empleados. ¡Aquí cuento cómo lo hice!

1. Explicación de las Clases que Implementé
Mi objetivo principal era usar la herencia para que todos los empleados fueran consistentes. Por eso, mi sistema se basa en una jerarquía que arranca con una clase abstracta para forzar el cumplimiento de ciertas reglas (esto es polimorfismo, ¡lo logramos!).

1.1. BaseEmployee (Mi Clase Abstracta)
Archivo: src/classes/BaseEmployee.ts

Propósito: Esta fue mi plantilla maestra. Al ser abstracta, me aseguré de que nadie pudiera crear un BaseEmployee directamente. Solo sirve para que mis clases hijas hereden de ella y añadan la lógica específica.

Herencia: En el constructor, tomo los datos de la interfaz User (nombre, edad, email) y defino las propiedades base de cualquier empleado (id, department). Las hice protected para que mis clases Developer y Manager pudieran acceder a ellas.

Contrato Polimórfico: Lo crucial aquí es que declaré abstract getDetails() y abstract calculateSalary(). Así, obligué a que el Developer y el Manager definan su propia manera de calcular el sueldo, cumpliendo el mismo contrato.

1.2. Developer (Mi Clase Derivada)
Archivo: src/classes/Developer.ts

Propósito: Modela el rol de desarrollador con su propia lógica de negocio.

Lógica Específica:

Para simplificar, decidí que un desarrollador siempre va al departamento Department.IT. Lo impuse directamente en el constructor, sin importar lo que viniera de la API.

Le añadí la propiedad privada programmingLanguages: string[], que es única para ellos.

Implementación de calculateSalary(): Su salario es fácil: tomo el base ($3000) y le sumo un bono de $200 por cada lenguaje de programación que domina.

1.3. Manager (Mi Clase Derivada)
Archivo: src/classes/Manager.ts

Propósito: Modela al gerente, que tiene una responsabilidad diferente.

Lógica Específica:

A diferencia del desarrollador, el gerente sí puede estar en cualquier departamento (HR, SALES, etc.), así que lo asigno dinámicamente al llamar a super().

Su propiedad privada especial es teamSize: number, que representa el equipo que supervisa.

Implementación de calculateSalary(): Su base es más alta ($4000), y le doy un bono de $300 por cada persona en el teamSize.

2. Descripción de la Inyección de Dependencias (ID) que Usé
Implementé la Inyección de Dependencias para que mi lógica de negocio no dependiera directamente de cómo se obtienen los datos. Quería que los servicios fueran intercambiables.

2.1. El Patrón que Apliqué
Dependencia (ApiService): Esta clase es mi capa de infraestructura. Su única responsabilidad es comunicarse con el mundo exterior (la API de dummyjson.com).

Clase Dependiente (EmployeeService): Esta es mi capa de negocio. Necesita los datos de la API para crear los objetos Developer y Manager, pero no le interesa cómo ApiService consigue esos datos.

Inyección: En lugar de hacer un new ApiService() dentro de EmployeeService (lo que sería un acoplamiento súper fuerte), le pasé la instancia de ApiService a través del constructor.

2.2. Mi Implementación en EmployeeService.ts
// En EmployeeService.ts
export class EmployeeService {
  // ...
  constructor(private apiService: ApiService) {
    // ¡Me encanta esta sintaxis de TypeScript!
    // Al poner 'private' en el argumento, TypeScript crea automáticamente
    // la propiedad privada 'this.apiService' y le asigna el valor.
  }

  async loadEmployeesFromApi(): Promise<void> {
    // Ahora puedo usar la dependencia inyectada sin saber de dónde salió, ¡solo sé que funciona!
    const users: User[] = await this.apiService.getUsers();
    // ...
  }
}


2.3. El Papel de main.ts (Mi Ensamblador)
El archivo main.ts es el lugar donde todo se conecta. Yo lo veo como el "Ensamblador" que crea y conecta las piezas:

// En main.ts
const apiService = new ApiService();
const employeeService = new EmployeeService(apiService); // <-- ¡Aquí inyecto!


La Gran Ventaja: Si un día cambiamos de API o pasamos a usar una base de datos local, solo tengo que crear un nuevo servicio (ej. DatabaseService) y pasarlo aquí en main.ts. ¡El EmployeeService ni se entera! Eso es desacoplamiento.

3. Dificultades que Encontré y Cómo las Resolví
¡El tema de las APIs siempre da guerra! Además del mapeo, tuve un par de dificultades más:

Dificultad 1: Mapear la Respuesta de la API (El Problema de los Nombres)
La API que usé (dummyjson.com) me devolvía los nombres separados (firstName y lastName), pero mi interfaz local User solo esperaba un campo name: string.

Mi Solución: Lo resolví en el ApiService. Al recibir los datos, implementé un mapeo explícito donde transformo el objeto de la API (ApiUserResponse) a mi interfaz User local. Hice la concatenación ahí mismo:

// Lógica de mapeo dentro de ApiService.getUsers()
const user: User = { 
    name: `${apiUser.firstName} ${apiUser.lastName}`, // Combiné los nombres aquí
    age: apiUser.age,
    // ...
};


Dificultad 2: El Reto de las Llamadas Asíncronas y Errores (El Tema de la API)
Lo que más me costó de la API no fue solo obtener los datos, sino manejar la asincronía (async/await) y los posibles errores de red o de la API misma. Si la red fallaba o la API devolvía un 404, el programa se rompía.

Mi Solución: Usé bloques try...catch en el método principal de la llamada a la API (ApiService.getUsers()) y en el punto de ejecución (main.ts).

En ApiService, si Axios lanzaba un error (ej. Timeout), lo capturé y retorné un array vacío ([]), lo que es una forma segura de decirle al EmployeeService que no hay datos, sin romper el programa.

En main.ts, el try...catch final asegura que, si ocurre cualquier error no controlado, al menos el usuario vea un mensaje útil en la consola en lugar de un stack trace feo.

Dificultad 3: Asegurar la Inicialización de la Clase Base
Al crear los constructores de Developer y Manager, necesitaba asegurarme de que todas las propiedades base (como name, age, email) se inicializaran correctamente antes de empezar con las propiedades específicas.

Mi Solución: Usé la palabra clave super(). En todas mis clases derivadas, la primera llamada dentro del constructor es a super(). Esto garantiza que el constructor de BaseEmployee se ejecute primero, inicializando todos los datos de User y las propiedades protegidas. Esto fue clave para que el polimorfismo funcionara correctamente.