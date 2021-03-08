module.exports = {
  //https://github.com/kulshekhar/ts-jest/blob/b0464e9cd57c52bbc65835b6ec784629cf5e7f73/src/presets/create-jest-preset.ts
  preset: 'ts-jest',

  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '@/(.*)': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },
};
