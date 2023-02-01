export const injectThemeScript = () => {

  const script = document.createElement('script');
  script.src = `/theme.js`;

  const BodyElement = document.body;

  if (!BodyElement) {
    throw new Error(
      'Expected document.body not to be null. Requires a <body> element.'
    );
  }

  BodyElement.appendChild(script);
};