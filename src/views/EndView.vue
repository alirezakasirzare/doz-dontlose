<template>
  <Infobox />

  <div class="center h-full">
    <!-- start card of end game -->
    <div class="card card-primary">
      <!-- title of the card -->
      <div class="card-title" ref="title"></div>
      <!-- body of the card -->
      <div class="card-body">
        <p ref="body"></p>
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
  data() {
    return {
      status: this.$store.state.statusGame,
    };
  },
  mounted() {
    if (this.status == "win") {
      this.$refs.title.innerHTML = "پیروزی";
      this.$refs.body.innerHTML =
        "شما پیروز شدید و یک امتیاز به حساب شما اضافه شد";
    } else if (this.status == "lose") {
      this.$refs.title.innerHTML = "باخت";
      this.$refs.body.innerHTML =
        "شما باختید  و یک امتیاز به حساب رقیب شما اضافه شد";
    } else {
      this.$refs.title.innerHTML = "مساوی";
      this.$refs.body.innerHTML = "بازی مساوی شد";
    }
  },
  methods: {
    continueClicked() {
      this.$store.commit("clearStatus");
      this.$store.commit("chnageTurn", "me");
      this.$router.push("/");
    },
    restartClicked() {
      this.$store.commit("clearStatus");
      this.$store.commit("chnageTurn", "me");
      this.$store.commit("restartScores");
      this.$router.push("/");
    },
  },
};
</script>
