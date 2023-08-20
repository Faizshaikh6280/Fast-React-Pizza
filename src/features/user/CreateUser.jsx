import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from '../user/userSlice';
import { useNavigate } from 'react-router';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-2 text-sm sm:text-xl">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-5  w-80"
      />

      {username !== '' && (
        <div>
          <Button onClick={handleSubmit} to="/menu" type="primary">
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
