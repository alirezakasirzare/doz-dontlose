<template>
  <!-- info box -->
  <Infobox />
  <!-- start layout of doz -->
  <div class="center h-full">
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
