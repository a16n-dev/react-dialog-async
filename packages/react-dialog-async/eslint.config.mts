import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.mjs';

export default defineConfig([
  ...baseConfig,
  {
    files: ['./src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]);
