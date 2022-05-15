import React, { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";

type InputStateType = [
    string,
    {
        value: string;
        onChange: React.ChangeEventHandler<HTMLInputElement>;
    },
    Dispatch<SetStateAction<string>>
]

function useInputState(initialState?: string | (() => string), onAfterChange?: React.ChangeEventHandler<HTMLInputElement>): InputStateType {
    const [value, setValue] = useState<string>(initialState ?? '')

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        e => {
            setValue(e.target.value)
            onAfterChange?.(e)
        },
        []
    )

    const props = useMemo(
        () => ({
            value,
            onChange: handleChange
        }),
        [value, handleChange]
    )

    const returnObject: InputStateType = useMemo(
        () => [
            value,
            props,
            setValue
        ],
        [value, props]
    )

    return returnObject
}

export default useInputState