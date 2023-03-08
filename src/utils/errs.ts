export const newErrWithCode = (message: string, status: number = 500, code: number = null) => {
  if (code) {
    return Object.assign(new Error(message), { status: status, error: { code } });
  }
  return Object.assign(new Error(message), { status: status });
};

