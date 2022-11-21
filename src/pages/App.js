import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { Container } from './styles'
import Button from '../components/Button';
import { useState } from 'react';
import {api} from '../services/api'
function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([])

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    const doesExist = repos.find(repo => repo.id == data.id)
    if (!doesExist) {
      setRepos(prev => [...prev, data]);
      setCurrentRepo('')
      return 
    }

    alert('Repositorio não encontrado')
  }

  const handleRemoveRepo = (id) => {
    const remove = repos.filter((repo) => repo.id !== id);
    setRepos(remove);

  }
  return (<>


    <Container>
      <img src={gitLogo} width={72} height={72} alt="logo"></img>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
      
    </Container>
    </>);
}

export default App;
