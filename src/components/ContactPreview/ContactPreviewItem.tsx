import React from 'react';

interface Props {
    image: string;
    name: string;
    species: string;
};

const ContactPreviewItem: React.FC<Props> = ({
    image,
    name,
    species
}) => {
    return (
        <div className='flex w-full space-x-4 border-b py-5'>
            <img className='h-20 w-20 rounded-full' src={image} alt='' />
            <div className='flex flex-col items-start justify-center'>
                <div className='font-mono truncate'>{name}</div>
                <div className='font-mono truncate text-sm'>{species}</div>
            </div>
        </div>
    );
};

export default ContactPreviewItem;