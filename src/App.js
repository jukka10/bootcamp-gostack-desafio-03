import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  async function loadRepos() {
    try {
      const { data } = await api.get("/repositories");

      if (!data) {
        alert("Ero ao carregar Reposirotios");
      }

      setRepos(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    loadRepos();
  }, []);

  async function handleAddRepository() {
    try {
      const { data } = await api.post("/repositories", {
        url: "https://github.com/Rocketseat/umbriel",
        title: "Saturn",
        techs: ["React-Native", "Expo", "TypeScript"],
      });

      if (!data) {
        alert("Ero ao adicionar Reposirotios");
      }

      setRepos([...repos, data]);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`/repositories/${id}`);

      if (!response) {
        alert("Ero ao adicionar Reposirotios");
        return;
      }
      const Repositories = repos.filter((Repo) => Repo.id !== id);
      setRepos(Repositories);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
