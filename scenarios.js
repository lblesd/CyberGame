// Scenario definitions and costs for CyberGuard Academy
const SCENARIOS = {
    // Cost database with district size multipliers
    costs: {
        sizeMultipliers: {
            small: { budget: 0.6, cost: 0.7, impact: 0.5 },
            medium: { budget: 1.0, cost: 1.0, impact: 1.0 },
            large: { budget: 1.8, cost: 1.3, impact: 1.5 },
            xlarge: { budget: 3.0, cost: 1.7, impact: 2.5 }
        },
        
        // Proactive solutions
        edr_solution: 25000,
        backup_system: 15000,
        mfa_implementation: 8000,
        staff_training: 5000,
        incident_response_plan: 10000,
        network_monitoring: 20000,
        firewall_upgrade: 12000,
        email_security: 15000,
        
        // Reactive costs
        incident_response_consultant: 50000,
        data_breach_investigation: 75000,
        system_restoration: 30000,
        legal_compliance: 25000,
        notification_costs: 5000,
        credit_monitoring: 15000,
        regulatory_fines: 100000,
        
        // Time costs
        tech_hour_cost: 75,
        school_day_cost: 15000,
        administrative_hour_cost: 50
    },

    // Main scenario templates
    templates: [
        {
            id: 'phishing_attack',
            title: 'Suspicious Email Campaign',
            description: 'Multiple staff members have received convincing phishing emails appearing to be from the district office, requesting login credentials for an "urgent system update." Three teachers have already clicked the links.',
            icon: '⚠️',
            nistCategory: 'Detect',
            severity: 'medium',
            decisions: [
                {
                    text: 'Immediately disable affected accounts and reset all passwords',
                    cost: 2000,
                    techHours: 4,
                    schoolDays: 0,
                    outcome: 'contained',
                    followUp: 'phishing_contained',
                    nistAlignment: 'Respond',
                    quality: 'good'
                },
                {
                    text: 'Send out a warning email to all staff',
                    cost: 0,
                    techHours: 2,
                    schoolDays: 0,
                    outcome: 'spreading',
                    followUp: 'phishing_spreading',
                    nistAlignment: 'Protect',
                    quality: 'moderate'
                },
                {
                    text: 'Wait and monitor the situation',
                    cost: 0,
                    techHours: 0,
                    schoolDays: 0,
                    outcome: 'escalated',
                    followUp: 'phishing_escalated',
                    nistAlignment: 'None',
                    quality: 'poor'
                }
            ]
        },
        {
            id: 'ransomware_detection',
            title: 'Ransomware Detected',
            description: 'Your endpoint detection system has flagged suspicious file encryption activity on multiple computers in the main office. Files are being rapidly encrypted with an unknown extension.',
            icon: '🚨',
            nistCategory: 'Respond',
            severity: 'high',
            decisions: [
                {
                    text: 'Try to identify the source before taking action',
                    cost: 0,
                    techHours: 2,
                    schoolDays: 0,
                    outcome: 'delayed',
                    followUp: 'ransomware_delayed',
                    nistAlignment: 'Detect',
                    quality: 'poor'
                },
                {
                    text: 'Immediately isolate affected systems and activate incident response plan',
                    cost: 5000,
                    techHours: 8,
                    schoolDays: 0,
                    outcome: 'contained',
                    followUp: 'ransomware_contained',
                    nistAlignment: 'Respond',
                    quality: 'good'
                },
                {
                    text: 'Shut down the entire network to prevent spread',
                    cost: 0,
                    techHours: 4,
                    schoolDays: 1,
                    outcome: 'overreaction',
                    followUp: 'network_shutdown',
                    nistAlignment: 'Respond',
                    quality: 'moderate'
                }
            ]
        },
        {
            id: 'social_engineering',
            title: 'Social Engineering Attempt',
            description: 'A person claiming to be from your IT vendor calls the main office requesting administrative access to "fix a critical security vulnerability." They seem to know details about your systems.',
            icon: '📞',
            nistCategory: 'Protect',
            severity: 'medium',
            decisions: [
                {
                    text: 'Provide the requested access since they seem legitimate',
                    cost: 0,
                    techHours: 0,
                    schoolDays: 0,
                    outcome: 'compromised',
                    followUp: 'social_eng_compromised',
                    nistAlignment: 'None',
                    quality: 'poor'
                },
                {
                    text: 'Hang up immediately and report to IT security',
                    cost: 500,
                    techHours: 2,
                    schoolDays: 0,
                    outcome: 'reported',
                    followUp: 'social_eng_reported',
                    nistAlignment: 'Protect',
                    quality: 'good'
                },
                {
                    text: 'Verify the caller\'s identity through official channels before providing any information',
                    cost: 0,
                    techHours: 1,
                    schoolDays: 0,
                    outcome: 'verified',
                    followUp: 'social_eng_verified',
                    nistAlignment: 'Protect',
                    quality: 'excellent'
                }
            ]
        },
        {
            id: 'student_hacking',
            title: 'Student Network Intrusion',
            description: 'A student has gained unauthorized access to the gradebook system and changed several grades. They also appear to have accessed other student records.',
            icon: '🎓',
            nistCategory: 'Detect',
            severity: 'medium',
            decisions: [
                {
                    text: 'Reset the grades and give student a warning',
                    cost: 1000,
                    techHours: 4,
                    schoolDays: 0,
                    outcome: 'minimal',
                    followUp: 'student_warning',
                    nistAlignment: 'Recover',
                    quality: 'poor'
                },
                {
                    text: 'Implement additional access controls and monitoring',
                    cost: 8000,
                    techHours: 12,
                    schoolDays: 0,
                    outcome: 'preventative',
                    followUp: 'student_prevention',
                    nistAlignment: 'Protect',
                    quality: 'good'
                },
                {
                    text: 'Immediately revoke student access and conduct full investigation',
                    cost: 15000,
                    techHours: 16,
                    schoolDays: 0,
                    outcome: 'thorough',
                    followUp: 'student_investigation',
                    nistAlignment: 'Respond',
                    quality: 'excellent'
                }
            ]
        },
        {
            id: 'vendor_compromise',
            title: 'Third-Party Vendor Breach',
            description: 'Your learning management system vendor has notified you of a data breach affecting student information. Personal data may have been exposed.',
            icon: '🏢',
            nistCategory: 'Respond',
            severity: 'high',
            decisions: [
                {
                    text: 'Wait for more information from the vendor',
                    cost: 0,
                    techHours: 8,
                    schoolDays: 0,
                    outcome: 'delayed',
                    followUp: 'vendor_delay',
                    nistAlignment: 'None',
                    quality: 'poor'
                },
                {
                    text: 'Conduct your own investigation of the impact',
                    cost: 35000,
                    techHours: 48,
                    schoolDays: 0,
                    outcome: 'independent',
                    followUp: 'vendor_investigation',
                    nistAlignment: 'Respond',
                    quality: 'excellent'
                },
                {
                    text: 'Immediately notify all affected families and authorities',
                    cost: 25000,
                    techHours: 32,
                    schoolDays: 0,
                    outcome: 'transparent',
                    followUp: 'vendor_notification',
                    nistAlignment: 'Respond',
                    quality: 'good'
                }
            ]
        }
    ],

    // Follow-up scenarios
    followUps: {
        'phishing_contained': {
            title: 'Phishing Follow-up: Prevention Investment',
            description: 'You\'ve successfully contained the phishing attack. Now you need to decide on preventative measures to avoid future incidents.',
            icon: '🛡️',
            decisions: [
                {
                    text: 'Invest in advanced email security gateway ($15,000)',
                    cost: 15000,
                    techHours: 8,
                    schoolDays: 0,
                    outcome: 'protected',
                    benefit: 'Prevents 85% of future phishing attempts'
                },
                {
                    text: 'Implement mandatory phishing simulation training ($5,000)',
                    cost: 5000,
                    techHours: 16,
                    schoolDays: 0,
                    outcome: 'trained',
                    benefit: 'Reduces staff susceptibility by 70%'
                },
                {
                    text: 'Continue with current security measures',
                    cost: 0,
                    techHours: 0,
                    schoolDays: 0,
                    outcome: 'vulnerable',
                    benefit: 'No additional protection'
                }
            ]
        },
        'phishing_spreading': {
            title: 'Phishing Campaign Escalation',
            description: 'The warning email was too late. 15 additional staff members have now clicked the malicious links. Credentials may be compromised.',
            icon: '⚠️',
            decisions: [
                {
                    text: 'Force password reset for entire district',
                    cost: 8000,
                    techHours: 24,
                    schoolDays: 0,
                    outcome: 'comprehensive',
                    benefit: 'Complete credential protection'
                },
                {
                    text: 'Reset only affected accounts and monitor',
                    cost: 3000,
                    techHours: 12,
                    schoolDays: 0,
                    outcome: 'targeted',
                    benefit: 'Addresses known compromises'
                },
                {
                    text: 'Wait for signs of actual compromise',
                    cost: 0,
                    techHours: 4,
                    schoolDays: 0,
                    outcome: 'reactive',
                    benefit: 'High risk of data breach'
                }
            ]
        },
        'phishing_escalated': {
            title: 'Data Breach Confirmed',
            description: 'By waiting, the attackers had time to access sensitive student data. A full data breach has occurred.',
            icon: '💥',
            decisions: [
                {
                    text: 'Hire external cybersecurity firm for full investigation',
                    cost: 75000,
                    techHours: 120,
                    schoolDays: 2,
                    outcome: 'thorough',
                    benefit: 'Complete forensic analysis'
                },
                {
                    text: 'Handle investigation internally',
                    cost: 25000,
                    techHours: 80,
                    schoolDays: 1,
                    outcome: 'limited',
                    benefit: 'May miss critical evidence'
                },
                {
                    text: 'Minimal response to reduce costs',
                    cost: 5000,
                    techHours: 20,
                    schoolDays: 0,
                    outcome: 'inadequate',
                    benefit: 'Legal and regulatory risks'
                }
            ]
        },
        'ransomware_contained': {
            title: 'Ransomware Recovery',
            description: 'The ransomware has been isolated, but 200 files were encrypted. You need to decide on recovery strategy.',
            icon: '💾',
            decisions: [
                {
                    text: 'Restore from air-gapped backups ($10,000)',
                    cost: 10000,
                    techHours: 12,
                    schoolDays: 0,
                    outcome: 'restored',
                    benefit: 'Full data recovery'
                },
                {
                    text: 'Attempt file decryption tools ($5,000)',
                    cost: 5000,
                    techHours: 24,
                    schoolDays: 0,
                    outcome: 'partial',
                    benefit: '60% chance of recovery'
                },
                {
                    text: 'Recreate lost data manually',
                    cost: 0,
                    techHours: 80,
                    schoolDays: 0,
                    outcome: 'manual',
                    benefit: 'Some data permanently lost'
                }
            ]
        },
        'ransomware_delayed': {
            title: 'Ransomware Spread',
            description: 'While investigating, the ransomware spread to backup systems. Critical district data is now encrypted.',
            icon: '🔥',
            decisions: [
                {
                    text: 'Pay ransom demand ($50,000)',
                    cost: 50000,
                    techHours: 8,
                    schoolDays: 0,
                    outcome: 'payment',
                    benefit: 'May not guarantee data recovery'
                },
                {
                    text: 'Rebuild systems from scratch',
                    cost: 100000,
                    techHours: 200,
                    schoolDays: 5,
                    outcome: 'rebuild',
                    benefit: 'Complete system security'
                },
                {
                    text: 'Attempt recovery without paying',
                    cost: 30000,
                    techHours: 120,
                    schoolDays: 3,
                    outcome: 'recovery',
                    benefit: 'Partial data loss likely'
                }
            ]
        },
        'social_eng_compromised': {
            title: 'Administrative Access Compromised',
            description: 'The social engineer gained administrative access and has been active in your systems for 2 hours before detection.',
            icon: '🔓',
            decisions: [
                {
                    text: 'Full forensic investigation and system rebuild ($100,000)',
                    cost: 100000,
                    techHours: 120,
                    schoolDays: 2,
                    outcome: 'secure',
                    benefit: 'Complete security restoration'
                },
                {
                    text: 'Reset all administrative passwords and audit logs ($25,000)',
                    cost: 25000,
                    techHours: 48,
                    schoolDays: 0,
                    outcome: 'patched',
                    benefit: 'Addresses known compromise'
                },
                {
                    text: 'Monitor systems for suspicious activity ($5,000)',
                    cost: 5000,
                    techHours: 16,
                    schoolDays: 0,
                    outcome: 'monitoring',
                    benefit: 'Unknown threats may remain'
                }
            ]
        },
        'social_eng_verified': {
            title: 'Caller Verification Result',
            description: 'After verification, you discovered the caller was legitimate but their unusual knowledge was concerning. How do you proceed?',
            icon: '✅',
            decisions: [
                {
                    text: 'Provide the requested access with monitoring',
                    cost: 2000,
                    techHours: 4,
                    schoolDays: 0,
                    outcome: 'cautious',
                    benefit: 'Balanced approach'
                },
                {
                    text: 'Schedule an in-person meeting to verify',
                    cost: 1000,
                    techHours: 8,
                    schoolDays: 0,
                    outcome: 'thorough',
                    benefit: 'Maximum security verification'
                },
                {
                    text: 'Decline access and report to vendor management',
                    cost: 500,
                    techHours: 2,
                    schoolDays: 0,
                    outcome: 'declined',
                    benefit: 'Zero risk approach'
                }
            ]
        },
        'social_eng_reported': {
            title: 'Security Incident Reported',
            description: 'IT security confirms this was a social engineering attempt. The threat has been documented.',
            icon: '📋',
            decisions: [
                {
                    text: 'Implement caller verification procedures ($3,000)',
                    cost: 3000,
                    techHours: 12,
                    schoolDays: 0,
                    outcome: 'procedures',
                    benefit: 'Prevents future social engineering'
                },
                {
                    text: 'Train staff on social engineering awareness ($2,000)',
                    cost: 2000,
                    techHours: 8,
                    schoolDays: 0,
                    outcome: 'training',
                    benefit: 'Improves staff awareness'
                },
                {
                    text: 'File incident report only',
                    cost: 0,
                    techHours: 2,
                    schoolDays: 0,
                    outcome: 'documented',
                    benefit: 'Minimal protection improvement'
                }
            ]
        }
    },

    // Investment options for post-incident phase
    investments: [
        { 
            name: 'Advanced Email Security Gateway', 
            cost: 15000, 
            benefit: 'Prevents 85% of phishing attempts',
            category: 'Email Protection'
        },
        { 
            name: 'Endpoint Detection & Response Solution', 
            cost: 25000, 
            benefit: 'Real-time threat monitoring',
            category: 'Endpoint Security'
        },
        { 
            name: 'Air-gapped Backup System', 
            cost: 18000, 
            benefit: 'Ransomware-proof data recovery',
            category: 'Data Protection'
        },
        { 
            name: 'Security Awareness Training Program', 
            cost: 8000, 
            benefit: 'Reduces human error by 70%',
            category: 'Staff Training'
        },
        { 
            name: 'Network Access Control System', 
            cost: 22000, 
            benefit: 'Prevents unauthorized access',
            category: 'Network Security'
        },
        { 
            name: 'Incident Response Plan & Training', 
            cost: 12000, 
            benefit: 'Faster incident containment',
            category: 'Preparedness'
        },
        { 
            name: 'Multi-Factor Authentication for All Users', 
            cost: 10000, 
            benefit: 'Blocks 99.9% of automated attacks',
            category: 'Access Control'
        },
        { 
            name: 'Security Information Event Management (SIEM)', 
            cost: 30000, 
            benefit: 'Comprehensive threat visibility',
            category: 'Monitoring'
        }
    ],

    // Utility functions for scenario management
    utils: {
        /**
         * Shuffles an array randomly
         */
        shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        },

        /**
         * Selects scenarios based on security level and district size
         */
        generateScenarios(securityLevel, districtMultiplier, maxScenarios = 3) {
            // Clone and shuffle scenarios
            let scenarios = this.shuffleArray([...SCENARIOS.templates]);
            
            // Adjust scenario difficulty based on security level and district size
            scenarios.forEach(scenario => {
                // Randomize decision order for each scenario
                scenario.decisions = this.shuffleArray([...scenario.decisions]);
                
                scenario.decisions.forEach(decision => {
                    // Apply security level multiplier
                    if (securityLevel === 'Weak') {
                        decision.cost = Math.round(decision.cost * 1.5);
                        decision.techHours = Math.round(decision.techHours * 1.3);
                        decision.schoolDays = Math.round(decision.schoolDays * 1.2);
                    } else if (securityLevel === 'Strong') {
                        decision.cost = Math.round(decision.cost * 0.8);
                        decision.techHours = Math.round(decision.techHours * 0.9);
                        decision.schoolDays = Math.round(decision.schoolDays * 0.8);
                    }
                    
                    // Apply district size multiplier
                    decision.cost = Math.round(decision.cost * districtMultiplier.cost);
                    decision.schoolDays = Math.round(decision.schoolDays * districtMultiplier.impact);
                });
            });
            
            // Return limited number of scenarios
            return scenarios.slice(0, maxScenarios);
        },

        /**
         * Gets follow-up scenario by ID
         */
        getFollowUpScenario(followUpId) {
            return SCENARIOS.followUps[followUpId] || null;
        },

        /**
         * Gets investment options scaled by district size
         */
        getInvestmentOptions(districtMultiplier) {
            return SCENARIOS.investments.map(investment => ({
                ...investment,
                cost: Math.round(investment.cost * districtMultiplier.cost)
            }));
        },

        /**
         * Determines decision button styling based on quality
         */
        getDecisionClass(decision) {
            switch(decision.quality) {
                case 'excellent':
                case 'good':
                    return 'safe';
                case 'poor':
                    return 'risky';
                default:
                    return '';
            }
        }
    }
};
