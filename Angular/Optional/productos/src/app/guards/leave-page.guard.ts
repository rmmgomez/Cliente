import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../products/interfaces/can-component-deactivate';

export const leavePageGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate?component.canDeactivate():true;
};