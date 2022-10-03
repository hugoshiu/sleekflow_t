import _ from 'lodash';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from 'app/store'
import { getCharacters } from 'rickmortyapi';

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any

type RawCharacterRes = AsyncReturnType<typeof getCharacters>;
type RawCharacterInfo = RawCharacterRes[keyof Pick<RawCharacterRes, 'data'>];
export type RawCharacters = RawCharacterInfo[keyof Pick<RawCharacterInfo, 'results'>];

export interface CharacterState {
    data: RawCharacters;
    currentIndex: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CharacterState = {
    data: [],
    currentIndex: 0,
    status: 'idle',
};

export const fetchCharactersAsync = createAsyncThunk(
    'characters/fetchCharacters',
    async (page: number = 0) => {
        const response = await getCharacters({ page: page }); // TODO: handle failure
        return response.data;
    }
);

export const characterSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setCurrentIndex: (state, action: PayloadAction<number>) => {
            state.currentIndex = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharactersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharactersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.results) {
                    state.data?.push(...action.payload.results);
                }
            })
            .addCase(fetchCharactersAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { setCurrentIndex } = characterSlice.actions;

export const selectCurrentCharacter = (state: RootState) => {
    let characters = state.characters.data;
    if (!characters) {
        return undefined;
    }
    return characters[state.characters.currentIndex]
};

export const selectStatus = (state: RootState) => state.characters.status;

export const selectCharacterPreview = (state: RootState) => {
    return state.characters.data?.map((each) => ({
        'id': each.id,
        'image': each.image,
        'name': each.name,
        'species': each.species,
    }))
}

export const filterCharacterPreview = (keyword: string, state: RootState) => {
    return state.characters.data?.map((each) => ({
        'id': each.id,
        'image': each.image,
        'name': each.name,
        'species': each.species,
    })).filter(each => each.name.includes(keyword))
}

export default characterSlice.reducer;
