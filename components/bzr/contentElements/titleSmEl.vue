<template>
  <h5>{{ dataEl.content }}</h5>
</template>

<script>
export default {
  props: {
    dataEl: {
      type: Object,
      default: null
    }
  }
}
</script>
