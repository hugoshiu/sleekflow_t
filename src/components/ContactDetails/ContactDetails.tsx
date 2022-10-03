import React from 'react';
import clsx from 'clsx';

import { RawCharacters } from 'features/characters/characterSlice'

import Episodes from 'components/ContactDetails/Episodes'

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
                <div className='mt-6'>
                    <h3 className='flex self-start font-mono font-semibold text-slate-700 mb-2 px-4'>Personal Info</h3>
                    <div className='flex flex-col items-start leading-loose border rounded-lg mx-4 px-4 py-8'>
                        <div className='font-mono'>STATUS: <span>{item?.status}</span></div>
                        <div className='font-mono'>GENDER: <span>{item?.gender}</span></div>
                        <div className='font-mono'>SPECIES: <span>{item?.species}</span></div>
                        <div className='font-mono'>LOCATION: <span>{item?.location.name}</span></div>
                        <div className='font-mono'>ORIGIN: <span>{item?.origin.name}</span></div>
                        <div className='font-mono'>CREATED: <span>{item?.created}</span></div>
                    </div>
                </div>
                <div className='mt-6'>
                    <h3 className='flex self-start font-mono font-semibold text-slate-700 mb-2 px-4'>Episodes</h3>
                    <Episodes episodes={item?.episode ?? []}/>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;