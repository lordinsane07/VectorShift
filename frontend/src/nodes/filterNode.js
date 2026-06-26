import { BaseNode } from './BaseNode';
import { FILTER_CONFIG } from './nodeConfigs';
export const FilterNode = (props) => <BaseNode {...props} config={FILTER_CONFIG} />;
