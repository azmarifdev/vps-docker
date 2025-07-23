import { FC } from 'react';

const Logo: FC = () => {
    return (
        <div className="flex items-center space-x-2">
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500">
                Pick
            </span>
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                One
            </span>
        </div>
    );
};

export default Logo;
