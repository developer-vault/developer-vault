import { MODULE_TYPES } from './enums';

/**
 * Discover modules from the modules folder.
 * TODO: setup an autoloader.
 *
 * @returns {object} - Discovered modules.
 */
const discoverModules = () => ([
  // eslint-disable-next-line import/no-unresolved,global-require
  require('modules/links').default,
  // eslint-disable-next-line import/no-unresolved,global-require
  require('modules/notes').default,
  // eslint-disable-next-line import/no-unresolved,global-require
  require('modules/dracula').default,
]);

/**
 * Lint the manifest of the module.
 *
 * @param {object} manifest - Manifest.
 * @returns {boolean} - True if manifest is valid.
 */
export const manifestIsValid = (manifest) => {
  if (!manifest) {
    return false;
  }

  return [
    // Manifest must expose a name.
    manifest.name,

    // Manifest must expose a description.
    manifest.description,

    // Manifest must expose a type.
    // Module type can only be one of declared in enum.
    manifest.type && Object.values(MODULE_TYPES).includes(manifest.type),
  ].every(Boolean);
};

/**
 * Verify that the module has everything required for its type.
 *
 * @param {object} module - Module.
 * @returns {boolean} - True if matches requirements.
 */
export const verifyModuleTypeRequirement = (module) => {
  switch (module.manifest?.type) {
    case MODULE_TYPES.NODE:
      // A node module should have a renderer/node element.
      return !!module.renderer?.node;
    case MODULE_TYPES.THEME:
      // A theme module should have a colors element.
      return !!module.colors;
    default:
      // Shouldn't happen since we called manifestIsValid first but still...
      return false;
  }
};

/**
 * Check every rules before loading a module.
 *
 * @param {object} module - Module.
 * @returns {boolean} - True if the module is loadable.
 */
export const isModuleLoadable = (module) => {
  if (!module) {
    throw new Error("Module couldn't be loaded.");
  }

  // Lint the manifest.
  if (!manifestIsValid(module.manifest)) {
    throw new Error('Manifest is invalid.');
  }

  // Check requirements.
  if (!verifyModuleTypeRequirement(module)) {
    throw new Error("Module doesn't meet its type requirements.");
  }

  return true;
};

/**
 * Load all modules on the filesystem with integrity controls.
 *
 * @returns {[*]} - An array of modules.
 */
export const loadModules = () => {
  const discoveredModules = discoverModules();

  // Check requirement for each module.
  // This should throw if one module can't be loaded.
  discoveredModules.forEach(isModuleLoadable);

  return discoveredModules;
};

/**
 * Filter modules by type.
 *
 * @param {object[]} modules - Modules.
 * @param {string[]} types - Types.
 * @returns {*} - Modules.
 */
export const filterModulesByType = (modules, types) => modules
  .filter(({ manifest }) => types.includes(manifest.type));
