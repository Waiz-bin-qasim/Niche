export const draftAllFieldsCheck = (service) => {
  const keysToCheck = [
    "subCategory_id",
    "service_title",
    "service_description",
    "service_image",
    "service_price",
    "duration",
    "is_draft",
    "is_featured",
  ];
  const objectKeys = Object.keys(service);
  return keysToCheck.every((key) => objectKeys.includes(key));
};
