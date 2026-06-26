import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const handlePosition = (index, total) =>
  `${((index + 1) / (total + 1)) * 100}%`;

const FieldControl = ({ field, value, onChange }) => {
  if (field.type === 'select') {
    return (
      <select
        className="vs-field__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        className="vs-field__textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={3}
      />
    );
  }

  return (
    <input
      className="vs-field__input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
    />
  );
};

export const BaseNode = ({ id, data, config }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const getFieldValue = (field) =>
    data?.[field.name] !== undefined ? data[field.name] : field.default;

  return (
    <div
      className="vs-node"
      style={{ '--node-accent': config.accentColor }}
    >
      {config.inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className="vs-handle vs-handle--input"
          style={{ top: handlePosition(index, config.inputs.length) }}
        >
          <span className="vs-handle-label vs-handle-label--left">
            {input.label}
          </span>
        </Handle>
      ))}

      <div className="vs-node__header">
        <span className="vs-node__icon">{config.icon}</span>
        <span className="vs-node__title">{config.nodeType}</span>
      </div>

      <div className="vs-node__body">
        {config.description && (
          <p className="vs-node__description">{config.description}</p>
        )}

        {config.fields.map((field) => (
          <div key={field.name} className="vs-field">
            <label className="vs-field__label">{field.label}</label>
            <FieldControl
              field={field}
              value={getFieldValue(field)}
              onChange={(value) => updateNodeField(id, field.name, value)}
            />
          </div>
        ))}
      </div>

      {config.outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          className="vs-handle vs-handle--output"
          style={{ top: handlePosition(index, config.outputs.length) }}
        >
          <span className="vs-handle-label vs-handle-label--right">
            {output.label}
          </span>
        </Handle>
      ))}
    </div>
  );
};
