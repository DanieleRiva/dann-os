import { useFlyoutStore } from '@/store/useFlyoutStore';
import React from 'react'
import Flyout from '../flyout';

type Props = {}

const Notification = (props: Props) => {
    const { activeFlyout } = useFlyoutStore();

    return (
        <Flyout
            id="notification"
            isOpen={activeFlyout === "notification"}
            width="300px"
            height="150px"
            position={{ right: 8, bottom: 8 }}
            className="rounded-xl bg-blur-effect"
        >
            <div className='flex flex-col h-full justify-evenly'>
                <h1 className='text-xl font-blod shrink-0'>📬 Outlook</h1>
                <p className='text-sm line-clamp-3'>
                    Buongiorno, le scrivo per chiederle cosa è successo nella giornata di ieri Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus maiores repellat repellendus sed eum? Accusamus corrupti dignissimos neque, eius facere corporis quibusdam beatae unde sint.
                </p>
            </div>
        </Flyout>
    )
}

export default Notification