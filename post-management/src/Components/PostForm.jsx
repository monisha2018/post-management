import { useState, useEffect } from "react";

export default function PostForm({
  initialData = {},
  onSubmit,
  submitLabel = "Submit",
}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [body, setBody] = useState(initialData.body || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initialData.title || "");
    setBody(initialData.body || "");
    setErrors({});
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";

    if (!body.trim()) newErrors.body = "Content is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...initialData,
      title,
      body,
    });

    if (!initialData.id) {
      setTitle("");
      setBody("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        {errors.title && (
          <p style={{ color: "red", marginTop: "5px" }}>
            {errors.title}
          </p>
        )}
      </div>

      {/* Content */}
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          Content
        </label>

        <textarea
          rows="6"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
            boxSizing: "border-box",
            resize: "vertical",
          }}
        />

        {errors.body && (
          <p style={{ color: "red", marginTop: "5px" }}>
            {errors.body}
          </p>
        )}
      </div>

      <button
        type="submit"
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {submitLabel}
      </button>
    </form>
  );
}