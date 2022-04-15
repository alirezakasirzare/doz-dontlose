<template>
  <!-- info box -->
  <Infobox />
  <!-- start layout of doz -->
  <div class="center height-manager">
    <DozLayout />
  </div>
</template>

<script>
// import components
import Infobox from "@/components/Infobox.vue";
import DozLayout from "@/components/DozLayout.vue";
export default {
  components: {
    Infobox,
    DozLayout,
  },
};
</script>

<style lang="scss" scoped>
.height-manager {
  height: calc(100vh - 150px);
}
</style>
