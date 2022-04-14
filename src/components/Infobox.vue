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
      <span>امتیاز من :</span>
      <span>12</span>
    </div>
    <!-- enemy score -->
    <div class="listgroup-item">
      <span> امتیاز رقیب :</span>
      <span>44</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    turn() {
      return this.$store.state.turn;
    },
  },
  mounted() {
    let points = "";
    setInterval(() => {
      points = points === "..." ? "" : points + ".";
      this.$refs["info-turn"].innerHTML = `${
        this.turn == "me" ? "من" : "رقیب"
      } ${this.turn == "enemy" ? points : ""}`;
    }, 300);
  },
};
</script>
