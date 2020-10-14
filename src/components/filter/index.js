export { default as FilterForm } from "./FilterForm";

export const filter = (query, data) => {
  if (query.conditions.length === 0) {
    return data;
  }

  let filteredData = data.filter((row) => {
    let condEvalArr = query.conditions.map((condition) => {
      if (condition.id && condition.operator && condition.value) {
        let value = row[condition.id];

        if (condition.operator === "EQ") {
          return value === condition.value;
        }

        if (condition.operator === "CONTAINS") {
          return value.includes(condition.value);
        }

        if (condition.operator === "GTE") {
          return value >= parseInt(condition.value);
        }

        if (condition.operator === "LTE") {
          return value <= parseInt(condition.value);
        }
      }

      return true;
    });

    if (condEvalArr.length === 1) {
      return condEvalArr[0];
    } else {
      return condEvalArr.reduce((filterBool, item) => {
        if (query.join === "OR") {
          return filterBool || item;
        } else {
          return filterBool && item;
        }
      }, condEvalArr[0]);
    }
  });

  return filteredData;
};
