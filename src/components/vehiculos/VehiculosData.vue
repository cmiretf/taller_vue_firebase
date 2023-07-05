<template>
  <div>
    Número de vehiculos {{ numeroCoches + numeroMotos }} <br />
    <br />
    <br />
    <button @click="$router.push({ name: 'management' })">Ir a management</button>
    <br />
    <br />
    <select v-model="selectedItem">
      <option v-for="item in itemList" v-bind:key="item.marca" :value="item">{{ item.marca + ' C-' + item.importeCoche + '€, M-' + item.importeMoto + '€' }}</option>
    </select>
    <div v-if="selectedItem">
      <h3>Marca seleccionada:</h3>
      <p>Nombre: {{ selectedItem.marca }}</p>
      <p>Importe unidad Coche: {{ selectedItem.importeCoche }}€</p>
      <p>Importe unidad Moto: {{ selectedItem.importeMoto }}€</p>
      <br />
      <br />
      Precio total Coches: {{ numeroCoches }}uds x  {{ selectedItem.importeCoche }}€ = {{ precioCoches }}€ <br />
      Precio total Motos: {{ numeroMotos }}uds x  {{ selectedItem.importeMoto }}€ = {{ precioMotos }}€ <br />
      Precio Total: {{ precioTotal }}€ <br />
      <br />
      <br />
      <CochesData @numeroCochesEvento="updateNumeroCoches" />
      <br />
      <br />
      <MotosData @numeroMotosEvento="updateNumeroMotos" />
    </div>
  </div>
</template>

<script>
import CochesData from "@/components/vehiculos/CochesData";
import MotosData from "@/components/vehiculos/MotosData";

export default {
  components: {
    CochesData,
    MotosData,
  },
  data() {
    return {
      numeroCoches: null,
      numeroMotos: null,
      itemList: [
        { marca: "Suzuki", importeMoto: 10, importeCoche: 20 },
        { marca: "Honda", importeMoto: 100, importeCoche: 200 },
        { marca: "BMW", importeMoto: 1000, importeCoche: 2000  },
      ],
      selectedItem: null,
    };
  },
  computed: {
    precioCoches() {
      return this.numeroCoches * this.selectedItem.importeCoche;
    },
    precioMotos() {
      return this.numeroMotos * this.selectedItem.importeMoto;
    },
    precioTotal() {
      return this.precioCoches + this.precioMotos;
    },
  },
  methods: {
    updateNumeroCoches(newValue) {
      this.numeroCoches = newValue;
    },
    updateNumeroMotos(newValue) {
      this.numeroMotos = newValue;
    },
  },
};
</script>

<style lang="scss" scoped></style>
