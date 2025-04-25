import type { Route } from "./+types/home";
import Schedule from "~/routes/Schedule/Schedule";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hypsi" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  return <Schedule/>

}

