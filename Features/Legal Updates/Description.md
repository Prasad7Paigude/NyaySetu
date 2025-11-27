# Feature: Automated Legal Updates Engine (Indian Law & Justice)

This feature will build an AI-powered automation system that fetches, processes,
and summarizes official updates related ONLY to **Indian laws, rules, regulations,
notifications, and government-issued amendments**. It will NOT include court
judgments or case-law summaries.

The objective is to create a backend subsystem that:

1. Automatically collects new legal updates from authoritative Indian government sources.
2. Extracts relevant text from HTML pages or PDF documents (e.g., Gazette notifications).
3. Converts the raw legal content into structured, simplified summaries using an LLM.
4. Classifies each update into categories (e.g., Criminal Law, Civil Law, Constitutional Law).
5. Validates and normalizes the AI output into a consistent JSON schema.
6. Stores ready-to-display legal updates in a database for use by other backend/frontend modules.
7. Generates AI-assisted newsletter summaries (weekly or daily) for the legal updates.

### Primary Responsibilities of the Automation System

- Implement scheduled ingestion of Indian legal updates using RSS feeds, HTML scrapers, and PDF parsing.
- Clean, parse, and extract the essential text from these sources.
- Use a structured LLM prompt to generate:
  - One-line summary
  - Key points
  - Document type (notification, amendment, circular, rule update)
  - Issuing body (e.g., Ministry of Law and Justice)
  - List of affected acts or statutes
  - Category (Criminal, Civil, Constitutional, etc.)
  - Confidence score
- Perform rule-based validation and mark items that need manual review.
- Produce normalized JSON objects to be consumed by other services.
- Provide a preview-ready newsletter template based on aggregated updates.

### Scope Clarification

- This feature focuses ONLY on **laws, rules, regulations, amendments, and government notifications**.
- It intentionally excludes:
  - Court judgments
  - Case rulings
  - Tribunal orders
  - Legal news commentary not tied to official notifications

### Expected Output Format (JSON)

Each processed update will produce a structured JSON object:
{
"title": "<string>",
"source": "<string>",
"one_line": "<string>",
"key_points": ["<string>"],
"document_type": "notification | rule | regulation | amendment | circular",
"issuing_body": "<government department>",
"affected_statutes": ["<Act/Rule name>"],
"category": "Criminal | Civil | Constitutional | Corporate | Labour | Misc",
"confidence": <float>,
"published_date": "<ISO timestamp>",
"source_url": "<original URL>"
}

### Architecture Summary

- Parsers: Extract data from RSS/HTML/PDF sources.
- Extractors: Clean and normalize text for LLM.
- Summarizer Microservice: Runs LLM summarization with strict schema.
- Validator: Checks completeness and flags errors.
- Storage: Stores raw and processed updates in MongoDB.
- Newsletter Builder: Generates aggregated HTML summaries using Jinja2.
- Scheduler: Cron or n8n workflow triggers ingestion and processing.

### End Goal

Create an automated backend subsystem that continuously provides up-to-date,
accurate, AI-summarized legal updates for India. This engine will serve as the
data layer for:

- The "Latest Law & Regulation Updates" section on the website
- The admin review dashboard
- The automated weekly/daily legal newsletter
- Any API endpoints used by the frontend or mobile applications

This subsystem must be modular, maintainable, and able to run independently of
the main application code.
