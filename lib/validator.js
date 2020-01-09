'use strict';

let validator = module.exports = {};

/**
 * Based on a set of rules, is the input valid?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param input
 * @param rules
 * @returns {boolean}
 */
validator.isValid = (input, rules) => {
  for (let fieldName in rules.fields) {
    let field = rules.fields[fieldName];
    let required = field.required ? validator.isTruthy(input[fieldName]) : true;
    let type = field.type ? validator.isCorrectType(input[fieldName], field.type) : true;
    let hasApprovedArr = field.approvedVals ? field.approvedVals.includes(input[fieldName]) : true;

    if (field.type === 'object') {
      if (Object.keys(input[fieldName]).length === 0) return false;

      for (let subField in field) {
        let subReq = field[subField].required ? validator.isTruthy(subField) : true;
        let subType = field[subField].type ? validator.isCorrectType(input[fieldName][subField], field[subField].type) : true;
        if (!(subReq && subType)) return false;
      }
    }

    if (field.type == 'array') {
      let arrChild = input[fieldName];
      for (let i in arrChild) {
        if (!validator.isCorrectType(arrChild[i], field.valueType)) {
          return false;
        }
      }
    }

    if (!(required && type && hasApprovedArr)) return false;
  }
  return true;
};

validator.isTruthy = (value) => {
  return !!value;
};

validator.isCorrectType = (value, type) => {
  switch (type) {
    case 'string':
      return validator.isString(value);
    case 'number':
      return validator.isNumber(value);
    case 'array':
      return validator.isArray(value);
    case 'object':
      return validator.isObject(value);
    case 'function':
      return validator.isFunction(value);
  }
};

/**
 * Is this a string?
 * @param input
 * @returns {boolean}
 */
validator.isString = (input) => {
  return typeof input === 'string';
};

validator.isNumber = (input) => {
  return typeof input === 'number';
};

validator.isArray = (input) => {
  return Array.isArray(input);
};

validator.isObject = (input) => {
  return typeof input === 'object';
};

validator.isFunction = (input) => {
  return typeof input === 'function';
};

validator.isBoolean = (input) => {
  return typeof input === 'boolean';
};