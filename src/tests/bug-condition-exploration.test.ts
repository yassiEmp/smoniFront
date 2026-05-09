/**
 * Bug Condition Exploration Test
 * 
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6**
 * 
 * This test verifies that the 4 missing files cause import resolution failures.
 * 
 * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists.
 * DO NOT attempt to fix the test or the code when it fails.
 * 
 * The test encodes the expected behavior - it will validate the fix when it passes
 * after implementation.
 * 
 * GOAL: Surface counterexamples that demonstrate the bug exists.
 */

import { describe, it, expect } from 'vitest';
import { fc, test } from '@fast-check/vitest';
import * as fs from 'fs';
import * as path from 'path';

// Define the missing file paths that should cause import resolution failures
const MISSING_FILES = [
  {
    importPath: '@components/generales/authentification/register/apprenant-profile/ProgressBar',
    resolvedPath: 'src/components/generales/authentification/register/apprenant-profile/ProgressBar.tsx',
    description: 'ProgressBar component'
  },
  {
    importPath: '@components/generales/authentification/register/apprenant-profile/ErrorField',
    resolvedPath: 'src/components/generales/authentification/register/apprenant-profile/ErrorField.tsx',
    description: 'ErrorField component'
  }
];

/**
 * Helper function to resolve Vite path aliases to actual file paths
 */
function resolveAlias(importPath: string): string {
  const projectRoot = path.resolve(__dirname, '../..');
  
  if (importPath.startsWith('@components/')) {
    return path.join(projectRoot, importPath.replace('@components/', 'src/components/'));
  } else if (importPath.startsWith('@assets/')) {
    return path.join(projectRoot, importPath.replace('@assets/', 'src/assets/'));
  }
  
  return path.join(projectRoot, importPath);
}

/**
 * Helper function to check if a file exists
 */
function fileExists(filePath: string): boolean {
  // Try with .tsx extension
  if (fs.existsSync(filePath + '.tsx')) {
    return true;
  }
  // Try with .ts extension
  if (fs.existsSync(filePath + '.ts')) {
    return true;
  }
  // Try without extension (for images)
  if (fs.existsSync(filePath)) {
    return true;
  }
  return false;
}

/**
 * Bug condition function: returns true if this import should trigger the bug
 */
function isBugCondition(importPath: string): boolean {
  return MISSING_FILES.some(file => file.importPath === importPath);
}

describe('Bug Condition Exploration - Missing Files After OneDrive Sync', () => {
  describe('Property 1: Bug Condition - Missing Files Cause Import Resolution Failures', () => {
    
    it('should verify ProgressBar component file does NOT exist at expected path', () => {
      const file = MISSING_FILES[0];
      const resolvedPath = resolveAlias(file.importPath);
      
      // This assertion SHOULD FAIL on unfixed code (proving the bug exists)
      // When it PASSES after the fix, it confirms the file has been restored
      expect(
        fileExists(resolvedPath),
        `Expected ${file.description} to exist at ${resolvedPath} but it does not. ` +
        `This confirms the bug: Vite cannot resolve import "${file.importPath}"`
      ).toBe(true);
    });

    it('should verify ErrorField component file does NOT exist at expected path', () => {
      const file = MISSING_FILES[1];
      const resolvedPath = resolveAlias(file.importPath);
      
      // This assertion SHOULD FAIL on unfixed code (proving the bug exists)
      // When it PASSES after the fix, it confirms the file has been restored
      expect(
        fileExists(resolvedPath),
        `Expected ${file.description} to exist at ${resolvedPath} but it does not. ` +
        `This confirms the bug: Vite cannot resolve import "${file.importPath}"`
      ).toBe(true);
    });

    // Property-based test: For all imports in the bug condition set, files should exist
    test.prop([
      fc.constantFrom(...MISSING_FILES.map(f => f.importPath))
    ])('Property: All missing files should exist for successful import resolution', (importPath) => {
      // Verify this is indeed a bug condition import
      expect(isBugCondition(importPath)).toBe(true);
      
      const resolvedPath = resolveAlias(importPath);
      
      // This property SHOULD FAIL on unfixed code for all 4 missing files
      // When it PASSES after the fix, it confirms all files have been restored
      expect(
        fileExists(resolvedPath),
        `Import resolution failure: "${importPath}" resolves to "${resolvedPath}" which does not exist. ` +
        `Vite will fail with "Failed to resolve import" error.`
      ).toBe(true);
    });

    it('should verify parent directory structure exists for components', () => {
      const componentDir = path.resolve(__dirname, '../../src/components/generales/authentification/register/apprenant-profile');
      
      // This assertion SHOULD FAIL on unfixed code
      // When it PASSES after the fix, it confirms the directory structure has been created
      expect(
        fs.existsSync(componentDir),
        `Expected directory ${componentDir} to exist but it does not. ` +
        `This is required for ProgressBar and ErrorField components.`
      ).toBe(true);
    });
  });

  describe('Counterexample Documentation', () => {
    it('should document which specific files are missing', () => {
      const missingFiles: string[] = [];
      
      MISSING_FILES.forEach(file => {
        const resolvedPath = resolveAlias(file.importPath);
        if (!fileExists(resolvedPath)) {
          missingFiles.push(`${file.description}: ${file.importPath} -> ${resolvedPath}`);
        }
      });
      
      // This will document the counterexamples when the test fails
      if (missingFiles.length > 0) {
        console.log('\n=== COUNTEREXAMPLES FOUND ===');
        console.log('The following files are missing and cause import resolution failures:\n');
        missingFiles.forEach(file => console.log(`  - ${file}`));
        console.log('\nThese missing files will cause Vite to fail with "Failed to resolve import" errors.');
        console.log('===========================\n');
      }
      
      // This assertion SHOULD FAIL on unfixed code with all 4 files missing
      // When it PASSES after the fix, missingFiles will be empty
      expect(
        missingFiles,
        `Found ${missingFiles.length} missing files that cause import resolution failures. ` +
        `See console output for details.`
      ).toHaveLength(0);
    });
  });
});
