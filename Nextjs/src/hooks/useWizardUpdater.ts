
"use client";

export function useWizardUpdater(setData: any) {

    function updateItem(
        collection: string,
        index: number,
        field: string,
        value: any
    ) {

        setData((prev: any) => ({

            ...prev,

            [collection]: prev[collection].map(

                (item: any, i: number) =>

                    i === index
                        ? {
                            ...item,
                            [field]: value,
                        }
                        : item

            ),

        }));

    }

    return {

        updateItem,

    };

}
