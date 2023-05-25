"use strict";

/**
 * Gets a random boolean based on chanceLightsStartOn
 * @param {Float} chanceLightStartsOn
 * @returns Boolean
 */
function getBoolean(chanceLightStartsOn) {
  return Math.random() <= chanceLightStartsOn;
}

/**
 * Makes deep copy of matrix
 * @param {Boolean[][]} matrix
 * @returns Boolean[][]
 */
function deepCopyMatrix(matrix) {
  return matrix.map(row => [...row]);
}

export { getBoolean, deepCopyMatrix };