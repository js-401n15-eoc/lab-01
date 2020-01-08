'use strict';

let validator = module.exports = {};

/**
 * Based on a set of rules, is the input valid?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param input
 * @param rules
 * @returns {boolean}
 */
// validator.isValid = (input, rules) => {
//   for (const prop in rules) {
//     const currVals = rules[prop];

//     if (rules[prop].required && typeof input[prop] !== currVals.type) {
//       return false;
//     }

//     if (validator.isObject(currVals)) {
//        const newRules = rules[prop];
//        validator.isValid(input, newRules);
//     }
//   }

//   return true;
// };
validator.isValid = (input, rules) => {
  for (let fieldName in rules.fields) {
    let field = rules.fields[fieldName];
    let required = field.required ? validator.isTruthy(input[fieldName]) : true;
    let type = field.type ? validator.isCorrectType(input[fieldName], field.type) : true;
    // if (field.type === 'object') return validator.isValid(input[fieldName], field);
    // let hasReqSubfields = field.type === 'object' ? Object.keys(input[fieldName]).length &&
    // validator.isValid(input[fieldName], field) : true;
    let hasReqSubfields = true;
    if (field.type === 'object') {
      let inputSubFieldLength = Object.keys(input[fieldName]).length;
      let subRuleLength = Object.keys(field).length;

      if (inputSubFieldLength === 0) return false;

      for (let subField in field) {
        let subReq = field[subField].required ? validator.isTruthy(subField) : true;
        let subType = field[subField].type ? validator.isCorrectType(input[fieldName][subField], field[subField].type) : true;
        if (!(subReq && subType)) return false;
      }
    }

    if (!(required && type && hasReqSubfields)) return false;
  }
  return true;
};
// validator.isOkObj = (input, rules) => {
//   let field = rules.fields[fieldName];
//   const numOfFields = Object.keys(input[fieldName]).length;
//   const numOfRules = 
//   return field.type ==='object' && Object.keys(input[fieldName]).length && 
// };

validator.isTruthy = (value) => !!value;
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