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
const initialItems = () => Array(42).fill(null);

const arrayContain = (chooses, should) => {
  let willBack = true;
  should.forEach((item) => {
    if (!chooses.includes(item)) {
      willBack = false;
    }
  });

  return willBack;
};

function createItemsWithPatternRow(row) {
  let myArray = [];

  for (let index = 7 * row - 6; index <= 7 * row; index++) {
    myArray.push(index);
  }

  return myArray;
}

const checkEndGame = (chooses) => {
  return (
    arrayContain(chooses, createItemsWithPatternRow(1)) ||
    arrayContain(chooses, createItemsWithPatternRow(2)) ||
    arrayContain(chooses, createItemsWithPatternRow(3)) ||
    arrayContain(chooses, createItemsWithPatternRow(4)) ||
    arrayContain(chooses, createItemsWithPatternRow(5)) ||
    arrayContain(chooses, createItemsWithPatternRow(6))
  );
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
      items: initialItems(),
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
        const notChoosedYet = [...this.items]
          .map((item, index) => {
            if (!item) return index;
          })
          .filter((item) => item !== undefined);

        const newItems = [...this.items];
        let index;
        if (notChoosedYet.indexOf(4) >= 0) {
          // step one -> choose the middle item if not choose yet
          index = 4;
        } else if (
          moveWhenTowItemFileInOneRow(
            [...this.enemyChooses].map((item) => item + 1),
            [...this.items]
          ) !== false
        ) {
          // step two -> choose the right item for win
          index =
            moveWhenTowItemFileInOneRow(
              [...this.enemyChooses].map((item) => item + 1),
              [...this.items]
            ) - 1;
        } else if (
          moveWhenTowItemFileInOneRow(
            [...this.myChooses].map((item) => item + 1),
            [...this.items]
          ) !== false
        ) {
          // step three -> choose the right item for stoping losing
          index =
            moveWhenTowItemFileInOneRow(
              [...this.myChooses].map((item) => item + 1),
              [...this.items]
            ) - 1;
        } else {
          // step three -> choose the random item
          index =
            notChoosedYet[Math.floor(Math.random() * notChoosedYet.length)];
        }
        newItems[index] = "enemy";
        this.items = newItems;
        this.enemyChooses = [...this.enemyChooses, index];
      }, 3000);
    },
  },
  watch: {
    myChooses(newValue) {
      if (checkEndGame(newValue.map((item) => item + 1))) {
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
      if (checkEndGame(newValue.map((item) => item + 1))) {
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
    border: 1px solid #bdbdbd;
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
