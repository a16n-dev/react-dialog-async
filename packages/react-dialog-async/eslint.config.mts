import baseConfig from '../../eslint.config.mjs';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...baseConfig,
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
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
