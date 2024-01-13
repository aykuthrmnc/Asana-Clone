class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status;
  }
  static notFound() {
    this.message = message;
    this.status = status;
  }
}

export default ApiError;
// ApiError.notFound();
