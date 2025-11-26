export function buildErrorState(error, fallbackMessage) {
  const hasResponse = Boolean(error?.response);
  const status = hasResponse ? error.response.status : 503;
  const apiMessage = error?.response?.data?.message;

  const message = hasResponse
    ? (typeof apiMessage === "string" && apiMessage.trim()) ||
      fallbackMessage ||
      "Ocurrió un error inesperado."
    : "El servicio no está disponible. Intenta nuevamente en unos minutos.";

  return { status, message };
}
