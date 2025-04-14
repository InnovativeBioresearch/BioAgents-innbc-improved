// Title: Hypothesis Testing for BioAgents
// Author: InnovativeBioresearch (Jonathan Fior)
// Date: 2025-04-14
// Description: Tests hypotheses by updating biograph.hypotheses with scores and status.
//   - Sets judgellm_score and status (approved/rejected) based on FM input.
//   - Fulfills hackathon requirement for improved hypothesis testing.
// Dependencies: Requires drizzle-orm and schema definitions.
// Note: Blocked by local @elizaos/cli bugs (database errors).
//       Maintainers: Test with real FM scores (e.g., from plugin-bioagent) and validate status logic.

import { db } from '../db';
import { hypotheses } from '../db/schemas';
import { eq } from 'drizzle-orm';

export async function testHypothesis(hypothesisId: string, fmScore: number): Promise<void> {
  try {
    // Update hypothesis
    await db
      .update(hypotheses)
      .set({
        judgellm_score: fmScore,
        status: fmScore >= 0.8 ? 'approved' : 'rejected',
        updated_at: new Date(),
      })
      .where(eq(hypotheses.id, hypothesisId));

    console.log(`Hypothesis ${hypothesisId} tested with score ${fmScore}`);
  } catch (error) {
    console.error('Failed to test hypothesis:', error);
    throw new Error('Testing failed');
  }
}