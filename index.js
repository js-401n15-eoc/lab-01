'use strict';

const validator = require('./lib/validator.js');

const personRules = {
  fields: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    age: { type: 'number', required: true },
    hair: { type: 'object', required: true,
      color: { type: 'string', required: true },
      style: { type: 'string', required: true },
    },
    children: { type: 'array', valueType: 'string' },
  },
};

const susan = {
  id: '123-45-6789',
  name: 'Susan McDeveloperson',
  age: 37,
  hair: {
    color: 'brown',
    style: 'long',
  },
  children: [],
};

const baldSusan = {
  id: '123-45-6789',
  name: 'Susan Baldie',
  age: 66,
  hair: {
  },
  children: [],
};

const noColorSusan = {
  id: '123-45-6789',
  name: 'Susan Baldie',
  age: 66,
  hair: {
    style: 'short',
  },
  children: [],
};

const fred = {
  id: 38,
  name: 'Freddy McCoder',
  children: [],
};

// validator.isValid(susan, personRules);
// validator.isValid(baldSusan, personRules);
validator.isValid(noColorSusan, personRules);
// validator.isValid(fred, personRules);
