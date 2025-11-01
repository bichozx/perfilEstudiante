// import { Button, Card, Col, Row } from "react-bootstrap";

// // src/components/shared/ItemListComponent.jsx
// import React from "react";

// export const ItemListComponent = ({
//   title, // Título general de la sección (e.g. "Mis Proyectos", "Mis Habilidades")
//   items, // Array de elementos (proyectos, certificados, habilidades)
//   onView, // Función al hacer clic en "Ver"
//   onEdit, // (opcional) Función al hacer clic en "Editar"
//   onDelete, // (opcional) Función al hacer clic en "Eliminar"
//   fields = [], // Campos a mostrar en el cuerpo del card
//   linkField, // (opcional) Campo del item que contiene una URL
// }) => {
//   if (!items || items.length === 0) {
//     return (
//       <div className="text-center mt-5 text-muted">
//         <h5>No tienes {title?.toLowerCase()} registrados todavía</h5>
//         <p>Agrega uno nuevo desde la opción “Crear {title?.slice(4)}”.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <h3
//         className="text-center mb-4 fw-bold"
//         style={{ color: "#003366", letterSpacing: "0.5px" }}
//       >
//         {title}
//       </h3>

//       <Row xs={1} md={2} lg={3} className="g-4">
//         {items.map((item) => (
//           <Col key={item.id}>
//             <Card
//               className="h-100 shadow-sm border-0"
//               style={{
//                 borderRadius: "12px",
//                 backgroundColor: "#f8f9fa",
//                 transition: "transform 0.2s ease, box-shadow 0.2s ease",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-5px)";
//                 e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "none";
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//             >
//               <Card.Body>
//                 <Card.Title className="fw-bold text-primary">
//                   {item.titulo || item.nombre || "Sin título"}
//                 </Card.Title>

//                 {/* Render dinámico de los campos */}
//                 {fields.map((field) => (
//                   <Card.Text key={field} className="text-secondary mb-1">
//                     <strong>{field}:</strong>{" "}
//                     {item[field.toLowerCase()] || "No especificado"}
//                   </Card.Text>
//                 ))}

//                 {/* Si hay un link */}
//                 {linkField && item[linkField] && (
//                   <Card.Link
//                     href={item[linkField]}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-decoration-none d-block mt-2"
//                     style={{ color: "#0056b3" }}
//                   >
//                     🔗 Ver enlace
//                   </Card.Link>
//                 )}
//               </Card.Body>

//               {/* Footer con botones condicionales */}
//               {(onView || onEdit || onDelete) && (
//                 <Card.Footer
//                   className="d-flex justify-content-between flex-wrap gap-2"
//                   style={{ backgroundColor: "#fff" }}
//                 >
//                   {onView && (
//                     <Button size="sm" variant="primary" onClick={() => onView(item)}>
//                       Ver
//                     </Button>
//                   )}
//                   {onEdit && (
//                     <Button size="sm" variant="warning" onClick={() => onEdit(item)}>
//                       Editar
//                     </Button>
//                   )}
//                   {onDelete && (
//                     <Button size="sm" variant="danger" onClick={() => onDelete(item)}>
//                       Eliminar
//                     </Button>
//                   )}
//                 </Card.Footer>
//               )}
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

import { Button, Card, Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

import React from "react";

export const ItemListComponent = ({
  title,
  items,
  onView,
  onEdit,
  onDelete,
  fields = [],
  linkField,
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center mt-5 text-muted">
        <h5>No tienes {title?.toLowerCase()} registrados todavía</h5>
        <p>Agrega uno nuevo desde la opción “Crear {title?.slice(4)}”.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4 fw-bold university-title">{title}</h3>

      <Row xs={1} md={2} lg={3} className="g-4">
        {items.map((item) => (
          <Col key={item.id}>
            <Card className="h-100 university-card">
              <Card.Body>
                <Card.Title className="fw-bold text-primary">
                  {item.titulo || item.nombre || "Sin título"}
                </Card.Title>

                {fields.map((field) => (
                  <Card.Text key={field} className="text-secondary mb-1">
                    <strong>{field}:</strong>{" "}
                    {item[field.toLowerCase()] || "No especificado"}
                  </Card.Text>
                ))}

                {linkField && item[linkField] && (
                  <Card.Link
                    href={item[linkField]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none d-block mt-2 link-university"
                  >
                    🔗 Ver enlace
                  </Card.Link>
                )}
              </Card.Body>

              {(onView || onEdit || onDelete) && (
                <Card.Footer className="university-footer">
                  {onView && (
                    <Button
                      variant="light"
                      className="icon-btn view-btn"
                      onClick={() => onView(item)}
                    >
                      <FaEye />
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      variant="light"
                      className="icon-btn edit-btn"
                      onClick={() => onEdit(item)}
                    >
                      <FaEdit />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="light"
                      className="icon-btn delete-btn"
                      onClick={() => onDelete(item)}
                    >
                      <FaTrashAlt />
                    </Button>
                  )}
                </Card.Footer>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
