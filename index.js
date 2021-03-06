'use strict';

const validator = require('./lib/validator.js');

const personRules = {
  fields: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    age: { type: 'number', required: true },
    gender: { type: 'string', required: true, approvedVals: ['male', 'female'] },
    hair: {
      type: 'object', required: true,
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
  gender: 'female',
  hair: {
    color: 'brown',
    style: 'long',
  },
  children: [],
};

const baldSusan = {
  id: '123-45-6789',
  name: 'Susan Nullhair',
  age: 66,
  gender: 'female',
  hair: {
  },
  children: [],
};

const noColorSusan = {
  id: '123-45-6789',
  name: 'Susan Baldie',
  age: 66,
  gender: 'female',
  hair: {
    style: 'bald',
  },
  children: [],
};

const fred = {
  id: 38,
  name: 'Freddy McCoder',
  hair: {
    style: 'short',
    color: 'black',
  },
  children: [],
};

const fredWithProperChildren = {
  id: '321-94-9843',
  name: 'Freddy McCoder',
  age: 44,
  gender: 'male',
  hair: {
    style: 'short',
    color: 'black',
  },
  children: ['Bob', 'Tom', 'Sue'],
};

const fredWithInvalidChildren = {
  id: '321-94-9843',
  name: 'Freddy McCoder',
  age: 44,
  hair: {
    style: 'short',
    color: 'black',
  },
  children: ['Bob', 123, 'Sue'],
};

const nonBinaryFred = {
  id: '321-94-9843',
  name: 'Freddy McCoder',
  age: 22,
  gender: 'X',
  hair: {
    style: 'short',
    color: 'black',
  },
  children: [],
};

console.log('Name: Susan, Valid: ' + validator.isValid(susan, personRules));
console.log('Name: Susan (bald), Valid: ' + validator.isValid(baldSusan, personRules));
console.log('Name: Susan (no hair color), Valid: ' + validator.isValid(noColorSusan, personRules));
console.log('Name: Fred, Valid: ' + validator.isValid(fred, personRules));
console.log('Name: Fred (with proper children), Valid: ' + validator.isValid(fredWithProperChildren, personRules));
console.log('Name: Fred, (with invalid children), Valid: ' + validator.isValid(fredWithInvalidChildren, personRules));
console.log('Name: Fred (non-binary), Valid: ' + validator.isValid(nonBinaryFred, personRules));