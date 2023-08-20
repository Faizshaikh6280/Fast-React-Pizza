import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
function Home() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="my-8 text-center text-xl font-semibold sm:my-16">
      <h1 className="mb-3 text-center font-semibold sm:m-6 sm:text-4xl">
        The best pizza.
        <br />
        <span className="text-yellow-400 ">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continuing {userName}..
        </Button>
      )}
    </div>
  );
}

export default Home;
