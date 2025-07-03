// Main Game Logic for CyberGuard Academy
const Game = {
    // Game state object
    state: {
        budget: null, // Will be set when district size is selected
        schoolDaysLost: 0,
        techTimeSpent: 0,
        securityLevel: 'Baseline',
        districtSize: null,
        districtMultiplier: null,
        reputation: 100, // Start with perfect reputation
        reputationLevel: 'Excellent',
        reputationEvents: [],
        assessment: {
            mfa: [],
            backup: [],
            edr: [],
            training: [],
            incident: []
        },
        currentScenario: 0,
        scenarios: [],
        totalCost: 0,
        decisions: [],
        nistAlignment: {
            identify: 0,
            protect: 0,
            detect: 0,
            respond: 0,
            recover: 0
        },
        badges: [],
        proactiveInvestments: [],
        followUpQueue: [],
        allIncidentsContained: false,
        availableInvestments: [],
        storyMode: true,
        waitingForNext: false
    },

    /**
     * Initialize the game
     */
    initialize() {
        this.resetState();
        UI.initialize();
        UI.updateDashboard(this.state);
        console.log('CyberGuard Academy initialized');
    },

    /**
     * Reset game state to initial values
     */
    resetState() {
        this.state = {
            budget: null, // Will be set when district size is selected
            schoolDaysLost: 0,
            techTimeSpent: 0,
            securityLevel: 'Baseline',
            districtSize: null,
            districtMultiplier: null,
            assessment: {
                mfa: [],
                backup: [],
                edr: [],
                training: [],
                incident: []
            },
            currentScenario: 0,
            scenarios: [],
            totalCost: 0,
            decisions: [],
            nistAlignment: {
                identify: 0,
                protect: 0,
                detect: 0,
                respond: 0,
                recover: 0
            },
            badges: [],
            proactiveInvestments: [],
            followUpQueue: [],
            allIncidentsContained: false,
            availableInvestments: []
        };
    },

    /**
     * Update district size and adjust budget accordingly
     */
    updateDistrictSize(size) {
        this.state.districtSize = size;
        this.state.districtMultiplier = SCENARIOS.costs.sizeMultipliers[size];
        
        // Set budget based on district size (now using absolute values)
        this.state.budget = this.state.districtMultiplier.budget;
        
        UI.updateDashboard(this.state);
        console.log(`District size updated to: ${size}, Budget: ${this.state.budget.toLocaleString()}`);
    },

    /**
     * Update assessment response (now handles arrays of selections)
     */
    updateAssessment(category, selectedValues) {
        this.state.assessment[category] = selectedValues;
        console.log(`Assessment updated: ${category} = [${selectedValues.join(', ')}]`);
    },

    /**
     * Complete the assessment phase and transition to simulation
     */
    completeAssessment() {
        // Validate that district size is selected
        if (!this.state.districtSize) {
            UI.showError('Please select your district size before continuing.');
            return;
        }

        // Validate that at least one option is selected for each assessment category
        const categories = Object.keys(this.state.assessment);
        const emptyCategories = categories.filter(cat => this.state.assessment[cat].length === 0);
        
        if (emptyCategories.length > 0) {
            const categoryNames = {
                mfa: 'Multi-Factor Authentication',
                backup: 'Data Backup Strategy', 
                edr: 'Endpoint Security',
                training: 'Staff Security Training',
                incident: 'Incident Response Preparedness'
            };
            
            const missingNames = emptyCategories.map(cat => categoryNames[cat]).join(', ');
            UI.showError(`Please select at least one option for: ${missingNames}`);
            return;
        }

        // Calculate security level
        this.calculateSecurityLevel();

        // Generate scenarios
        this.generateScenarios();

        // Update dashboard and transition to simulation
        UI.updateDashboard(this.state);
        UI.showPhase('simulation');
        
        // Start the simulation
        this.startSimulation();
        
        console.log('Assessment completed, starting simulation');
    },

    /**
     * Calculate security level based on assessment responses
     */
    calculateSecurityLevel() {
        // Calculate average security implementation across all categories
        const categories = Object.keys(this.state.assessment);
        const maxPossiblePerCategory = 4; // Each category has 4 options
        
        let totalSelected = 0;
        let totalPossible = 0;
        
        categories.forEach(category => {
            totalSelected += this.state.assessment[category].length;
            totalPossible += maxPossiblePerCategory;
        });
        
        const implementationRatio = totalSelected / totalPossible;
        
        // Determine security level based on implementation ratio
        if (implementationRatio >= 0.75) {
            this.state.securityLevel = 'Strong';
        } else if (implementationRatio >= 0.45) {
            this.state.securityLevel = 'Moderate';  
        } else {
            this.state.securityLevel = 'Weak';
        }
        
        console.log(`Security level calculated: ${this.state.securityLevel} (${(implementationRatio * 100).toFixed(1)}% implementation)`);
    },

    /**
     * Generate scenarios based on assessment
     */
    generateScenarios() {
        this.state.scenarios = SCENARIOS.utils.generateScenarios(
            this.state.securityLevel,
            this.state.districtMultiplier,
            3 // Maximum number of scenarios
        );
        
        console.log(`Generated ${this.state.scenarios.length} scenarios`);
    },

    /**
     * Start the simulation phase
     */
    startSimulation() {
        this.state.currentScenario = 0;
        this.showCurrentScenario();
    },

    /**
     * Display the current scenario
     */
    showCurrentScenario() {
        if (this.state.currentScenario < this.state.scenarios.length) {
            const scenario = this.state.scenarios[this.state.currentScenario];
            UI.showScenario(scenario, this.state.currentScenario, this.state.scenarios.length);
        }
    },

    /**
     * Handle decision making in main scenarios
     */
    makeDecision(decisionIndex) {
        const currentScenario = this.state.scenarios[this.state.currentScenario];
        const decision = currentScenario.decisions[decisionIndex];
        
        // Apply costs and impacts
        this.applyDecisionCosts(decision);
        
        // Update NIST alignment
        this.updateNISTAlignment(decision);
        
        // Check if incidents are contained
        this.checkIncidentContainment(decision);
        
        // Record the decision
        this.recordDecision(currentScenario, decision);
        
        // Check for follow-up scenarios
        if (decision.followUp) {
            this.state.followUpQueue.push(decision.followUp);
        }
        
        // Show cost breakdown
        UI.showCostBreakdown(decision);
        
        // Check for earned badges
        this.checkBadges();
        
        // Update dashboard
        UI.updateDashboard(this.state);
        
        // Move to next scenario after delay
        setTimeout(() => {
            this.proceedToNextPhase();
        }, 3000);
        
        console.log(`Decision made: ${decision.text}`);
    },

    /**
     * Apply financial and time costs from a decision
     */
    applyDecisionCosts(decision) {
        this.state.budget -= decision.cost;
        this.state.techTimeSpent += decision.techHours;
        this.state.schoolDaysLost += decision.schoolDays;
        this.state.totalCost += decision.cost;
    },

    /**
     * Update NIST framework alignment tracking
     */
    updateNISTAlignment(decision) {
        if (decision.nistAlignment && decision.nistAlignment !== 'None') {
            const category = decision.nistAlignment.toLowerCase();
            if (this.state.nistAlignment[category] !== undefined) {
                this.state.nistAlignment[category]++;
            }
        }
    },

    /**
     * Check if all incidents are being properly contained
     */
    checkIncidentContainment(decision) {
        const goodOutcomes = ['contained', 'verified', 'thorough', 'protected'];
        if (goodOutcomes.includes(decision.outcome)) {
            this.state.allIncidentsContained = true;
        } else {
            this.state.allIncidentsContained = false;
        }
    },

    /**
     * Record a decision in the game history
     */
    recordDecision(scenario, decision, type = 'main') {
        this.state.decisions.push({
            scenario: scenario.title,
            decision: decision.text,
            cost: decision.cost,
            techHours: decision.techHours,
            schoolDays: decision.schoolDays,
            outcome: decision.outcome,
            nistAlignment: decision.nistAlignment || 'None',
            quality: decision.quality,
            type: type
        });
    },

    /**
     * Proceed to the next phase of the game
     */
    proceedToNextPhase() {
        this.state.currentScenario++;
        
        if (this.state.currentScenario < this.state.scenarios.length) {
            // Show next main scenario
            this.showCurrentScenario();
        } else if (this.state.followUpQueue.length > 0) {
            // Show follow-up scenarios
            this.showNextFollowUp();
        } else {
            // Check if investment phase should be shown (minimum 25% of budget remaining)
            const minInvestmentBudget = Math.round(this.state.districtMultiplier.budget * 0.25);
            if (this.state.allIncidentsContained && this.state.budget > minInvestmentBudget) {
                this.startInvestmentPhase();
            } else {
                this.endSimulation();
            }
        }
    },

    /**
     * Show the next follow-up scenario
     */
    showNextFollowUp() {
        const followUpId = this.state.followUpQueue.shift();
        const followUpScenario = SCENARIOS.utils.getFollowUpScenario(followUpId);
        
        if (followUpScenario) {
            UI.showFollowUpScenario(followUpScenario, followUpId);
        } else {
            console.warn(`Follow-up scenario not found: ${followUpId}`);
            this.proceedToNextPhase();
        }
    },

    /**
     * Handle follow-up scenario decisions
     */
    makeFollowUpDecision(decisionIndex, followUpId) {
        const followUpScenario = SCENARIOS.utils.getFollowUpScenario(followUpId);
        if (!followUpScenario) return;
        
        const decision = followUpScenario.decisions[decisionIndex];
        
        // Apply costs
        this.applyDecisionCosts(decision);
        
        // Record as proactive investment if applicable
        if (decision.benefit) {
            this.state.proactiveInvestments.push({
                name: decision.text,
                cost: decision.cost,
                benefit: decision.benefit
            });
        }
        
        // Record decision
        this.recordDecision(followUpScenario, decision, 'follow-up');
        
        // Show cost breakdown
        UI.showCostBreakdown(decision);
        
        // Update dashboard
        UI.updateDashboard(this.state);
        
        // Continue to next phase
        setTimeout(() => {
            this.proceedToNextPhase();
        }, 3000);
        
        console.log(`Follow-up decision made: ${decision.text}`);
    },

    /**
     * Start the investment phase
     */
    startInvestmentPhase() {
        this.state.availableInvestments = SCENARIOS.utils.getInvestmentOptions(this.state.districtMultiplier);
        UI.showInvestmentPhase(this.state);
        console.log('Investment phase started');
    },

    /**
     * Handle investment purchases
     */
    makeInvestment(investmentIndex) {
        const investment = this.state.availableInvestments[investmentIndex];
        
        if (!investment || this.state.budget < investment.cost) {
            UI.showError('Insufficient budget for this investment.');
            return;
        }
        
        // Apply investment cost
        this.state.budget -= investment.cost;
        this.state.totalCost += investment.cost;
        
        // Record investment
        this.state.proactiveInvestments.push({
            name: investment.name,
            cost: investment.cost,
            benefit: investment.benefit
        });
        
        // Remove from available investments
        this.state.availableInvestments.splice(investmentIndex, 1);
        
        // Update display
        UI.updateDashboard(this.state);
        UI.showInvestmentPhase(this.state);
        
        // Show investment notification
        UI.showBadgeNotification(
            '💰 Investment Made', 
            `${investment.name} purchased for $${investment.cost.toLocaleString()}`
        );
        
        console.log(`Investment made: ${investment.name}`);
    },

    /**
     * Check and award badges based on performance
     */
    checkBadges() {
        const badges = [
            {
                id: 'rapid_responder',
                condition: () => this.state.techTimeSpent <= 20,
                title: '🚀 Rapid Responder',
                description: 'Minimal tech time spent on incidents'
            },
            {
                id: 'budget_protector',
                condition: () => this.state.totalCost <= 50000,
                title: '💰 Budget Protector',
                description: 'Efficient resource management'
            },
            {
                id: 'proactive_planner',
                condition: () => this.state.proactiveInvestments.length >= 2,
                title: '🛡️ Proactive Planner',
                description: 'Forward-thinking security investments'
            },
            {
                id: 'school_protector',
                condition: () => this.state.schoolDaysLost === 0,
                title: '🏫 School Protector',
                description: 'Zero instructional days lost'
            }
        ];

        badges.forEach(badge => {
            if (badge.condition() && !this.state.badges.includes(badge.id)) {
                this.state.badges.push(badge.id);
                UI.showBadgeNotification(badge.title, badge.description);
                console.log(`Badge earned: ${badge.id}`);
            }
        });
    },

    /**
     * Calculate final scores and end the simulation
     */
    endSimulation() {
        const scores = this.calculateFinalScores();
        const recommendations = this.generateRecommendations();
        
        // Check for final badges
        this.checkFinalBadges(scores);
        
        // Show results
        UI.showResults(this.state, scores, recommendations);
        
        console.log('Simulation ended');
        console.log('Final scores:', scores);
    },

    /**
     * Calculate comprehensive final scores
     */
    calculateFinalScores() {
        const schoolDayCost = this.state.schoolDaysLost * SCENARIOS.costs.school_day_cost * this.state.districtMultiplier.impact;
        const techTimeCost = this.state.techTimeSpent * SCENARIOS.costs.tech_hour_cost;
        const totalImpact = this.state.totalCost + schoolDayCost + techTimeCost;
        
        // Calculate NIST alignment score
        const nistTotal = Object.values(this.state.nistAlignment).reduce((a, b) => a + b, 0);
        const nistScore = nistTotal > 0 ? Math.min(100, (nistTotal / this.state.decisions.length) * 100) : 0;
        
        // Calculate component scores
        const financialScore = Math.max(0, 100 - (totalImpact / 3000));
        const timeScore = Math.max(0, 100 - (this.state.techTimeSpent * 2));
        const schoolImpactScore = Math.max(0, 100 - (this.state.schoolDaysLost * 20));
        
        // Calculate overall score
        const overallScore = Math.round((financialScore + timeScore + schoolImpactScore + nistScore) / 4);
        
        // Determine rating and badge color
        let rating = 'Needs Improvement';
        let badgeColor = '#e74c3c';
        
        if (overallScore >= 85) {
            rating = 'Excellent Response';
            badgeColor = '#27ae60';
        } else if (overallScore >= 70) {
            rating = 'Good Response';
            badgeColor = '#f39c12';
        } else if (overallScore >= 55) {
            rating = 'Adequate Response';
            badgeColor = '#e67e22';
        }
        
        return {
            totalImpact,
            financialScore,
            timeScore,
            schoolImpactScore,
            nistScore,
            overallScore,
            rating,
            badgeColor
        };
    },

    /**
     * Check for final performance badges
     */
    checkFinalBadges(scores) {
        if (scores.overallScore >= 90 && !this.state.badges.includes('cyber_guardian')) {
            this.state.badges.push('cyber_guardian');
        }
        
        if (scores.nistScore >= 80 && !this.state.badges.includes('nist_navigator')) {
            this.state.badges.push('nist_navigator');
        }
    },

    /**
     * Generate personalized recommendations
     */
    generateRecommendations() {
        const recommendations = [];
        
        // Budget-based recommendations
        if (this.state.totalCost > 100000) {
            recommendations.push('Consider investing in proactive security measures to reduce incident response costs');
        }
        
        // Time-based recommendations
        if (this.state.techTimeSpent > 40) {
            recommendations.push('Develop and test incident response procedures to minimize tech time requirements');
        }
        
        // School impact recommendations
        if (this.state.schoolDaysLost > 0) {
            recommendations.push('Implement redundant systems to prevent school closures during cyber incidents');
        }
        
        // NIST alignment recommendations
        const nistCounts = this.state.nistAlignment;
        if (nistCounts.protect < 2) {
            recommendations.push('Strengthen preventative security controls (NIST Protect function)');
        }
        if (nistCounts.detect < 1) {
            recommendations.push('Implement better threat detection capabilities (NIST Detect function)');
        }
        if (nistCounts.respond < 2) {
            recommendations.push('Improve incident response procedures and training (NIST Respond function)');
        }
        
        // Assessment-based recommendations
        if (!this.state.assessment.mfa.includes('admin_mfa') && !this.state.assessment.mfa.includes('staff_mfa')) {
            recommendations.push('Implement multi-factor authentication for administrators and staff');
        }
        if (!this.state.assessment.backup.includes('air_gapped') && !this.state.assessment.backup.includes('tested_recovery')) {
            recommendations.push('Establish air-gapped backup systems with regular recovery testing');
        }
        if (!this.state.assessment.training.includes('phishing_simulations') && !this.state.assessment.training.includes('annual_training')) {
            recommendations.push('Conduct regular security awareness training with phishing simulations');
        }
        if (!this.state.assessment.incident.includes('tested_plan') && !this.state.assessment.incident.includes('written_plan')) {
            recommendations.push('Develop and test a comprehensive incident response plan');
        }
        if (!this.state.assessment.edr.includes('edr_solution') && !this.state.assessment.edr.includes('monitoring_24_7')) {
            recommendations.push('Implement advanced endpoint detection and response capabilities');
        }
        
        // Proactive investment recommendations
        if (this.state.proactiveInvestments.length < 2) {
            recommendations.push('Consider preventative security investments to reduce future incident costs');
        }
        
        // District size specific recommendations
        if (this.state.districtSize === 'xlarge' && this.state.proactiveInvestments.length < 4) {
            recommendations.push('Large districts should consider comprehensive security infrastructure investments');
        }
        
        return recommendations.slice(0, 5); // Limit to top 5 recommendations
    },

    /**
     * Restart the game
     */
    restart() {
        this.resetState();
        UI.resetForm();
        UI.updateDashboard(this.state);
        UI.showPhase('assessment');
        console.log('Game restarted');
    }
};
