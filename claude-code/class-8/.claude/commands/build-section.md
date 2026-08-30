---
description: Build one FoodWagon landing-page section from its Figma node
argument-hint: <section-name> <nodeId>
---

Build the FoodWagon landing-page section **$1** from Figma node **$2**.

Use the `landing-page-builder` subagent. The Figma file key is
`Uqz7DshzmTaon377Urn9gf`. The builder should:

1. Pull design context, screenshot, and assets for node `$2`.
2. Download any images into `web/public/foodwagon/`.
3. Build the section as a responsive component in `web/src/components/`,
   following the `foodwagon-ui-kit` conventions and the design tokens in
   `globals.css`.
4. Wire mock content via `web/src/data/` when the section is data-driven.

Report the files created/changed and how to view the section.
