// taller-02-typescript/src/classes/BaseEmployee.ts
import { Department, User } from '../interfaces/types';

/*
 * Clase abstracta que sirve como plantilla base para todos los tipos de empleados.
 * Contiene propiedades comunes y define métodos que deben ser implementados.
 */
export abstract class BaseEmployee { //esta aqui para que otras clases la hereden
  // Propiedades protegidas: solo accesibles dentro de la clase y sus derivadas.
  protected id: number;
  protected name: string;
  protected age: number;
  protected email: string;
  protected gender: string;
  protected department: Department;

  /*
   * Constructor de la clase base.
   * Recibe un objeto User para inicializar las propiedades comunes.
   */
  constructor(user: User, id: number, department: Department) {
    // TODO: Implementar constructor

    // 1. Asignar las propiedades de la interfaz User
    // Usamos el objeto 'user' para obtener los datos básicos
    //this es una referencia a la instancia actual de la clase
    this.name = user.name;
    this.age = user.age;
    this.email = user.email;
    this.gender = user.gender;

    // 2. Asignar las propiedades específicas de BaseEmployee
    this.id = id;
    this.department = department;
  }

  /*
   * Método abstracto: Debe ser implementado por todas las clases derivadas.
   * Retorna una cadena con los detalles específicos del empleado.
   * Getter usado para acceder a una propiedad privada o protegida desde fuera de la clase
   */
  abstract getDetails(): string;

  /*
   * Método abstracto: Debe ser implementado por todas las clases derivadas.
   * Calcula y retorna el salario del empleado.
   */
  abstract calculateSalary(): number;
  
  /*
   * Getter para obtener el nombre completo (visualización).
   */
  public getName(): string {
      return this.name;
  }

  /*
   * Getter para obtener el ID del empleado.
   */
  public getId(): number {
      return this.id;
  }
}
//este codigo define una clase abstracta BaseEmployee que sirve como plantilla para otros tipos de empleados, asegurando que todas las clases derivadas implementen ciertos métodos y propiedades comunes.
//la clase tiene propiedades protegidas, un constructor para inicializarlas y métodos abstractos que deben ser implementados por las clases hijas para proporcionar detalles específicos y calcular el salario.

