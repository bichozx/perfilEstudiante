import { AuthProvider } from './context/AuthProvider';
import { CertificadoProvider } from './context/certificadoContext/CertificadoProvaider';
import { HabilidadProvider } from './context/habilidadContext/HabilidadProvaider';
import { ProfileStudentProvider } from './context/profileStudent/ProfileStudentProvider';
import { ProjectProvider } from './context/projectProfile/ProjectProvider';
import { Routers } from './routes/Routers';

function App() {
  return (
    <AuthProvider>
      <ProfileStudentProvider>
        <ProjectProvider>
          <CertificadoProvider>
          <HabilidadProvider>
            <Routers />
            </HabilidadProvider>
          </CertificadoProvider>
        </ProjectProvider>
      </ProfileStudentProvider>
    </AuthProvider>
  );
}

export default App;
