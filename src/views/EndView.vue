<template>
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
        <router-link to="/" class="btn btn-dark">ادامه بازی</router-link>
        <router-link to="/" class="btn btn-danger">ریستارت بازی</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// start card
.card {
  width: 500px;
  border-radius: 4px;
  color: #1a1a1a;

  // card colors
  &.card-primary {
    background-color: #90caf9;
  }
  &.card-danger {
    background-color: #f44336;
  }
  &.card-mute {
    background-color: #bdbdbd;
  }
  // title of the card
  &-title {
    padding: 10px;
    border-bottom: #bbdefb 1px solid;
    font-weight: bold;
    font-size: 18px;
  }
  // body and footer of the card
  &-body,
  &-footer {
    padding: 10px;
  }
}
</style>
