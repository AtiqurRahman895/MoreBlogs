import { Link, useRouteError } from 'react-router-dom';
import notFound from '../../assets/notFound.svg';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    const { error, status, statusText } = useRouteError();
    // console.log(error);

    return (
        <>
            <Helmet>
                <title>{statusText || "Error"} | MORE BLOGS</title>
            </Helmet>

            <div className="h-lvh place-items-center grid gap-3 content-center bg-white">
                {status === 404 ? (
                  <>
                    <img
                        src={notFound}
                        alt={`Error ${status}: ${statusText}`}
                        className="w-[200px]"
                    />
                    <h3 className="text-custom-primary text-center">
                        404 Page Not Found
                    </h3>
                  </>
                ) : (
                    <>
                        <h1 className="font-extrabold text-9xl text-custom-primary">!</h1>
                        <h3 className="text-custom-primary text-center">
                            {error?.message || `${status}, ${statusText}`}
                        </h3>
                    </>
                )}

                <Link
                    to={-1}
                    className="btn rounded-none bg-custom-primary hover:bg-custom-half-primary border-none font-bold text-white hover:text-custom-primary"
                >
                    Go Back
                </Link>
            </div>
        </>
    );
};

export default ErrorPage;
