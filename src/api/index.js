import engagementData from "./engagementData";

const get = (url) => {
  return new Promise((resolve) => {
    const delay = Math.random() * 200 + 100;
    setTimeout(
      () =>
        resolve({
          data: engagementData
        }),
      delay
    );
  });
};

export default {
  get
};
