//Servicio de Empleados con Inyección 
//aqui importamos las clases y tipos necesarios para gestionar empleados
import { ApiService } from './apiservice';
import { BaseEmployee } from '../classes/BaseEmployee';
import { Developer } from '../classes/Developer';
import { Manager } from '../classes/manager';
import { Department, User } from '../interfaces/types';

/**
 * Clase EmployeeService: Gestiona la lista de empleados y la lógica de negocio.
 * Utiliza ApiService (inyectado) para obtener datos.
 */
export class EmployeeService {
  private employees: BaseEmployee[] = [];

  /**
   * Constructor con Inyección de Dependencias.
   * @param apiService La instancia de ApiService inyectada.
   */
  constructor(private apiService: ApiService) {
    // La inyección se resuelve con la declaración 'private apiService: ApiService' para crear una propiedad y asignarla automáticamente.
  }

  /**
   * Carga usuarios desde la API, convierte los primeros tres en empleados y los guarda.
   */
  async loadEmployeesFromApi(): Promise<void> {
    try {
      // 1. Obtener la lista de usuarios de la API (usando la dependencia inyectada)
      const users: User[] = await this.apiService.getUsers();

      if (users.length >= 3) {
        // 2. Crear instancias concretas de empleados usando los datos de la API:
        
        // Empleado 1: Developer
        const user1 = users[0];
        if (user1) {
          this.employees.push(
            new Developer(user1, 1001, ['TypeScript', 'Node.js', 'React'])
          );
        }
        
        // Empleado 2: Developer
        const user2 = users[1];
        if (user2) {
          this.employees.push(
            new Developer(user2, 1002, ['Python', 'Django'])
          );
        }

        // Empleado 3: Manager (Departamento HR, Equipo de 5 personas)
        const user3 = users[2];
        if (user3) {
          this.employees.push(
            new Manager(user3, 2001, Department.HR, 5)
          );
        }

        console.log(`[Service] Se cargaron ${this.employees.length} empleados específicos.`);
      } else {
        console.warn("[Service] La API no devolvió suficientes usuarios para crear los empleados requeridos.");
      }
    } catch (error) {
      console.error("[Service Error] Fallo al cargar empleados desde la API:", error);
    }
  }

  /**
   * Retorna una copia de todos los empleados cargados.
   */
  getAllEmployees(): BaseEmployee[] { 
    return [...this.employees]; // Retornar una copia para evitar modificaciones externas
  }

  /**
   * Busca y retorna un empleado por su ID.
   */
  getEmployeeById(id: number): BaseEmployee | undefined { //retorna un empleado o undefined si no lo encuentra
    return this.employees.find(emp => emp.getId() === id);
  }

  /**
   * Agrega un nuevo empleado a la lista interna.
   */
  addEmployee(employee: BaseEmployee): void { 
    // Evitar añadir si el ID ya existe 
    if (!this.employees.some(emp => emp.getId() === employee.getId())) {
        this.employees.push(employee);
        console.log(`[Service] Empleado ID ${employee.getId()} agregado.`);
    } else {
        console.warn(`[Service] No se pudo agregar: El ID ${employee.getId()} ya existe.`); // Evita IDs duplicados
    }
  }
}
//