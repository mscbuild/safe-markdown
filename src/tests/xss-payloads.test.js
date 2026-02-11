const { processMarkdown } = require('../logic/sanitizer');

describe('Глубокое тестирование на устойчивость к XSS-векторам', () => {
  
  // Список реальных векторов атак (Payloads)
  const xssPayloads = [
    {
      name: 'Image onerror attack',
      input: '<img src=x onerror=alert(1)>',
      forbidden: 'onerror'
    },
    {
      name: 'Markdown Link javascript protocol',
      input: '[click me](javascript:alert("xss"))',
      forbidden: 'javascript:'
    },
    {
      name: 'SVG Animation attack',
      input: '<svg/onload=alert(1)>',
      forbidden: '<svg'
    },
    {
      name: 'Iframe injection',
      input: '<iframe src="javascript:alert(1)"></iframe>',
      forbidden: '<iframe'
    },
    {
      name: 'Encoded XSS pattern',
      input: '<img src=x one&#114;ror=alert(1)>',
      forbidden: 'onerror'
    },
    {
      name: 'Body onload',
      input: '<body onload=alert(1)>',
      forbidden: '<body'
    }
  ];

  xssPayloads.forEach(({ name, input, forbidden }) => {
    test(`Payload: ${name}`, () => {
      const output = processMarkdown(input);
      
      // Логируем для наглядности в консоли при запуске тестов
      // console.log(`Input: ${input} -> Output: ${output}`);
      
      // Проверяем, что опасная подстрока отсутствует в итоговом HTML
      const containsForbidden = output.toLowerCase().includes(forbidden.toLowerCase());
      expect(containsForbidden).toBe(false);
      
      // Дополнительная проверка: результат не должен содержать исполняемый скрипт
      expect(output).not.toMatch(/<script/i);
    });
  });

  test('Должен предотвращать обход через двойное кодирование', () => {
    const doubleEncoded = '&lt;script&gt;alert(1)&lt;/script&gt;';
    const output = processMarkdown(doubleEncoded);
    expect(output).not.toContain('<script>');
  });
});
