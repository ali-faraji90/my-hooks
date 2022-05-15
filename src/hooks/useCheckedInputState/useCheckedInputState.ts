import React, { useCallback, useMemo, useState } from 'react'
import useBoolState from '../useBoolState';

type CheckedInputStateType = [
    boolean,
    {
        checked: boolean;
        onChange: React.ChangeEventHandler<HTMLInputElement>;
    },
    {
        set: React.Dispatch<React.SetStateAction<boolean>>,
        toggle: () => void,
        t: () => void,
        f: () => void,
    }
]

function useCheckedInputState(initChecked?: boolean | (() => boolean), onAfterChange?: React.ChangeEventHandler<HTMLInputElement>): CheckedInputStateType {
    const [checked, actions] = useBoolState(initChecked ?? false)

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (e) => {
            actions.set(e.target.checked)
            onAfterChange?.(e)
        },
        [onAfterChange, actions]
    )

    const props = useMemo(
        () => ({
            checked,
            onChange: handleChange,
        }),
        [checked, handleChange]
    )

    const returnObject: CheckedInputStateType = useMemo(
        () => [
            checked,
            props,
            actions,
        ],
        [checked, props, actions]
    )

    return returnObject
}

export default useCheckedInputState