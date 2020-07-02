const userRoles = {
    user: 1,
    admin: 2
};

const accessLevels = {
    user: userRoles.user || userRoles.admin,
    admin: userRoles.admin,
};

export default { accessLevels, userRoles };