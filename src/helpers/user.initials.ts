export const getUserInitials = (firstName: string, lastName: string) => {
  const first = firstName?.substring(0, 1);
  const last = lastName?.substring(0, 1);
  const initials = first + last;
  return initials;
};
