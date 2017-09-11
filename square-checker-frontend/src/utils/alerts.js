export const alertOptions = {
  offset: 14,
  position: 'bottom left',
  theme: 'dark',
  time: 5000,
  transition: 'scale',
};

export const showSucess = (message) => {
  this.msg.show(message, {
    time: 2000,
    type: 'success',
  });
};

export const showInfo = (message) => {
  this.msg.show(message, {
    time: 2000,
    type: 'info',
  });
};
