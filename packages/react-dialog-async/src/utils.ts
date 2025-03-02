import { DialogComponent } from './types';

const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(16);
};

export const hashComponent = (component: DialogComponent<unknown, unknown>) => {
  const componentName = component.displayName || component.name;

  const hash = hashCode(component.toString());

  return `${componentName}${hash}`;
};
