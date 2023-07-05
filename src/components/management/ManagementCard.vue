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
  </div>
</template>

<script>
export default {
  data() {
    return {
      registros: []
    };
  },
  created() {
    this.generarRegistros();
  },
  methods: {
    generarRegistros() {
      // Generar datos aleatorios de contabilidad
      for (let i = 0; i < 10; i++) {
        const registro = {
          fecha: this.generarFecha(),
          descripcion: this.generarDescripcion(),
          ingresos: this.generarNumeroAleatorio(1000, 5000),
          egresos: this.generarNumeroAleatorio(500, 2000)
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
        'Venta de vehículo',
        'Gastos de mantenimiento',
        'Pago de impuestos',
        'Servicios de financiamiento',
        'Gastos de publicidad',
        'Pago de sueldos',
        'Inversión en inventario',
        'Reparaciones de vehículos',
        'Pago de proveedores',
        'Gastos administrativos'
      ];
      const indice = this.generarNumeroAleatorio(0, descripciones.length - 1);
      return descripciones[indice];
    },
    generarNumeroAleatorio(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
</script>
