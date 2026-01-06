import React from 'react';

function Activities() {
  const [activities, setActivities] = React.useState([]);
  React.useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title mb-4">Activities</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    <td>{activity.date || 'N/A'}</td>
                    <td>{activity.type || 'N/A'}</td>
                    <td>{activity.duration || 'N/A'}</td>
                    <td>{activity.calories || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-primary mt-3">Add Activity</button>
        </div>
      </div>
    );
}
export default Activities;
