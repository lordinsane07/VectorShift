import { DraggableNode } from './draggableNode';
import {
  INPUT_CONFIG,
  OUTPUT_CONFIG,
  LLM_CONFIG,
  TEXT_CONFIG,
  FILTER_CONFIG,
  TRANSFORM_CONFIG,
  API_CONFIG,
  NOTE_CONFIG,
  CONDITION_CONFIG,
} from './nodes/nodeConfigs';

const CORE_NODES = [
  { type: 'customInput', config: INPUT_CONFIG },
  { type: 'llm', config: LLM_CONFIG },
  { type: 'customOutput', config: OUTPUT_CONFIG },
  { type: 'text', config: TEXT_CONFIG },
];

const LOGIC_NODES = [
  { type: 'filter', config: FILTER_CONFIG },
  { type: 'transform', config: TRANSFORM_CONFIG },
  { type: 'apiCall', config: API_CONFIG },
  { type: 'note', config: NOTE_CONFIG },
  { type: 'condition', config: CONDITION_CONFIG },
];

const NodeGroup = ({ label, nodes }) => (
  <div className="vs-toolbar__group">
    <span className="vs-toolbar__group-label">{label}</span>
    <div className="vs-toolbar__chips">
      {nodes.map(({ type, config }) => (
        <DraggableNode
          key={type}
          type={type}
          label={config.nodeType}
          icon={config.icon}
          accentColor={config.accentColor}
        />
      ))}
    </div>
  </div>
);

export const PipelineToolbar = () => (
  <div className="vs-toolbar">
    <div className="vs-toolbar__brand">
      <span className="vs-toolbar__logo">⚡</span>
      <span className="vs-toolbar__wordmark">VectorShift</span>
    </div>
    <div className="vs-toolbar__nodes">
      <NodeGroup label="Core" nodes={CORE_NODES} />
      <NodeGroup label="Logic" nodes={LOGIC_NODES} />
    </div>
  </div>
);
