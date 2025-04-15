// Title: Hypothesis Testing for BioAgents
// Author: InnovativeBioresearch (jonathan Fior)
// Date: 2025-04-14
// Description: Tests hypotheses by updating biograph.hypotheses with scores and status.
//   - Sets judgellm_score and status (approved/rejected) based on FM input.
//   - Fulfills hackathon requirement for improved hypothesis testing.
// Dependencies: Requires drizzle-orm and schema definitions.
// Note: Blocked by local @elizaos/cli bugs (database errors).
//       Maintainers: Test with real FM scores (e.g., from plugin-bioagent) and validate status logic.

import { db } from '../db';
import { hypothesesTable } from '../db/schemas/hypotheses';
import { eq } from 'drizzle-orm/pg-core';

export async function testHypothesis(hypothesisId: string, fmScore: number): Promise<void> {
  try {
    // Update hypothesis in biograph.hypotheses
    await db
      .update(hypothesesTable)
      .set({
        judgellmScore: fmScore.toFixed(2), // Convert number to string for numeric(5,2)
        status: fmScore >= 0.8 ? 'approved' : 'rejected',
        updatedAt: new Date(),
      })
      .where(eq(hypothesesTable.id, hypothesisId));

    console.log(`Hypothesis ${hypothesisId} tested with score ${fmScore}`);
  } catch (error) {
    console.error('Failed to test hypothesis:', error);
    throw new Error('Testing failed');
  }
}