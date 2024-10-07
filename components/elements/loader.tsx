import { Loader2 } from 'lucide-react';
import React from 'react';

const Loader = () => {
    return (
        <div className="h-32  w-full flex items-center justify-center">
            <Loader2 size={32} className='animate-spin duration-300' />
        </div>
    );
};

export default Loader;