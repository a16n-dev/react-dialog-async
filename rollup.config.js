import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ clean: true, useTsconfigDeclarationDir: true }),
      del({ targets: 'dist' }),
    ],
  },
  {
    input: './dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts(), del({ targets: 'dist/types', hook: 'buildEnd' })],
  },
  // {
  //   plugins: [del({ targets: 'dist/types' })],
  // },
];

export default config;
