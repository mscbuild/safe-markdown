const { processMarkdown } = require('./logic/sanitizer');

// Пример вредоносного ввода
const unsafeInput = `
# My Document
This is safe.
<img src="dummy" onerror="console.log('XSS Attack!')">
[Dangerous Link](javascript:confirm('Are you sure?'))
`;

console.log("--- ИСХОДНЫЙ ТЕКСТ ---");
console.log(unsafeInput);

const safeHtml = processMarkdown(unsafeInput);

console.log("\n--- ОЧИЩЕННЫЙ HTML (БЕЗОПАСНО) ---");
console.log(safeHtml);
