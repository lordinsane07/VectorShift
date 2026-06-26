export const DraggableNode = ({ type, label, icon, accentColor }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="vs-toolbar__chip"
      style={{ '--chip-accent': accentColor }}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span className="vs-toolbar__chip-icon">{icon}</span>
      <span className="vs-toolbar__chip-label">{label}</span>
    </div>
  );
};