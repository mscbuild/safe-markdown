# 🛡️ SafeMarkdown — An editor with XSS protection

## 🌟 Key Security Features

- **Defense in Depth**: Uses two-stage processing – parsing via `marked` and deep sanitization via `DOMPurify`.
- **Allowlist Strategy**: Implemented a strict whitelist of allowed HTML tags and attributes.
- **Protocol Filtering**: Automatically blocks dangerous URI schemes such as `javascript:`, `data:`, and `vbscript:`.
- **SAST Integration**: Code is checked by the `eslint-plugin-security` static analyzer for patterns vulnerable to injection.

## 🛠️ Stack
- **Engine**: Node.js / ES6+
- **Security**: DOMPurify, ESLint Security Plugin
- **CI/CD**: GitHub Actions (Security Linting & Jest)

## 📁 Project structure
~~~bash
safe-markdown/
├── .github/workflows/security.yml  # CI/CD pipeline (SAST)
├── src/
│   ├── logic/
│   │   └── sanitizer.js           # Core: Parsinг + DOMPurify
│   ├── tests/
│   │   └── security.test.js       # Testing for XSS vulnerabilities
│   └── index.js                   # Entry point (UI logic)
├── .eslintrc.json                 # Config with security plugin
├── package.json
└── README.md                      # Documentation
~~~

## 🧪 Security Testing
The project includes a set of tests simulating real XSS vectors:

1.Run `npm install`

2.Run tests: `npm test`

3.View the cleanup result: `npm start`
