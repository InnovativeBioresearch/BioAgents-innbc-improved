# BioAgent 🤖🧬

An agentic framework for biological research and analysis.

# Hackathon submission improving BioAgents:
- Knowledge graph: Added embedding (vector(1536)), HNSW index, hypothesis_id link.
- Hypothesis generation: generate.ts queries file_metadata.
- Hypothesis testing: test.ts updates hypotheses.
- Updated index.ts to add processFiles/evaluateHypothesis, preserving @elizaos/core project.
- Fixed schema imports (fileMetadataTable, hypothesesTable), drizzle-orm/pg-core, and console error (tsconfig.json).
Blocked by @elizaos/cli bugs. Please verify migrations and TypeScript build.

## Getting Started

See [SETUP.md](SETUP.md) for detailed local development setup instructions.

See [QUICKSTART.md](QUICKSTART.md) for the quickstart guide.

Proudly powered by [Eliza v2 🤖](https://github.com/elizaOS/eliza)
