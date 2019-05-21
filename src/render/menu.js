import { remote } from 'electron';

const dragBlock = document.querySelector('#drag-block');
const dragClose = document.querySelector('#drag-block button');
dragClose.addEventListener('click', () => {
  dragBlock.style.height = '0';
});

const { Menu } = remote;
const menus = [
  {
    label: '移动位置',
    click() {
      dragBlock.style.height = '100%';
    }
  }
];
const m = Menu.buildFromTemplate(menus);
window.addEventListener('contextmenu', e => {
  e.preventDefault();
  m.popup({
    window: remote.getCurrentWindow()
  }, false);
});
