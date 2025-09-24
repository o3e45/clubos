export type Role = 'Owner' | 'Admin' | 'Treasurer' | 'Member' | 'Viewer';

export const roleHierarchy: Record<Role, number> = {
  Owner: 5,
  Admin: 4,
  Treasurer: 3,
  Member: 2,
  Viewer: 1
};

export function canAccess(userRole: Role, allowed: Role[]) {
  if (allowed.length === 0) return true;
  return allowed.some((role) => roleHierarchy[userRole] >= roleHierarchy[role]);
}
