const BRANCH_TYPE = {
  // BUSINESS: 'business',
  // ECONOMY: 'economy',
  // PREMIUM_ECONOMY: 'premium-economy',
  // FIRST_CLASS: 'first-class'
  IT: "Information Technology",
  ME: "Mechenical Engineering",
  EE: "Electrical Engineering",
  CE: "Civil Engineering",
  LT: "Leather Technology",
  PHARMA: "B. Pharmacy",
  BMR: "Biomedical and Robotics Engineering",
  ECE: "Electronics and Communication Engineering",
};

const CONNECTION_STATUS={
    PENDING:"pending",
    ACCEPT:'accepted',
    REJECT:'rejected',
};

const USER_ROLES_ENUMS = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  
}
module.exports = {
  BRANCH_TYPE,
  CONNECTION_STATUS,
  USER_ROLES_ENUMS,
};
