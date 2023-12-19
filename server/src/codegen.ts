import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.graphql',
  generates: {
    './src/__generated__/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
        contextType: '../index#MyContext'
      },
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
};

export default config;
