import { useFlyoutStore } from '@/store/useFlyoutStore';
import React from 'react'
import Flyout from '../../components/flyout';

const StartMenu = () => {
    const { activeFlyout } = useFlyoutStore();

    return (
        <Flyout
            id="start"
            isOpen={activeFlyout === "start"}
            width="400px"
            height="550px"
            position={{ left: 0 }}
        >
            <div className="p-4">
                This is the DANNos Start Menu!
            </div>
        </Flyout>
    )
}

export default StartMenu