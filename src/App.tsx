import { useState } from 'react';
import ReposList from './components/repos-list';
import RepoDetails from './components/repo-details';
import { PAGES } from './constants/pages';

import './App.css';

function App() {
  const [page, setPage] = useState(PAGES.REPOS);
  const [repoName, setRepoName] = useState('');

  return (
    <div className="App">
      {page === PAGES.REPOS ? <ReposList updatePage={setPage} updateRepoName={setRepoName} /> : null}
      {page === PAGES.REPODETAILS ? <RepoDetails repoName={repoName} /> : null}
    </div>
  );
}

export default App;
