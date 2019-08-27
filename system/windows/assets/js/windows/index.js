//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { ipcRenderer } = window.electron;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ TARGET EVENT LISTENERS                                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘

// » button with id btn-delete-user
document.getElementById('btn-delete-user').addEventListener('click', () => {
  ipcRenderer.send('show-window-delete-user');
});

// » button with id btn-set-user
document.getElementById('btn-set-user').addEventListener('click', () => {
  ipcRenderer.send('show-window-set-user');
});

// » button with id btn-add-user
document.getElementById('btn-add-user').addEventListener('click', () => {
  ipcRenderer.send('show-window-add-user');
});

// » button with id btn-get-users
document.getElementById('btn-get-users').addEventListener('click', () => {
  ipcRenderer.send('show-window-get-users');
});
