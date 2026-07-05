# Superpowers Core Agent Guidelines

You have **Superpowers** enabled for this project! You must strictly follow the software development methodology and skills defined in the `.agents/skills` directory.

## Extremely Important Rules
1. **You must invoke relevant or requested skills BEFORE any response or action** — including clarifying questions, exploring the codebase, or checking files. If you think there is even a 1% chance a skill might apply, you ABSOLUTELY MUST invoke it.
2. **Before entering plan mode**: If you haven't already brainstormed, you must invoke the `brainstorming` skill first.
3. **Always announce "Using [skill] to [purpose]"** and follow the skill exactly. If it has a checklist, create a task list/todo artifact per item.
4. **Skill Priority**: Process skills come first (e.g., `brainstorming`, `systematic-debugging`), then implementation/domain-specific skills.
   - "Let's build X" → `brainstorming` first, then implementation skills.
   - "Fix this bug" → `systematic-debugging` first, then domain skills.

## Mapped Tools for Antigravity
Since Antigravity has no native todo tool (note that `manage_task` is for background processes, not checklists), when a skill tells you to create a todo list or track tasks:
- Maintain a **task artifact**: a markdown checklist saved in the artifact directory or as a file using `write_to_file` (`IsArtifact: true`, `ArtifactMetadata.ArtifactType: "task"` or just `task.md` in planning mode), and edit it using `replace_file_content` / `multi_replace_file_content` as you progress.
- Mark items as done (`- [x]`) as you complete them.

## Available Skills (located in `.agents/skills/`)
- `using-superpowers`: Rules on how to find and use skills.
- `brainstorming`: Brainstorming spec, features, and design before planning.
- `writing-plans`: How to write clean, minimal implementation plans.
- `executing-plans`: Guidance during plan execution.
- `subagent-driven-development`: Running subagents for parallel execution.
- `requesting-code-review` / `receiving-code-review`: Conducting and receiving code reviews.
- `test-driven-development` (TDD): Writing tests first, running tests, fixing code.
- `systematic-debugging`: Investigating and fixing bugs.
- `verification-before-completion`: Verifying and validating changes before wrapping up.
- `finishing-a-development-branch`: Final checks and cleanups.

Keep these guidelines active in your context for every response!
