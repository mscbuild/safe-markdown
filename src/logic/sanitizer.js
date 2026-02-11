const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');
const { marked } = require('marked');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Конфигурация по принципу наименьших привилегий
const SANITIZE_CONFIG = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2', 'code', 'pre'],
  ALLOWED_ATTR: ['href', 'target', 'rel'],
  KEEP_CONTENT: true,
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z0-9+.-]|(?:[a-z0-9+.-]+(?:[^a-z0-9+.-:]|$)))/i, // Блокирует javascript:
};

export const processMarkdown = (rawInput) => {
  if (typeof rawInput !== 'string') return '';
  
  // 1. Конвертация Markdown -> HTML
  const rawHtml = marked.parse(rawInput, { headerIds: false, mangle: false });
  
  // 2. Глубокая очистка
  return DOMPurify.sanitize(rawHtml, SANITIZE_CONFIG);
};
