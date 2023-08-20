import { Link } from 'react-router-dom';

function Button({ onClick, disabled, children, to, type }) {
  const base =
    'inline-block rounded-full bg-yellow-400  uppercase tracking-wide text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus-visible:ring focus-visible:ring-yellow-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed ';
  const styleType = {
    primary: base + 'mt-4 px-4 py-3 md:px-5 sm:py-4',
    round: base + 'px-3 py-2 md:px-4 md:py-2',
    small: base + 'px-4 py-2 md:px-5 md:py-2.5',
    secondary:
      'inline-block rounded-full border border-stone-200 uppercase tracking-wide text-stone-800 hover:bg-stone-300 focus:bg-stone-100 focus:outline-none focus-visible:ring focus-visible:ring-stone-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed px-3 py-2 md:px-6 md:py-2.5 ml-2 transition ',
  };
  if (to) {
    if (onClick) {
      return (
        <Link onClick={onClick} className={styleType[type]} to={to}>
          {' '}
          {children}
        </Link>
      );
    }
    return (
      <Link className={styleType[type]} to={to}>
        {' '}
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styleType[type]}`}
      >
        {children}
      </button>
    );
  }
  return (
    <button disabled={disabled} className={`${styleType[type]}`}>
      {children}
    </button>
  );
}

export default Button;
