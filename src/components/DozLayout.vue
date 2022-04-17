<template>
  <!-- doz layout -->
  <main class="doz">
    <!-- items -->
    <div
      class="doz-item"
      v-for="(item, index) in items"
      :key="index"
      :class="{
        [`${item}`]: item,
        'can-hover': turn == 'me',
        'doz-item-success': itemsMakeGameEnd.indexOf(index) >= 0,
      }"
    >
      {{ index }}
    </div>
    <div
      class="doz-click"
      v-for="item in 7"
      :key="item - 1"
      @click="clickItemHandeler(item - 1)"
    ></div>
  </main>
</template>

<script>
import { nextTick } from "@vue/runtime-core";
const checkOurTargetHasInArrayForEndGame = (chooses, should, howMany) => {
  let checker = 0;
  let willReturn = false;
  let itemsMakeGameEnd = [];
  should.forEach((item) => {
    if (chooses.indexOf(item) >= 0) {
      checker++;
      if (!willReturn) {
        itemsMakeGameEnd.push(item);
      }
    } else {
      if (!willReturn) {
        itemsMakeGameEnd = [];
      }
      checker = 0;
    }
    if (checker >= howMany) {
      willReturn = true;
    }
  });

  return willReturn ? itemsMakeGameEnd : false;
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
    for (let index = i; index <= 35 + i; index += 7) {
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

export default {
  data() {
    return {
      items: Array(42).fill(null),
      myChooses: [],
      enemyChooses: [],
      itemsMakeGameEnd: [],
      ignoreForChooseEnemy: [],
    };
  },

  computed: {
    turn() {
      return this.$store.state.turn;
    },
  },
  methods: {
    checkOurTargetHasInArrayForEnemy(
      chooses,
      should,
      howMany,
      items,
      advance = false,
      three = false
    ) {
      let checker = 0;
      let willReturn = false;
      let itemsMakeGameEnd = [];
      should.forEach((item) => {
        if (chooses.indexOf(item) >= 0) {
          checker++;
          if (!willReturn) {
            itemsMakeGameEnd.push(item);
          }
        } else {
          if (!willReturn) {
            itemsMakeGameEnd = [];
          }
          checker = 0;
        }

        if (checker >= howMany) {
          const beforeItem = should[should.indexOf(itemsMakeGameEnd[0]) - 1];
          const nextItem =
            should[
              should.indexOf(itemsMakeGameEnd[itemsMakeGameEnd.length - 1]) + 1
            ];

          if (items[beforeItem] === null || items[nextItem] === null) {
            if (
              advance &&
              items[nextItem] === null &&
              items[beforeItem] === null
            ) {
              const advanceTarget = should[should.indexOf(nextItem) + 1];
              willReturn =
                items[advanceTarget] === "me" ? nextItem : beforeItem;
              if ([...this.ignoreForChooseEnemy].indexOf(willReturn) >= 0) {
                console.info(`dont choose ${willReturn} for ignore`);
                willReturn = false;
              }
            } else {
              willReturn = items[beforeItem] === null ? beforeItem : nextItem;
              if (
                [...this.ignoreForChooseEnemy].indexOf(willReturn) >= 0 &&
                advance
              ) {
                console.info(`dont choose ${willReturn} for ignore`);
                willReturn = false;
              }
            }
            if (items[willReturn + 7] === null) {
              if (three && items[nextItem + 7] === null) {
                if ([...this.ignoreForChooseEnemy].indexOf(nextItem + 7) < 0) {
                  this.ignoreForChooseEnemy.push(nextItem + 7);
                }
              } else if (three && items[beforeItem + 7] === null) {
                this.ignoreForChooseEnemy.push(beforeItem + 7);
              }
              willReturn = false;
            }
          }
        }
      });

      return willReturn;
    },
    checkEndGame(chooses) {
      let willReturn = false;
      [
        ...createItemsWithPatternRow(),
        ...createItemsWithPatternColumn(),
        ...createItemsWithPatternMultiple(),
      ].forEach((row) => {
        const checkWin = checkOurTargetHasInArrayForEndGame(
          [...chooses],
          row,
          4
        );
        if (checkWin) {
          this.itemsMakeGameEnd = checkWin;
          willReturn = true;
        }
      });

      return willReturn;
    },
    chooseEnemyRandom() {
      let willReturn = 0;
      let chooseRandomColumn = 0;
      while (true) {
        chooseRandomColumn = Math.floor(Math.random() * 7);
        if (
          this.items[chooseRandomColumn] === null &&
          !this.ignoreForChooseEnemy.indexOf(chooseRandomColumn) >= 0
        ) {
          break;
        }
      }
      for (
        let i = 6 * 7 - (7 - chooseRandomColumn);
        i >= 0 + chooseRandomColumn;
        i -= 7
      ) {
        if (this.items[i] === null) {
          willReturn = i;
          break;
        }
      }

      return willReturn;
    },
    chooseEnemyWhenTwo() {
      let willReturn = false;
      [
        ...createItemsWithPatternRow(),
        ...createItemsWithPatternColumn(),
        ...createItemsWithPatternMultiple(),
      ].forEach((row) => {
        if (!willReturn) {
          willReturn = this.checkOurTargetHasInArrayForEnemy(
            [...this.myChooses],
            row,
            2,
            [...this.items],
            true
          );
          if (willReturn) {
            console.log("stop win when two");
          }
        }
      });

      return willReturn;
    },
    chooseEnemyWhenFowWin() {
      let willReturn = false;
      [
        ...createItemsWithPatternRow(),
        ...createItemsWithPatternColumn(),
        ...createItemsWithPatternMultiple(),
      ].forEach((row) => {
        if (!willReturn) {
          willReturn = this.checkOurTargetHasInArrayForEnemy(
            [...this.enemyChooses],
            row,
            3,
            [...this.items]
          );
          if (willReturn) {
            console.log("going to win");
          }
        }
      });

      return willReturn;
    },
    chooseEnemyWhenThree() {
      let willReturn = false;
      [
        ...createItemsWithPatternRow(),
        ...createItemsWithPatternColumn(),
        ...createItemsWithPatternMultiple(),
      ].forEach((row) => {
        if (!willReturn) {
          willReturn = this.checkOurTargetHasInArrayForEnemy(
            [...this.myChooses],
            row,
            3,
            [...this.items],
            false,
            true
          );
          if (willReturn) {
            console.log("stop win three");
          }
        }
      });

      return willReturn;
    },
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
        // choose random item
        let index =
          this.chooseEnemyWhenFowWin() ||
          this.chooseEnemyWhenThree() ||
          this.chooseEnemyWhenTwo() ||
          this.chooseEnemyRandom();

        // initial
        newItems[index] = "enemy";
        this.items = newItems;
        this.enemyChooses = [...this.enemyChooses, index];
      }, 1000);
    },
  },
  watch: {
    myChooses(newValue) {
      if (this.checkEndGame([...newValue])) {
        // win
        this.$store.commit("addMyScore");
        this.$store.commit("chnageStatus", "win");
        this.$store.commit("chnageTurn", "end");
      } else if (![...this.items].filter((item) => item === null).length) {
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
      if (this.checkEndGame([...newValue])) {
        // lose
        this.$store.commit("addEnemyScore");
        this.$store.commit("chnageTurn", "end");
        this.$store.commit("chnageStatus", "lose");
      } else if (![...this.items].filter((item) => item === null).length) {
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

    &-success {
      background-color: #607d8b;
    }
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
