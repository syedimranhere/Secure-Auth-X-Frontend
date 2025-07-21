import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-6">404 - Not Found</h1>
      <button
        onClick={() => navigate('/')}
        className="bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-blue-800 "
      >
        Go Home
      </button>
    </div>
  );
}
