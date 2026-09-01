// ============================================================================
// AGENTS MODULE - Complete Export
// ============================================================================

export * from './types';
export * from './registry';
export * from './core-engine';
export * from './html-synthesis';
export * from './seo-automation';

import { CoreAgentEngine, createCoreEngine } from './core-engine';
import { HTMLSynthesisEngine, createHTMLSynthesisEngine } from './html-synthesis';
import { SEOAutomationEngine, createSEOAutomationEngine } from './seo-automation';

/**
 * Initialize Complete 200-Agent System
 * This function sets up the entire SEO optimization ecosystem
 */
export function initializeAgentSystem(config?: any) {
  // Create core engine
  const coreEngine = createCoreEngine();

  // Create HTML synthesis engine
  const htmlSynthesis = createHTMLSynthesisEngine(coreEngine);

  // Create SEO automation engine
  const seoAutomation = createSEOAutomationEngine(coreEngine, htmlSynthesis, config?.seo);

  return {
    coreEngine,
    htmlSynthesis,
    seoAutomation,
    start: () => seoAutomation.start(),
    stop: () => seoAutomation.stop(),
    getStatus: () => seoAutomation.getAgentStatus(),
    getDashboard: () => seoAutomation.getDashboardData(),
    getHTML: () => htmlSynthesis.getLatestSynthesis(),
  };
}
