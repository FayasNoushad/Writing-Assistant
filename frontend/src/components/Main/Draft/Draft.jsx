import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Draft.css";
import draft from "../../../helpers/draft";
import ai from "../../../helpers/ai";
import { useParams } from "react-router-dom";

function Draft() {
  const { draftId } = useParams();
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);
  const [correctGrammarStatus, setCorrectGrammarStatus] = useState(false);
  const [improvisingStatus, setImprovisingStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await draft.get(draftId);
      setHeading(data.heading);
      setContent(data.content);
    };
    fetchData();
  }, [draftId]);

  const handleChange = (value) => {
    setContent(value);
  };

  const saveContent = async () => {
    if (!heading) {
      return alert("Heading is required!");
    }
    setSavingStatus(true);
    await draft.save(draftId, heading, content);
    setTimeout(() => {
      setSavingStatus(false);
    }, 100);
    setSavedStatus(true);
    setTimeout(() => {
      setSavedStatus(false);
    }, 1000);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"], // Formatting options
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["link"], //"image"], // Link and image
      ["clean"], // Clear formatting
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    // "image",
  ];

  return (
    <div className="draft">
      <input
        type="text"
        className="draft-heading"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        placeholder="Heading..."
      />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write something here..."
      />
      <div className="draft-buttons">
        <button
          type="button"
          className="btn btn-success m-1"
          onClick={saveContent}
        >
          {savingStatus ? "Saving" : savedStatus ? "Saved" : "Save"}
          {savingStatus && (
            <div
              className="spinner-border spinner-border-sm ms-2"
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          )}
        </button>
        <button
          type="button"
          className="btn btn-primary m-1"
          onClick={async () => {
            setImprovisingStatus(true);
            const improvisedContent = await ai.improviseText(content);
            setContent(improvisedContent);
            setImprovisingStatus(false);
          }}
        >
          Suggest Improvements
          {improvisingStatus && (
            <div
              className="spinner-border spinner-border-sm ms-2"
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          )}
        </button>
        <button
          type="button"
          className="btn btn-primary m-1"
          onClick={async () => {
            setCorrectGrammarStatus(true);
            const correctedContent = await ai.correctGrammar(content);
            setContent(correctedContent);
            setCorrectGrammarStatus(false);
          }}
        >
          Correct Grammars
          {correctGrammarStatus && (
            <div
              className="spinner-border spinner-border-sm ms-2"
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          )}
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default Draft;
