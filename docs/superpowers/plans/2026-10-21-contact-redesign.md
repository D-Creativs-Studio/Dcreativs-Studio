# Contact page redesign

**Goal:** Implement the user's selected refined dark contact page with quieter 3D artwork.
**Design:** Navy canvas, restrained lilac lighting, editorial introduction at left, contained logo, and an opaque dark form panel at right. Keep Sora/Raleway, shared navigation, seven enquiry steps, service/budget/timeline options, and `/api/contact` payload. Add readable step count and segmented progress, labelled fields, visible focus, responsive option lists, and reduced-motion support. On mobile the introduction condenses and the decorative model is omitted. Keep selections on screen until Continue so they can be reviewed.
**Stack:** Existing React/Vite, Tailwind, Framer Motion, Three.js. No dependencies or hosting changes.
**Scope:** Contact page, scoped stylesheet, contact form data/validation module and tests. Preserve unrelated pending portfolio changes and work in the current checkout so the running preview reflects this task. No commit or publication requested.

## Tasks
- [x] Extract form configuration and validation; verify required fields, optional fields, multiple services, and email validation with Node's built-in test runner.
- [x] Rebuild the contact presentation and accessible form controls; keep the endpoint and confirmation flow; guard duplicate submissions.
- [x] Run tests, production build, targeted lint, and rendered-markup checks. Inspect browser layouts if the browser tool is available.

## Verification focus
- Required inputs cannot advance empty, but company and phone remain optional.
- Service multi-selection and Back preserve answers.
- Long options/email addresses wrap within narrow screens.
- Progress and keyboard focus follow the active step; errors are associated with fields.
- Pending submissions cannot duplicate requests; API errors retain entered values.

## Execution notes
- User selected the refined dark direction in chat.
- Existing local preview returns HTTP 200 on port 5173.
- Browser inventory is empty; creating an in-app browser reports unavailable. Visual QA is currently limited.
- Eleven validation and component-rendering checks passed. No real emails submitted.
- Independent read-only review found one step-focus issue; callback now runs only on the incoming visible animation.
- Repository ESLint config fails before linting: `TypeError: Plugin "" not found.` Scoped lint uses the installed ESLint recommended and React hooks rules without changing the shared config.
- Final verification: production build passed, all 11 tests passed, scoped lint passed, diff whitespace check passed, live contact module and stylesheet both returned HTTP 200. Browser visual and live email delivery checks remain unverified. Existing Three.js dependency emits a CJS deprecation warning during server rendering tests.
