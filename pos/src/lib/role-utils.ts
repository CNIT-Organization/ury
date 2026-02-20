import type { PosProfileCombined } from './pos-profile-api';
import type { User } from '../store/slices/auth-slice';

export const URY_ROLE_NAMES = [
  'URY Cashier Enabled',
  'URY Captain Enabled',
  'URY Manager',
];

export const hasUryRole = (roles: string[] | undefined | null): boolean => {
  if (!roles || !roles.length) {
    return false;
  }

  return roles.some((role) => URY_ROLE_NAMES.includes(role));
};

export const isUserRestrictedFromTableOrders = (
  user: User | null,
  posProfile: PosProfileCombined | null
): boolean => {
  if (!user || !posProfile || !user.roles || !posProfile.role_restricted_for_table_order) {
    return false;
  }

  // Get the restricted roles from the POS profile
  const restrictedRoles = posProfile.role_restricted_for_table_order.map(role => role.role);
  
  // Check if the user has any of the restricted roles
  const hasRestrictedRole = user.roles.some(role => restrictedRoles.includes(role));
  
  return hasRestrictedRole;
}; 