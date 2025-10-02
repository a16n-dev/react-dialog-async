import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { importX } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

export default tseslint.config(
  {
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          project: 'packages/*/tsconfig.json',
        }),
      ],
    },
  },
  { ignores: ['**/dist/**', '**/node_modules/**'] },
  {
    files: [''],
    plugins: { js },
  },
  importX.flatConfigs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'import-x/order': 'error',
    },
  },
);
