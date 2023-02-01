// Toggle Dark Theme
var d = document.documentElement;
var t = document.querySelector('#theme-switcher-btn');
var darkIconElement = document.querySelector('#theme-toggle-dark-icon');
var lightIconElement = document.querySelector('#theme-toggle-light-icon');

var m = localStorage.getItem('theme');

if (m == 'dark') {
  d.classList.add('theme-dark');
}

function injectClass () {
  if (d.classList.contains('theme-dark')) {
    d.classList.remove('theme-dark');
    localStorage.removeItem('theme');
    lightIconElement.classList.add('hidden');
    darkIconElement.classList.remove('hidden');
  } else {
    d.classList.add('theme-dark');
    localStorage.setItem('theme', 'dark');
    lightIconElement.classList.remove('hidden');
    darkIconElement.classList.add('hidden');
  }
}

t.addEventListener('click', injectClass);
