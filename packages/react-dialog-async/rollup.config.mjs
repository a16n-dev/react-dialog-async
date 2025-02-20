import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' with { type: 'json' };
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import { join } from 'path';
import copy from 'rollup-plugin-copy';

const OUT_DIR = './dist';
const PKG_DIR = './packages/react-dialog-async';

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: join(OUT_DIR, pkg.main),
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false,
        banner: "'use client';",
      },
      {
        file: join(OUT_DIR, pkg.module),
        format: 'esm',
        sourcemap: true,
        banner: "'use client';",
      },
    ],
    plugins: [
      peerDepsExternal({
        packageJsonPath: join(PKG_DIR, 'package.json'),
      }),
      resolve({
        rootDir: PKG_DIR,
      }),
      commonjs(),
      typescript({
        tsconfig: join(PKG_DIR, 'tsconfig.json'),
        clean: true,
        useTsconfigDeclarationDir: true,
      }),
      del({ targets: OUT_DIR }),
    ],
  },
  {
    input: join(OUT_DIR, 'types/index.d.ts'),
    output: [{ file: join(OUT_DIR, 'index.d.ts'), format: 'es' }],
    plugins: [
      dts(),
      del({ targets: join(OUT_DIR, 'types'), hook: 'buildEnd' }),
      copy({
        targets: [
          {
            src: [
              'README.md',
              join(PKG_DIR, 'package.json'),
              join(PKG_DIR, 'LICENSE.md'),
            ],
            dest: OUT_DIR,
          },
        ],
      }),
    ],
  },
];

export default config;
