import React, {useState, useEffect} from "react";
import api from './services/api.js';
import "./styles.css";

function App() {

  const [repositories,setRepositories] = useState([]);
      useEffect(() =>{
        api.get('repositories').then(response => {
          setRepositories(response.data);
          console.log(response);
        });
      }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo projeto ${Date.now()}`,
      url: "http://github.com/mendaccium123",
      techs: [
        "Node12312321312",
        "Teste",
        "JS"
      ],
    });
    const repository = response.data;
    setRepositories([...repositories,repository]);

  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repositories => repositories.id === id);
    repositories.splice(repositoryIndex,1);
    setRepositories([...repositories]);
     api.delete(`repositories/${id}`);
   
      
      
      
    
    
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => 
        <li key={repository.id}> {repository.title} 
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
