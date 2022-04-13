<template>
  <main class="doz">
    <!-- row up -->
    <div class="doz-item my"></div>
    <div class="doz-item"></div>
    <div class="doz-item"></div>

    <!-- row middle -->
    <div class="doz-item"></div>
    <div class="doz-item enemy"></div>
    <div class="doz-item"></div>

    <!-- row down -->
    <div class="doz-item"></div>
    <div class="doz-item"></div>
    <div class="doz-item"></div>
  </main>
</template>

<style lang="scss" scoped>
// doz template
.doz {
  display: flex;
  width: 500px;
  height: 500px;
  flex-wrap: wrap;

  // doz items
  &-item {
    width: calc(100% / 3);
    height: calc(100% / 3);
    border-left: 1px solid #bdbdbd;
    border-bottom: 1px solid #bdbdbd;
    transition: 0.4s ease background;
    position: relative;

    &:hover:not(.enemy):not(.my) {
      background-color: #f5f5f5;
      cursor: pointer;
    }

    // delete border of last children
    &:nth-child(3n) {
      border-left: none;
    }

    &:nth-child(n + 7) {
      border-bottom: none;
    }

    // my choose
    &.my::after {
      content: "";
      border: 5px solid #4caf50;
      border-radius: 50%;
      @include be-middle;
      width: 50%;
      height: 50%;
    }
    // enemy choose
    &.enemy::after,
    &.enemy::before {
      content: "";
      @include be-middle;

      width: 5px;
      height: 60%;
      background-color: #f44336;
    }

    &.enemy::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &.enemy::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
</style>
