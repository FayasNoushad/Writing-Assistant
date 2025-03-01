import React, { useState, useEffect } from "react";
import "./Home.css";
import api from "../../../helpers/api";

function Home() {
  const fName = localStorage.getItem("fName");
  const [drafts, setDrafts] = useState([]);
  useEffect(() => {
    const fetchDrafts = async () => {
      const response = await api.post("/draft/drafts/");
      setDrafts(response.data.drafts);
    };
    fetchDrafts();
  }, []);
  return (
    <div className="home">
      <h2>Hello {fName}</h2>
      <div className="drafts">
        {drafts &&
          drafts.map((draft) => (
            <div
              key={draft._id}
              className="card border-light mb-3 p-3 bg-transparent "
              style={{ maxWidth: "18rem" }}
            >
              <h5 className="card-title text-white">{draft.heading}</h5>
              <span className="draft-id">{draft._id}</span>
              {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
              <a href={`/${String(draft._id)}`} className="btn btn-primary m-2">
                Open Draft
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
