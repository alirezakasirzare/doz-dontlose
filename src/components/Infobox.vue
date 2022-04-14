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
  data() {
    return {
      points: "",
      interval: null,
    };
  },
  methods: {
    handelPoint() {
      this.points = this.points === "..." ? "" : this.points + ".";

      if (this.turn == "me") {
        this.$refs["info-turn"].innerHTML = "من";
      } else if (this.turn == "enemy") {
        this.$refs["info-turn"].innerHTML = ` رقیب${this.points}`;
      } else {
        this.$refs["info-turn"].innerHTML = "اتمام";
      }
    },
  },
  mounted() {
    this.interval = setInterval(this.handelPoint, 300);
  },
  unmounted() {
    clearInterval(this.interval);
  },
};
</script>
