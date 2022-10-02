import React from 'react';
import clsx from 'clsx';

import { RawCharacters } from 'features/characters/characterSlice'
import { ContactPreviewItem } from 'components/ContactPreview';

type ArrayElement<ArrayType extends readonly unknown[] | undefined > = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
type RawCharacter = ArrayElement<RawCharacters>;

interface Props {
    item?: RawCharacter
};

const ContactDetails: React.FC<Props> = ({
    item,
}) => {
    
    return (
        <div className='sticky bg-gray-50 h-screen rounded-lg drop-shadow-md mt-4 w-full'>
            <div className={clsx(!item && 'hidden')}>
                <div className='flex items-center space-x-2 py-8 px-4 border-b'>
                    <img className='h-20 w-20 rounded-full' src={item?.image} alt='' />
                    <h2 className='font-mono'>{item?.name}</h2>
                </div>
                <div>
                    <h3>Personal Info</h3>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;