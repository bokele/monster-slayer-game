const { createApp } = Vue;

function getRandomValue(min, max) {
  const attackValue = Math.floor(Math.random() * (max - min)) + min;
  return attackValue;
}

const app = createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStryles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStryles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "palyer";
      }
    },
  },
  methods: {
    startNewGame() {
      this.currentRound = 0;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackplayer();
    },
    attackplayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth = this.playerHealth - attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.addLogMessage("palyer", "special-attack", attackValue);
      this.attackplayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      const tampValue = this.playerHealth + healValue;
      if (tampValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = tampValue;
      }
      this.addLogMessage("player", "heal", attackValue);
      this.attackplayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
