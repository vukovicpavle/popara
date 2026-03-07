# Mobile Application

> Expo / React Native mobile application for Popara — built with TypeScript and Expo SDK.

## Stack

| Technology   | Version | Notes                             |
| ------------ | ------- | --------------------------------- |
| Expo SDK     | 55+     |                                   |
| React Native | 0.83+   |                                   |
| React        | 19      |                                   |
| TypeScript   | 5+      | strict mode                       |
| ESLint       | 9       | flat config (`eslint.config.mjs`) |

## Getting Started

From the repo root:

```bash
pnpm --filter mobile dev    # Start Expo dev server
pnpm --filter mobile lint    # Lint
```

Or from this directory:

```bash
pnpm dev
pnpm lint
```

## Running on a Device / Simulator

- **iOS simulator**: press `i` after starting the Expo dev server.
- **Android emulator**: press `a` after starting the Expo dev server.
- **Physical device**: scan the QR code with the [Expo Go](https://expo.dev/client) app.

## Structure

```
apps/mobile/
├── App.tsx          # Application root
├── index.ts         # Entry point
├── app.json         # Expo configuration
└── tsconfig.json    # TypeScript config (extends expo/tsconfig.base)
```

## Further Reading

- [Architecture overview](../../docs/architecture/README.md)
- [Development guide](../../docs/development/README.md)
- [Standards](../../docs/standards/README.md)
