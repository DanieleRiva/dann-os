import React from 'react'
import Flyout from '../flyout'
import { useFlyoutStore } from '@/store/useFlyoutStore';

const CalendarMenu = () => {
    const { activeFlyout } = useFlyoutStore();

    return (
        <Flyout
            id="calendar"
            isOpen={activeFlyout === "calendar"}
            width="400px"
            height="550px"
            position={{ right: 0 }}
            className="rounded-tl-xl rounded-tr-xl bg-blur-effect"
        >
            <div>
                This is the DANNos calendar!
            </div>
        </Flyout>
    )
}

export default CalendarMenu