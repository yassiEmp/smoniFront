/**
 * Preservation Property Tests
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**
 * 
 * This test verifies that existing imports continue to work correctly.
 * 
 * IMPORTANT: These tests should PASS on unfixed code (confirming baseline behavior to preserve).
 * 
 * GOAL: Ensure the fix doesn't break any existing functionality.
 */

import { describe, it, expect } from 'vitest';
import { fc, test } from '@fast-check/vitest';
import * as fs from 'fs';
import * as path from 'path';

// Define existing components that should continue to work
const EXISTING_COMPONENTS = [
  {
    importPath: '@components/auth/monitorStep1',
    resolvedPath: 'src/components/auth/monitorStep1.tsx',
    description: 'MonitorStep1 component'
  },
  {
    importPath: '@components/auth/monitorStep2',
    resolvedPath: 'src/components/auth/monitorStep2.tsx',
    description: 'MonitorStep2 component'
  },
  {
    importPath: '@components/auth/monitorStep3',
    resolvedPath: 'src/components/auth/monitorStep3.tsx',
    description: 'MonitorStep3 component'
  },
  {
    importPath: '@components/auth/LeanerStep2',
    resolvedPath: 'src/components/auth/LeanerStep2.tsx',
    description: 'LeanerStep2 component'
  },
  {
    importPath: '@components/common/Loader',
    resolvedPath: 'src/components/common/Loader.tsx',
    description: 'Loader component'
  }
];

// Define existing assets that should continue to work
const EXISTING_ASSETS = [
  {
    importPath: '@assets/authentification/form-image-1.png',
    resolvedPath: 'src/assets/authentification/form-image-1.png',
    description: 'Form image 1'
  },
  {
    importPath: '@assets/authentification/smoni-logo.svg',
    resolvedPath: 'src/assets/authentification/smoni-logo.svg',
    description: 'Smoni logo SVG'
  },
  {
    importPath: '@assets/authentification/register/prof-icon.png',
    resolvedPath: 'src/assets/authentification/register/prof-icon.png',
    description: 'Professor icon'
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
  } else if (importPath.startsWith('@utils/')) {
    return path.join(projectRoot, importPath.replace('@utils/', 'src/utils/'));
  } else if (importPath.startsWith('@hooks/')) {
    return path.join(projectRoot, importPath.replace('@hooks/', 'src/hooks/'));
  } else if (importPath.startsWith('@pages/')) {
    return path.join(projectRoot, importPath.replace('@pages/', 'src/pages/'));
  } else if (importPath.startsWith('@/')) {
    return path.join(projectRoot, importPath.replace('@/', 'src/'));
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
  // Try with .jsx extension
  if (fs.existsSync(filePath + '.jsx')) {
    return true;
  }
  // Try with .js extension
  if (fs.existsSync(filePath + '.js')) {
    return true;
  }
  // Try without extension (for images and other assets)
  if (fs.existsSync(filePath)) {
    return true;
  }
  return false;
}

/**
 * Bug condition function: returns true if this import is part of the bug
 */
function isBugCondition(importPath: string): boolean {
  const bugConditionPaths = [
    '@components/generales/authentification/register/apprenant-profile/ProgressBar',
    '@components/generales/authentification/register/apprenant-profile/ErrorField',
    '@assets/images/home/logo/1.png',
    '@assets/images/home/logo/2.png'
  ];
  return bugConditionPaths.includes(importPath);
}

describe('Preservation Property Tests - Existing Import Resolution', () => {
  describe('Property 2: Preservation - Existing Component Imports Continue to Work', () => {
    
    it('should verify MonitorStep1 component exists and resolves correctly', () => {
      const component = EXISTING_COMPONENTS[0];
      const resolvedPath = resolveAlias(component.importPath);
      
      // This should PASS on unfixed code (confirming baseline behavior)
      expect(
        fileExists(resolvedPath),
        `Expected ${component.description} to exist at ${resolvedPath}. ` +
        `This is an existing component that should not be affected by the fix.`
      ).toBe(true);
    });

    it('should verify MonitorStep2 component exists and resolves correctly', () => {
      const component = EXISTING_COMPONENTS[1];
      const resolvedPath = resolveAlias(component.importPath);
      
      // This should PASS on unfixed code (confirming baseline behavior)
      expect(
        fileExists(resolvedPath),
        `Expected ${component.description} to exist at ${resolvedPath}. ` +
        `This is an existing component that should not be affected by the fix.`
      ).toBe(true);
    });

    it('should verify MonitorStep3 component exists and resolves correctly', () => {
      const component = EXISTING_COMPONENTS[2];
      const resolvedPath = resolveAlias(component.importPath);
      
      // This should PASS on unfixed code (confirming baseline behavior)
      expect(
        fileExists(resolvedPath),
        `Expected ${component.description} to exist at ${resolvedPath}. ` +
        `This is an existing component that should not be affected by the fix.`
      ).toBe(true);
    });

    // Property-based test: For all existing components, files should exist
    test.prop([
      fc.constantFrom(...EXISTING_COMPONENTS.map(c => c.importPath))
    ])('Property: All existing component imports should resolve successfully', (importPath) => {
      // Verify this is NOT a bug condition import
      expect(isBugCondition(importPath)).toBe(false);
      
      const resolvedPath = resolveAlias(importPath);
      
      // This property should PASS on unfixed code (confirming preservation)
      expect(
        fileExists(resolvedPath),
        `Existing import "${importPath}" should resolve to "${resolvedPath}" successfully. ` +
        `This import was working before and should continue to work after the fix.`
      ).toBe(true);
    });
  });

  describe('Property 2: Preservation - Existing Asset Imports Continue to Work', () => {
    
    it('should verify form-image-1.png exists and resolves correctly', () => {
      const asset = EXISTING_ASSETS[0];
      const resolvedPath = resolveAlias(asset.importPath);
      
      // This should PASS on unfixed code (confirming baseline behavior)
      expect(
        fileExists(resolvedPath),
        `Expected ${asset.description} to exist at ${resolvedPath}. ` +
        `This is an existing asset that should not be affected by the fix.`
      ).toBe(true);
    });

    it('should verify smoni-logo.svg exists and resolves correctly', () => {
      const asset = EXISTING_ASSETS[1];
      const resolvedPath = resolveAlias(asset.importPath);
      
      // This should PASS on unfixed code (confirming baseline behavior)
      expect(
        fileExists(resolvedPath),
        `Expected ${asset.description} to exist at ${resolvedPath}. ` +
        `This is an existing asset that should not be affected by the fix.`
      ).toBe(true);
    });

    it('should verify prof-icon.png exists and resolves correctly', () => {
      const asset = EXISTING_ASSETS[2];
      const resolvedPath = resolveAlias(asset.importPath);
      
      // This should PASS on unfixed code (confirming baseline behavior)
      expect(
        fileExists(resolvedPath),
        `Expected ${asset.description} to exist at ${resolvedPath}. ` +
        `This is an existing asset that should not be affected by the fix.`
      ).toBe(true);
    });

    // Property-based test: For all existing assets, files should exist
    test.prop([
      fc.constantFrom(...EXISTING_ASSETS.map(a => a.importPath))
    ])('Property: All existing asset imports should resolve successfully', (importPath) => {
      // Verify this is NOT a bug condition import
      expect(isBugCondition(importPath)).toBe(false);
      
      const resolvedPath = resolveAlias(importPath);
      
      // This property should PASS on unfixed code (confirming preservation)
      expect(
        fileExists(resolvedPath),
        `Existing asset import "${importPath}" should resolve to "${resolvedPath}" successfully. ` +
        `This asset was accessible before and should continue to be accessible after the fix.`
      ).toBe(true);
    });
  });

  describe('Property 2: Preservation - Vite Path Alias Resolution', () => {
    
    it('should verify @components alias resolves correctly', () => {
      const testPath = '@components/auth/monitorStep1';
      const resolvedPath = resolveAlias(testPath);
      
      // Verify the alias resolution logic works correctly (normalize path separators)
      const normalizedPath = resolvedPath.replace(/\\/g, '/');
      expect(normalizedPath).toContain('src/components/auth/monitorStep1');
      
      // Verify the resolved file exists
      expect(
        fileExists(resolvedPath),
        `@components alias should resolve correctly. Path "${testPath}" should resolve to an existing file.`
      ).toBe(true);
    });

    it('should verify @assets alias resolves correctly', () => {
      const testPath = '@assets/authentification/smoni-logo.svg';
      const resolvedPath = resolveAlias(testPath);
      
      // Verify the alias resolution logic works correctly (normalize path separators)
      const normalizedPath = resolvedPath.replace(/\\/g, '/');
      expect(normalizedPath).toContain('src/assets/authentification/smoni-logo.svg');
      
      // Verify the resolved file exists
      expect(
        fileExists(resolvedPath),
        `@assets alias should resolve correctly. Path "${testPath}" should resolve to an existing file.`
      ).toBe(true);
    });

    // Property-based test: Path alias resolution should work for all existing imports
    test.prop([
      fc.constantFrom(
        ...EXISTING_COMPONENTS.map(c => c.importPath),
        ...EXISTING_ASSETS.map(a => a.importPath)
      )
    ])('Property: Vite path aliases should resolve correctly for all existing imports', (importPath) => {
      const resolvedPath = resolveAlias(importPath);
      
      // Verify the resolved path contains the expected structure (normalize path separators)
      const normalizedPath = resolvedPath.replace(/\\/g, '/');
      if (importPath.startsWith('@components/')) {
        expect(normalizedPath).toContain('src/components/');
      } else if (importPath.startsWith('@assets/')) {
        expect(normalizedPath).toContain('src/assets/');
      }
      
      // Verify the resolved file exists
      expect(
        fileExists(resolvedPath),
        `Path alias resolution for "${importPath}" should work correctly and resolve to an existing file.`
      ).toBe(true);
    });
  });

  describe('Property 2: Preservation - Third-Party Library Imports', () => {
    
    it('should verify react can be imported', () => {
      // Third-party libraries are resolved by Node.js module resolution
      // We verify they exist in node_modules
      const reactPath = path.resolve(__dirname, '../../node_modules/react');
      
      expect(
        fs.existsSync(reactPath),
        `React library should be available in node_modules. ` +
        `Third-party imports should not be affected by the fix.`
      ).toBe(true);
    });

    it('should verify react-router-dom can be imported', () => {
      const routerPath = path.resolve(__dirname, '../../node_modules/react-router-dom');
      
      expect(
        fs.existsSync(routerPath),
        `React Router library should be available in node_modules. ` +
        `Third-party imports should not be affected by the fix.`
      ).toBe(true);
    });

    it('should verify formik can be imported', () => {
      const formikPath = path.resolve(__dirname, '../../node_modules/formik');
      
      expect(
        fs.existsSync(formikPath),
        `Formik library should be available in node_modules. ` +
        `Third-party imports should not be affected by the fix.`
      ).toBe(true);
    });

    // Property-based test: Common third-party libraries should be available
    test.prop([
      fc.constantFrom('react', 'react-dom', 'react-router-dom', 'formik', 'axios', 'framer-motion')
    ])('Property: Third-party library imports should continue to work', (libraryName) => {
      const libraryPath = path.resolve(__dirname, `../../node_modules/${libraryName}`);
      
      expect(
        fs.existsSync(libraryPath),
        `Third-party library "${libraryName}" should be available in node_modules. ` +
        `The fix should not affect third-party imports.`
      ).toBe(true);
    });
  });

  describe('Preservation Summary', () => {
    it('should document all existing imports that must be preserved', () => {
      const preservedImports: string[] = [];
      const brokenImports: string[] = [];
      
      // Check all existing components
      EXISTING_COMPONENTS.forEach(component => {
        const resolvedPath = resolveAlias(component.importPath);
        if (fileExists(resolvedPath)) {
          preservedImports.push(`${component.description}: ${component.importPath}`);
        } else {
          brokenImports.push(`${component.description}: ${component.importPath}`);
        }
      });
      
      // Check all existing assets
      EXISTING_ASSETS.forEach(asset => {
        const resolvedPath = resolveAlias(asset.importPath);
        if (fileExists(resolvedPath)) {
          preservedImports.push(`${asset.description}: ${asset.importPath}`);
        } else {
          brokenImports.push(`${asset.description}: ${asset.importPath}`);
        }
      });
      
      // Log the preservation status
      console.log('\n=== PRESERVATION STATUS ===');
      console.log(`Total existing imports checked: ${preservedImports.length + brokenImports.length}`);
      console.log(`Preserved (working): ${preservedImports.length}`);
      console.log(`Broken: ${brokenImports.length}`);
      
      if (brokenImports.length > 0) {
        console.log('\nBROKEN IMPORTS (should be working):');
        brokenImports.forEach(imp => console.log(`  - ${imp}`));
      }
      
      console.log('===========================\n');
      
      // This should PASS on unfixed code (all existing imports should work)
      expect(
        brokenImports,
        `All existing imports should be working. Found ${brokenImports.length} broken imports that should be preserved.`
      ).toHaveLength(0);
    });
  });
});
