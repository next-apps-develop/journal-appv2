// setup-vitest.ts
import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('zustand') // to make it work like Jest (auto-mocking)

// FAIL LOUDLY on unhandled promise rejections / errors
process.on('unhandledRejection', (reason) => {
    // eslint-disable-next-line no-console
    console.log(`FAILED TO HANDLE PROMISE REJECTION`);
    throw reason;
  });