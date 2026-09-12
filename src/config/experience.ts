/**
 * Professional experience configuration
 * Add your work experience here
 */

import type { Experience } from '../types';

export const experience: readonly Experience[] = [
    {
        title: 'IBM | Technical Sales & AI Infrastructure',
        company: 'Working Student — Technology / Storage',
        location: 'Frankfurt, Germany',
        period: '2024 – 2026',
        description: 'Supported technical sales for enterprise storage and AI infrastructure through customer demos, proof-of-concepts, solution sizing, and account analysis. Evaluated AI agents and RAG/MCP-supported workflows, and researched LLM inference performance, tenant isolation, and GPU infrastructure on IBM Fusion HCI for my master’s thesis.',
        technologies: ['Technical Sales', 'Solution Sizing', 'AI Infrastructure', 'LLM Evaluation', 'RAG', 'MCP', 'OpenShift'],
        images: [
            {
                url: '/towerone.jpg',
                alt: 'IBM office at Tower One Frankfurt',
            },
        ],
    },
    {
        title: 'Mercedes-Benz | Software Developer Culture & FOSS',
        company: 'Intern & Bachelor’s Thesis Student',
        location: 'Stuttgart, Germany',
        period: '2023 - 2024',
        description: 'Supported company-wide open-source (FOSS) initiatives and conducted internal surveys among software developers to generate data-driven insights for improving the development environment. Also contributed to content and media management for internal and external communication of tech topics.',
        technologies: ['FOSS', 'Data-Driven Insights', 'Innovation & Technology Initiatives'],
        images: [
            {
                url: '/IMG_7031.jpg',
                alt: 'Mercedes-Benz technology event',
            },
            {
                url: '/IMG_7030.jpg',
                alt: 'Mercedes-Benz technology event',
            },
            {
                url: '/IMG_7032.PNG',
                alt: 'Mercedes-Benz technology event',
            },
        ],
    },
    {
        title: 'Bayerischer Rundfunk | Social Media Manager',
        company:'Social Media Manager',
        location: 'Munich, Germany',
        period: '2021 - 2023',
        description: 'Developed and produced social media content for Instagram and Snapchat, analyzed performance metrics to optimize reach and engagement, and managed community interaction. Additionally wrote scripts for content productions and coordinated collaboration with actors.',
        technologies: ['Content Creation', 'Audience Engagement', 'Community Management'],
        images: [
            {
                url: '/IMG_7027.jpg',
                alt: 'Bayerischer Rundfunk production',
            }
        ],
    }
] as const;
