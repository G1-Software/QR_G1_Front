import error from "../assets/error.png";

const ERROR_COPY = {
  401: {
    title: "Ups! parece que ha ocurrido un problema",
    description:
      "Escanea de nuevo el código QR ubicado junto a tu cama para acceder a la información.",
  },
  403: {
    title: "No tienes permisos para ver esta información",
    description: "Solicita ayuda al personal o intenta con otro enlace.",
  },
  404: {
    title: "Ups! parece que ha ocurrido un problema",
    description: "No encontramos lo que buscabas. El recurso solicitado no existe o fue retirado.",
  },
  413: {
    title: "La información es demasiado pesada para cargarla",
    description:
      "Intenta nuevamente más tarde o contacta al personal para que te ayude a revisarla.",
  },
  503: {
    title: "El servicio no está disponible",
    description: "Intenta nuevamente en unos minutos.",
  },
  default: {
    title: "Ups! parece que ha ocurrido un problema",
    description: "Intenta nuevamente más tarde.",
  },
};

export function ErrorPage({ status, message }) {
  const copy = ERROR_COPY[status] || ERROR_COPY.default;
  const description = message || copy.description;

  return (
    <div className="scan-notice">
      <p>{copy.title}</p>
      <img src={error} alt="Error" className="error-img" />
      <p>{description}</p>
    </div>
  );
}
