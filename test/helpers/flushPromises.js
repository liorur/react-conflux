const scheduler =
  typeof setImmediate === 'function' ? setImmediate : setTimeout;

function flushPromises() {
  return new Promise(resolve => scheduler(resolve));
}

export default flushPromises;
