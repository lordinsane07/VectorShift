from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import defaultdict

app = FastAPI(title="VectorShift Pipeline API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NodeData(BaseModel):
    id: str


class EdgeData(BaseModel):
    source: str
    target: str


class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]


def check_is_dag(node_ids: List[str], edges: List[EdgeData]) -> bool:
    graph: dict[str, list[str]] = defaultdict(list)
    for edge in edges:
        graph[edge.source].append(edge.target)

    # 0=unvisited, 1=in-stack (gray), 2=done (black)
    state: dict[str, int] = {n: 0 for n in node_ids}

    def dfs(node: str) -> bool:
        state[node] = 1
        for neighbor in graph[node]:
            if neighbor not in state:
                continue
            if state[neighbor] == 1:
                return False
            if state[neighbor] == 0 and not dfs(neighbor):
                return False
        state[node] = 2
        return True

    for node_id in node_ids:
        if state[node_id] == 0:
            if not dfs(node_id):
                return False
    return True


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineData):
    node_ids = [n.id for n in pipeline.nodes]
    num_nodes = len(node_ids)
    num_edges = len(pipeline.edges)
    is_dag = check_is_dag(node_ids, pipeline.edges)
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }
