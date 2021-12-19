import { useRouteMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import Details from "./Details";

function Deatil() {
  const detailMatch = useRouteMatch(["/tv/:id", "/movie/:id", "/search/:id"]);
  detailMatch
    ? disableBodyScroll(document.body)
    : enableBodyScroll(document.body);
  return <AnimatePresence>{detailMatch && <Details />}</AnimatePresence>;
}

export default Deatil;
