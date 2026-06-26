<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Zustand-4.4.1-orange?style=for-the-badge" alt="Zustand" />
  <img src="https://img.shields.io/badge/React%20Flow-FF0072?style=for-the-badge&logo=react" alt="React Flow" />
</div>

<h1 align="center">⚡ VectorShift — Visual Pipeline Builder</h1>

<p align="center">
  A state-of-the-art, node-based visual workflow editor for building LLM pipelines. Built with React, Zustand, and FastAPI.
</p>

---

## 🌟 Key Features & Architectural Highlights

This project was engineered to go far beyond basic requirements, focusing on **scalable architecture**, **production-grade algorithms**, and **premium UI/UX**.

### 1. Config-Driven Rendering Engine (Zero Code Duplication)
Instead of hardcoding individual React components for every node type (`LLMNode`, `InputNode`, etc.), the entire canvas is powered by a single, dynamic `BaseNode.js` component.
- All node definitions (fields, types, icons, colors) are decoupled into a pure data dictionary (`nodeConfigs.js`).
- Adding a new node takes 5 lines of JSON configuration rather than 100 lines of duplicated React code.

### 2. "Cyber-Glass" Premium UI/UX
The UI was built from scratch using a custom CSS-variable design system, entirely bypassing basic generic component libraries.
- Features true **glassmorphism** (`backdrop-filter: blur`), floating translucent toolbars, and deep gradient shadows.
- Micro-animations: Nodes physically lift and cast neon-glow shadows on hover, connection handles pulse, and the modal enters smoothly.

### 3. Advanced Text Node Logic
The Text Node implements complex DOM management for a flawless user experience:
- **Auto-Resizing:** The `textarea` mathematically calculates its `scrollHeight` to expand and shrink in real-time as the user types, adjusting the node dimensions dynamically.
- **Instant Regex Handles:** User keystrokes are intercepted with Regex to instantly detect `{{variable}}` syntax, automatically spawning target handles on the left boundary of the node without lag.

### 4. Iterative 3-Color DFS Algorithm (Backend)
Most basic pipeline validators rely on recursive topological sorts, which crash standard Python servers (`RecursionError`) on massive graphs. 
- The FastAPI backend implements an **Iterative 3-Color Depth-First Search** utilizing a manual stack.
- This ensures O(V + E) time complexity for DAG (Directed Acyclic Graph) validation while scaling infinitely without breaking server memory limits.

---

## 🚀 Getting Started

### 1. Start the Backend (FastAPI)
The backend validates the pipeline architecture and detects cyclic logic.
```bash
# From the root directory
python -m uvicorn main:app --reload
```
*Server runs on `http://localhost:8000`*

### 2. Start the Frontend (React)
The frontend serves the visual canvas and toolbar.
```bash
# Open a new terminal window
cd frontend
npm install
npm start
```
*App runs on `http://localhost:3000`*

---

## 🛠️ Tech Stack
- **Frontend:** React 18, ReactFlow 11, Zustand 4.4.1 (State Management)
- **Backend:** Python 3.11, FastAPI, Pydantic (Strict Type Validation)
- **Styling:** Vanilla CSS3 with CSS Custom Properties (Variables)
