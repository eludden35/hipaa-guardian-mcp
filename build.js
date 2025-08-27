#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

console.log('🔨 Building HIPAA Compliance Guardian MCP Server for Smithery...');

try {
  // Clean dist directory
  if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true, force: true });
  }
  
  // Compile TypeScript
  console.log('📝 Compiling TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });
  
  // Copy hipaa-content.json to dist
  console.log('📋 Copying HIPAA content...');
  fs.copyFileSync('./hipaa-content.json', './dist/hipaa-content.json');
  
  // Copy package.json to dist
  console.log('📦 Copying package.json...');
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  const distPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    type: 'module',
    main: 'server.js',
    dependencies: {
      '@modelcontextprotocol/sdk': packageJson.dependencies['@modelcontextprotocol/sdk'],
      'zod': packageJson.dependencies['zod']
    }
  };
  fs.writeFileSync('./dist/package.json', JSON.stringify(distPackageJson, null, 2));
  
  // Copy smithery.yaml to dist
  console.log('⚙️ Copying smithery.yaml...');
  fs.copyFileSync('./smithery.yaml', './dist/smithery.yaml');
  
  console.log('✅ Build completed successfully!');
  console.log('📁 Output directory: ./dist');
  console.log('🚀 Ready for Smithery deployment');
  
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
