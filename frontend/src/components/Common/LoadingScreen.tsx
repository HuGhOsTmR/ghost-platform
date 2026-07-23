const LoadingScreen = () => {

    return (

        <div className="flex min-h-[400px] items-center justify-center">

            <div className="text-center">

                <div
                    className="
                        mx-auto
                        mb-4
                        h-10
                        w-10
                        animate-spin
                        rounded-full
                        border-4
                        border-blue-600
                        border-t-transparent
                    "
                />

                <p className="text-gray-500">

                    Cargando...

                </p>

            </div>

        </div>

    );

};

export default LoadingScreen;