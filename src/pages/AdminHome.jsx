import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/logotipo.jpg";
import "../styles/adminHome.css";
import Card from "../components/Card";

export const AdminHome = () => {
  const { logout } = useAuth0();

  return (
    <div className="admin-home">
      <header className="admin-header">
        <div className="admin-header__inner">
          <div className="brand">
            <img src={logo} alt="UC CHRISTUS" className="brand__logo" />
          </div>
          <div className="logout-container">
            <button
              className="btn-logout"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.href } })
              }
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main>
        <h2>Panel de Administración QR UC CHRISTUS</h2>
        <p>
          Bienvenido al panel de gestión: administre y supervise fácilmente la
          plataforma.<br></br> Seleccione una opción para continuar.
        </p>

        <div className="admin-links">
          <Card
            image="https://www.saisie-facile.com/imgfr/images/saisie-texte.webp"
            title="Editor de Contenido"
            description="Permite crear y actualizar en formato Markdown las páginas informativas asociadas al QR, con visualización en tiempo real de los cambios realizados."
            linkText="Acceder"
            linkHref="/admin/editor"
          />
          <Card
            image="https://t4.ftcdn.net/jpg/04/58/38/61/360_F_458386183_wd4ffJtpRuCBQaA7EoBk4tfRZqr1pPbm.jpg"
            title="Instructivo del Editor"
            description="Presenta una guía completa sobre el uso del editor en Markdown, junto con un entorno interactivo para probar y practicar en tiempo real cada función del editor de contenido."
            linkText="Acceder"
            linkHref="/admin/instructivo"
          />
          <Card
            image="https://media.istockphoto.com/id/1434437996/photo/woman-hand-writing-on-clipboard-with-a-pen.jpg?s=612x612&w=0&k=20&c=IaDtgURkVQ4Onq9WV04kCp1rzjYj1GPUatE0mTOYc-A="
            title="Listado de Solicitudes"
            description="Muestra todas las solicitudes registradas en el sistema, permitiendo visualizarlas de forma ordenada, filtrarlas por área, subárea, estado o rango de fechas. Además, ofrece la posibilidad de actualizar el estado de cada solicitud."
            linkText="Acceder"
            linkHref="/dashboard/listado_solicitudes"
          />
          <Card
            image="https://media.istockphoto.com/id/1480239160/photo/an-analyst-uses-a-computer-and-dashboard-for-data-business-analysis-and-data-management.jpg?s=612x612&w=0&k=20&c=Zng3q0-BD8rEl0r6ZYZY0fbt2AWO9q_gC8lSrwCIgdk="
            title="Dashboard de Solicitudes"
            description="Dashboard interactivo que integra métricas, tendencias y análisis comparativos para evaluar el desempeño y evolución de las solicitudes en el tiempo."
            linkText="Acceder"
            linkHref="/dashboard/metricas_solicitudes"
          />
          <Card
            image="https://media.istockphoto.com/id/1298409663/video/scanning-qr-code-with-mobile-phone.jpg?s=640x640&k=20&c=Sy1BI91EqnXgnD36vCb0fRTd9ddgwRaPjQXk6Bd0uGI="
            title="Dashboard de métricas QR"
            description="Presenta datos analíticos sobre el uso de los QR, ofreciendo una visión del uso del sistema, las ubicaciones de escaneo y las páginas más consultadas."
            linkText="Acceder"
            linkHref="/admin/editor"
          />
          <Card
            image="https://media.istockphoto.com/id/1413855189/photo/chat-bot-service-concept-virtual-assistant-and-crm-software-automation-technology-customer.jpg?s=612x612&w=0&k=20&c=5wY13TF0YQWF_Ktt0HU9CcjRE6h0wvBpxG78XSLU0-U="
            title="Dashboard de métricas Chatbot"
            description="Reúne métricas e indicadores sobre el uso del chatbot, permitiendo analizar la frecuencia de interacción, los tipos de consultas y el nivel de actividad de los usuarios."
            linkText="Acceder"
            linkHref="#"
          />
        </div>
      </main>
    </div>
  );
};
