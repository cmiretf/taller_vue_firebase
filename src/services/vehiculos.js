import {
  Firestore,
  VehiclesCollection /*VehiclesDoc*/,
} from "@/firebase-exports";

import store from "@/store/index";

/**
 * Obtiene un número aleatorio para las motos.
 * @returns {number} Número aleatorio para las motos.
 */
export function getMotos() {
  let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
  return numeroAleatorio;
}

/**
 * Obtiene un número aleatorio para los coches.
 * @returns {number} Número aleatorio para los coches.
 */
export function getCoches() {
  let numeroAleatorio = Math.floor(Math.random() * 10) + 1;
  return numeroAleatorio;
}

/**
 * Agrega un vehículo a la colección de vehículos.
 * @param {Object} data - Datos del vehículo a agregar.
 * @returns {Promise} Promesa que se resuelve cuando se agrega el vehículo.
 */
export async function addVehicle(data) {
  return await Firestore.addDoc(VehiclesCollection(data.userId), {
    marca: data.marca,
    modelo: data.modelo,
  });
}

/**
 * Agrega un coche a la colección de vehículos.
 * @param {Object} data - Datos del coche a agregar.
 * @returns {Promise} Promesa que se resuelve cuando se agrega el coche.
 */
export async function addCoche(data) {
  return await Firestore.addDoc(VehiclesCollection(data.userId), {
    ...data,
  });
}

/**
 * Agrega una moto a la colección de vehículos.
 * @param {Object} data - Datos de la moto a agregar.
 * @returns {Promise} Promesa que se resuelve cuando se agrega la moto.
 */
export async function addMoto(data) {
  return await Firestore.addDoc(VehiclesCollection(data.userId), {
    ...data,
  });
}

/**
 * Establece una suscripción a los cambios en la colección de firmas de un usuario.
 * @param {string} userId - ID del usuario.
 * @returns {function} Función para cancelar la suscripción.
 */
export async function vehiclesSubscription(userId) {
  // Establece una suscripción a los cambios en la colección de firmas del usuario
  const unsub = Firestore.onSnapshot(
    Firestore.query(VehiclesCollection(userId)),
    async (querySnapshot) => {
      // Obtiene los vehículos de los documentos de la consulta
      let vehicles = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const document = doc.data();
          return { id: doc.id, ...document };
        })
      );

      // Guarda los vehículos en el store
      store.commit("setVehicles", vehicles);
    }
  );

  return unsub;
}
