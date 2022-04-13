<template>
  <!-- info box -->
  <div class="infobox">
    <!-- turn -->
    <div class="infobox-item">
      <span>نوبت :</span>
      <span>من</span>
    </div>
    <!-- my score -->
    <div class="infobox-item">
      <span>امتیاز من :</span>
      <span>12</span>
    </div>
    <!-- enemy score -->
    <div class="infobox-item">
      <span> امتیاز رقیب :</span>
      <span>44</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// info box styles
.infobox {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #2196f3;
  color: #fff;
  min-width: 200px;
  border-radius: 4px;

  // item of info box
  &-item {
    padding: 10px;
    font-size: 17px;
    border-bottom: 1px solid rgba(238, 238, 238, 0.173);
  }
}
</style>
