// Scenario definitions and costs for CyberGuard Academy
const SCENARIOS = {
    // Cost database with district size multipliers
    costs: {
        sizeMultipliers: {
            small: { budget: 20000, cost: 0.7, impact: 0.5 },
            medium: { budget: 45000, cost: 1.0, impact: 1.0 },
            large: { budget: 80000, cost: 1.3, impact: 1.5 },
            xlarge: { budget: 120000, cost: 1.7, impact: 2.5 }
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

    // Main scenario templates with narrative elements
    templates: [
        {
            id: 'phishing_attack',
            title: 'Suspicious Email Campaign',
            chapter: 'Chapter 1: The Email That Started It All',
            description: 'It\'s 8:30 AM on a Tuesday when your phone starts buzzing. Mrs. Henderson from the main office calls in a panic: "Something\'s wrong with the computers! Teachers are saying they got emails from you asking for their passwords!" Your heart sinks as you realize what\'s happening - a phishing campaign is targeting your district.',
            storyContext: 'You arrive at the office to find three teachers have already clicked the suspicious links and entered their credentials. The emails looked official, complete with district logos and urgent language about a "mandatory system update." The attackers are getting sophisticated.',
            icon: '⚠️',
            nistCategory: 'Detect',
            severity: 'medium',
            decisions: [
                {
                    text: 'Immediately disable affected accounts and reset all passwords',
                    cost: 1500,
                    techHours: 4,
                    schoolDays: 0,
                    outcome: 'contained',
                    followUp: 'phishing_contained',
                    nistAlignment: 'Respond',
                    quality: 'good',
                    narrative: {
                        title: 'Swift Action Saves the Day',
                        story: 'You spring into action immediately. Within minutes, you\'ve disabled the three compromised accounts and initiated an emergency password reset for all staff. Your quick thinking prevents the attackers from gaining deeper access to district systems. Teachers grumble about having to create new passwords, but they understand the necessity. The IT team works efficiently, and by lunch time, everyone is back online with secure access.',
                        reputationImpact: 5,
                        costRationale: 'Emergency password reset procedures and temporary access cards',
                        timeRationale: 'IT staff overtime for immediate response and system lockdown',
                        consequences: 'Your quick response prevents data breach and maintains system integrity.'
                    }
                },
                {
                    text: 'Send out a warning email to all staff',
                    cost: 0,
                    techHours: 2,
                    schoolDays: 0,
                    outcome: 'spreading',
                    followUp: 'phishing_spreading',
                    nistAlignment: 'Protect',
                    quality: 'moderate',
                    narrative: {
                        title: 'Too Little, Too Late',
                        story: 'You quickly draft a warning email to all staff about the phishing attempt. However, while you\'re typing the warning, more teachers are falling victim to the convincing emails. By the time your warning reaches everyone, fifteen more staff members have already clicked the malicious links. The damage is spreading faster than your ability to warn people.',
                        reputationImpact: -5,
                        costRationale: 'No immediate costs, but damage is accumulating',
                        timeRationale: 'Time spent drafting and sending warning communications',
                        consequences: 'The threat continues to spread while you focus on communication rather than containment.'
                    }
                },
                {
                    text: 'Wait and monitor the situation',
                    cost: 0,
                    techHours: 0,
                    schoolDays: 0,
                    outcome: 'escalated',
                    followUp: 'phishing_escalated',
                    nistAlignment: 'None',
                    quality: 'poor',
                    narrative: {
                        title: 'The Calm Before the Storm',
                        story: 'You decide to monitor the situation before taking drastic action. "Maybe it\'s not as bad as it seems," you think. This proves to be a critical mistake. Over the next two hours, the attackers use the compromised credentials to access student information systems, gradebooks, and even financial records. What started as a simple phishing attempt has become a full-scale data breach.',
                        reputationImpact: -15,
                        costRationale: 'No immediate response costs, but major expenses are coming',
                        timeRationale: 'No immediate action taken',
                        consequences: 'Attackers gain deeper access to district systems while you remain passive.'
                    }
                }
            ]
        },
        {
            id: 'ransomware_detection',
            title: 'Ransomware Detected',
            chapter: 'Chapter 2: When Files Start Disappearing',
            description: 'The notification pops up on your screen at 10:15 AM: "THREAT DETECTED - Suspicious file encryption activity." Your blood runs cold. In the administrative office, you can hear confused voices: "Why are all my files showing as .locked?" The endpoint detection system is frantically flagging multiple computers as files are being rapidly encrypted.',
            storyContext: 'You rush to the main office to find chaos. Files on shared drives are disappearing, replaced with encrypted versions. The ransomware is moving fast, and you can see it spreading across the network in real-time. Every second counts.',
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
                    quality: 'poor',
                    narrative: {
                        title: 'Analysis Paralysis',
                        story: 'You spend precious time trying to trace the source of the infection. While you\'re investigating Patient Zero, the ransomware continues its relentless march through your systems. By the time you identify the initial infection point, the malware has encrypted files on dozens of computers and has begun targeting backup systems. Your methodical approach costs valuable time.',
                        reputationImpact: -10,
                        costRationale: 'No immediate costs, but damage is escalating rapidly',
                        timeRationale: 'Time spent on forensic analysis instead of containment',
                        consequences: 'Ransomware spreads unchecked while you investigate its origins.'
                    }
                },
                {
                    text: 'Immediately isolate affected systems and activate incident response plan',
                    cost: 3000,
                    techHours: 8,
                    schoolDays: 0,
                    outcome: 'contained',
                    followUp: 'ransomware_contained',
                    nistAlignment: 'Respond',
                    quality: 'good',
                    narrative: {
                        title: 'Decisive Action Under Pressure',
                        story: 'Without hesitation, you trigger the incident response plan. Affected computers are immediately isolated from the network, preventing further spread. Your IT team works like a well-oiled machine, following practiced procedures. The ransomware manages to encrypt about 200 files before being contained. While there\'s damage, your quick response prevents a district-wide catastrophe.',
                        reputationImpact: 10,
                        costRationale: 'Emergency response procedures and system isolation costs',
                        timeRationale: 'IT team emergency response and incident containment efforts',
                        consequences: 'Quick containment prevents widespread system compromise.'
                    }
                },
                {
                    text: 'Shut down the entire network to prevent spread',
                    cost: 0,
                    techHours: 4,
                    schoolDays: 1,
                    outcome: 'overreaction',
                    followUp: 'network_shutdown',
                    nistAlignment: 'Respond',
                    quality: 'moderate',
                    narrative: {
                        title: 'The Nuclear Option',
                        story: 'In panic, you pull the plug on everything. The entire district network goes dark. While this does stop the ransomware, it also brings all educational activities to a halt. Teachers can\'t access lesson plans, the lunch payment system is down, and even the phone system stops working. The cure becomes almost as disruptive as the disease.',
                        reputationImpact: -5,
                        costRationale: 'No immediate technical costs',
                        timeRationale: 'IT staff time to manage emergency shutdown',
                        consequences: 'Overshooting the response disrupts normal school operations unnecessarily.'
                    }
                }
            ]
        },
        {
            id: 'social_engineering',
            title: 'Social Engineering Attempt',
            chapter: 'Chapter 3: The Voice of Authority',
            description: 'The phone rings in the main office. "This is Mike from TechServ Solutions," says a confident voice. "We\'ve detected a critical security vulnerability in your systems that needs immediate attention. I need administrative access to patch this before it\'s exploited." The secretary, Sarah, hesitates. The caller seems to know about your systems and mentions specific software you use.',
            storyContext: 'Sarah transfers the call to you. The caller is smooth, professional, and surprisingly knowledgeable about your infrastructure. They reference a recent software update and mention security bulletins you\'ve seen. But something feels... off.',
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
                    quality: 'poor',
                    narrative: {
                        title: 'The Perfect Storm',
                        story: 'Against your better judgment, you provide the requested access. The caller\'s knowledge and professional demeanor convinced you they were legitimate. It\'s only two hours later, when you notice unusual activity in your logs, that you realize you\'ve been had. The "technician" has been busy copying files, creating backdoor accounts, and installing remote access tools.',
                        reputationImpact: -20,
                        costRationale: 'No immediate costs, but massive security breach in progress',
                        timeRationale: 'No immediate time spent',
                        consequences: 'Attackers gain administrative access to your entire network.'
                    }
                },
                {
                    text: 'Hang up immediately and report to IT security',
                    cost: 500,
                    techHours: 2,
                    schoolDays: 0,
                    outcome: 'reported',
                    followUp: 'social_eng_reported',
                    nistAlignment: 'Protect',
                    quality: 'good',
                    narrative: {
                        title: 'Trust Your Instincts',
                        story: 'Something about the call doesn\'t sit right with you. You politely hang up and immediately contact your actual IT vendor. "We didn\'t call you," they confirm. "This is a known social engineering tactic." You document the incident and send out a district-wide alert about the attempted scam. Your paranoia pays off.',
                        reputationImpact: 5,
                        costRationale: 'Time spent documenting incident and creating security alerts',
                        timeRationale: 'Investigation and communication with legitimate vendors',
                        consequences: 'Quick recognition and reporting prevents potential compromise.'
                    }
                },
                {
                    text: 'Verify the caller\'s identity through official channels before providing any information',
                    cost: 0,
                    techHours: 1,
                    schoolDays: 0,
                    outcome: 'verified',
                    followUp: 'social_eng_verified',
                    nistAlignment: 'Protect',
                    quality: 'excellent',
                    narrative: {
                        title: 'By The Book',
                        story: 'You ask for the caller\'s name, ticket number, and company. "I\'ll call you back through official channels to verify," you explain. The caller becomes evasive and eventually hangs up. A quick call to your real vendor confirms they have no such technician and no open tickets. Your verification process just saved the district from a sophisticated attack.',
                        reputationImpact: 10,
                        costRationale: 'No direct costs incurred',
                        timeRationale: 'Time spent on proper verification procedures',
                        consequences: 'Proper verification protocols expose the social engineering attempt.'
                    }
                }
            ]
        }
    ],
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
                    cost: 500,
                    techHours: 4,
                    schoolDays: 0,
                    outcome: 'minimal',
                    followUp: 'student_warning',
                    nistAlignment: 'Recover',
                    quality: 'poor'
                },
                {
                    text: 'Implement additional access controls and monitoring',
                    cost: 4000,
                    techHours: 12,
                    schoolDays: 0,
                    outcome: 'preventative',
                    followUp: 'student_prevention',
                    nistAlignment: 'Protect',
                    quality: 'good'
                },
                {
                    text: 'Immediately revoke student access and conduct full investigation',
                    cost: 8000,
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
                    cost: 18000,
                    techHours: 48,
                    schoolDays: 0,
                    outcome: 'independent',
                    followUp: 'vendor_investigation',
                    nistAlignment: 'Respond',
                    quality: 'excellent'
                },
                {
                    text: 'Immediately notify all affected families and authorities',
                    cost: 12000,
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
                    text: 'Invest in advanced email security gateway ($8,000)',
                    cost: 8000,
                    techHours: 8,
                    schoolDays: 0,
                    outcome: 'protected',
                    benefit: 'Prevents 85% of future phishing attempts'
                },
                {
                    text: 'Implement mandatory phishing simulation training ($3,000)',
                    cost: 3000,
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
                    cost: 35000,
                    techHours: 120,
                    schoolDays: 2,
                    outcome: 'thorough',
                    benefit: 'Complete forensic analysis'
                },
                {
                    text: 'Handle investigation internally',
                    cost: 12000,
                    techHours: 80,
                    schoolDays: 1,
                    outcome: 'limited',
                    benefit: 'May miss critical evidence'
                },
                {
                    text: 'Minimal response to reduce costs',
                    cost: 3000,
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
                    text: 'Restore from air-gapped backups ($5,000)',
                    cost: 5000,
                    techHours: 12,
                    schoolDays: 0,
                    outcome: 'restored',
                    benefit: 'Full data recovery'
                },
                {
                    text: 'Attempt file decryption tools ($2,500)',
                    cost: 2500,
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
                    text: 'Pay ransom demand ($25,000)',
                    cost: 25000,
                    techHours: 8,
                    schoolDays: 0,
                    outcome: 'payment',
                    benefit: 'May not guarantee data recovery'
                },
                {
                    text: 'Rebuild systems from scratch',
                    cost: 40000,
                    techHours: 200,
                    schoolDays: 5,
                    outcome: 'rebuild',
                    benefit: 'Complete system security'
                },
                {
                    text: 'Attempt recovery without paying',
                    cost: 15000,
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
                    text: 'Full forensic investigation and system rebuild ($50,000)',
                    cost: 50000,
                    techHours: 120,
                    schoolDays: 2,
                    outcome: 'secure',
                    benefit: 'Complete security restoration'
                },
                {
                    text: 'Reset all administrative passwords and audit logs ($12,000)',
                    cost: 12000,
                    techHours: 48,
                    schoolDays: 0,
                    outcome: 'patched',
                    benefit: 'Addresses known compromise'
                },
                {
                    text: 'Monitor systems for suspicious activity ($3,000)',
                    cost: 3000,
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
            cost: 8000, 
            benefit: 'Prevents 85% of phishing attempts',
            category: 'Email Protection'
        },
        { 
            name: 'Endpoint Detection & Response Solution', 
            cost: 12000, 
            benefit: 'Real-time threat monitoring',
            category: 'Endpoint Security'
        },
        { 
            name: 'Air-gapped Backup System', 
            cost: 6000, 
            benefit: 'Ransomware-proof data recovery',
            category: 'Data Protection'
        },
        { 
            name: 'Security Awareness Training Program', 
            cost: 3000, 
            benefit: 'Reduces human error by 70%',
            category: 'Staff Training'
        },
        { 
            name: 'Network Access Control System', 
            cost: 10000, 
            benefit: 'Prevents unauthorized access',
            category: 'Network Security'
        },
        { 
            name: 'Incident Response Plan & Training', 
            cost: 4000, 
            benefit: 'Faster incident containment',
            category: 'Preparedness'
        },
        { 
            name: 'Multi-Factor Authentication for All Users', 
            cost: 5000, 
            benefit: 'Blocks 99.9% of automated attacks',
            category: 'Access Control'
        },
        { 
            name: 'Security Information Event Management (SIEM)', 
            cost: 15000, 
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
