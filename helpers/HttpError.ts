export interface CustomError extends Error {
  status: number;
}

const messageList: { [key: number]: string } = {
  400: "Bad Request",
  401: "Unathorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

export const HttpError = (
  status: number,
  message = messageList[status]
): CustomError => {
  const error = new Error(message) as CustomError;
  error.status = status;
  return error;
};
