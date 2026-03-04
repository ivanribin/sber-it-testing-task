# Real-Time Task Monitoring Dashboard

## Installation

Clone the repository and install dependencies:

```bash
git clone <https://github.com/ivanribin/sber-it-testing-task.git>
cd sber-it-testing-task
npm install
```

---

## Available NPM Scripts

| Script            | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start in development mode                   |
| `npm run build`   | Compile TypeScript to JavaScript in `dist/` |
| `npm run preview` | Run compiled app from `dist/`               |

---

## Running the Project

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm run build
npm run preview
```

By default, the server runs on:  
`http://localhost:5173` in development mode
`http://localhost:4173` in production mode

## Project Description

This project implements a frontend application for monitoring tasks and their statistics using a simulated backend (mock aggregator).

The application consists of two main pages:

- **Tasks List** — displays all existing tasks and their current statuses.
- **Statistics Dashboard** — provides aggregated statistics and visual representation of task distribution.

A task is represented by a minimal domain model:

- `id` — unique identifier
- `status` — string-based task state

The backend part of the assignment is simulated using a **Mock Aggregator**, which continuously generates task updates in real time.

---

## Architecture Overview

The application follows a domain-oriented architecture with clear separation of responsibilities:

- **Domain Layer** — task models and business logic
- **Mock Aggregator** — simulates backend behavior and streaming updates
- **Store Layer** — centralized task state management
- **React Hooks** — bridge between application state and UI
- **UI Layer** — presentation and visualization components

The Mock Aggregator acts as an event-driven data source similar to a WebSocket or streaming backend.

It continuously performs:

- task creation
- task updates
- task deletion

and notifies subscribers about changes.

This approach allows the UI to react to live data updates without polling.

---

## Simulation Controls

The application provides real-time control over the simulation directly from the **App Header**.

Two control blocks are available:

### Simulation Toggle

A dedicated button allows enabling or disabling the task simulation.

- When enabled, the mock aggregator continuously generates events.
- When disabled, all simulation activity is paused while preserving the current task state.
- UI data remains visible even when simulation is stopped.

This behavior simulates starting or stopping a live data stream.

---

### Event Frequency Control

A slider component allows adjusting the **frequency of simulation events**.

The user can dynamically control how often task events occur:

- lower values → slower task updates
- higher values → intensive real-time activity

Changes are applied immediately without restarting the application or simulation.

This feature allows testing application behavior under different update loads and visually observing system reactivity.

---

## Application Behavior

After starting the application:

1. The mock aggregator begins generating tasks automatically.
2. Simulation parameters can be controlled via the App Header.
3. Tasks are continuously modified in the background.
4. All UI elements update reactively in real time.
5. Statistics are recalculated dynamically based on incoming events.

The aggregator works during the entire lifetime of the application session (while the user stays on the website).

---

## How to Use the Application

### Tasks Page

The Tasks page allows you to:

- view all existing tasks
- observe real-time task creation and removal
- monitor status changes
- pause or resume updates using simulation controls

No manual task interaction is required — updates happen automatically.

---

### Statistics Page

The Statistics page visualizes task data using charts and summary components.

Here you can observe:

- distribution of tasks by status
- dynamic changes in statistics
- live updates triggered by aggregator events
- system behavior under different simulation speeds

Switching between pages does not restart the simulation.

---

## How to Test Functionality

The application behavior can be verified manually:

### Real-time Updates

1. Open the **Tasks** page.
2. Ensure simulation is enabled.
3. Observe automatic appearance of new tasks.
4. Notice status changes occurring over time.

---

### Simulation Control

1. Use the simulation toggle button in the App Header.
2. Disable simulation and verify that updates stop.
3. Enable simulation again and confirm updates resume.

---

### Load Testing via Frequency Slider

1. Increase event frequency using the slider.
2. Observe faster task updates.
3. Navigate to the Statistics page.
4. Verify charts update more frequently.

---

### Statistics Synchronization

1. Navigate to the **Statistics** page.
2. Observe charts updating continuously.
3. Verify statistics reflect current task states.

---

## Possible Improvements and Future Enhancements

Potential directions for further development:

- Replace mock aggregator with real backend or WebSocket API
- Persistent task storage
- User-defined simulation scenarios
- Filtering and searching tasks
- Pagination or virtualization for large datasets
- Performance optimization for high-frequency updates
- Unit and integration testing
- Error handling and reconnection logic
- Logger abstraction instead of console output
