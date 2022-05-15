import React, { useCallback, useMemo, useState } from 'react'

type BoolStateType = [
    boolean,
    {
        set: React.Dispatch<React.SetStateAction<boolean>>,
        toggle: () => void,
        t: () => void,
        f: () => void,
    }
]

function useBoolState(initState?: boolean | (() => boolean)): BoolStateType {
    const [value, setValue] = useState<boolean>(initState ?? false)

    const setTrue = useCallback(
        () => setValue(true),
        []
    )

    const setFalse = useCallback(
        () => setValue(false),
        []
    )

    const toggle = useCallback(
        () => setValue(v => !v),
        []
    )

    const actions = useMemo(
        () => ({
            set: setValue,
            t: setTrue,
            f: setFalse,
            toggle, 
        }),
        []
    )

    const returnObject: BoolStateType = useMemo(
        () => [
            value,
            actions,
        ],
        [value]
    )

    return returnObject
}

export default useBoolState