export const delay = (callback: () => Promise<object | undefined>, ms = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, ms);
  });
