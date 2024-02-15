export default {
  data: {},
  setItem: function (key, value) {
    this.data[key] = value.toString();
  },
  getItem: function (key) {
    return this.data[key] || null;
  },
  removeItem: function (key) {
    delete this.data[key];
  },
  clear: function () {
    this.data = {};
  },
};
