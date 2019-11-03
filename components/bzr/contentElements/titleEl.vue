<template>
  <h4>{{ dataEl.content }}</h4>
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
