// eslint-disable-next-line no-extend-native
Array.prototype.pushWithoutDuplicate = function () {
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i]
    if (this.indexOf(arguments) === -1) {
      this.push(arg)
    }
  }
}
