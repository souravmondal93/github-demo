import InputForm from './components/input-form';
import { useFetch } from './hooks/fetch';
import './App.css';

function App() {
  const [{data: reposData, isLoading: isReposQueryLoading, isError: isReposQueryError}, setUrl] = useFetch({
    endpoint: '',
    defaultResult: []
  });

  const submitForm = (event: any, form: any) => {
    event.preventDefault();
    const endpoint = `users/${form.username}/repos`;
    setUrl(endpoint);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Github Demo</h2>
      </header>
      <InputForm submitHandler={submitForm} />

      {isReposQueryError && <div>Something went wrong ...</div>}

      {isReposQueryLoading ? (
        <div>Loading ...</div>
      ) : (
        // <pre>{JSON.stringify(reposData, null, 2)}</pre>
        <ul>
          {reposData.map((repoDetails: any) => (
            <li key={repoDetails.id}>
              <a href={repoDetails.url}>{repoDetails.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
