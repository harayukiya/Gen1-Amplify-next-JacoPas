"use client";

//ページのインポート
import Home from "@pages/Home";
import ShowOneMail from "@pages/ShowOneMail";
import ShowAllMail from "@/pages/ShowAllMail";

import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <main id="common">
        {page === "home" && <Home onNavigate={setPage} />}
        {page === "showOneMail" && <ShowOneMail onNavigate={setPage} />}
        {page === "showAllMail" && <ShowAllMail onNavigate={setPage} />}
    </main>
  );
}