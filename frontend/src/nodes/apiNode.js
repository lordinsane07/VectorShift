import { BaseNode } from './BaseNode';
import { API_CONFIG } from './nodeConfigs';
export const ApiNode = (props) => <BaseNode {...props} config={API_CONFIG} />;
