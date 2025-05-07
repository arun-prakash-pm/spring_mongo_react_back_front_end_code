import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
  useReducer
} from 'react';

const AuthContext = React.createContext({ role: 'admin' });
const initialFilterState = {
  search: '',
  sortBy: 'name_asc'
};

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'TOGGLE_SORT':
      return {
        ...state,
        sortBy: state.sortBy === 'name_asc' ? 'name_desc' : 'name_asc'
      };
    default:
      return state;
  }
}

const DepartmentListPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { role } = useContext(AuthContext); 

  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);
 const token=localStorage.getItem('token');
  useEffect(() => {
    fetch('http://localhost:8080/api/department/getAllDepartment', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch departments');
        return res.json();
      })
      .then((data) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredDepartments = useMemo(() => {
    let result = departments.filter((dept) =>
      dept.departmentName.toLowerCase().includes(filterState.search.toLowerCase())
    );

    if (filterState.sortBy === 'name_asc') {
      result.sort((a, b) => a.departmentName.localeCompare(b.departmentName));
    } else {
      result.sort((a, b) => b.departmentName.localeCompare(a.departmentName));
    }

    return result;
  }, [departments, filterState]);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      
      setDepartments((prev) => prev.filter((dept) => dept.id !== id));
    }
  }, []);

  const handleEdit = useCallback((dept) => {
    console.log('Editing department:', dept);
  }, []);

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const handleSortToggle = () => {
    dispatch({ type: 'TOGGLE_SORT' });
  };

  if (loading) return <p>Loading departments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Department List</h2>
      <input
        type="text"
        placeholder="Search by department name"
        value={filterState.search}
        onChange={handleSearchChange}
      />
      <button onClick={handleSortToggle}>
        Sort: {filterState.sortBy === 'name_asc' ? 'A-Z' : 'Z-A'}
      </button>

      <table border="1" cellPadding="10" style={{ marginTop: '10px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Location</th>
            <th>Manager</th>
            {role === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.departmentName}</td>
              <td>{dept.location}</td>
              <td>{dept.managerName}</td>
              {role === 'admin' && (
                <td>
                  <button onClick={() => handleEdit(dept)}>Edit</button>
                  <button onClick={() => handleDelete(dept.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentListPage;
