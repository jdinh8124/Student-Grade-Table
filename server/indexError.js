
function clientUnexpectedError(code, parsedId, res) {
  if (code === 404) {
    const notFound = { error: `ID ${parsedId} does not exsist` };
    return res.status(404).json(notFound);
  } else if (code === 500) {
    const genericError = { error: 'An unexpected error occurred.' };
    return res.status(500).json(genericError);
  } else if (code === 400 && parsedId < 0) {
    const errorObject = { error: `ID ${parsedId} must be a positive integer` };
    return res.status(400).json(errorObject);
  } else if (code === 400) {
    const errorObjectNoBody = { error: 'There was no content to PUT' };
    return res.status(400).json(errorObjectNoBody);
  }
}
module.exports = clientUnexpectedError;
