# Drift Project Specification (Master Blueprint)

## Purpose

This document is the master blueprint for Drift.

Its purpose is to guide the creation of a comprehensive `PROJECT.md` that becomes the single source of truth for the entire project.

The final `PROJECT.md` should be a production-quality engineering and product handbook suitable for onboarding senior engineers and AI coding agents.

---

# Product Overview

Drift is an adult social discovery platform where anonymous conversations begin before identities do.

Mission:

> Someone out there is about to discover you.

Core philosophy:

> The excitement comes from not knowing.

Conversation comes before identity.

Curiosity comes before certainty.

The application should encourage discovery rather than endless consumption.

---

# Product Principles

The following principles are permanent and must never be violated.

- Curiosity First
- Conversation Before Identity
- Adults Decide the Tone
- Calm Over Chaos
- Safety Without Killing Freedom
- Quality Over Quantity
- Progressive Disclosure
- Simplicity Wins

---

# Drift Is

- Anonymous-first
- Conversation-first
- Mobile-first
- Adult-focused
- Privacy conscious
- Calm
- Curiosity-driven

---

# Drift Is Not

- A dating app
- A swipe app
- A follower platform
- A popularity contest
- An infinite social feed
- A creator platform

---

# Product Decision Filter

Every feature must answer at least one:

- Does it increase curiosity?
- Does it reduce friction?
- Does it improve safety?

Every feature must also preserve:

> The excitement comes from not knowing.

---

# Target Tech Stack

- React Native
- Expo
- TypeScript
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Realtime

---

# Engineering Principles

- Strong typing
- No `any`
- Separation of concerns
- Single responsibility
- Mobile-first
- Feature isolation
- Services own backend communication
- Hooks own business logic
- Screens own presentation
- Components remain reusable
- Architecture should scale without major rewrites

---

# Repository Architecture

The final documentation should define ownership and responsibilities for:

- assets
- docs
- src
- app
- components
- features
- services
- hooks
- providers
- navigation
- constants
- types
- utils
- lib
- theme
- tests
- scripts
- supabase

---

# Database

Document the complete architecture for:

profiles

drifts

matches

messages

reports

Future:

notifications

blocks

user_settings

interests

premium

analytics

Include:

- schema
- relationships
- indexes
- RLS philosophy
- migration strategy
- scaling strategy

---

# Core Systems

The final PROJECT.md must define the complete architecture for:

Authentication

Profile

Drift Engine

Distribution Engine

Matching Engine

Conversation Engine

Notification Engine

Safety Engine

Moderation

Reporting

Blocking

Realtime

Future AI Matching

---

# Frontend

Document:

Navigation

Routing

State management

Hooks

Services

Error handling

Loading

Animations

Accessibility

Design system

Empty states

Typography

Color system

---

# Backend

Document:

Supabase

Storage

Edge Functions

Realtime

Authentication

API contracts

Service contracts

Validation

Rate limiting

Logging

Monitoring

Performance

Caching strategy

---

# Security

Document:

Authentication

Authorization

RLS

Input validation

Spam prevention

Bot detection

Abuse prevention

Privacy

Data ownership

---

# Engineering Handbook

Document:

Folder ownership

Dependency direction

Import rules

Naming conventions

File size recommendations

Function size recommendations

Testing strategy

Git workflow

Commit conventions

PR rules

Code review checklist

Definition of Done

Release checklist

Deployment checklist

---

# Expand PROJECT.md into a comprehensive engineering handbook.

Organize it naturally.

Do not target a specific chapter count.

Include every section required to completely document the project.

Topics should include, but are not limited to:

Executive Summary
Mission
Vision
Founder Philosophy
Business Strategy
Product Principles
User Psychology
Emotional Design
User Personas
User Journey
Information Architecture
Navigation
Design Language
Repository Architecture
Folder Ownership
Frontend Architecture
Backend Architecture
State Management
Services
Hooks
API Design
Database Philosophy
Database Schema
RLS Strategy
Authentication
Profile System
Drift Engine
Distribution Engine
Matching Engine
Conversation Engine
Notification Engine
Safety
Moderation
Blocking
Reporting
Analytics
Performance
Accessibility
Security
Coding Standards
Git Workflow
Testing Strategy
CI/CD
Deployment
Sprint Roadmap
MVP Scope
Future Roadmap
Technical Debt Strategy
Scaling Strategy
Definition of Done
Codex Operating Rules

For every major section include, where appropriate:

Purpose
Responsibilities
Design rationale
Engineering implications
Best practices
Anti-patterns
Trade-offs
Examples
Future evolution

---

# Product Design

Document:

User psychology

Emotional design

Product language

Interaction design

Notification philosophy

Progressive disclosure

Trust building

---

# MVP Scope

Include the complete implementation roadmap.

Sprint 1

Foundation

Sprint 2

Authentication

Sprint 3

Profile

Sprint 4

Release Drift

Sprint 5

Incoming Drift

Sprint 6

Keep / Pass

Sprint 7

Conversation

Sprint 8

Realtime Chat

Sprint 9

Safety

Sprint 10

Polish

Sprint 11

Beta

Sprint 12

Launch Candidate

Each sprint should include:

Goals

Features

Architecture

Acceptance criteria

Testing requirements

Risks

Future improvements

---

# Future Roadmap

Voice Drifts

Image Drifts

Video Drifts

AI-assisted moderation

AI conversation suggestions

Travel Mode

Interest-based discovery

Premium

Admin Dashboard

Analytics

Localization

Web

Desktop

---

# Codex Operating Rules

Whenever implementing code:

1. Read PROJECT.md first.
2. Never violate product principles.
3. Follow architecture.
4. Update documentation when behavior changes.
5. Keep TypeScript passing.
6. Keep Expo export passing.
7. Never invent product behavior.
8. If documentation is ambiguous, stop and request clarification instead of guessing.

---

# Goal

Expand this specification into a comprehensive `PROJECT.md` containing approximately 75–100 well-structured chapters.

Each chapter should include:

- Purpose
- Design rationale
- Engineering implications
- Examples
- Anti-patterns
- Future considerations
- Acceptance criteria where applicable

The resulting document should be detailed enough that a senior engineer or AI coding agent can understand the project, architecture, product philosophy, and implementation strategy without additional guidance.
