import React, { useCallback, useMemo, useState } from 'react'

export type BoolStateActions = {
    set: React.Dispatch<React.SetStateAction<boolean>>,
    toggle: () => void,
    on: () => void,
    off: () => void,
}

type BoolStateType = [
    boolean,
    BoolStateActions
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
            on: setTrue,
            off: setFalse,
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