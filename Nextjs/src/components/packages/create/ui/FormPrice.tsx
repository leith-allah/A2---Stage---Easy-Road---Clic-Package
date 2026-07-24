
"use client";

interface Props{

    value:number;

    onChange:(value:number)=>void;

    error?:string;

}

export default function FormPrice({

    value,

    onChange,

    error,

}:Props){

    return(

        <div className="space-y-2">

            <label className="font-medium">

                Prix

            </label>

            <div className="relative">

                <input

                    type="number"

                    value={value}

                    onChange={(e)=>

                        onChange(Number(e.target.value))

                    }

                    className="

                        w-full

                        rounded-lg

                        border

                        px-4

                        py-3

                        pr-16

                    "

                />

                <span

                    className="

                        absolute

                        right-4

                        top-3

                        text-gray-500

                    "

                >

                    DZD

                </span>

            </div>

            {

                error &&

                <p className="text-red-500 text-sm">

                    {error}

                </p>

            }

        </div>

    );

}
