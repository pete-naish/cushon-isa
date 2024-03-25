# cushon-isa

## Windows users:

### To install dependencies:

```bash
npm install

nvm use 18
```

### To run:

```bash
npm run dev
```

### To test:

```bash
npm run dev

#in a new tab
npm playwright test --ui
```

## Mac / Linux users:

### To install dependencies:

```bash
# install bun
curl -fsSL https://bun.sh/install | bash

# install project dependencies
bun install

nvm use 18
```

### To run:

```bash
bun dev
```

### To test:

```bash
bun dev

# in a new tab
bun playwright test --ui
```

Change `MAX_SELECTED_FUNDS` in `src/app/config.ts` to see how multiple fund selection works.

The scenario outlined in the assignment suggested that the user wanted to deposit a total of £25,000 into the Cushon Equities Fund. The annual limit for deposits across ISAs is £20,000. For this reason, I have added validation to inform the user of this limit and help them deposit money successfully.
