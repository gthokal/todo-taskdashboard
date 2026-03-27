# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Zustand For Global State Management

1. Minimal boilerplate
    Unlike Redux, Zustand does not require actions, reducers, or complex setup.
2. Simple and intuitive API
    State and actions are defined in a single store, making the code easier to read and maintain.
3. Better performance
    Zustand uses selective subscriptions, so only components that depend on specific state re-render.
4. Scalability
    It works well for small to medium applications and can scale as needed without adding complexity.

## Zustand is used

1. Managing tasks (CRUD operations)
2. Handling filters (priority, assignee)
3. Updating task status during drag-and-drop

## We can also considered using React Context, but:

1. Context can cause unnecessary re-renders when state updates
2. Managing complex state logic becomes harder as the app grows
3. Requires splitting into multiple contexts for optimization




