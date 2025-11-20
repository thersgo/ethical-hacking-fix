// TAHTLIKULT HALVAD NÄITED – ÕPILASTE LABI JAOKS

// Kõvakodeeritud sisselogimisandmed
const HARDCODED_ADMIN_USER = "admin";
const HARDCODED_ADMIN_PASS = "SuperSecret123!";

// Fake API "võtmed"
const FAKE_API_KEY = "API_KEY_DEMO_123456789";
const FAKE_JWT_TOKEN = "eyFAKE.JWT.TOKEN.123456789";

const demoUsers = [
  {
    username: "admin",
    password: "SuperSecret123!",
    email: "admin@example.com",
    role: "admin",
    personalNote: "Näen kõike, mis süsteemis toimub."
  },
  {
    username: "karl",
    password: "karl123",
    email: "karl@example.com",
    role: "user",
    personalNote: "Meeldib testida asju, mis ei ole minu omad."
  },
  {
    username: "opilane",
    password: "parool",
    email: "student@example.com",
    role: "user",
    personalNote: "Tahan lihtsalt läbi saada..."
  }
];

console.log(
  "%cDev debug:",
  "font-weight:bold;",
  "Ära jäta selliseid logisid tootmisesse."
);
console.log("Fake API key:", FAKE_API_KEY);
console.log("Fake JWT token:", FAKE_JWT_TOKEN);

const { createApp } = Vue;

createApp({
  data() {
    return {
      currentPage: "login",
      username: "",
      password: "",
      message: "",
      loggedInUser: null,
      users: demoUsers,
      apiKey: FAKE_API_KEY,
      jwtToken: FAKE_JWT_TOKEN,
      privateToken: "PRIVATE_TOKEN_ABC_123_SHOULD_NOT_BE_HERE",
      feedbackText: "",
      lastFeedback: "<b>Tere tulemast!</b> See on näidis.",
    };
  },
  computed: {
    messageColor() {
      return this.message === "Tere, admin!" ||
        this.message === "Sisselogimine õnnestus."
        ? "green"
        : "red";
    },
    storedToken() {
      return window.localStorage.getItem("demo_token") || "(puudub)";
    }
  },
  methods: {
    navClass(page) {
      const base =
        "px-3 py-1 text-xs rounded border transition-colors";
      if (this.currentPage === page) {
        return base + " bg-blue-600 text-white border-blue-600";
      }
      return base + " bg-white text-slate-700 border-slate-300 hover:bg-slate-100";
    },
    login() {
      // HOIATUS: see on TAHTLIKULT pealiskaudne & ebaturvaline
      if (
        this.username === HARDCODED_ADMIN_USER &&
        this.password === HARDCODED_ADMIN_PASS
      ) {
        this.message = "Tere, admin!";
        this.loggedInUser = demoUsers[0];
      } else {
        // „Lihtne“ login – leiab esimese kasutaja, kelle andmed klapivad
        const found = this.users.find(
          (u) =>
            u.username === this.username &&
            u.password === this.password
        );

        if (found) {
          this.message = "Sisselogimine õnnestus.";
          this.loggedInUser = found;
        } else {
          this.message = "Vale kasutajanimi või parool.";
          this.loggedInUser = null;
        }
      }

      // Salvestame „tokeni“ localStorage’isse – halb praktika
      if (this.loggedInUser) {
        window.localStorage.setItem("demo_token", FAKE_JWT_TOKEN);
        console.log("Salvestasin localStorage demo_token:", FAKE_JWT_TOKEN);
        // Liigume profiili lehele
        this.currentPage = "profile";
      }
    },
    logout() {
      this.loggedInUser = null;
      this.username = "";
      this.password = "";
      this.message = "";
      window.localStorage.removeItem("demo_token");
      this.currentPage = "login";
    },
    submitFeedback() {
      // TAHTLIK VIGA: salvestame toorandmed ja renderdame v-html abil
      this.lastFeedback = this.feedbackText;
      this.feedbackText = "";
    }
  },
  mounted() {
    // Tahtlikult lekime infot ka mountimisel
    console.log("Rakendus käivitus. Kasutajaid:", this.users.length);
  }
}).mount("#app");
