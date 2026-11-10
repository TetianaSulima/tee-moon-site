(() => {
  'use strict';

  const STORAGE_KEY = 'teeMoonLanguage';

  // Английский текст -> украинский перевод.
  const translations = {
    'HOME': 'ГОЛОВНА',
    'BIO': 'БІОГРАФІЯ',
    'CV': 'РЕЗЮМЕ',
    'ARTIST STATEMENT': 'ТВОРЧА ЗАЯВА',
    'PORTFOLIO': 'ПОРТФОЛІО',
    'SERIES 1': 'СЕРІЯ 1',
    'SERIES 2': 'СЕРІЯ 2',
    'SERIES 3': 'СЕРІЯ 3',
    'SERIES 4': 'СЕРІЯ 4',
    'SERIES 5': 'СЕРІЯ 5',
    'SERIES 6': 'СЕРІЯ 6',
    'SERIES 7': 'СЕРІЯ 7',
    'SERIES 8': 'СЕРІЯ 8',
    'PUBLICATIONS': 'ПУБЛІКАЦІЇ',
    'EXHIBITIONS': 'ВИСТАВКИ',
    'PRINTS': 'ПРИНТИ',
    'ART + FASHION': 'МИСТЕЦТВО + МОДА',
    'CONTACT': 'КОНТАКТИ',
    'FOLLOW ME': 'СЛІДКУЙТЕ ЗА МНОЮ',
    'SUBSCRIBE TO OUR EMAIL': 'ПІДПИШІТЬСЯ НА РОЗСИЛКУ',
    'SUBSCRIBE': 'ПІДПИСАТИСЯ',
    'SEND': 'НАДІСЛАТИ',
    'VIEW ALL': 'ПЕРЕГЛЯНУТИ ВСЕ',
    'CONTACT ME': "ЗВ'ЯЗАТИСЯ ЗІ МНОЮ",
    'Email': 'Електронна пошта',
    'Name': "Ім'я",
    'Phone number': 'Номер телефону',
    'Message': 'Повідомлення'
  };

  const reverseTranslations = Object.fromEntries(
    Object.entries(translations).map(([en, uk]) => [uk, en])
  );

  // Храним исходный текст отдельно, чтобы можно было корректно вернуться на английский.
  const originalText = new WeakMap();
  let currentLanguage = 'en';
  let isApplying = false;

  function translateTextNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE || !node.parentElement) return;
    if (node.parentElement.closest('script, style, noscript, textarea, input, select, option')) return;

    if (!originalText.has(node)) originalText.set(node, node.nodeValue);

    const original = originalText.get(node);
    const trimmed = original.trim();
    if (!trimmed) return;

    let translated = original;
    if (currentLanguage === 'uk') {
      if (translations[trimmed]) {
        translated = original.replace(trimmed, translations[trimmed]);
      }
    } else if (reverseTranslations[trimmed]) {
      translated = original.replace(trimmed, reverseTranslations[trimmed]);
    }

    if (node.nodeValue !== translated) node.nodeValue = translated;
  }

  function translateElement(root) {
    if (!root) return;

    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE && root !== document) return;

    const walker = document.createTreeWalker(
      root === document ? document.body : root,
      NodeFilter.SHOW_TEXT
    );

    let node;
    while ((node = walker.nextNode())) translateTextNode(node);

    const elements = [];
    if (root.nodeType === Node.ELEMENT_NODE) elements.push(root);
    if (root.querySelectorAll) elements.push(...root.querySelectorAll(
      'input[placeholder], textarea[placeholder], input[aria-label], textarea[aria-label], button[aria-label], img[alt], [title]'
    ));

    for (const element of elements) translateAttributes(element);
  }

  function translateAttributes(element) {
    const attributes = ['placeholder', 'aria-label', 'alt', 'title'];
    for (const attribute of attributes) {
      if (!element.hasAttribute || !element.hasAttribute(attribute)) continue;

      const dataKey = `original${attribute.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^./, c => c.toUpperCase())}`;
      if (!element.dataset[dataKey]) element.dataset[dataKey] = element.getAttribute(attribute);

      const original = element.dataset[dataKey];
      const value = currentLanguage === 'uk'
        ? (translations[original] || original)
        : (reverseTranslations[original] || original);

      if (element.getAttribute(attribute) !== value) {
        element.setAttribute(attribute, value);
      }
    }
  }

  function updateButtons() {
    document.querySelectorAll('.language-switch button').forEach(button => {
      const active = button.dataset.language === currentLanguage;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('active', active);
    });
  }

  function updateDocumentLanguage() {
    document.documentElement.lang = currentLanguage;
    const title = document.querySelector('title');
    if (title) {
      if (!title.dataset.originalTitle) title.dataset.originalTitle = title.textContent.trim();
      const original = title.dataset.originalTitle;
      title.textContent = currentLanguage === 'uk'
        ? (translations[original] || original)
        : (reverseTranslations[original] || original);
    }
  }

  function setLanguage(language) {
    currentLanguage = language === 'uk' ? 'uk' : 'en';
    isApplying = true;

    translateElement(document);
    updateDocumentLanguage();
    updateButtons();

    try {
      localStorage.setItem(STORAGE_KEY, currentLanguage);
    } catch (error) {
      // Сайт продолжит работать, даже если localStorage недоступен.
    }

    isApplying = false;
  }

  // Делегирование клика работает и если кнопки переключения были добавлены позже.
  document.addEventListener('click', event => {
    const button = event.target.closest('.language-switch button[data-language]');
    if (!button) return;
    event.preventDefault();
    setLanguage(button.dataset.language);
  });

  // Следим за текстом, который добавляют content.js и другие скрипты после загрузки.
  const observer = new MutationObserver(mutations => {
    if (isApplying) return;

    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        // Новый текст от скрипта считаем исходным английским.
        originalText.delete(mutation.target);
        translateTextNode(mutation.target);
      } else {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            translateTextNode(node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            translateElement(node);
          }
        });
      }
    }
  });

  function init() {
    let savedLanguage = 'en';
    try {
      savedLanguage = localStorage.getItem(STORAGE_KEY) || 'en';
    } catch (error) {}

    setLanguage(savedLanguage);

    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
