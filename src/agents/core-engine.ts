// ============================================================================
// CORE AGENT ENGINE - 1x2 Enhanced Simulation Matrix with Real-time Updates
// ============================================================================

import { AgentConfig, AgentTask, AgentStatus, RankingMetrics, SimulationMatrix, RankingSimulation, AgentActivityLog, CoreWebVitals } from './types';
import { AGENT_REGISTRY } from './registry';

export class CoreAgentEngine {
  private agents: Map<string, AgentConfig> = new Map();
  private activeTasks: Map<string, AgentTask> = new Map();
  private rankingMetrics: RankingMetrics;
  private simulationMatrix: SimulationMatrix;
  private lastUpdateTime: number = Date.now();
  private simulationStartTime: number = Date.now();
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Initialize agents
    AGENT_REGISTRY.forEach(agent => {
      this.agents.set(agent.id, agent);
    });

    // Initialize ranking metrics
    this.rankingMetrics = this.initializeMetrics();
    this.simulationMatrix = this.initializeSimulationMatrix();
  }

  private initializeMetrics(): RankingMetrics {
    return {
      domainAuthority: 15,
      pageAuthority: 12,
      backlinks: 50,
      referringDomains: 20,
      keywordRankings: new Map(),
      contentQualityScore: 65,
      userEngagementScore: 55,
      coreWebVitals: {
        lcp: 3200, // milliseconds
        fid: 150,
        cls: 0.15,
        ttfb: 600,
        fcp: 1800,
      },
      socialSignals: 100,
      brandMentions: 25,
      crawlScore: 75,
      indexedPages: 80,
      timestamp: Date.now(),
    };
  }

  private initializeSimulationMatrix(): SimulationMatrix {
    return {
      timestamp: Date.now(),
      secondsPassed: 0,
      algorithmVersion: '1x2-enhanced',
      competitorAnalysis: [
        { domain: 'competitor1.com', currentRank: 2, estimatedAuthority: 55, contentQuality: 78 },
        { domain: 'competitor2.com', currentRank: 3, estimatedAuthority: 52, contentQuality: 75 },
        { domain: 'competitor3.com', currentRank: 4, estimatedAuthority: 48, contentQuality: 70 },
      ],
      projectedRank: 25,
      confidenceScore: 35,
      recommendations: [],
      agentActivity: [],
    };
  }

  public start(): void {
    this.simulationStartTime = Date.now();
    this.updateInterval = setInterval(() => this.simulateOptimization(), 1000); // Every second
  }

  public stop(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private simulateOptimization(): void {
    const now = Date.now();
    const secondsPassed = Math.floor((now - this.simulationStartTime) / 1000);
    this.simulationMatrix.secondsPassed = secondsPassed;
    this.simulationMatrix.timestamp = now;

    // Run active agents
    this.executeActiveAgents(secondsPassed);

    // Update ranking metrics
    this.updateRankingMetrics(secondsPassed);

    // Calculate simulation results
    this.calculateSimulationResults();
  }

  private executeActiveAgents(secondsPassed: number): void {
    const enabledAgents = Array.from(this.agents.values()).filter(a => a.enabled);
    const activityLog: AgentActivityLog[] = [];

    enabledAgents.forEach(agent => {
      const impact = this.simulateAgentImpact(agent, secondsPassed);
      if (impact > 0) {
        activityLog.push({
          agentId: agent.id,
          agentName: agent.name,
          action: `Optimizing ${agent.category}`,
          timestamp: Date.now(),
          impact: impact,
        });
      }
    });

    this.simulationMatrix.agentActivity = activityLog;
  }

  private simulateAgentImpact(agent: AgentConfig, secondsPassed: number): number {
    // Simulate increasing impact over time with diminishing returns
    const baseImpact = agent.priority / 100;
    const timeMultiplier = Math.min(1 + (secondsPassed * 0.02), 2.5); // Max 2.5x after 75 seconds
    const randomVariance = 0.8 + Math.random() * 0.4; // 0.8-1.2

    return baseImpact * timeMultiplier * randomVariance;
  }

  private updateRankingMetrics(secondsPassed: number): void {
    const metrics = this.rankingMetrics;

    // Improve Domain Authority gradually
    metrics.domainAuthority = Math.min(metrics.domainAuthority + 0.15, 95);

    // Improve Page Authority
    metrics.pageAuthority = Math.min(metrics.pageAuthority + 0.12, 90);

    // Build backlinks
    metrics.backlinks = Math.min(metrics.backlinks + Math.random() * 2, 500);
    metrics.referringDomains = Math.min(metrics.referringDomains + (Math.random() * 0.5), 200);

    // Improve content quality
    metrics.contentQualityScore = Math.min(metrics.contentQualityScore + 0.3, 100);

    // Improve user engagement
    metrics.userEngagementScore = Math.min(metrics.userEngagementScore + 0.25, 100);

    // Optimize Core Web Vitals (decrease = better)
    metrics.coreWebVitals.lcp = Math.max(metrics.coreWebVitals.lcp - 15, 1200);
    metrics.coreWebVitals.fid = Math.max(metrics.coreWebVitals.fid - 5, 50);
    metrics.coreWebVitals.cls = Math.max(metrics.coreWebVitals.cls - 0.01, 0.05);
    metrics.coreWebVitals.ttfb = Math.max(metrics.coreWebVitals.ttfb - 10, 300);
    metrics.coreWebVitals.fcp = Math.max(metrics.coreWebVitals.fcp - 12, 900);

    // Build social signals
    metrics.socialSignals = Math.min(metrics.socialSignals + 2, 1000);

    // Increase brand mentions
    metrics.brandMentions = Math.min(metrics.brandMentions + 0.1, 500);

    // Improve crawl score
    metrics.crawlScore = Math.min(metrics.crawlScore + 0.2, 100);

    // Increase indexed pages
    metrics.indexedPages = Math.min(metrics.indexedPages + 0.5, 500);

    metrics.timestamp = Date.now();
  }

  private calculateSimulationResults(): void {
    const enabledAgents = Array.from(this.agents.values()).filter(a => a.enabled);
    const totalImpact = enabledAgents.reduce((sum, agent) => {
      return sum + this.simulateAgentImpact(agent, this.simulationMatrix.secondsPassed);
    }, 0);

    // Calculate projected rank (lower is better)
    const metricsScore = (
      (this.rankingMetrics.domainAuthority * 0.25) +
      (this.rankingMetrics.pageAuthority * 0.20) +
      (this.rankingMetrics.contentQualityScore * 0.20) +
      (this.rankingMetrics.userEngagementScore * 0.15) +
      (this.rankingMetrics.crawlScore * 0.10) +
      ((100 - this.rankingMetrics.coreWebVitals.lcp / 30) * 0.10)
    );

    // Start at rank 100, improve based on metrics
    const baseRank = 100;
    const improvementFactor = (metricsScore / 100) * 0.75; // Max 75% improvement
    this.simulationMatrix.projectedRank = Math.max(
      Math.ceil(baseRank * (1 - improvementFactor)),
      1
    );

    // Confidence increases over time
    this.simulationMatrix.confidenceScore = Math.min(
      35 + (this.simulationMatrix.secondsPassed * 0.5),
      95
    );

    // Generate recommendations
    this.simulationMatrix.recommendations = this.generateRecommendations();
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const metrics = this.rankingMetrics;

    if (metrics.coreWebVitals.lcp > 2500) {
      recommendations.push('Optimize LCP: Reduce Largest Contentful Paint time');
    }
    if (metrics.contentQualityScore < 80) {
      recommendations.push('Improve content quality and depth');
    }
    if (metrics.backlinks < 100) {
      recommendations.push('Build more high-quality backlinks');
    }
    if (metrics.socialSignals < 500) {
      recommendations.push('Increase social signals and engagement');
    }
    if (metrics.domainAuthority < 30) {
      recommendations.push('Build domain authority through link building');
    }

    return recommendations;
  }

  public executeAgent(agentId: string): void {
    const agent = this.agents.get(agentId);
    if (!agent) return;

    const task: AgentTask = {
      id: `task-${Date.now()}`,
      agentId,
      name: agent.name,
      category: agent.category,
      status: AgentStatus.RUNNING,
      priority: agent.priority,
      progress: 0,
      startTime: Date.now(),
    };

    this.activeTasks.set(task.id, task);

    // Simulate task execution
    setTimeout(() => {
      task.status = AgentStatus.COMPLETE;
      task.endTime = Date.now();
      task.progress = 100;
      task.result = { success: true, message: `${agent.name} completed successfully` };
    }, Math.random() * 3000 + 1000);
  }

  public getRankingMetrics(): RankingMetrics {
    return this.rankingMetrics;
  }

  public getSimulationMatrix(): SimulationMatrix {
    return this.simulationMatrix;
  }

  public getActiveTasks(): AgentTask[] {
    return Array.from(this.activeTasks.values());
  }

  public getAgents(): AgentConfig[] {
    return Array.from(this.agents.values());
  }

  public generateRankingSimulation(): RankingSimulation {
    const metrics = this.rankingMetrics;
    const secondsPassed = this.simulationMatrix.secondsPassed;

    const currentRank = this.simulationMatrix.projectedRank;
    const improvementPerSecond = 0.15;
    const targetRank = 1;

    const rank24h = Math.max(currentRank - (improvementPerSecond * 86400), targetRank);
    const rank7d = Math.max(currentRank - (improvementPerSecond * 604800), targetRank);
    const rank30d = targetRank;

    return {
      iterationNumber: secondsPassed,
      currentRank,
      targetRank,
      progress: ((100 - currentRank) / 100) * 100,
      agentContributions: new Map(),
      matrixScore: (metrics.domainAuthority + metrics.pageAuthority) / 2,
      predictedRankIn24h: rank24h,
      predictedRankIn7d: rank7d,
      predictedRankIn30d: rank30d,
    };
  }
}

export const createCoreEngine = (): CoreAgentEngine => {
  return new CoreAgentEngine();
};
