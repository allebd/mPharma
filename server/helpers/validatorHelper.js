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
   * @param {String} field
   * @returns {Object} - Express-validator
   */
const isValidOptionalBody = field => check(field)
  .optional()
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
  .withMessage(`${paramName} cannot be empty`)
  .isUUID()
  .withMessage(`${paramName} must be an UUID`);


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
  isValidOptionalBody,
  isValidParam,
  isValidBody,
  isValidInt
};
