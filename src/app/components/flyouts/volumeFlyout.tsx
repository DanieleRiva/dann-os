import React from 'react'
import Flyout from '../flyout'
import { useFlyoutStore } from '@/store/useFlyoutStore';

type Props = {}

const VolumeFlyout = (props: Props) => {
    const { activeFlyout } = useFlyoutStore();

    return (
        <Flyout
            id="volume"
            isOpen={activeFlyout === "volume"}
            width="250px"
            height="75px"
            centerHorizontally
            position={{ bottom: 32 }}
            className="rounded-xl bg-blur-effect"
        >
            <div>Volume</div>
        </Flyout>
    )
}

export default VolumeFlyout