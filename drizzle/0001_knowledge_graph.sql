-- Title: Knowledge Graph Enhancement for BioAgents
-- Author: InnovativeBioresearch (Jonathan Fior)
-- Date: 2025-04-14
-- Description: Improves BioAgents knowledge graph for hackathon submission:
--   - Adds embedding column (vector(1536)) to biograph.hypotheses for FM-generated embeddings.
--   - Creates HNSW index for efficient similarity searches (e.g., finding related hypotheses).
--   - Links biograph.file_metadata to hypotheses to build relational graph structure.
-- Context: Supports improved hypothesis generation and testing processes.
-- Note: Assumes vector extension is enabled in biograph schema (confirmed locally).
--       Local testing was blocked by @elizaos/cli bugs (e.g., plugin installation prompts).
--       Maintainers: Please apply this migration and verify with PostgreSQL.

ALTER TABLE biograph.hypotheses
  ADD COLUMN embedding vector(1536);
-- Embedding column for hypothesis representations (e.g., from GPT-4 or other FMs)

CREATE INDEX idx_hypotheses_embedding
  ON biograph.hypotheses
  USING hnsw (embedding vector_l2_ops);
-- HNSW index for fast similarity searches in the knowledge graph

ALTER TABLE biograph.file_metadata
  ADD COLUMN hypothesis_id uuid REFERENCES biograph.hypotheses(id);
-- Links files to hypotheses, enabling graph-based queries