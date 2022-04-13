<template>
  <!-- info box -->
  <Infobox />
  <div class="center h-full">
    <!-- start template of doz -->
    <DozLayout />
  </div>
</template>

<script>
import Infobox from "@/components/Infobox.vue";
import DozLayout from "@/components/DozLayout.vue";
export default {
  components: {
    Infobox,
    DozLayout,
  },
};
</script>
