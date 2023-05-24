"use strict";

function getRandBoolean() {
  let bool = Math.floor(Math.random() * 2);
  return bool === 1;
}

export { getRandBoolean };