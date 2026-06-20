# Offer Letter Management System (OLMS)

A modern frontend prototype for managing the offer letter workflow in an organization.

The application demonstrates a complete role-based hiring workflow interface, allowing different stakeholders to interact with the recruitment and offer management process through dedicated dashboards.

---

## Overview

The Offer Letter Management System (OLMS) is a React-based UI prototype designed to visualize the end-to-end offer letter lifecycle.

The project focuses on user experience, workflow visualization, and role-based dashboard design.

No backend, authentication, database, or API integration is currently implemented.

---

## Implemented Roles

### Recruiter

- Candidate management interface
- Offer workflow tracking
- Recruitment dashboard
- Hiring pipeline visualization

### HR Manager

- Offer review dashboard
- Approval workflow interface
- Pending approval monitoring

### Finance

- Compensation review dashboard
- Salary approval interface
- Budget review workflow

### Candidate

- Offer viewing interface
- Offer acceptance/rejection screens
- Document submission screens
- Onboarding progress view

### Administrator

- User management interface
- Role management screens
- System monitoring dashboard

---

## Features

### Role Selection

Users can switch between different stakeholder roles to view role-specific dashboards.

### Dashboard Interfaces

Dedicated dashboards for:

- Recruiters
- HR Managers
- Finance Teams
- Candidates
- Administrators

### Workflow Navigation

Simulated workflow movement between:

- Candidate Selection
- Offer Creation
- Offer Approval
- Finance Review
- Candidate Acceptance
- Onboarding

### Notification System

Role-specific notifications including:

- Approval requests
- Offer status updates
- Candidate actions
- Workflow reminders

### Responsive UI

Modern responsive interface built using:

- React
- TypeScript
- Tailwind CSS

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Icons

- Lucide React

---

## Project Structure

```text
src
│
├── components
│   ├── AdminDashboard.tsx
│   ├── CandidatePortal.tsx
│   ├── FinanceDashboard.tsx
│   ├── ManagerDashboard.tsx
│   ├── RecruiterDashboard.tsx
│   ├── RoleSelection.tsx
│   └── TopNavbar.tsx
│
├── App.tsx
├── main.tsx
└── index.css
```


Installation
Clone Repository
git clone https://github.com/your-username/olms-frontend.git

Navigate to Project
cd olms-frontend

Install Dependencies
npm install

Run Development Server
npm run dev

Application will run at:
http://localhost:5173

Purpose

This project was created to demonstrate the user interface and workflow design of a role-based Offer Letter Management System.

It can serve as a foundation for future full-stack development.

Author

Aarti Sakpal

B.E. Artificial Intelligence & Machine Learning

Frontend Prototype Project – Offer Letter Management System (OLMS)
Application will run at:

http://localhost:5173
