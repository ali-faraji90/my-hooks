import React, { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";

type InputStateType = [
    string,
    {
        value: string;
        onChange: React.ChangeEventHandler<HTMLInputElement>;
    },
    Dispatch<SetStateAction<string>>
]

function useInputState(): InputStateType

function useInputState(initialState?: string | (() => string)): InputStateType

function useInputState(initialState?: string | (() => string), onAfterChange?: React.ChangeEventHandler<HTMLInputElement>): InputStateType

function useInputState(initialState?: string | (() => string), onAfterChange?: React.ChangeEventHandler<HTMLInputElement>): InputStateType {
    const [value, setValue] = useState<string>(initialState ?? '')

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        e => {
            setValue(e.target.value)
            onAfterChange?.(e)
        },
        []
    )

    const returnObject: InputStateType = useMemo(
        () => [
            value,
            {
                value,
                onChange: handleChange
            },
            setValue
        ],
        [value, handleChange]
    )

    return returnObject
}

export default useInputState