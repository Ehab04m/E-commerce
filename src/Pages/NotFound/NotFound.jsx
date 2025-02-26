import { Link } from "react-router-dom";
import error from "../../assets/notFound.svg"


export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-teal-50">
      <div className="text-center">
        <img
          src={error} // Update this path to your image
          alt="Not Found"
          className="mx-auto w-48 h-48 mb-8 text-purple-600"
        />
       
        <p className="text-xl text-teal-800 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to={"/"}
          className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
