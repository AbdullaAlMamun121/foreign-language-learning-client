import { Link, useRouteError } from "react-router-dom";
import img from './src/assets/404.jpg';
export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div id="error-page" className="text-center mt-5">
            <img className="w-100 h-100" src={img} />
            <p>
                <i>{error.statusText || error.message}</i>
                <br />
                <Link to="/" className="btn btn-primary">Go Back to Home</Link>

            </p>
        </div>
    );
}