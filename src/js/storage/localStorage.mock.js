export default {
  setItem: jest.fn((key, value) => {
    localStorage[key] = value;
  }),
  getItem: jest.fn((key) => localStorage[key] || null),
  removeItem: jest.fn((key) => delete localStorage[key]),
  clear: jest.fn(function () {
    Object.keys(this).forEach((key) => delete localStorage[key]);
  }),
};
