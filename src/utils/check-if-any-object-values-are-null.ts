export const checkIfAnyObjectValuesAreNull = <ObjectType extends object>(object: ObjectType): boolean => Object.values(object).some((value) => value === undefined || value === null);
