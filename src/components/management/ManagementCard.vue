<template>
  <div>
    <h2>Contabilidad del Concesionario</h2>
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Descripción</th>
          <th>Ingresos</th>
          <th>Egresos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(registro, index) in registros" :key="index">
          <td>{{ registro.fecha }}</td>
          <td>{{ registro.descripcion }}</td>
          <td>{{ registro.ingresos }}</td>
          <td>{{ registro.egresos }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Vehículos</h2>
    <table>
      <thead>
        <tr>
          <th>Marca</th>
          <th>Modelo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in $store.state.vehicles" :key="index">
          <td>{{ item.marca }}</td>
          <td>{{ item.modelo }}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />
    <br />
    <input type="text" v-model="marca" placeholder="Marca del vehículo" />
    <input type="text" v-model="modelo" placeholder="Modelo del vehículo" />
    <button @click="añadirVehiculo()">Añadir vehiculo</button>
  </div>
</template>

<script>
import { addVehicle } from "@/services/vehiculos";

export default {
  data() {
    return {
      marca: "",
      modelo: "",
      registros: [],
      vehiculos: [],
    };
  },
  async mounted() {
    console.log("this.$store------>");
    console.log(this.$store);
  },
  created() {
    this.generarRegistros();
  },
  methods: {
    async añadirVehiculo() {
      await addVehicle({
        userId: this.$store.state.user.uid,
        marca: this.marca,
        modelo: this.modelo,
      });
      this.marca = "";
      this.modelo = "";
    },
    generarRegistros() {
      // Generar datos aleatorios de contabilidad
      for (let i = 0; i < 10; i++) {
        const registro = {
          fecha: this.generarFecha(),
          descripcion: this.generarDescripcion(),
          ingresos: this.generarNumeroAleatorio(1000, 5000),
          egresos: this.generarNumeroAleatorio(500, 2000),
        };
        this.registros.push(registro);
      }
    },
    generarFecha() {
      const fecha = new Date();
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();
      return `${dia}/${mes}/${año}`;
    },
    generarDescripcion() {
      const descripciones = [
        "Venta de vehículo",
        "Gastos de mantenimiento",
        "Pago de impuestos",
        "Servicios de financiamiento",
        "Gastos de publicidad",
        "Pago de sueldos",
        "Inversión en inventario",
        "Reparaciones de vehículos",
        "Pago de proveedores",
        "Gastos administrativos",
      ];
      const indice = this.generarNumeroAleatorio(0, descripciones.length - 1);
      return descripciones[indice];
    },
    generarNumeroAleatorio(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>
