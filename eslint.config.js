// eslint.config.js (ESLint v9 flat config)
export default [
  {
    files: ["assets/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script", // your script is loaded via <script>, not as a module
      globals: {
        window: "readonly",
        document: "readonly",
        alert: "readonly",
        emailjs: "readonly"
      }
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn",
      "no-extra-semi": "warn"
    }
  }
];
