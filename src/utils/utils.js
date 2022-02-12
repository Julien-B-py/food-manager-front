export const displayDaysLeft = (param) => {
  if (param > 1) {
    return `Reste ${param} jours`;
  } else if (param > 0) {
    return `Reste ${param} jour`;
  } else if (param === 0) {
    return "Dernier jour";
  } else {
    return "Périmé";
  }
};
