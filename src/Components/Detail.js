import { useRouteMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Details from "./Details";

function Deatil() {
  const detailMatch = useRouteMatch(["/tv/:id", "/movie/:id", "/search/:id"]);
  return <AnimatePresence>{detailMatch ? <Details /> : null}</AnimatePresence>;
}

export default Deatil;
