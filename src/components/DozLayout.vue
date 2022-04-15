<template>
  <!-- doz layout -->
  <main class="doz">
    <!-- items -->
    <div
      class="doz-item"
      v-for="(item, index) in items"
      :key="index"
      @click="
        () => {
          clickItemHandeler(index);
        }
      "
      :class="{ [`${item}`]: item, 'can-hover': turn == 'me' }"
    ></div>
  </main>
</template>

<script>
const initialItems = () => [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

const arrayContain = (chooses, should) => {
  let willBack = true;
  should.forEach((item) => {
    if (!chooses.includes(item)) {
      willBack = false;
    }
  });

  return willBack;
};

const checkEndGame = (chooses) => {
  return (
    arrayContain(chooses, [1, 2, 3]) ||
    arrayContain(chooses, [4, 5, 6]) ||
    arrayContain(chooses, [7, 8, 9]) ||
    arrayContain(chooses, [1, 4, 7]) ||
    arrayContain(chooses, [2, 5, 8]) ||
    arrayContain(chooses, [3, 6, 9]) ||
    arrayContain(chooses, [1, 5, 9]) ||
    arrayContain(chooses, [3, 5, 7])
  );
};

function stopWinInLastMoveModule(chooses, base) {
  let ShouldChoose = false;
  const checke = chooses.reduce(
    (previousValue, currentValue) =>
      base.indexOf(currentValue) >= 0 ? previousValue + 1 : previousValue,
    0
  );

  if (checke === 2) {
    ShouldChoose = base.find((item) => chooses.indexOf(item) < 0);
  }

  return ShouldChoose;
}
function stopWinInLastMove(chooses, items) {
  const checker =
    stopWinInLastMoveModule(chooses, [1, 2, 3]) ||
    stopWinInLastMoveModule(chooses, [4, 5, 6]) ||
    stopWinInLastMoveModule(chooses, [7, 8, 9]) ||
    stopWinInLastMoveModule(chooses, [1, 4, 7]) ||
    stopWinInLastMoveModule(chooses, [2, 5, 8]) ||
    stopWinInLastMoveModule(chooses, [3, 6, 9]) ||
    stopWinInLastMoveModule(chooses, [1, 5, 9]) ||
    stopWinInLastMoveModule(chooses, [3, 5, 7]);

  console.log(checker);
  if (checker === false) {
    return false;
  } else if (items[checker - 1] === null) {
    return checker;
  } else {
    return false;
  }
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
        newItems[index] = "me";
        this.items = newItems;
        this.myChooses = [...this.myChooses, index];
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
        // step one -> chose the middle item
        let index;
        if (notChoosedYet.indexOf(4) >= 0) {
          console.log("if");
          index = 4;
        } else if (
          stopWinInLastMove(
            [...this.myChooses].map((item) => item + 1),
            [...this.items]
          ) !== false
        ) {
          console.log("slam");
          index =
            stopWinInLastMove(
              [...this.myChooses].map((item) => item + 1),
              [...this.items]
            ) - 1;
        } else {
          console.log("else");
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

  // doz items
  &-item {
    width: calc(100% / 3);
    height: calc(100% / 3);
    border-left: 1px solid #bdbdbd;
    border-bottom: 1px solid #bdbdbd;
    transition: 0.4s ease background;
    position: relative;

    // hover of items of doz layout
    &.can-hover:hover:not(.enemy):not(.me) {
      background-color: #eee;
      cursor: pointer;
    }

    // delete border of last children
    &:nth-child(3n) {
      border-left: none;
    }

    &:nth-child(n + 7) {
      border-bottom: none;
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
}
</style>
