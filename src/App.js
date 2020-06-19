import React, { useState, useEffect } from "react"

import api from "services/api"

import "./styles.css"

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories')
      .then(resp => setRepositories(resp.data))
  }, [])

  async function handleAddRepository() {
    const resp = await api.post('/repositories', {
      title: `Repo create at ${Date.now()}`,
      url: `https://github.com/testuser`,
      techs: ["React", "Node.js"],
      likes: 0
    })

    setRepositories([
      ...repositories,
      resp.data
    ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const newRepositoriesList = repositories.filter(repo => repo.id !== id)

    setRepositories(newRepositoriesList)
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repo =>
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
