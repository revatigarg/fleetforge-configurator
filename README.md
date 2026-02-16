# FleetForge – Guided Forklift Configurator

## Live Interactive Prototype

Explore the live prototype: https://fleetforge-configurator.lovable.app


---

## Overview

FleetForge is a guided forklift configuration experience designed to bring CPQ-style customization directly into eCommerce.

Today, many industrial equipment companies only sell pre-configured SKUs online. Custom builds require off-platform CPQ workflows, introducing manual quoting, longer sales cycles, and limited transparency into pricing and add-ons.

This prototype explores how constraint-based configuration, dynamic pricing, and real-time visual updates can reduce friction while preserving enterprise complexity.


---

## Problem Statement

Industrial equipment purchasing often follows this pattern:

- Only fixed configurations are available online  
- Customizations require sales or CPQ workflows  
- Add-ons such as telematics are inconsistently adopted  
- Buyers lack pricing visibility during configuration  

The result:

- Increased sales cycle time  
- Heavy dependency on manual quoting  
- Lower add-on attach rates  
- Reduced self-service capability  


---

## Proposed Solution

A guided configuration engine embedded within eCommerce that:

- Enforces real-world configuration constraints  
- Updates pricing dynamically in real-time  
- Separates one-time and subscription costs  
- Visualizes configuration changes live  
- Applies fleet-based discount logic  
- Bridges self-service checkout and quote workflows  


---

## Core Features

### 1. Real-Time Visual Configuration

The forklift preview updates dynamically as users select:

- Mast height  
- Tire type  
- Power source  
- Display package  
- Telematics hardware  

Layered visual states simulate an automotive-style builder experience in an industrial B2B context.


---

### 2. Constraint-Based Logic

Example configuration rules:

IF capacity > 6000 lb  
    Disable Electric power option  

IF Advanced Display selected  
    Auto-include Telematics hardware  

IF Indoor environment selected  
    Disable Diesel  

IF Quantity >= 5  
    Apply Fleet Tier 1 discount  

IF Quantity >= 10  
    Apply Fleet Tier 2 discount  

This prevents invalid builds while maintaining flexibility and transparency.


---

### 3. Dynamic Pricing Engine

The pricing panel updates in real-time and separates:

- Base unit cost  
- Configuration upgrades  
- Telematics hardware (one-time)  
- Telematics subscription (monthly recurring)  
- Fleet discount tiers  

This models hybrid CAPEX + SaaS pricing within a single purchase flow.


---

### 4. Enterprise-Oriented Cart Experience

The final step supports:

- Build summary review  
- Configuration editing  
- Duplicate builds  
- Save as draft  
- Request formal quote  

This balances eCommerce efficiency with enterprise buying workflows.


---

## KPI Hypothesis

| Metric | Current State | Target |
|--------|--------------|--------|
| Manual Quote Dependency | 100% custom builds | < 60% |
| Telematics Attach Rate | ~25% | 45% |
| Configuration Completion Rate | N/A | 70% |
| Average Order Value | Baseline | +15–20% |
| Sales Cycle Time | 3–6 weeks | 2–4 weeks |


---

## System Architecture Concept

This prototype assumes integration with:

- Product catalog with option modeling  
- Pricing engine with tier logic  
- ERP for availability and delivery estimates  
- CPQ for complex edge-case escalation  
- Subscription billing system for telematics  

The configurator does not replace CPQ.  
It reduces dependency on it.


---

## Risks & Considerations

- Oversimplification of complex configurations  
- Sales team adoption concerns  
- Pricing transparency implications  
- Engineering effort for constraint modeling  
- Subscription bundling complexity  


---

## Future Enhancements

- Saved fleet templates  
- Multi-user approval workflows  
- ROI calculator for telematics  
- Financing simulation  
- Side-by-side build comparison  
- Backend constraint engine API  


---

## Why This Project Matters

FleetForge demonstrates how industrial B2B commerce can evolve from static SKUs and manual quoting toward guided, intelligent self-service configuration while preserving enterprise control.

This project focuses on system thinking, pricing logic, constraint modeling, and enterprise UX design rather than visual experimentation alone.
