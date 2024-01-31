# Code Review Project

## Reviewer Information

-   **Reviewer:** Lam Dang
-   **Date:** 31/01/2024

## Note about my code review:

-   Since this app still uses a lot of legacy code and class components,
    the focus will be on reviewing the existing codebase without
    significant refactoring.
-   The request is not to modify or refactor code extensively.
-   Avoid splitting code into new files.

------------------------------------------------------------------------

## Specification:

-   ToDoList App allows users to input tasks and assign tasks to people:
    -   All tasks: show all tasks from user input
        -   Each task should include the title of the task, the list
            name of people it can be assigned to, and the checkbox.
    -   Checkbox:
        -   Checked if the user marked it as finished.
        -   If all checkboxes are checked, all to-do tasks will be
            checked too.

## 🚀 Overall Feedback:

### Functionality Issues:

-   The app does not meet the specified requirements. User input, local
    development setup, and deletion of to-do items are missing
    functionalities.
-   All to-do items seem to be marked as done, indicating a potential
    issue.

### Code Convention and Style:

-   Code lacks consistency in terms of coding style and structure.
-   Missing adherence to Redux conventions, Redux Toolkit, and Flux
    architecture.

### React Hooks and Class Components:

-   The use of `useEffect` and `useSelector` in class components is not
    in line with the modern React paradigm.
-   Suggest considering converting to functional components with hooks
    for better readability and maintainability.

### Folder Structure:

-   The current folder structure may become challenging as the app
    grows. Suggested improvements involve organizing components, using
    Redux for state management, and introducing slices for better
    structure.

### Redux Toolkit:

-   Suggested changes in the `src/store/index.ts` file for better state
    management and separation of concerns.
-   Propose splitting the store into different slices, especially for
    future scalability.

### Code Readability:

-   Check for consistent coding style, indentation, and meaningful
    variable/function names.

### Documentation:

-   Check for inline comments explaining complex logic and ensure that
    project documentation is up-to-date.

## Suggestions for Improvement:

-   Consider converting class components to functional components with
    hooks.
-   Enhance code readability by following consistent coding styles.
-   Organize components into folders based on features.
-   Adopt Redux Toolkit and follow Redux conventions for better state
    management.
-   Separate state slices for different features (e.g., to-do list and
    users).
-   Introduce unit tests for relevant components and features.
-   Provide inline comments explaining complex logic.
-   Consider using style components or Tailwind CSS for styling.
-   Address functionality issues, such as user input, local development
    setup, and deletion of to-do items.
