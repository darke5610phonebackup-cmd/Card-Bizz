export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
                    Loading card...
                </p>
            </div>
        </div>
    );
}
