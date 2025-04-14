// Title: BioAgents Main Entry Point
// Author: InnovativeBioresearch (Jonathan Fior)
// Date: 2025-04-14
// Description: Updated BioAgents entry point for hackathon submission:
//   - Preserves original @elizaos/core project setup with dkgAgent for agent-based research workflow.
//   - Adds hypothesis generation and testing functions to enhance knowledge graph capabilities.
//   - References generate.ts and test.ts for file-based hypothesis creation and FM scoring.
//   - Fulfills requirements for improved hypothesis generation and testing.
// Dependencies: Requires @elizaos/core, drizzle-orm, and existing scholar.ts.
// Note: Local runs failed due to @elizaos/cli bugs (e.g., plugin prompts, relation "agents" errors).
//       Maintainers: Please test with existing database (biograph.hypotheses, file_metadata)
//       and integrate functions into dkgPlugin or agents as needed.

import { type Project } from "@elizaos/core";
import "dotenv/config";

import { dkgAgent } from "./scholar";
import { generateHypothesis } from "./hypothesis/generate";
import { testHypothesis } from "./hypothesis/test";

const project: Project = {
  agents: [dkgAgent],
};

// Export standalone functions for hypothesis generation and testing
// These can be called by dkgAgent, dkgPlugin, or other agents as needed
export async function processFiles(fileIds: string[]): Promise<string> {
  // Generate hypothesis from file metadata (queries biograph.file_metadata)
  const hypothesis = await generateHypothesis(fileIds);
  console.log('Generated:', hypothesis);
  return hypothesis;
}

export async function evaluateHypothesis(hypothesisId: string, mockScore: number): Promise<void> {
  // Test hypothesis with FM score, updating biograph.hypotheses (mocked for demo)
  await testHypothesis(hypothesisId, mockScore);
  console.log('Evaluated:', hypothesisId);
}

export default project;

// Example usage for maintainers to test
async function main() {
  // Example: Call hypothesis functions directly
  const hypothesis = await processFiles(['file1_hash', 'file2_hash']);
  await evaluateHypothesis('hypothesis_uuid', 0.85); // Mock FM score
}