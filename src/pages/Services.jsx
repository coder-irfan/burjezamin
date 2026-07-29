import { Suspense, lazy } from "react";

// Direct imports
import Services from "../components/Services";
import WhatsApp from "../components/WhatsApp";
import Breadcrumb from "../components/Breadcrumb";

const Testimonial = lazy(() => import("../components/Testimonial"));
const ServicesPage = ({ getDirection }) => (
  <>
    <Breadcrumb />

    <Services getDirection={getDirection} />

    <Suspense>
      <div className="bg-testimonial-bg bg-contain bg-no-repeat bg-center bg-colors-secondBg">
        <Testimonial getDirection={getDirection} />
      </div>
    </Suspense>

    <WhatsApp />
  </>
);

export default ServicesPage;
