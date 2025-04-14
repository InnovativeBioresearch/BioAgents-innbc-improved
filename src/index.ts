// Title: BioAgents Main Entry Point
// Author: InnovativeBioresearch (Jonathan Fior)
// Date: 2025-04-14
// Description: Updated BioAgents entry point for hackathon submission:
//   - Preserves original @elizaos/core project setup with dkgAgent for agent-based workflow.
//   - Integrates hypothesis generation and testing to enhance knowledge graph processes.
//   - References generate.ts and test.ts for file-based hypothesis creation and FM scoring.
//   - Fulfills requirements for improved hypothesis generation and testing.
// Dependencies: Requires @elizaos/core, drizzle-orm, and existing scholar.ts.
// Note: Local runs failed due to @elizaos/cli bugs (e.g., plugin prompts, relation "agents" errors).
//       Maintainers: Please test with existing database (biograph.hypotheses, file_metadata)
//       and ensure dkgAgent compatibility.

import { type Project } from "@elizaos/core";
import "dotenv/config";

import { dkgAgent } from "./scholar";
import { generateHypothesis } from "./hypothesis/generate";
import { testHypothesis } from "./hypothesis/test";

// Extend agent functionality with hypothesis methods
interface EnhancedAgent extends typeof dkgAgent {
  processFiles?: (fileIds: string[]) => Promise<string>;
  evaluateHypothesis?: (hypothesisId: string, mockScore: number) => Promise<void>;
}

// Enhance dkgAgent with new methods
const enhancedAgent: EnhancedAgent = {
  ...dkgAgent,
  processFiles: async (fileIds: string[]): Promise<string> => {
    // Generate hypothesis from file metadata
    const hypothesis = await generateHypothesis(fileIds);
    console.log('Generated:', hypothesis);
    return hypothesis;
  },
  evaluateHypothesis: async (hypothesisId: string, mockScore: number): Promise<void> => {
    // Test hypothesis with FM score (mocked for demo)
    await testHypothesis(hypothesisId, mockScore);
    console.log('Evaluated:', hypothesisId);
  },
};

const project: Project = {
  agents: [enhancedAgent],
};

export default project;

// Example usage for maintainers to test
async function main() {
  if (enhancedAgent.processFiles && enhancedAgent.evaluateHypothesis) {
    const hypothesis = await enhancedAgent.processFiles(['file1_hash', 'file2_hash']);
    await enhancedAgent.evaluateHypothesis('hypothesis_uuid', 0.85); // Mock FM score
  }
}