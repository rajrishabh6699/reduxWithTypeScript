import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { actionCreators } from '../state';
// import { useSelector } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';

import { useActions } from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  // const dispatch = useDispatch()
  const { searchRepositories } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // dispatch(actionCreators.searchRepositories(term));
    searchRepositories(term);
  };

  const { data, error, loading } = useTypedSelector(
    state => state.repositories
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={handleChange} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && data.map(name => <div key={name}>{name}</div>)}
    </div>
  );
};

export default RepositoriesList;
