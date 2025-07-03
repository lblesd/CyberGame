// UI Management for CyberGuard Academy
const UI = {
    /**
     * Initialize UI components and event listeners
     */
    initialize() {
        this.setupEventListeners();
        this.showPhase('assessment');
    },

    /**
     * Set up event listeners for form inputs
     */
    setupEventListeners() {
        // District size selection (remains radio buttons)
        document.querySelectorAll('input[name="districtSize"]').forEach(input => {
            input.addEventListener('change', (e) => {
                Game.updateDistrictSize(e.target.value);
            });
        });

        // Assessment questions (now checkboxes)
        ['mfa', 'backup', 'edr', 'training', 'incident'].forEach(category => {
            document.querySelectorAll(`input[name="${category}"]`).forEach(input => {
                input.addEventListener('change', (e) => {
                    this.updateAssessmentCheckboxes(category);
                });
            });
        });
    },

    /**
     * Update assessment based on checkbox selections
     */
    updateAssessmentCheckboxes(category) {
        const checkboxes = document.querySelectorAll(`input[name="${category}"]:checked`);
        const selectedValues = Array.from(checkboxes).map(cb => cb.value);
        Game.updateAssessment(category, selectedValues);
    },

    /**
     * Show specific game phase and hide others
     */
    showPhase(phaseName) {
        // Hide all phases
        document.querySelectorAll('.game-phase').forEach(phase => {
            phase.classList.add('hidden');
        });

        // Show selected phase
        const targetPhase = document.getElementById(phaseName + 'Phase');
        if (targetPhase) {
            targetPhase.classList.remove('hidden');
        }

        // Update phase buttons
        document.querySelectorAll('.phase-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Activate corresponding button
        const buttons = document.querySelectorAll('.phase-btn');
        switch(phaseName) {
            case 'assessment':
                if (buttons[0]) buttons[0].classList.add('active');
                break;
            case 'simulation':
                if (buttons[1]) buttons[1].classList.add('active');
                break;
            case 'results':
                if (buttons[2]) buttons[2].classList.add('active');
                break;
        }
    },

    /**
     * Update dashboard statistics display
     */
    updateDashboard(gameState) {
        const elements = {
            budget: document.getElementById('budget'),
            schoolDaysLost: document.getElementById('schoolDaysLost'),
            techTimeSpent: document.getElementById('techTimeSpent'),
            securityLevel: document.getElementById('securityLevel')
        };

        if (elements.budget) {
            if (gameState.budget !== null) {
                elements.budget.textContent = `${gameState.budget.toLocaleString()}`;
            } else {
                elements.budget.textContent = 'Select District';
            }
        }
        if (elements.schoolDaysLost) {
            elements.schoolDaysLost.textContent = gameState.schoolDaysLost;
        }
        if (elements.techTimeSpent) {
            elements.techTimeSpent.textContent = `${gameState.techTimeSpent} hrs`;
        }
        if (elements.securityLevel) {
            elements.securityLevel.textContent = gameState.securityLevel;
        }
    },

    /**
     * Display a scenario card with decision options
     */
    showScenario(scenario, scenarioIndex, totalScenarios) {
        const scenarioContainer = document.getElementById('currentScenario');
        if (!scenarioContainer) return;

        const scenarioHtml = `
            <div class="scenario-card">
                <div class="scenario-header">
                    <div class="alert-icon">${scenario.icon}</div>
                    <div class="scenario-title">${scenario.title}</div>
                </div>
                <div class="scenario-description">${scenario.description}</div>
                <div class="decision-options">
                    ${scenario.decisions.map((decision, index) => `
                        <button class="decision-btn ${SCENARIOS.utils.getDecisionClass(decision)}" 
                                onclick="Game.makeDecision(${index})">
                            ${decision.text}
                            <div style="font-size: 0.9em; color: #666; margin-top: 8px;">
                                💰 Cost: $${decision.cost.toLocaleString()} | 
                                ⏱️ Tech Time: ${decision.techHours} hrs
                                ${decision.schoolDays > 0 ? ` | 🏫 School Days Lost: ${decision.schoolDays}` : ''}
                            </div>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        scenarioContainer.innerHTML = scenarioHtml;
        this.updateProgress(scenarioIndex + 1, totalScenarios);
    },

    /**
     * Display a follow-up scenario
     */
    showFollowUpScenario(followUpScenario, followUpId) {
        const scenarioContainer = document.getElementById('currentScenario');
        if (!scenarioContainer || !followUpScenario) return;

        const scenarioHtml = `
            <div class="scenario-card">
                <div class="scenario-header">
                    <div class="alert-icon">${followUpScenario.icon}</div>
                    <div class="scenario-title">${followUpScenario.title}</div>
                </div>
                <div class="scenario-description">${followUpScenario.description}</div>
                <div class="decision-options">
                    ${followUpScenario.decisions.map((decision, index) => `
                        <button class="decision-btn ${SCENARIOS.utils.getDecisionClass(decision)}" 
                                onclick="Game.makeFollowUpDecision(${index}, '${followUpId}')">
                            ${decision.text}
                            <div style="font-size: 0.9em; color: #666; margin-top: 8px;">
                                💰 Cost: $${decision.cost.toLocaleString()} | 
                                ⏱️ Time: ${decision.techHours || 0} hrs
                                ${decision.schoolDays > 0 ? ` | 🏫 School Days: ${decision.schoolDays}` : ''}
                            </div>
                            ${decision.benefit ? `
                                <div style="font-size: 0.85em; color: #27ae60; margin-top: 5px;">
                                    📈 ${decision.benefit}
                                </div>
                            ` : ''}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        scenarioContainer.innerHTML = scenarioHtml;
    },

    /**
     * Show cost breakdown after a decision
     */
    showCostBreakdown(decision) {
        const scenarioContainer = document.getElementById('currentScenario');
        if (!scenarioContainer) return;

        const breakdownHtml = `
            <div class="cost-breakdown">
                <h4>📊 Impact Summary</h4>
                <div class="cost-item">
                    <span>Direct Response Cost:</span>
                    <span>$${decision.cost.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span>Tech Time Required:</span>
                    <span>${decision.techHours} hours</span>
                </div>
                ${decision.schoolDays > 0 ? `
                    <div class="cost-item">
                        <span>School Days Lost:</span>
                        <span>${decision.schoolDays} days</span>
                    </div>
                ` : ''}
                <div class="cost-item">
                    <span>Decision Quality:</span>
                    <span>${decision.quality.toUpperCase()}</span>
                </div>
                ${decision.benefit ? `
                    <div class="cost-item">
                        <span>Expected Benefit:</span>
                        <span>${decision.benefit}</span>
                    </div>
                ` : ''}
            </div>
        `;
        
        scenarioContainer.innerHTML += breakdownHtml;
    },

    /**
     * Update progress bar
     */
    updateProgress(current, total) {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            const progress = (current / total) * 100;
            progressFill.style.width = progress + '%';
        }
    },

    /**
     * Show investment phase with available options
     */
    showInvestmentPhase(gameState) {
        const scenarioContainer = document.getElementById('currentScenario');
        if (!scenarioContainer) return;

        const availableInvestments = SCENARIOS.utils.getInvestmentOptions(gameState.districtMultiplier);
        
        const investmentHtml = `
            <div class="scenario-card">
                <div class="scenario-header">
                    <div class="alert-icon">💰</div>
                    <div class="scenario-title">Proactive Security Investment Phase</div>
                </div>
                <div class="scenario-description">
                    Excellent work containing the incidents! You have $${gameState.budget.toLocaleString()} remaining in your budget. 
                    Now is the time to invest in proactive security measures to prevent future incidents.
                    Select the investments that best fit your district's needs and budget.
                </div>
                <div class="investment-grid">
                    ${availableInvestments.map((investment, index) => `
                        <div class="investment-card">
                            <h4>${investment.name}</h4>
                            <p><strong>Category:</strong> ${investment.category}</p>
                            <p>${investment.benefit}</p>
                            <div class="investment-cost">
                                Cost: $${investment.cost.toLocaleString()}
                            </div>
                            <button class="btn-primary" 
                                    onclick="Game.makeInvestment(${index})" 
                                    ${gameState.budget < investment.cost ? 'disabled' : ''}>
                                ${gameState.budget < investment.cost ? 'Insufficient Budget' : 'Invest'}
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn-primary" onclick="Game.endSimulation()" 
                            style="background: linear-gradient(135deg, #27ae60, #2ecc71); padding: 16px 40px;">
                        Complete Simulation
                    </button>
                </div>
            </div>
        `;
        
        scenarioContainer.innerHTML = investmentHtml;
    },

    /**
     * Show badge notification
     */
    showBadgeNotification(title, description) {
        const scenarioContainer = document.getElementById('currentScenario');
        if (!scenarioContainer) return;

        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.innerHTML = `
            <div style="background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; padding: 20px; border-radius: 12px; margin: 15px 0; text-align: center; box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);">
                <div style="font-size: 1.3em; font-weight: bold; margin-bottom: 5px;">${title}</div>
                <div style="font-size: 1em; opacity: 0.9;">${description}</div>
            </div>
        `;
        scenarioContainer.appendChild(notification);
        
        // Remove notification after 3.5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3500);
    },

    /**
     * Display final results with comprehensive breakdown
     */
    showResults(gameState, scores, recommendations) {
        const finalCostElement = document.getElementById('finalCost');
        const finalHoursElement = document.getElementById('finalHours');
        const performanceRatingElement = document.getElementById('performanceRating');

        if (finalCostElement) {
            finalCostElement.textContent = `$${scores.totalImpact.toLocaleString()}`;
        }

        if (finalHoursElement) {
            finalHoursElement.textContent = `${gameState.techTimeSpent} tech hrs | ${gameState.schoolDaysLost} school days`;
        }

        if (performanceRatingElement) {
            const detailedResults = `
                <div class="performance-badge" style="background: ${scores.badgeColor};">
                    ${scores.rating} (${scores.overallScore}/100)
                </div>
                
                <div class="results-breakdown">
                    <h3>📈 Performance Breakdown</h3>
                    <div class="performance-grid">
                        <div class="performance-metric">
                            <div class="performance-score">${Math.round(scores.financialScore)}/100</div>
                            <div class="performance-label">Cost Management</div>
                        </div>
                        <div class="performance-metric">
                            <div class="performance-score">${Math.round(scores.timeScore)}/100</div>
                            <div class="performance-label">Tech Efficiency</div>
                        </div>
                        <div class="performance-metric">
                            <div class="performance-score">${Math.round(scores.schoolImpactScore)}/100</div>
                            <div class="performance-label">School Protection</div>
                        </div>
                        <div class="performance-metric">
                            <div class="performance-score">${Math.round(scores.nistScore)}/100</div>
                            <div class="performance-label">NIST Alignment</div>
                        </div>
                    </div>
                </div>

                <div class="results-breakdown">
                    <h3>🏫 District Summary</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">
                        <div><strong>District Size:</strong> ${gameState.districtSize.charAt(0).toUpperCase() + gameState.districtSize.slice(1)}</div>
                        <div><strong>Security Level:</strong> ${gameState.securityLevel}</div>
                        <div><strong>Total Cost Impact:</strong> $${scores.totalImpact.toLocaleString()}</div>
                        <div><strong>Proactive Investments:</strong> ${gameState.proactiveInvestments.length}</div>
                    </div>
                </div>
                
                ${gameState.badges.length > 0 ? `
                    <div class="results-breakdown">
                        <h3>🏆 Badges Earned</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 12px; margin: 15px 0;">
                            ${gameState.badges.map(badge => this.getBadgeDisplay(badge)).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${gameState.proactiveInvestments.length > 0 ? `
                    <div class="results-breakdown">
                        <h3>💰 Security Investments Made</h3>
                        <ul style="text-align: left; margin: 15px 0; padding-left: 20px;">
                            ${gameState.proactiveInvestments.map(inv => `
                                <li style="margin: 8px 0; line-height: 1.5;">
                                    <strong>${inv.name}</strong> - $${inv.cost.toLocaleString()}
                                    <br><small style="color: #666;">${inv.benefit}</small>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="results-breakdown">
                    <h3>📋 Key Recommendations</h3>
                    <ul style="text-align: left; margin: 15px 0; padding-left: 20px;">
                        ${recommendations.map(rec => `<li style="margin: 8px 0; line-height: 1.5;">${rec}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            performanceRatingElement.innerHTML = detailedResults;
        }

        this.showPhase('results');
    },

    /**
     * Get badge display HTML
     */
    getBadgeDisplay(badgeId) {
        const badges = {
            'rapid_responder': { icon: '🚀', name: 'Rapid Responder', color: '#3498db' },
            'budget_protector': { icon: '💰', name: 'Budget Protector', color: '#27ae60' },
            'proactive_planner': { icon: '🛡️', name: 'Proactive Planner', color: '#9b59b6' },
            'cyber_guardian': { icon: '🛡️', name: 'Cyber Guardian', color: '#e74c3c' },
            'nist_navigator': { icon: '🧭', name: 'NIST Navigator', color: '#f39c12' },
            'school_protector': { icon: '🏫', name: 'School Protector', color: '#2ecc71' }
        };
        
        const badge = badges[badgeId];
        if (!badge) return '';
        
        return `
            <div class="badge" style="background: ${badge.color};">
                ${badge.icon} ${badge.name}
            </div>
        `;
    },

    /**
     * Reset all form inputs
     */
    resetForm() {
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.checked = false;
        });
        document.querySelectorAll('input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });
    },

    /**
     * Show error message
     */
    showError(message) {
        alert(message); // Simple alert for now, could be enhanced with custom modal
    },

    /**
     * Animate elements with fade in effect
     */
    animateIn(element) {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 50);
        }
    }
};
