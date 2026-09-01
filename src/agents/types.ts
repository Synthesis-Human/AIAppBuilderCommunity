// ============================================================================
// AGENT TYPES & INTERFACES - 200 Multi-Purpose Agents System
// ============================================================================

export enum AgentCategory {
  SEO = 'seo',
  CONTENT = 'content',
  TECHNICAL = 'technical',
  AUTHORITY = 'authority',
  SOCIAL = 'social',
  VELOCITY = 'velocity',
  CONVERSION = 'conversion',
  ANALYTICS = 'analytics',
  AUTOMATION = 'automation',
  SYNTHESIS = 'synthesis'
}

export enum AgentStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  OPTIMIZING = 'optimizing',
  SYNCING = 'syncing',
  COMPLETE = 'complete',
  ERROR = 'error'
}

export interface AgentTask {
  id: string;
  agentId: string;
  name: string;
  category: AgentCategory;
  status: AgentStatus;
  priority: number; // 1-100
  progress: number; // 0-100
  startTime: number;
  endTime?: number;
  result?: any;
  error?: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  category: AgentCategory;
  description: string;
  enabled: boolean;
  priority: number;
  maxRetries: number;
  timeout: number;
  config?: Record<string, any>;
}

export interface RankingMetrics {
  domainAuthority: number;
  pageAuthority: number;
  backlinks: number;
  referringDomains: number;
  keywordRankings: Map<string, number>; // keyword -> rank position
  contentQualityScore: number;
  userEngagementScore: number;
  coreWebVitals: CoreWebVitals;
  socialSignals: number;
  brandMentions: number;
  crawlScore: number;
  indexedPages: number;
  timestamp: number;
}

export interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint (ms)
  fid: number; // First Input Delay (ms)
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte (ms)
  fcp: number; // First Contentful Paint (ms)
}

export interface SimulationMatrix {
  timestamp: number;
  secondsPassed: number;
  algorithmVersion: string;
  competitorAnalysis: CompetitorRank[];
  projectedRank: number;
  confidenceScore: number;
  recommendations: string[];
  agentActivity: AgentActivityLog[];
}

export interface CompetitorRank {
  domain: string;
  currentRank: number;
  estimatedAuthority: number;
  contentQuality: number;
}

export interface AgentActivityLog {
  agentId: string;
  agentName: string;
  action: string;
  timestamp: number;
  impact: number; // positive impact on ranking
}

export interface HTMLSynthesis {
  htmlVersion: string;
  generatedAt: number;
  agentsMeta: AgentMetadata[];
  seoOptimizations: SEOOptimization[];
  structuredData: any;
  htmlContent: string;
  stats: SynthesisStats;
}

export interface AgentMetadata {
  agentId: string;
  agentName: string;
  contribution: string;
  optimizationApplied: string[];
}

export interface SEOOptimization {
  type: string;
  value: string;
  priority: number;
  applied: boolean;
}

export interface SynthesisStats {
  totalAgentsActive: number;
  totalOptimizationsApplied: number;
  estimatedRankImprovement: number;
  htmlSizeBytes: number;
  compressedSizeBytes: number;
  loadTimeMs: number;
}

export interface RankingSimulation {
  iterationNumber: number;
  currentRank: number;
  targetRank: number;
  progress: number;
  agentContributions: Map<string, number>;
  matrixScore: number;
  predictedRankIn24h: number;
  predictedRankIn7d: number;
  predictedRankIn30d: number;
}
