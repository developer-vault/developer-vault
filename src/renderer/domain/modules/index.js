import { filterModulesByType, loadModules } from 'shared/domain/modules';
import { MODULE_TYPES } from 'shared/domain/modules/enums';

let modules = {};

export const bootstrapModules = () => {
  modules = loadModules();
  return modules;
};

export const listNodesModules = () => filterModulesByType(modules, [MODULE_TYPES.NODE]);
