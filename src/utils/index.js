// eslint-disable-next-line import/prefer-default-export
export const confirmMessage = (func, msg, type) => {
  const duration = (type === 'success' || type === 'info') ? 2000 : 4000;
  func(msg, {
    variant: type,
    autoHideDuration: duration,
  });
};
