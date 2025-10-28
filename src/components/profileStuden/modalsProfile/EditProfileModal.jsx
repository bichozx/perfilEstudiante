import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

export const EditProfileModal = ({ show, handleClose, profile, updateProfile }) => {
  const [formData, setFormData] = useState({
    resumen: '',
    intereses: '',
    experiencia: '',
    programa: '',
    semestre: '',
  });
  console.log('🚀 ~ EditProfileModal ~ formData:', formData)

  useEffect(() => {
    if (profile) {
      setFormData({
        resumen: profile.resumen || '',
        intereses: profile.intereses || '',
        experiencia: profile.experiencia || '',
        //programa: profile.programa || '',
        //semestre: profile.semestre || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile.id, formData);
      handleClose();
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el perfil');
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      size="lg"
      contentClassName="border-0 shadow-lg rounded-4"
    >
      <Modal.Header closeButton style={{ borderBottom: '2px solid #003366' }}>
        <Modal.Title
          style={{
            fontFamily: 'Playfair Display, serif',
            color: '#003366',
            fontWeight: '700',
          }}
        >
          Editar Perfil
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#333' }}>
        <Form onSubmit={handleSubmit}>
          {['resumen', 'intereses', 'experiencia'].map((field) => (
            <Form.Group className="mb-4" key={field}>
              <Form.Label
                style={{ fontWeight: '600', color: '#003366', fontSize: '0.95rem' }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Form.Label>
              {['programa', 'semestre'].includes(field) ? (
                <Form.Control
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  style={{ borderColor: '#003366' }}
                />
              ) : (
                <Form.Control
                  as="textarea"
                  rows={field === 'intereses' ? 2 : 3}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  style={{ borderColor: '#003366' }}
                />
              )}
            </Form.Group>
          ))}
          <Button
            type="submit"
            style={{
              backgroundColor: '#003366',
              borderColor: '#003366',
              fontWeight: '600',
              borderRadius: '0.375rem',
              width: '100%',
            }}
          >
            Guardar cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
