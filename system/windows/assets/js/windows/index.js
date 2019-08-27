const { ipcRenderer } = window.electron;

document.getElementById('btn-delete-user').addEventListener('click', () => {
  ipcRenderer.send('show-window-delete-user');
});

document.getElementById('btn-set-user').addEventListener('click', () => {
  ipcRenderer.send('show-window-set-user');
});

document.getElementById('btn-add-user').addEventListener('click', () => {
  ipcRenderer.send('show-window-add-user');
});

document.getElementById('btn-get-users').addEventListener('click', () => {
  ipcRenderer.send('show-window-get-users');
});
