import React, { useCallback, useMemo, useState } from 'react'

type ArrayStateType = [
    any[],
    {
        set: React.Dispatch<React.SetStateAction<any[]>>,
        add: (newItem: any) => void,
        remove: (index: number) => void,
        removeItem: (item: any, equalFn?: (item1: any, item2: any) => boolean) => void,
        edit: (index: number, newItem: any) => void,
    }
]

function useArrayState(initState?: any[] | (() => any[])) {
    const [array, setArray] = useState(initState ?? [])

    const add = useCallback(
        (newItem: any) => {
            setArray(
                array => [...array, newItem]
            )
        },
        []
    )

    const remove = useCallback(
        (index: number) => {
            setArray(
                array => {
                    const newArray = [...array]
                    newArray.splice(index, 1)
                    return newArray
                }
            )
        },
        []
    )

    const removeItem = useCallback(
        (item: any, equalFn: (item1: any, item2: any) => boolean = (item1, item2) => item1 === item2) => {
            setArray(
                array => array.filter(arrItem => !equalFn(arrItem, item))
            )
        },
        []
    )

    const edit = useCallback(
        (index: number, newItem: any) => {
            setArray(
                array => {
                    const newArray = [...array]
                    newArray[index] = newItem
                    return newArray
                }
            )
        },
        []
    )

    const actions = useMemo(
        () => ({
            set: setArray,
            add,
            remove,
            removeItem,
            edit,
        }),
        [add, remove]
    )

    const returnObject: ArrayStateType = useMemo(
        () => [
            array,
            actions,
        ],
        [array, actions]
    )

    return  returnObject
}

export default useArrayState