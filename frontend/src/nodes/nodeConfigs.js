export const INPUT_CONFIG = {
  nodeType: 'Input',
  icon: '📥',
  accentColor: '#10b981',
  fields: [
    {
      name: 'inputName',
      label: 'Name',
      type: 'text',
      default: '',
      placeholder: 'Enter input name',
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      default: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' },
      ],
    },
  ],
  inputs: [],
  outputs: [{ id: 'value', label: 'value' }],
};

export const OUTPUT_CONFIG = {
  nodeType: 'Output',
  icon: '📤',
  accentColor: '#f97316',
  fields: [
    {
      name: 'outputName',
      label: 'Name',
      type: 'text',
      default: '',
      placeholder: 'Enter output name',
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      default: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'Image', label: 'Image' },
      ],
    },
  ],
  inputs: [{ id: 'value', label: 'value' }],
  outputs: [],
};

export const LLM_CONFIG = {
  nodeType: 'LLM',
  icon: '🧠',
  accentColor: '#6366f1',
  description: 'Large Language Model inference node. Connect a system prompt and user prompt to generate responses.',
  fields: [],
  inputs: [
    { id: 'system', label: 'system' },
    { id: 'prompt', label: 'prompt' },
  ],
  outputs: [{ id: 'response', label: 'response' }],
};

export const TEXT_CONFIG = {
  nodeType: 'Text',
  icon: '✏️',
  accentColor: '#3b82f6',
};

export const FILTER_CONFIG = {
  nodeType: 'Filter',
  icon: '🔍',
  accentColor: '#f59e0b',
  fields: [
    {
      name: 'condition',
      label: 'Condition',
      type: 'text',
      default: '',
      placeholder: 'e.g. value > 10',
    },
  ],
  inputs: [{ id: 'data', label: 'data' }],
  outputs: [
    { id: 'pass', label: 'pass' },
    { id: 'fail', label: 'fail' },
  ],
};

export const TRANSFORM_CONFIG = {
  nodeType: 'Transform',
  icon: '⚙️',
  accentColor: '#8b5cf6',
  fields: [
    {
      name: 'function',
      label: 'Function',
      type: 'select',
      default: 'uppercase',
      options: [
        { value: 'uppercase', label: 'Uppercase' },
        { value: 'lowercase', label: 'Lowercase' },
        { value: 'trim', label: 'Trim whitespace' },
        { value: 'reverse', label: 'Reverse' },
        { value: 'jsonParse', label: 'JSON parse' },
      ],
    },
  ],
  inputs: [{ id: 'input', label: 'input' }],
  outputs: [{ id: 'output', label: 'output' }],
};

export const API_CONFIG = {
  nodeType: 'API Call',
  icon: '🌐',
  accentColor: '#06b6d4',
  fields: [
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      default: 'GET',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
      ],
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      default: '',
      placeholder: 'https://api.example.com',
    },
  ],
  inputs: [
    { id: 'url', label: 'url' },
    { id: 'body', label: 'body' },
  ],
  outputs: [
    { id: 'response', label: 'response' },
    { id: 'error', label: 'error' },
  ],
};

export const NOTE_CONFIG = {
  nodeType: 'Note',
  icon: '📝',
  accentColor: '#64748b',
  fields: [
    {
      name: 'note',
      label: 'Note',
      type: 'textarea',
      default: '',
      placeholder: 'Add documentation…',
    },
  ],
  inputs: [],
  outputs: [],
};

export const CONDITION_CONFIG = {
  nodeType: 'Condition',
  icon: '🔀',
  accentColor: '#ec4899',
  fields: [
    {
      name: 'expression',
      label: 'Expression',
      type: 'text',
      default: '',
      placeholder: 'e.g. status === "active"',
    },
  ],
  inputs: [{ id: 'value', label: 'value' }],
  outputs: [
    { id: 'true', label: 'true' },
    { id: 'false', label: 'false' },
  ],
};
