import { filterModulesByType, loadModules } from 'shared/domain/modules';
import { MODULE_TYPES } from 'shared/domain/modules/enums';

let modules = [];

export const bootstrapModules = () => {
  modules = loadModules();
  return modules;
};

export const listNodesModules = () => filterModulesByType(modules, [MODULE_TYPES.NODE]);

export const getModules = () => modules;

export const getModuleByName = name => modules
  .find(m => m.manifest.name === name);
