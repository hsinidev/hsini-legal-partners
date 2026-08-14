"""
meta_swarm_matrix.py

This script implements a "Meta-Swarm Matrix," serving as an integration architecture
connecting LangGraph, CrewAI, AutoGen, Agency-Swarm, and OpenAI Swarm into a single
synchronized workflow.
"""

import os
import sys
import logging
from typing import Dict, List, Any, TypedDict, Union

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("MetaSwarmMatrix")

# ==========================================
# CONFIGURATION & TOGGLE SWITCHES
# ==========================================
PROVIDER = "MOCK"  # Options: "GEMINI", "OLLAMA", "OPENAI", "MOCK"
OLLAMA_MODEL = "qwen2.5-coder:7b"
GEMINI_MODEL = "gemini-2.5-flash"
OPENAI_MODEL = "gpt-4o"

# ==========================================
# DYNAMIC IMPORTS WITH FALLBACKS FOR ROBUSTNESS
# ==========================================

# 1. LangGraph
try:
    from langgraph.graph import StateGraph, START, END
except ImportError:
    logger.warning("langgraph not found. Mocking StateGraph for demonstration.")
    class StateGraph:
        def __init__(self, state_schema):
            self.nodes = {}
            self.edges = []
        def add_node(self, name, func): self.nodes[name] = func
        def add_edge(self, source, target): self.edges.append((source, target))
        def compile(self): return self
        def invoke(self, state):
            curr = "START"
            curr_state = state.copy()
            # Simplistic mock execution path
            for node_name in ["crewai_planner_node", "autogen_coder_node"]:
                if node_name in self.nodes:
                    curr_state.update(self.nodes[node_name](curr_state))
            return curr_state
    START = "START"
    END = "END"

# 2. CrewAI
try:
    from crewai import Agent as CrewAgent, Task as CrewTask, Crew as CrewDepartment
except ImportError:
    class CrewAgent:
        def __init__(self, **kwargs): pass
    class CrewTask:
        def __init__(self, **kwargs): pass
    class CrewDepartment:
        def __init__(self, **kwargs): pass
        def kickoff(self): return "Decomposed Plan: Task 1: Create main.rs; Task 2: Create Cargo.toml"

# 3. AutoGen / Agency-Swarm
try:
    import autogen
except ImportError:
    autogen = None

# 4. OpenAI Swarm
try:
    from swarm import Swarm, Agent as SwarmAgent
except ImportError:
    # Minimal Swarm Mock implementation if not installed
    class SwarmAgent:
        def __init__(self, name="Agent", instructions="", functions=None):
            self.name = name
            self.instructions = instructions
            self.functions = functions or []
    class Swarm:
        def __init__(self): pass
        def run(self, agent, messages, context_variables=None):
            # Locate function to transfer/run
            response_content = "Routed via Swarm."
            active_agent = agent
            for func in agent.functions:
                if "langgraph" in func.__name__:
                    # Execute langgraph flow
                    res = func(messages[-1]["content"])
                    response_content = f"Swarm Triage Handed off to LangGraph Orchestrator.\nResult: {res}"
            class SwarmResponse:
                def __init__(self, content, agent_obj):
                    self.messages = [{"role": "assistant", "content": content}]
                    self.agent = agent_obj
            return SwarmResponse(response_content, active_agent)

# ==========================================
# UNIFIED COGNITIVE BACKBONE MODEL CONNECTOR
# ==========================================

def get_unified_llm_config() -> Dict[str, Any]:
    """
    Returns LLM configuration based on selected provider switches.
    """
    config = {"provider": PROVIDER}
    
    if PROVIDER == "OLLAMA":
        config["base_url"] = "http://localhost:11434/v1"
        config["api_key"] = "ollama"
        config["model"] = OLLAMA_MODEL
        logger.info(f"Unified Backbone configured to run locally via Ollama ({OLLAMA_MODEL}).")
    elif PROVIDER == "GEMINI":
        config["api_key"] = os.environ.get("GEMINI_API_KEY", "")
        config["model"] = GEMINI_MODEL
        logger.info(f"Unified Backbone configured to run cloud Google Gemini ({GEMINI_MODEL}).")
    elif PROVIDER == "OPENAI":
        config["api_key"] = os.environ.get("OPENAI_API_KEY", "")
        config["model"] = OPENAI_MODEL
        logger.info(f"Unified Backbone configured to run cloud OpenAI ({OPENAI_MODEL}).")
    else:
        logger.info("Unified Backbone running on MOCK mode.")
        config["model"] = "mock-model"
        
    return config

# ==========================================
# LANGGRAPH STATE DEFINITION
# ==========================================

class ProjectState(TypedDict):
    objective: str
    decomposed_tasks: List[str]
    generated_code: Dict[str, str]
    code_review_feedback: str
    status: str

# ==========================================
# LANGGRAPH NODES
# ==========================================

def crewai_planner_node(state: ProjectState) -> Dict[str, Any]:
    """
    CrewAI Department (The Planners):
    Decomposes the high-level request into structured file tasks.
    """
    logger.info("--- Entering CrewAI Planning Department ---")
    objective = state["objective"]
    
    llm_config = get_unified_llm_config()
    
    if llm_config["provider"] == "MOCK":
        # Return mock decomposition
        tasks = [
            "File: src/main.rs | Task: Implement Tauri backend entry point with standard vector database connections.",
            "File: src/vector.rs | Task: Build SQLite-vec vector storage operations."
        ]
        logger.info("CrewAI (Mock) successfully decomposed the objective.")
        return {"decomposed_tasks": tasks, "status": "PLANNING_COMPLETED"}
        
    # Standard CrewAI Implementation mapping
    # Note: CrewAI agents are configured using standard models or custom keys
    planner_agent = CrewAgent(
        role="Principal Software Architect",
        goal="Decompose complex user requirements into exact coding files.",
        backstory="Expert systems engineer with 20+ years of codebase modularization experience.",
        verbose=True
    )
    
    plan_task = CrewTask(
        description=f"Decompose the objective: '{objective}'. Provide a clear, bulleted list of files to create and their scope.",
        expected_output="A clean list of file paths and details.",
        agent=planner_agent
    )
    
    crew = CrewDepartment(
        agents=[planner_agent],
        tasks=[plan_task],
        verbose=True
    )
    
    try:
        raw_result = crew.kickoff()
        result_str = str(raw_result)
        # Parse output tasks
        tasks = [line.strip() for line in result_str.split("\n") if line.strip().startswith("-") or "|" in line]
        if not tasks:
            tasks = [result_str]
    except Exception as exc:
        logger.error(f"CrewAI execution failed: {exc}. Falling back to default mock list.")
        tasks = [
            "File: src/main.rs | Task: Implement backend engine.",
            "File: src/vector.rs | Task: Build SQLite-vec integration."
        ]
        
    return {"decomposed_tasks": tasks, "status": "PLANNING_COMPLETED"}

def autogen_coder_node(state: ProjectState) -> Dict[str, Any]:
    """
    AutoGen/Agency-Swarm Sandbox (The Coders):
    Receives tasks and runs code generation and self-correction loops.
    """
    logger.info("--- Entering AutoGen/Agency-Swarm Coding Sandbox ---")
    tasks = state["decomposed_tasks"]
    llm_config = get_unified_llm_config()
    
    generated_code = {}
    
    if autogen is None or llm_config["provider"] == "MOCK":
        # Run Mock Coder pair simulation
        logger.info("Simulating AutoGen Conversational Coder/Reviewer Pair...")
        for task in tasks:
            file_name = "src/main.rs"
            if "vector.rs" in task:
                file_name = "src/vector.rs"
                
            code = (
                f"// Codegen for {file_name}\n"
                "fn init_engine() {\n"
                "    println!(\"SQLite-vec engine initialized successfully.\");\n"
                "}\n"
            )
            generated_code[file_name] = code
        logger.info("AutoGen Mock Sandbox successfully generated project code.")
        return {"generated_code": generated_code, "status": "CODING_COMPLETED"}

    # Actual AutoGen Setup
    config_list = [{
        "model": llm_config["model"],
        "api_key": llm_config.get("api_key", ""),
        "base_url": llm_config.get("base_url")
    }]
    
    coder = autogen.AssistantAgent(
        name="Coder",
        llm_config={"config_list": config_list},
        system_message="You are a Principal Core Developer. Write clean, production-grade Rust/TypeScript code blocks based on planning tasks."
    )
    
    reviewer = autogen.AssistantAgent(
        name="Reviewer",
        llm_config={"config_list": config_list},
        system_message="You are a QA Lead. Review code for bugs, missing imports, and safety. Provide critique or approve with 'PASSED'."
    )
    
    # Process tasks one by one in the sandbox
    for task in tasks:
        # Initial code generation session
        chat_result = reviewer.initiate_chat(
            coder,
            message=f"Please write the code for the following task: {task}",
            max_turns=3
        )
        
        # Extract the code from messages
        final_message = chat_result.chat_history[-1]["content"]
        # Find rust or typescript blocks
        import re
        code_blocks = re.findall(r"```[a-zA-Z]*\n(.*?)\n```", final_message, re.DOTALL)
        
        # Save output
        file_name = "src/output.rs"
        if "src/" in task:
            matches = re.findall(r"src/\S+", task)
            if matches:
                file_name = matches[0]
                
        generated_code[file_name] = code_blocks[0] if code_blocks else final_message

    return {"generated_code": generated_code, "status": "CODING_COMPLETED"}

# ==========================================
# MASTER ORCHESTRATOR COMPILATION (LangGraph)
# ==========================================

workflow = StateGraph(ProjectState)

# Add departments
workflow.add_node("crewai_planner_node", crewai_planner_node)
workflow.add_node("autogen_coder_node", autogen_coder_node)

# Route state transitions
workflow.add_edge(START, "crewai_planner_node")
workflow.add_edge("crewai_planner_node", "autogen_coder_node")
workflow.add_edge("autogen_coder_node", END)

orchestrator = workflow.compile()

# ==========================================
# OPENAI SWARM TRIAGE PRIMITIVES (The Gateway)
# ==========================================

def trigger_langgraph_pipeline(user_request: str) -> str:
    """
    Handoff adapter connecting OpenAI Swarm to the compiled LangGraph brain.
    """
    logger.info(f"Swarm Router handoff triggered with task: {user_request}")
    
    # Initialize LangGraph State
    initial_state = ProjectState(
        objective=user_request,
        decomposed_tasks=[],
        generated_code={},
        code_review_feedback="",
        status="STARTING"
    )
    
    # Execute LangGraph
    final_output = orchestrator.invoke(initial_state)
    
    # Format output summary
    result_summary = f"Workflow Completed with Status: {final_output['status']}\n\n"
    result_summary += "Generated Code Files:\n"
    for path, code in final_output["generated_code"].items():
        result_summary += f"\n[File]: {path}\n"
        result_summary += f"{'-'*40}\n"
        result_summary += f"{code}\n"
        result_summary += f"{'-'*40}\n"
        
        # Write generated code blocks physically to the workspace directory
        try:
            full_path = os.path.abspath(os.path.join(os.path.dirname(__file__), path))
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(code)
            logger.info(f"Successfully built and saved file to: {full_path}")
        except Exception as e:
            logger.error(f"Failed to save generated code to {path}: {e}")
        
    return result_summary

# Swarm Gateway Router Agent
swarm_triage_agent = SwarmAgent(
    name="TriageAgent",
    instructions=(
        "You are the Meta-Swarm Front Gatekeeper. You triage user requirements. "
        "For any request involving software development, code generation, planning, or refactoring, "
        "you must handoff/route the request to the LangGraph Orchestrator via 'trigger_langgraph_pipeline'."
    ),
    functions=[trigger_langgraph_pipeline]
)

# ==========================================
# KICKOFF MAIN BLOCK
# ==========================================

def main():
    print("\n" + "="*60)
    print("      METASWARM MATRIX INTEGRATION GATEWAY INITIALIZED      ")
    print("="*60 + "\n")
    
    # Simulate a user request coming through the terminal CLI
    user_request = "Develop a high-performance SQLite-vec engine connector in Rust and React."
    print(f"User Request: '{user_request}'\n")
    
    # Swarm handles incoming command triages
    swarm_client = Swarm()
    messages = [{"role": "user", "content": user_request}]
    
    print("[1] Dispatching command to Swarm Gateway...")
    response = swarm_client.run(agent=swarm_triage_agent, messages=messages)
    
    print("\n[2] Swarm Triage complete. Final execution output:")
    print(response.messages[-1]["content"])

if __name__ == "__main__":
    main()
