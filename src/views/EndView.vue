<template>
  <div class="center h-full">
    <div class="card card-primary">
      <div class="card-title">پیروزی</div>
      <div class="card-body">
        شما پیروز شدید و یک امتیاز به حساب شما اضافه شد
      </div>
      <div class="card-footer">
        <router-link to="/" class="btn btn-dark">ادامه بازی</router-link>

        <router-link to="/" class="btn btn-danger"
          >اتمام بازی و برگشت به خانه</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 500px;
  border-radius: 4px;
  color: #1a1a1a;

  &.card-primary {
    background-color: #90caf9;
  }
  &.card-danger {
    background-color: #f44336;
  }
  &.card-mute {
    background-color: #bdbdbd;
  }
  &-title {
    padding: 10px;
    border-bottom: #bbdefb 1px solid;
    font-weight: bold;
    font-size: 18px;
  }
  &-body {
    padding: 10px;
  }
  &-footer {
    padding: 10px;
  }
}

.btn {
  padding: 3px 10px;
  margin: 3px;
  border: none;
  text-decoration: none;
  border-radius: 4px;
  font-size: 15px;
  &.btn-dark {
    background-color: #263238;
    color: #fff;
  }
  &.btn-danger {
    background-color: #f44336;
    color: #fff;
  }
}
</style>
