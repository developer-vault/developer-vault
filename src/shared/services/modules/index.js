import { pickBy } from 'lodash';
import { MODULE_TYPES } from './enums';
/**
 * Discover modules from the modules folder.
 * TODO: setup an autoloader.
 *
 * @returns {object} - Discovered modules.
 */
const discoverModules = () => ({
  // eslint-disable-next-line import/no-unresolved,global-require
  links: require('modules/links').default,
});

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
    // Manifest must expose a title.
    manifest.title,

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
    throw new Error("Module couln't be loaded.");
  }

  // Lint the manifest.
  if (!manifestIsValid(module.manifest)) {
    throw new Error('Manifest is invalid.');
  }

  // Check requirements.
  if (!verifyModuleTypeRequirement(module)) {
    throw new Error("Module doesn't meets its type requirements.");
  }

  return true;
};

export const loadModules = () => {
  const discoveredModules = discoverModules();

  // Check requirement for each module.
  // This should throw if one module can't be loaded.
  Object.values(discoveredModules).forEach(isModuleLoadable);

  return discoveredModules;
};

export const filterModulesByType = (modules, type) => pickBy(
  modules,
  ({ manifest }) => manifest.type === type,
);
