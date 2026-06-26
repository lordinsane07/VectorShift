import { BaseNode } from './BaseNode';
import { TRANSFORM_CONFIG } from './nodeConfigs';
export const TransformNode = (props) => <BaseNode {...props} config={TRANSFORM_CONFIG} />;
