function getTime() {
  return new Date().valueOf();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { getTime, sleep };
