// "Salajased" väärtused, mida päriselus ei tohi nii hoida:
const HARDCODED_ADMIN_USER = "admin";
const HARDCODED_ADMIN_PASS = "SuperSecret123!";

// Fake API "võti" – õpilased võivad seda otsida
const FAKE_API_KEY = "API_KEY_DEMO_123456789";

console.log("%cDev debug:", "font-weight:bold;", "Ära jäta selliseid logisid tootmisesse.");
console.log("Fake API key:", FAKE_API_KEY);
    //    password: SuperSecret123!
const { createApp } = Vue;

createApp({
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  computed: {
    messageColor() {
      return this.message === "Tere, admin!" ? "green" : "red";
    }
  },
  methods: {
    login() {
      // Näidis halvasti tehtud login – ainult õppetööks!
      if (this.username === HARDCODED_ADMIN_USER && this.password === HARDCODED_ADMIN_PASS) {
        this.message = "Tere, admin!";
      } else {
        this.message = "Vale kasutajanimi või parool.";
      }
    }
  }
}).mount("#app");
