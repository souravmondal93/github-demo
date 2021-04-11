import React, { FunctionComponent, MouseEvent, SyntheticEvent } from 'react';
import InputForm from './input-form';
import { useFetch } from '../hooks/fetch';
import { PAGES } from '../constants/pages';
import PropTypes from 'prop-types';

interface RepoDetails {
  id: string,
  url: string,
  full_name: string,
  name: string
}

interface FormDetails {
  username: string
}

interface RepoListProps {
  updatePage: (arg0: string) => void,
  updateRepoName: (arg0: string) => void,
}

const ReposList: FunctionComponent<RepoListProps> = ({ updatePage, updateRepoName }) => {
  const [{data: reposData, isLoading: isReposQueryLoading, isError: isReposQueryError}, setRepoUrl] = useFetch({
    endpoint: '',
    defaultResult: []
  });

  const submitForm = (event: SyntheticEvent, form: FormDetails) => {
    event.preventDefault();
    const endpoint = `users/${form.username}/repos`;
    setRepoUrl(endpoint);
  }

  const showRepoDetails = (event: MouseEvent, repoName: string) => {
    event.preventDefault();
    updatePage(PAGES.REPODETAILS);
    updateRepoName(repoName);
  }

  return(<div>
    <InputForm submitHandler={submitForm} />

{isReposQueryError && <div>Something went wrong ...</div>}

{isReposQueryLoading ? (
  <div>Loading ...</div>
) : (
  <ul>
    {reposData.map((repoDetails: RepoDetails) => (
      <li key={repoDetails.id}>
        <a href={repoDetails.url} onClick={(event) => showRepoDetails(event, repoDetails.full_name)}>{repoDetails.name}</a>
      </li>
    ))}
  </ul>
)}
  </div>)
};

ReposList.propTypes = {
  updatePage: PropTypes.func.isRequired,
  updateRepoName: PropTypes.func.isRequired
};

export default ReposList;
