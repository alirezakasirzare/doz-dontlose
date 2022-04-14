<template>
  <!-- info box -->
  <div class="listgroup">
    <!-- turn -->
    <div class="listgroup-item">
      <span> نوبت : </span>
      <span ref="info-turn"></span>
    </div>
    <!-- my score -->
    <div class="listgroup-item">
      <span>امتیاز من : </span>
      <span v-text="myScore"></span>
    </div>
    <!-- enemy score -->
    <div class="listgroup-item">
      <span> امتیاز رقیب : </span>
      <span v-text="enemyScore"></span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    turn() {
      return this.$store.state.turn;
    },
    myScore() {
      return this.$store.state.myScore;
    },
    enemyScore() {
      return this.$store.state.enemyScore;
    },
  },
  mounted() {
    let points = "";
    setInterval(() => {
      points = points === "..." ? "" : points + ".";

      if (this.turn == "me") {
        this.$refs["info-turn"].innerHTML = "من";
      } else if (this.turn == "enemy") {
        this.$refs["info-turn"].innerHTML = ` رقیب${points}`;
      } else {
        this.$refs["info-turn"].innerHTML = "اتمام";
      }
    }, 300);
  },
};
</script>
