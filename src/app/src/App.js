import React, { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";
import { buttonSpinnerStyle } from "./components/Loader/loaderStyles";

import { getTodos, createTodo } from "./services/api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTodos();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please enter a todo description");
      return;
    }

    const payload = { title: trimmed };

    setSubmitting(true);
    try {
      await createTodo(payload);
      setText("");
      await fetchTodos();
    } catch (err) {
      setError(err?.message || "Failed to create todo");
    } finally {
      setSubmitting(false);
    }
  };

  const anyLoading = loading || submitting;

  return (
    <div className="app-root">
      {/* GLOBAL LOADER */}
      {anyLoading && <Loader text={submitting ? "Adding todo…" : "Loading…"} />}

      <header className="app-header">
        <div className="brand">
          <div className="logo-mark">✓</div>
          <div>
            <h1>My Todos</h1>
            <p className="subtitle">Simple, fast, delightful</p>
          </div>
        </div>
      </header>

      <main className="container">
        <aside className="panel panel-left">
          <h2>Create a TODO</h2>

          <form className="todo-form" onSubmit={handleSubmit}>
            <label className="field-label" htmlFor="todoInput">
              Todo Title
            </label>

            <input
              id="todoInput"
              className="input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a task..."
              disabled={submitting}
            />

            <div className="form-row">
              <button className="btn primary" type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <span style={buttonSpinnerStyle}></span> Adding…
                  </>
                ) : (
                  "Add Todo"
                )}
              </button>

              <button
                type="button"
                className="btn ghost"
                onClick={() => setText("")}
              >
                Clear
              </button>
            </div>

            {error && <div className="error">{error}</div>}
          </form>
        </aside>

        <section className="panel panel-right">
          <div className="list-header">
            <h2>List of TODOs</h2>
            <div className="small-meta">
              {loading ? "Loading…" : `${todos.length} items`}
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading todos…</div>
          ) : todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-emoji">🗒️</div>
              <div>No todos yet — add your first one!</div>
            </div>
          ) : (
            <ul className="todo-list">
              {todos.map((t) => (
                <li key={t.id || t._id} className="todo-card">
                  <div className="todo-main">
                    <div className="todo-title">{t.title}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="footer">
        <small>Built with ❤️ — React + Django + MongoDB</small>
      </footer>
    </div>
  );
}
