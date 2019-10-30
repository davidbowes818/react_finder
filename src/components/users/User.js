import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = ({ user, loading, getUser, getUserRepos, repos, match }) => {
  useEffect(() => {
    getUser(match.params.login);

    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable:{'  '}
      {user.hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={user.avatar_url}
            alt="avatar"
            className="round-img"
            style={{ width: '150px' }}
          />
          <h1>{user.name}</h1>
          <p>Location: {user.location}</p>
        </div>
        <div>
          {user.bio && (
            <Fragment>
              <h3 className="py-1">Bio</h3>
              <p>{user.bio}</p>
            </Fragment>
          )}
          <a className="btn btn-dark my-1" href={user.html_url}>
            Visit GitHub
          </a>
          <ul>
            <li>
              {user.login && (
                <Fragment>
                  <strong>Username: </strong> {user.login}
                </Fragment>
              )}
            </li>
            <li>
              {user.company && (
                <Fragment>
                  <strong>Company: </strong> {user.company}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {user.followers}</div>
        <div className="badge badge-success">Following: {user.following}</div>
        <div className="badge badge-light">
          Public Repos: {user.public_repos}
        </div>
        <div className="badge badge-dark">
          Public Gists: {user.public_gists}
        </div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

User.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  repos: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired
};

export default User;
