<template>
  <div v-html="$md.render(dataEl.content)"></div>
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
