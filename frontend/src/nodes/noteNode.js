import { BaseNode } from './BaseNode';
import { NOTE_CONFIG } from './nodeConfigs';
export const NoteNode = (props) => <BaseNode {...props} config={NOTE_CONFIG} />;
