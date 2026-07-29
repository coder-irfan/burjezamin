import { Suspense, lazy } from "react";
import Breadcrumb from "../components/Breadcrumb";

// Lazy imports
const ProjectDetails = lazy(() => import("../components/ProjectDetails"));

const ProjectDetailsPage = ({ getDirection }) => (
  <>
    <Suspense>
      <Breadcrumb />
      <ProjectDetails getDirection={getDirection} />
    </Suspense>
  </>
);

export default ProjectDetailsPage;
