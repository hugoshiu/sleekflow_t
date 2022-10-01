import charactersReducer, {
    CharacterState,
    setCurrentIndex,
} from './characterSlice';

describe('character reducer', () => {
    const initialState: CharacterState = {
        data: [],
        currentIndex: 0,
        status: 'idle',
    };

    it('should handle initial state', () => {
        expect(charactersReducer(undefined, { type: 'unknown' })).toEqual({
            data: [],
            currentIndex: 0,
            status: 'idle',
        });
    });

    it('should handle setCurrentIndex', () => {
        const actual = charactersReducer(initialState, setCurrentIndex(10));
        expect(actual.currentIndex).toEqual(10);
    });
});
