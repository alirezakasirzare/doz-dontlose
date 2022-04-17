<template>
  <!-- doz layout -->
  <main class="doz">
    <!-- items -->
    <div
      class="doz-item"
      v-for="(item, index) in items"
      :key="index"
      :class="{ [`${item}`]: item, 'can-hover': turn == 'me' }"
    >
      {{ index }}
    </div>
    <div
      class="doz-click"
      v-for="item in 7"
      :key="item - 1"
      @click="clickItemHandeler(item - 1)"
      v-text="item - 1"
    ></div>
  </main>
</template>

<script>
const checkOurTargetHasInArray = (chooses, should, howMany) => {
  let checker = 0;
  let willReturn = false;
  should.forEach((item) => {
    checker = chooses.indexOf(item) >= 0 ? checker + 1 : 0;
    if (checker === howMany) {
      willReturn = true;
    }
  });

  return willReturn;
};

function createItemsWithPatternRow() {
  let myAllArray = [];

  for (let i = 1; i < 7; i++) {
    let MyRowArray = [];
    for (let index = 7 * i - 7; index < 7 * i; index++) {
      MyRowArray.push(index);
    }

    myAllArray.push(MyRowArray);
  }

  return myAllArray;
}

function createItemsWithPatternColumn() {
  let myAllArray = [];

  for (let i = 0; i < 7; i++) {
    let MyRowArray = [];
    for (let index = i; index <= 41 - (6 - i) * i; index += 7) {
      MyRowArray.push(index);
    }

    myAllArray.push(MyRowArray);
  }

  return myAllArray;
}
function createItemsWithPatternMultiple() {
  let myAllArray = [];

  for (let i = 1; i < 4; i++) {
    let MyRowArray = [];
    for (let index = i; index <= 41 - (i - 1) * 7; index += 8) {
      MyRowArray.push(index);
    }

    myAllArray.push(MyRowArray);
  }

  for (let i = 38; i <= 40; i++) {
    let MyRowArray = [];
    for (let index = i; index >= (40 - i) * 7; index -= 8) {
      MyRowArray.push(index);
    }

    myAllArray.push(MyRowArray);
  }

  for (let i = 5; i >= 3; i--) {
    let MyRowArray = [];
    for (let index = i; index <= 35 - (5 - i) * 7; index += 6) {
      MyRowArray.push(index);
    }

    myAllArray.push(MyRowArray);
  }

  for (let i = 36; i <= 38; i++) {
    let MyRowArray = [];
    for (let index = i; index >= (i - 35) * 7 - 1; index -= 6) {
      MyRowArray.push(index);
    }

    myAllArray.push(MyRowArray);
  }

  return myAllArray;
}
const checkEndGame = (chooses) => {
  let willReturn = false;
  [
    ...createItemsWithPatternRow(),
    ...createItemsWithPatternColumn(),
    ...createItemsWithPatternMultiple(),
  ].forEach((row) => {
    const checkWin = checkOurTargetHasInArray(chooses, row, 4);
    if (checkWin) {
      willReturn = true;
    }
  });

  return willReturn;
};

function moveWhenTowItemFileInOneRowModule(chooses, base, items) {
  let ShouldChoose = false;
  const checke = chooses.reduce(
    (previousValue, currentValue) =>
      base.indexOf(currentValue) >= 0 ? previousValue + 1 : previousValue,
    0
  );

  if (checke === 2) {
    ShouldChoose = base.find((item) => chooses.indexOf(item) < 0);

    if (items[ShouldChoose - 1] === null) {
      return ShouldChoose;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function moveWhenTowItemFileInOneRow(chooses, items) {
  const checker =
    moveWhenTowItemFileInOneRowModule(
      chooses,
      createItemsWithPatternRow(1),
      items
    ) ||
    moveWhenTowItemFileInOneRowModule(
      chooses,
      createItemsWithPatternRow(2),
      items
    ) ||
    moveWhenTowItemFileInOneRowModule(
      chooses,
      createItemsWithPatternRow(3),
      items
    ) ||
    moveWhenTowItemFileInOneRowModule(
      chooses,
      createItemsWithPatternRow(4),
      items
    ) ||
    moveWhenTowItemFileInOneRowModule(
      chooses,
      createItemsWithPatternRow(5),
      items
    ) ||
    moveWhenTowItemFileInOneRowModule(
      chooses,
      createItemsWithPatternRow(6),
      items
    );

  return checker;
}

export default {
  data() {
    return {
      items: Array(42).fill(null),
      myChooses: [],
      enemyChooses: [],
    };
  },

  computed: {
    turn() {
      return this.$store.state.turn;
    },
  },
  methods: {
    clickItemHandeler(index) {
      if (this.turn === "me" && !this.items[index]) {
        const newItems = [...this.items];
        for (let i = 6 * 7 - (7 - index); i >= 0 + index; i -= 7) {
          if (this.items[i] === null) {
            newItems[i] = "me";
            this.items = newItems;
            this.myChooses = [...this.myChooses, i];
            break;
          }
        }
      }
    },
    enemyChoose() {
      setTimeout(() => {
        const newItems = [...this.items];
        let index = Math.floor(Math.random() * 7);
        while (this.items[index] !== null) {
          index = Math.floor(Math.random() * 7);
        }
        for (let i = 6 * 7 - (7 - index); i >= 0 + index; i -= 7) {
          if (this.items[i] === null) {
            newItems[i] = "enemy";
            this.items = newItems;
            this.enemyChooses = [...this.enemyChooses, i];
            break;
          }
        }
      }, 1000);
    },
  },
  watch: {
    myChooses(newValue) {
      if (checkEndGame([...newValue])) {
        // win
        this.$store.commit("addMyScore");
        this.$store.commit("chnageStatus", "win");
        this.$store.commit("chnageTurn", "end");
      } else if (!this.items.filter((item) => item === null).length) {
        // Equal
        this.$store.commit("chnageStatus", "equal");
        this.$store.commit("chnageTurn", "end");
      } else {
        if (newValue.length) {
          this.$store.commit("chnageTurn", "enemy");

          this.enemyChoose();
        }
      }
    },
    enemyChooses(newValue) {
      if (false) {
        // lose
        this.$store.commit("addEnemyScore");
        this.$store.commit("chnageTurn", "end");
        this.$store.commit("chnageStatus", "lose");
      } else if (!this.items.filter((item) => item === null).length) {
        // Equal
        this.$store.commit("chnageStatus", "equal");
        this.$store.commit("chnageTurn", "end");
      } else {
        this.$store.commit("chnageTurn", "me");
      }
    },
    turn(newValue) {
      if (newValue === "end") {
        setTimeout(() => {
          this.$router.push("/endofgame");
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// doz template
.doz {
  display: flex;
  width: 500px;
  height: 500px;
  flex-wrap: wrap;

  @media screen and (max-width: 500px) {
    width: 300px !important;
    height: 300px !important;
  }

  // doz items
  &-item {
    width: calc(100% / 7);
    height: calc(100% / 7);
    border-left: 1px solid #bdbdbd;
    border-bottom: 1px solid #bdbdbd;
    position: relative;

    // delete border of last children
    &:nth-child(7n) {
      border-left: none;
    }

    // my choose icon
    &.me::after {
      content: "";
      border: 5px solid #4caf50;
      border-radius: 50%;
      @include be-middle;
      width: 50%;
      height: 50%;
    }
    // enemy choose icon
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
  // doz click
  .doz-click {
    width: calc(100% / 7);
    height: calc(100% / 7);
    background-color: #2196f3;
    border-right: 1px solid #bdbdbd;
    user-select: none;
    @extend .center;
    color: #eee;
    cursor: pointer;
    transition: 0.4s ease background;
    &:hover {
      background-color: #1e88e5;
    }
    &:active {
      background-color: #1565c0;
    }
  }
}
</style>
