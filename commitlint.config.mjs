/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'web',
        'mobile',
        'api',
        'packages',
        'tooling',
        'docs',
        'repo',
        'config',
        'deps',
        'release',
      ],
    ],
  },
};
