import React from 'react';

import { getEpisode } from 'rickmortyapi';

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any

type RawEpisodeRes = AsyncReturnType<typeof getEpisode>;
type RawEpisodeInfo = RawEpisodeRes[keyof Pick<RawEpisodeRes, 'data'>];

type ArrayElement<ArrayType extends readonly unknown[] | unknown > = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
type RawEpisode = ArrayElement<RawEpisodeInfo>;

interface Props {
    item?: RawEpisode
};

const EpisodeItem: React.FC<Props> = ({
    item,
}) => {
    // TODO: if item is undefined, render a loader

    if (!item) {
        return <>I am fetching :( no batch control supported! </>
    }
    
    return (
        <tr>
            <td className='border border-slate-300'>{item?.name ?? ''}</td>
            <td className='border border-slate-300'>{item?.air_date ?? ''}</td>
            <td className='border border-slate-300'>{item?.episode ?? ''}</td>
            <td className='border border-slate-300'>{item?.created ?? ''}</td>
        </tr>
    );
};

export default EpisodeItem;