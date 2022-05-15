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

function useBoolState(): BoolStateType

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

    const returnObject: BoolStateType = useMemo(
        () => [
            value,
            {
                set: setValue,
                t: setTrue,
                f: setFalse,
                toggle, 
            }
        ],
        [value, setTrue, setFalse, toggle]
    )

    return returnObject
}

export default useBoolState