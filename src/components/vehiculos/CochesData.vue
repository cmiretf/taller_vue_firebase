<template>
  <div>
    Número de Coches Hijo {{ numeroCoches}}<br/>
  </div>
</template>

<script>
import { getCoches } from '@/services/vehiculos'
  export default {
    mounted () {
      this.numeroCoches = getCoches()
    },
   data() {
    return {
      numeroCoches: 0
    }
   },
   watch: {
    numeroCoches(newValue) {
      console.log('lanzando evento numeroCoches');
      this.$emit('numeroCochesEvento', newValue)
    }
   },
  }
</script>

<style lang="scss" scoped>

</style>