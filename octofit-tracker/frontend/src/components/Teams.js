import React from 'react';

function Teams() {
  const [teams, setTeams] = React.useState([]);
  React.useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Teams</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Members</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={team.id || idx}>
                  <td>{team.name || 'N/A'}</td>
                  <td>{team.members ? team.members.length : 'N/A'}</td>
                  <td>{team.points || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-success mt-3">Create Team</button>
      </div>
    </div>
  );
}
export default Teams;
