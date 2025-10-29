import { useState, useEffect } from "react";

export default function PostForm({ initialData = {}, onSubmit, submitLabel = "Submit" }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [body, setBody] = useState(initialData.body || "");
  const [errors, setErrors] = useState({});

  // Reset form when initialData changes (useful for editing different posts)
  useEffect(() => {
    setTitle(initialData.title || "");
    setBody(initialData.body || "");
    setErrors({});
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!body.trim() || body.length < 10)
      newErrors.body = "Content must be at least 10 characters";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...initialData,
      title: title.trim(),
      body: body.trim(),
    });

    // Clear form after submission if creating
    if (!initialData.id) {
      setTitle("");
      setBody("");
      setErrors({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-4 p-4 border rounded shadow-sm bg-white"
    >
      <div className="mb-4">
        <label className="block font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors((prev) => ({ ...prev, title: "" }));
          }}
          className="w-full border p-2 rounded focus:border-purple-500 outline-none transition"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Content</label>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            setErrors((prev) => ({ ...prev, body: "" }));
          }}
          className="w-full border p-2 rounded focus:border-purple-500 outline-none transition"
          rows={5}
        />
        {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded font-bold text-white
                   bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
                   hover:scale-105 hover:shadow-lg transition transform duration-200"
      >
        {submitLabel}
      </button>
    </form>
  );
}