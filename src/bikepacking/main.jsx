import React from "react";
import ReactDOM from "react-dom/client";
import "../scss/bikepacking.scss";
import TripsPage from "./TripsPage";
import TripPage from "./TripPage";
import { loadTrip } from "./trips";

// One entry for all bikepacking pages: the page's root says which trip it shows, an empty value is the list.
const root = document.getElementById("root");
const slug = root.dataset.trip;
// The trip and its route start loading at once, alongside the first render; the page reuses the same request.
if (slug) loadTrip(slug);

ReactDOM.createRoot(root).render(<React.StrictMode>{slug ? <TripPage slug={slug} /> : <TripsPage />}</React.StrictMode>);
