//classe developer que hereda de BaseEmployee e implementa los métodos abstractos
/*odelar a un empleado que es Desarrollador, heredando todas las propiedades básicas de una persona (User)
 y de un empleado base (BaseEmployee), pero añadiendo su propia lógica especializada.
*/
import { BaseEmployee } from './BaseEmployee';
import { Department, User } from '../interfaces/types';

/*
 * Clase Developer: Extiende de BaseEmployee, con lógica salarial específica.
 */
export class Developer extends BaseEmployee { //hereda de BaseEmployee
  private programmingLanguages: string[];

  /*
   * Constructor del Desarrollador. Siempre se asigna al departamento IT para un Developer y se inicializan los lenguajes.
   */
  constructor(user: User, id: number, languages: string[]) {
    // TODO: Implementar - siempre será del departamento IT

    // 1. Llama al constructor del padre (super) e impone el departamento IT.
    super(user, id, Department.IT); 
    
    // 2. Inicializa la propiedad específica del Developer.
    this.programmingLanguages = languages;//arreglo de strings y se asigna al atributo
  }

  /*
   * Implementación de getDetails: Retorna la información específica del desarrollador.
   */
  getDetails(): string {
    // TODO: Retornar información del desarrollador
    // Usamos las propiedades heredadas y la específica de Developer para formar la cadena y retornarla
    return `
      ID: ${this.id}, Nombre: ${this.name} (${this.age} años)
      Puesto: Desarrollador (Departamento: ${this.department})
      Email: ${this.email}
      Lenguajes: ${this.programmingLanguages.join(', ')}
    `;
  }

  /*
   * Implementación de calculateSalary: Salario base + extra por lenguajes.
   * Salario base 3000 + 200 por cada lenguaje.
   */
  calculateSalary(): number {// metodo que calcula el salario
    // TODO: Salario base 3000 + 200 por cada lenguaje
    // constantes para el cálculo
    const SALARY_BASE = 3000;
    const BONUS_PER_LANGUAGE = 200;
    // La longitud del arreglo de lenguajes nos da la cantidad.
    return SALARY_BASE + (this.programmingLanguages.length * BONUS_PER_LANGUAGE);//retorna el salario total
  }
}

