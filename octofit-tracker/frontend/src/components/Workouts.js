import React from 'react';

function Workouts() {
  const [workouts, setWorkouts] = React.useState([]);
  React.useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  <td>{workout.name || 'N/A'}</td>
                  <td>{workout.type || 'N/A'}</td>
                  <td>{workout.duration || 'N/A'}</td>
                  <td>{workout.calories || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-primary mt-3">Add Workout</button>
      </div>
    </div>
  );
}
export default Workouts;
