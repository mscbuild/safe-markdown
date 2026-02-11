const { processMarkdown } = require('../logic/sanitizer');

describe('XSS Protection Suite', () => {
  test('Should strip <script> tags', () => {
    const input = 'Normal text <script>alert("xss")</script>';
    const output = processMarkdown(input);
    expect(output).not.toContain('<script>');
    expect(output).toBe('<p>Normal text </p>');
  });

  test('Should remove inline event handlers (onerror)', () => {
    const input = '![alt](x) <img src=x onerror=alert(1)>';
    const output = processMarkdown(input);
    expect(output).not.toContain('onerror');
    expect(output).toContain('<img src="x">');
  });

  test('Should block javascript: protocol in links', () => {
    const input = '[Click Me](javascript:alert("hacked"))';
    const output = processMarkdown(input);
    expect(output).not.toContain('href="javascript:');
  });

  test('Should allow safe HTML from white-list', () => {
    const input = '# Title\n**Bold**';
    const output = processMarkdown(input);
    expect(output).toContain('<h1>Title</h1>');
    expect(output).toContain('<strong>Bold</strong>');
  });
});
