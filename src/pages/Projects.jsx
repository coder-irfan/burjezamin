import { lazy } from "react";
import Breadcrumb from "../components/Breadcrumb";

// Lazy imports
const Projects = lazy(() => import("../components/Projects"));

const ProjectsPage = ({ getDirection }) => (
  <>
    <Breadcrumb />
    <Projects getDirection={getDirection} />
  </>
);

export default ProjectsPage;
