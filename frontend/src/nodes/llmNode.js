import { BaseNode } from './BaseNode';
import { LLM_CONFIG } from './nodeConfigs';
export const LLMNode = (props) => <BaseNode {...props} config={LLM_CONFIG} />;
