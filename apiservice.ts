//Servicio de API
//importamos axios y la interfaz user para tipar los datos obtenidos de la API
import axios from 'axios';// Importa axios para hacer peticiones HTTP a la API para consumir datos y mapearlos a la interfaz User
import { User } from '../interfaces/types'; // Importa la interfaz User de la Parte 2 para tipar los datos obtenidos de la API

/*
 * Interfaz interna para el objeto de usuario de la API dummyjson.
 */
interface ApiUserResponse { // Define la estructura de los datos que esperamos recibir de la API
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    gender: 'male' | 'female';
    // Otros campos de la API pueden ser añadidos si es necesario
}
/*
 * Interfaz para la respuesta completa de la API.
 */
interface ApiListResponse {// Define la estructura de la respuesta cuando obtenemos una lista de usuarios
    users: ApiUserResponse[];// Array de usuarios para mapear a la interfaz User
    total: number;
    skip: number;
    limit: number;
}


/*
 * Clase ApiService: Encargada de comunicarse con la API externa (dummyjson).
 */
export class ApiService { //export para que pueda ser usada en otros archivos
  // URL base de la API
  private apiUrl = "https://dummyjson.com/users";

  /*
   * Obtiene la lista de usuarios de la API y los mapea a la interfaz User.
   */
  async getUsers(): Promise<User[]> { // Promesa que resuelve a un array de usuarios tipados como User para asegurar que los datos cumplen con la estructura esperada
    try {
      // Petición a la API, tipando la respuesta esperada
      const response = await axios.get<ApiListResponse>(this.apiUrl + '?limit=10'); // Limita a 10 usuarios para no sobrecargar la respuesta
      const apiUsers = response.data.users; // Extrae el array de usuarios de la respuesta

      // Mapear los datos de la API al formato User
      const users: User[] = apiUsers.map(apiUser => ({ // Mapea cada usuario de la API a la interfaz User
        name: `${apiUser.firstName} ${apiUser.lastName}`, // Combinar nombre y apellido
        age: apiUser.age,
        email: apiUser.email,
        gender: apiUser.gender,
      }));

      console.log(`[API] ${users.length} usuarios mapeados y listos.`); // Loguea la cantidad de usuarios obtenidos y mapeados
      return users; // Retorna el array de usuarios

    } catch (error) { // Manejo de errores en caso de fallo en la petición
      if (axios.isAxiosError(error)) { // Verifica si el error es de tipo Axios
        console.error(`[API ERROR] Error de red al obtener usuarios: ${error.message}`);
      } else {
        console.error("[API ERROR] Error inesperado:", error);
      }
      return []; // Retornar array vacío en caso de error
    }
  } 
  /*aqui se realizo la peticion a la api y se mapearon los datos a la interfaz User ademas de 
     manejar errores y loguear informacion util para debugging que ayuda a entender el flujo de datos
     y posibles fallos en la comunicacion con la API*/

  /*
   * Obtiene un usuario específico de la API por su ID.
   */
  async getUserById(id: number): Promise<User | null> { // Promesa que resuelve a un usuario tipado como User o null si no se encuentra
    try {
      const response = await axios.get<ApiUserResponse>(`${this.apiUrl}/${id}`); // Petición a la API para un usuario específico por ID
      const apiUser = response.data;
      
      const user: User = { 
          name: `${apiUser.firstName} ${apiUser.lastName}`,
          age: apiUser.age,
          email: apiUser.email,
          gender: apiUser.gender,
      };
      
      return user;// Retorna el usuario mapeado
    } catch (error) { // Manejo de errores
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.error(`[API ERROR] Usuario con ID ${id} no encontrado.`);
        } else {
            console.error(`[API ERROR] Error al obtener usuario por ID ${id}:`, error);
        }
        return null;
    }
  }
}
// esto es un servicio que abstrae la logica de comunicacion con la API y el mapeo de datos
// facilita la reutilizacion y el mantenimiento del codigo al centralizar esta funcionalidad en una sola clase