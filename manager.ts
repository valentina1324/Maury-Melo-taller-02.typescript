import { BaseEmployee } from './BaseEmployee';
import { Department, User } from '../interfaces/types';

/*
 * Clase Manager: Extiende de BaseEmployee, con lógica salarial específica.
 */
export class Manager extends BaseEmployee {
  // Propiedad única: tamaño del equipo que gestiona.
  private teamSize: number;

  /*
   * Constructor del Gerente. Recibe el departamento específico y el tamaño del equipo.
   */
  constructor(user: User, id: number, department: Department, teamSize: number) {
    // 1. Llama al constructor del padre (super) para inicializar las propiedades heredadas.
    // A diferencia del Developer, el Manager usa el 'department' que se le pasa.
    super(user, id, department); 
    
    // 2. Inicializa la propiedad específica del Manager.
    this.teamSize = teamSize;
  }

  /*
   * Implementación de getDetails (Cumple la promesa abstracta): Retorna la información específica del gerente.
  
   */
  getDetails(): string {
    // Se accede a las propiedades protegidas heredadas (this.id, this.name, etc.)
    return ` 
      --- Gerente --- 
      ID: ${this.id}, Nombre: ${this.name} (${this.age} años)
      Puesto: Gerente (Departamento: ${this.department})
      Email: ${this.email}
      Tamaño del Equipo: ${this.teamSize}
    `;
  } // mejor formateo para la salida en consola

  /*
   * Implementación de calculateSalary (Cumple la promesa abstracta): Salario base + extra por equipo.
   * Salario base 4000 + 300 por cada miembro del equipo.
   */
  //metodo que calcula el salario
  calculateSalary(): number {
    const SALARY_BASE = 4000;
    const BONUS_PER_MEMBER = 300;
    
    // Calcula el salario: Salario base + (tamaño del equipo * bono)
    // Se asegura de que el teamSize sea al menos 0 para evitar bonos negativos.
    const validTeamSize = Math.max(0, this.teamSize); // Evita valores negativos 

    return SALARY_BASE + (validTeamSize * BONUS_PER_MEMBER);//retorna el salario total por cada miembro del equipo
  }
}
    
