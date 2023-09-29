export function cleanLink(inputString) {
  // Remove extra backslashes
  let cleanedString = inputString.replace(/\\+/g, "\\");

  // Replace remaining backslashes with forward slashes
  cleanedString = cleanedString.replace(/\\/g, "/");
  console.log(cleanedString);
  return cleanedString;
}
