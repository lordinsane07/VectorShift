import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { TEXT_CONFIG } from './nodeConfigs';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
const MIN_WIDTH = 220;
const CHAR_WIDTH = 8.5;
const PADDING = 48;
const MIN_HEIGHT = 100;
const LINE_HEIGHT = 20;
const HEADER_HEIGHT = 52;

const extractVariables = (text) => {
  const matches = [...text.matchAll(VARIABLE_REGEX)];
  const seen = new Set();
  return matches
    .map((m) => m[1].trim())
    .filter((name) => {
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    });
};

const calcWidth = (text) => {
  const longestLine = text
    .split('\n')
    .reduce((a, b) => (a.length > b.length ? a : b), '');
  return Math.max(MIN_WIDTH, longestLine.length * CHAR_WIDTH + PADDING);
};

const calcHeight = (text) => {
  const lineCount = text.split('\n').length;
  return Math.max(MIN_HEIGHT, lineCount * LINE_HEIGHT + HEADER_HEIGHT + PADDING);
};

const handlePosition = (index, total) =>
  `${((index + 1) / (total + 1)) * 100}%`;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const [dimensions, setDimensions] = useState(() => ({
    width: calcWidth(data?.text || '{{input}}'),
    height: calcHeight(data?.text || '{{input}}'),
  }));

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    setVariables(extractVariables(newText));
    setDimensions({ width: calcWidth(newText), height: calcHeight(newText) });
  };

  return (
    <div
      className="vs-node vs-node--text"
      style={{
        '--node-accent': TEXT_CONFIG.accentColor,
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      {variables.map((varName, index) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-var-${varName}`}
          className="vs-handle vs-handle--input"
          style={{ top: handlePosition(index, variables.length) }}
        >
          <span className="vs-handle-label vs-handle-label--left vs-handle-label--mono">
            {varName}
          </span>
        </Handle>
      ))}

      <div className="vs-node__header">
        <span className="vs-node__icon">{TEXT_CONFIG.icon}</span>
        <span className="vs-node__title">{TEXT_CONFIG.nodeType}</span>
      </div>

      <div className="vs-node__body vs-node__body--text">
        <textarea
          className="vs-field__textarea vs-field__textarea--text"
          value={currText}
          onChange={handleTextChange}
          placeholder="Type text with {{variables}}…"
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="vs-handle vs-handle--output"
        style={{ top: '50%' }}
      >
        <span className="vs-handle-label vs-handle-label--right">output</span>
      </Handle>
    </div>
  );
};
