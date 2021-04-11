import { FunctionComponent, useEffect } from 'react';
import { useFetch } from '../hooks/fetch';
import { FILE_TYPE, README_FILENAME } from '../constants/pages';
import PropTypes from 'prop-types';

interface RepoDetailsProps {
  repoName: string
};

interface FileType {
  type: string,
  path: string,
  sha: string
}

const RepoDetails: FunctionComponent<RepoDetailsProps> = ({ repoName }: { repoName: string }) => {
  const [{data: repoDetails, isLoading: isRepoDetailsLoading, isError: isRepoDetailsError}] = useFetch({
    endpoint: `repos/${repoName}/commits/master`,
    defaultResult: {}
  });
  const [{data: files, isLoading: isFilesListLoading, isError: isFilesListError}, setRepoFilesUrl] = useFetch({
    endpoint: '',
    defaultResult: {}
  });
  const [{data: readmeContent, isLoading: isReadmeContentLoading, isError: isReadmeContentError}, setReadMeUrl] = useFetch({
    endpoint: '',
    defaultResult: {}
  });

  useEffect(() => {
    if (repoDetails.sha) {
      setRepoFilesUrl(`repos/${repoName}/git/trees/${repoDetails.sha}`);
    }
  }, [repoDetails]);

  useEffect(() => {
    if (files.tree && files.tree.length) {
      const readMeFile = files.tree.find((file: FileType) => file.type === FILE_TYPE.BLOB && file.path === README_FILENAME);
    
      if (readMeFile) {
        setReadMeUrl(readMeFile.url);
      }
    };
  }, [files])

  return(
  <div>
    {(isRepoDetailsError || isFilesListError || isReadmeContentError) && <div>Something went wrong ...</div>}

    {(isRepoDetailsLoading || isFilesListLoading || isReadmeContentLoading) ? (
      <div>Loading ...</div>
    ) : (
      <section>
        <h3>Files/Folders</h3>
        <ul>
          {files.tree && files.tree.map((file: FileType) => (
            <li key={file.sha}>
              <span style={{background: file.type === FILE_TYPE.TREE ? 'lightblue' : 'white'}}>{file.path}</span>
            </li>
          ))}
        </ul>
        <h3>Readme File Content</h3>
        {readmeContent.content ? <pre>{atob(readmeContent.content)}</pre> : null}
      </section>
    )}
  </div>);
};

RepoDetails.propTypes = {
  repoName: PropTypes.string.isRequired
};

export default RepoDetails;
