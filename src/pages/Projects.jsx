import { Suspense, lazy } from "react";
import Breadcrumb from "../components/Breadcrumb";

// Lazy imports
const Projects = lazy(() => import("../components/Projects"));

const ProjectsPage = ({ getDirection }) => (
  <>
    <Suspense>
      <Breadcrumb />
      <Projects getDirection={getDirection} />
    </Suspense>
  </>
);

export default ProjectsPage;
