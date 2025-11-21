// TAHTLIKULT HALVAD NÄITED – ÕPILASTE LABI JAOKS

// Fake API "võtmed"
const FAKE_API_KEY = "API_KEY_DEMO_123456789";
const FAKE_JWT_TOKEN = "eyFAKE.JWT.TOKEN.123456789";

var demoUsers;

async function getData() {
  try {
    const response = await fetch("./users.json");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    demoUsers = await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

// TODO: this is dumb and bad;
// can the users data get updated once it's ready, not having to stop the
// rest of the site in its tracks first? or should there be a loading screen?
getData().then(() => {
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
            ? "green" : "red";
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
        // „Lihtne“ login – leiab esimese kasutaja, kelle andmed klapivad
        const found = this.users.find(
          (u) =>
            u.username === this.username &&
            u.password === this.password
        );

        if (found) {
          this.message = found.role == "admin"
            ? "Tere, admin!" : "Sisselogimine õnnestus.";
          this.loggedInUser = found;
        } else {
          this.message = "Vale kasutajanimi või parool.";
          this.loggedInUser = null;
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
    }
  }).mount("#app");
})