import React from 'react';

import { ContactPreview } from 'components/ContactPreview';
import ContactDetails from 'components/ContactDetails';

import { useAppSelector, useAppDispatch } from 'app/hooks'
import { fetchCharactersAsync, selectCharacterPreview, selectStatus, selectCurrentCharacter } from 'features/characters/characterSlice';

interface Props {};

const Contact: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const currentCharacter = useAppSelector(selectCurrentCharacter);
    const contactPreviews = useAppSelector(selectCharacterPreview);

    React.useEffect(() => {
        dispatch(fetchCharactersAsync());
    }, [])
    
    return (
        <div className='flex lg:mx-[112px] xl:mx-[120px] mx-8 py-10'>
            <div className='flex flex-col flex-1 items-start'>
                <h1 className='font-mono font-semibold text-slate-700'>Contact</h1>
                <ContactPreview items={contactPreviews} isLoading={status === 'loading'}/>
            </div>
            <div className='flex flex-col flex-1 items-start ml-8'>
                <h1 className='font-mono font-semibold text-slate-700'>Info</h1>
                <ContactDetails item={currentCharacter}/>
            </div>
        </div>
    );
};

export default Contact;