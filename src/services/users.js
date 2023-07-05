export async  function getUserRol(){
  return new Promise(resolve => {
    setTimeout(() => {
      const rol = 'admin'
      resolve(rol);
    }, 2000); // Espera 2 segundos (2000 milisegundos) antes de devolver el resultado
  });
}