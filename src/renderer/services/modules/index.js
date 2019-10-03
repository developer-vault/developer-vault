import { filterModulesByType, loadModules } from 'shared/services/modules';
import { MODULE_TYPES } from 'shared/services/modules/enums';

let modules = {};

export const bootstrapModules = () => {
  modules = loadModules();
  return modules;
};

export const listNodesModules = () => filterModulesByType(modules, [MODULE_TYPES.NODE]);
