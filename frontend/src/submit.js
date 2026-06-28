import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const ResultModal = ({ result, error, onClose }) => (
  <div className="vs-modal-overlay" onClick={onClose}>
    <div className="vs-modal" onClick={(e) => e.stopPropagation()}>
      <div className="vs-modal__header">
        <h3 className="vs-modal__title">
          {error ? 'Connection Error' : 'Pipeline Analysis'}
        </h3>
        <button className="vs-modal__close" onClick={onClose}>
          ✕
        </button>
      </div>

      {error ? (
        <div className="vs-modal__body">
          <div className="vs-result-row vs-result-row--error">
            <span className="vs-result-row__icon">⚠️</span>
            <span className="vs-result-row__text">{error}</span>
          </div>
        </div>
      ) : (
        <div className="vs-modal__body">
          <div className="vs-result-row">
            <span className="vs-result-row__label">Nodes</span>
            <span className="vs-result-row__value">{result.num_nodes}</span>
          </div>
          <div className="vs-result-row">
            <span className="vs-result-row__label">Edges</span>
            <span className="vs-result-row__value">{result.num_edges}</span>
          </div>
          <div className="vs-result-row">
            <span className="vs-result-row__label">Valid DAG</span>
            <span
              className={`vs-result-row__value vs-result-row__value--${
                result.is_dag ? 'success' : 'danger'
              }`}
            >
              {result.is_dag ? '✅ Yes' : '❌ No (has cycle)'}
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
);

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await response.json();
      setResult(data);
    } catch {
      setError('Could not reach the backend. Is it running?');
    } finally {
      setLoading(false);
    }
  }, [nodes, edges]);

  const closeModal = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="vs-submit">
      <button
        className={`vs-submit-btn${loading ? ' vs-submit-btn--loading' : ''}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Analyzing…' : 'Run Pipeline'}
      </button>

      {(result || error) && createPortal(
        <ResultModal result={result} error={error} onClose={closeModal} />,
        document.body
      )}
    </div>
  );
};
