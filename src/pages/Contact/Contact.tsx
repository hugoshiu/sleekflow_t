import React from 'react';
import { useNavigate } from "react-router-dom";

import { useLockedBody } from 'usehooks-ts'

import { ContactPreview } from 'components/ContactPreview';
import ContactDetails from 'components/ContactDetails';

import { RawCharacters } from 'features/characters/characterSlice'

import { useAppSelector, useAppDispatch } from 'app/hooks'
import { fetchCharactersAsync, selectCharacterPreview, selectStatus, selectCurrentCharacter, setCurrentIndex, filterCharacterPreview } from 'features/characters/characterSlice';

type ArrayElement<ArrayType extends readonly unknown[] | undefined > = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
type TypeRawCharacterPreview = Pick<ArrayElement<RawCharacters>, 'id' | 'image' | 'name' | 'species'>;

interface Props {};

const Contact: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const status = useAppSelector(selectStatus);
    const currentCharacter = useAppSelector(selectCurrentCharacter);
    const contactPreviews = useAppSelector(selectCharacterPreview);

    const [searchKeyword, setSearchKeyword] = React.useState<string>('');

    React.useEffect(() => {
        dispatch(fetchCharactersAsync());
    }, [])

    const handleOnClick = React.useCallback((each: TypeRawCharacterPreview, index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setCurrentIndex(index))
        navigate(`/contact/${each.id}`)
    } , [])

    const handeOnChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.currentTarget.value)
    }, [])

    useLockedBody()
    
    return (
        <div className='flex lg:mx-[112px] xl:mx-[120px] mx-8 py-10'>
            <div className='flex flex-col flex-1 items-start'>
                <a href='/contact'><h1 className='font-mono font-semibold text-slate-700'>Contact (I am clickable href!)</h1></a>
                <input
                    value={searchKeyword}
                    className='px-3 py-2 border my-2'
                    placeholder='filter'
                    onChange={handeOnChange}
                />
                <ContactPreview 
                    items={contactPreviews?.filter(each => each.name.toLowerCase().includes(searchKeyword.toLowerCase()))}
                    isLoading={status === 'loading'}
                    handleOnClick={handleOnClick}
                />
            </div>
            <div className='flex flex-col flex-1 items-start ml-8 max-h-screen overflow-y-auto'>
                <h1 className='font-mono font-semibold text-slate-700'>Info</h1>
                <ContactDetails item={currentCharacter}/>
            </div>
        </div>
    );
};

export default Contact;