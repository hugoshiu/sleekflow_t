import React from 'react';
import clsx from 'clsx';

import { RawCharacters } from 'features/characters/characterSlice'
import { getEpisode } from 'rickmortyapi';

import EpisodeItem from 'components/ContactDetails/EpisodeItem'

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any

type RawEpisodeRes = AsyncReturnType<typeof getEpisode>;
type RawEpisodeInfo = RawEpisodeRes[keyof Pick<RawEpisodeRes, 'data'>];

type ArrayElement<ArrayType extends readonly unknown[] | unknown > = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
type RawEpisode = ArrayElement<RawEpisodeInfo>;

interface Props {
    episodes: Array<string>
};

const Episodes: React.FC<Props> = ({
    episodes,
}) => {
    const [details, setDetails] = React.useState<Array<RawEpisode>>(Array(episodes.length).fill(undefined));

    React.useEffect(() => {
        (async() => {
            let consolidatedDetails = [];
            for (const each of episodes) {
                // get id from url and fire request
                let id = each.substring(each.lastIndexOf('/') + 1);
                const parsedId = Number.parseInt(id);
                let res = await getEpisode(parsedId);
                consolidatedDetails.push(res.data ?? undefined);
            }
            setDetails(consolidatedDetails)
        })()
    }, [episodes])

    return (
        <div className=''>
            <table className="table-auto mx-4 border border-slate-400 border-separate border-spacing-2 ">
                <thead>
                    <tr>
                        <th className='border border-slate-300'>Name</th>
                        <th className='border border-slate-300'>Air Date</th>
                        <th className='border border-slate-300'>Episode</th>
                        <th className='border border-slate-300'>Created Date</th>
                    </tr>
                </thead>
            <tbody>
            {
                details.map((each) => (<EpisodeItem key={each.id} item={each}/>))
            }
            </tbody>
            </table>
        </div>
    );
};

export default Episodes;
