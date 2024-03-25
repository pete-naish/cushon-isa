# cushon-isa

To install dependencies:

```bash
# install bun
curl -fsSL https://bun.sh/install | bash

# install project dependencies
bun install
```

To run:

```bash
nvm use 18
bun dev
```

To test:

```bash
bun dev

# in a new tab
bun playwright test --ui
```

Change `MAX_SELECTED_FUNDS` in `src/app/config.ts` to see how multiple fund selection works.
