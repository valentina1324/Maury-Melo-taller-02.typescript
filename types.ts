// Parte 2: Definición de Tipos e Interfaces
// Define las siguientes interfaces:

interface User { //contrato que cualquier objeto debe seguir y define un nuevo tipo de dato
  name: string;//propiedad de la interfaz
  age: number;
  email: string;
  gender: string;
}
//cualquier variable tipeada user debe tener esas 4 propiedades
// Interfaz es una estructura que define la forma de un objeto

interface Employee extends User { //herecia de la propiedad user, incluye todo lo que esta ahi y agrega las nuevas propiedades
  id: number; //propiedad extra y propiedad unica de employee
  position: string;
  department: string;
  salary: number;
}
// un objeto empoyee debe tener 8 propiedades las 4 de user y las 4 propias de employee

enum Department { // usada cuando una propiedad tiene un conjunto limitado de valores posibles
  IT = "IT",//propiedad de la enumeracion 
  HR = "HR",
  SALES = "SALES",
  MARKETING = "MARKETING",
}
//enum es una forma de definir un conjunto de constantes con nombre

// Exportar las interfaces y enum para que puedan ser usadas en otros archivos
export { User, Employee, Department };
