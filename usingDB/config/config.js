const userRoles = {
  user: 1,
  admin: 2,
};

const accessLevels = {
  user: userRoles.user || userRoles.admin,
  admin: userRoles.admin,
};

const status = {
  default: 'processing',
};

export default { accessLevels, userRoles, status };
