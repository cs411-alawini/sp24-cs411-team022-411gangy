import React from 'react';
import SignUp from './pages/SignUp';
// import LogIn from './pages/LogIn';
// import Match from './pages/Match';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [genderPref, setGenderPref] = useState('');

  const submitFunc = async (e) => {
    e.preventDefault();
    try {
      //for some reason it needs the whole string...
      const response = await axios.post('http://localhost:3001/api/user_profile', {
        "name": name,
        "email": email,
        "gender": gender,
        "genderPref": genderPref
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
    useEffect(() => {
      fetch("http://localhost:3001/api").then(
        response => response.json()).then(
          data => {
          setName(data.data);
        }
      )
    } , []);
  return (
    < >
      <SignUp />
      {/* <h1>welcome {name}</h1>
      <form onSubmit={submitFunc}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">All</option>
        </select>

        <label htmlFor="genderPref">Gender Preference:</label>
        <select
          id="genderPref"
          name="genderPref"
          value={genderPref}
          onChange={(e) => setGenderPref(e.target.value)}
          required
        >
          <option value="">Select Gender Preference for your Partner</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">All</option>
        </select>

        <button type="submit">Add Profile</button>
      </form> */}
    </ >
  );
}

export default App;