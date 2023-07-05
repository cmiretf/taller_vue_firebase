<template>
  <div>
    Número de Motos Hijo {{ numeroMotos}}<br/>
  </div>
</template>

<script>
import { getMotos } from '@/services/vehiculos'
  export default {
    mounted () {
      this.numeroMotos = getMotos()
    },
   data() {
    return {
      numeroMotos: 0
    }
   },
   watch: {
    numeroMotos(newValue) {
      this.$emit('numeroMotosEvento', newValue)
    }
   },
  }
</script>

<style lang="scss" scoped>

</style>