import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@app/store';
import { getCharacter } from 'rickmortyapi';

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any

type RawCharacterRes = AsyncReturnType<typeof getCharacter>;
type RawCharacter = RawCharacterRes[keyof Pick<RawCharacterRes, 'data'>];

export interface CharacterState {
    data: RawCharacter;
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
        const response = await getCharacter(page);
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
                state.data = action.payload;
            })
            .addCase(fetchCharactersAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { setCurrentIndex } = characterSlice.actions;

export const selectCharacterPreview = (state: RootState) => {
    let data = state.characters.data;
    if (Array.isArray(data)) {
        return data?.map((each) => ({
            'image': each.image,
            'name': each.name,
            'species': each.species,
        }))
    } else {
        return [
            {
            'image': data.image,
            'name': data.name,
            }
        ]
    }
}

export default characterSlice.reducer;
