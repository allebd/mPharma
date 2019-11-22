import { check, param, query } from 'express-validator';

/**
   * @param {String} field
   * @returns {Object} - Express-validator
   */
const isValidBody = field => check(field)
  .exists()
  .withMessage(`${field} is a required field`)
  .not()
  .isEmpty({ ignore_whitespace: true })
  .withMessage(`${field} cannot be empty`);

/**
   * @param {String} paramName
   * @returns {Object} - Express-validator
   */
const isValidParam = paramName => param(paramName)
  .exists()
  .withMessage(`${paramName} is a required field`)
  .trim()
  .not()
  .isEmpty()
  .withMessage(`${paramName} cannot be empty`);

/**
 * Validates integer query
   * @param {String} field
   * @returns {Object} - Express-validator
   */
const isValidInt = field => query(field)
  .trim()
  .not()
  .isEmpty()
  .withMessage(`${field} cannot be empty`)
  .isInt()
  .withMessage(`${field} must be an integer`);

export default {
  isValidParam,
  isValidBody,
  isValidInt
};
