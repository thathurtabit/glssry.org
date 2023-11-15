export const isObjectEmpty = (objectName: object) => (
  objectName
  && Object.keys(objectName).length === 0
  && objectName.constructor === Object
);
