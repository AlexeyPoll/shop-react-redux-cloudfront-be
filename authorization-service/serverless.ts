import type { AWS } from '@serverless/typescript';
import basicAuthorizer from "@functions/basicAuthorizer";

const serverlessConfiguration: AWS = {
  service: 'epam-aws-authorization-service',
  frameworkVersion: '3',
  plugins: [
    'serverless-pseudo-parameters',
    'serverless-dotenv-plugin',
    'serverless-offline',
    'serverless-webpack'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    profile: "admin",
    apiGateway: {
      minimumCompressionSize: 1024
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    basicAuthorizer
  },
  package: { individually: true },
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: false,
      packager: 'npm',
      excludeFiles: 'src/**/*.test.js'
    }
  }
};

module.exports = serverlessConfiguration;
