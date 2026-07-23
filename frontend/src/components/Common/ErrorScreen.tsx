interface ErrorScreenProps {

    title: string;

    message: string;

}

const ErrorScreen = ({
    title,
    message,
}: ErrorScreenProps) => {

    return (

        <div className="flex min-h-[400px] items-center justify-center">

            <div
                className="
                    max-w-lg
                    rounded-xl
                    border
                    border-red-200
                    bg-white
                    p-8
                    text-center
                    shadow-sm
                "
            >

                <h2
                    className="
                        text-xl
                        font-bold
                        text-red-600
                    "
                >

                    {title}

                </h2>

                <p
                    className="
                        mt-3
                        text-gray-600
                    "
                >

                    {message}

                </p>

            </div>

        </div>

    );

};

export default ErrorScreen;