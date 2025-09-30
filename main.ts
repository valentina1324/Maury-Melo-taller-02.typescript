//main.ts es el punto de entrada de la aplicación para gestionar empleados 
// importando los servicios necesarios y ejecutando la lógica principal.
import { ApiService } from './services/apiservice'; 
import { EmployeeService } from './services/EmployeeService';

/**
 * Función principal que ejecuta la lógica de la aplicación (Punto 7).
 */
async function main(): Promise<void> { //la función la usamos para esperar la carga de empleados
  try {
    console.log("=== SISTEMA DE GESTIÓN DE EMPLEADOS ===");
    
    // 1. TODO: Crear instancias de los servicios (Inyección de Dependencias)
    const apiService = new ApiService();
    // Aquí se inyecta apiService en employeeService
    const employeeService = new EmployeeService(apiService); 
    
    console.log("[Main] Servicios inicializados y conectados.");

    // 2. TODO: Cargar empleados desde la API
    console.log("[Main] Solicitando y cargando empleados desde la API...");
    await employeeService.loadEmployeesFromApi();

    // 3. TODO: Mostrar información de todos los empleados
    const employees = employeeService.getAllEmployees();

    console.log("\n=== RESULTADOS: DETALLES Y SALARIOS ===");
    
    if (employees.length === 0) {
        console.log("No se pudieron cargar empleados. Revisa la conexión a la API o los datos de origen.");
        return;
    }
      // Mostrar detalles de cada empleado
      employees.forEach((employee, idx) => {// aqui se itera sobre cada empleado para mostrar su info
        console.log(`Empleado #${idx + 1}:`);
        console.log(employee.getDetails());
        console.log(`Salario: $${employee.calculateSalary()}`);
        console.log('-----------------------------');
      });
    } catch (error) {// Manejo de errores en la función principal
      console.error("[Main] Error en la ejecución:", error);
    }
  }

  // Ejecutar la función principal
  main();
