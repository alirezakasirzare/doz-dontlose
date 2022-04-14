<template>
  <Infobox />

  <div class="center h-full">
    <!-- start card of end game -->
    <div class="card card-primary">
      <!-- title of the card -->
      <div class="card-title">پیروزی</div>
      <!-- body of the card -->
      <div class="card-body">
        <p>شما پیروز شدید و یک امتیاز به حساب شما اضافه شد</p>
      </div>
      <!-- footer of the card -->
      <div class="card-footer">
        <button class="btn btn-dark" @click="continueClicked">
          ادامه بازی
        </button>
        <button class="btn btn-danger" @click="restartClicked">
          ریستارت بازی
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Infobox from "@/components/Infobox.vue";
export default {
  components: {
    Infobox,
  },
  methods: {
    continueClicked() {
      this.$store.commit("chnageTurn", "me");
      this.$router.push("/");
    },
    restartClicked() {
      this.$store.commit("chnageTurn", "me");
      this.$store.commit("restartScores");
      this.$router.push("/");
    },
  },
};
</script>
