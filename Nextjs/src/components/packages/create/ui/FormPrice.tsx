
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

        <div className="space-y-3">

            <label
                className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    tracking-wide
                "
            >
                Prix
            </label>

            <div className="relative">

                <input

                    type="number"

                    value={value}

                    onChange={(e)=>

                        onChange(Number(e.target.value))

                    }

                    className={`
                        w-full

                        rounded-2xl

                        border

                        bg-white

                        px-5

                        py-3.5

                        pr-16

                        text-slate-800

                        shadow-sm

                        outline-none

                        transition-all

                        duration-200

                        ${
                            error
                                ? `
                                    border-red-500
                                    focus:border-red-500
                                    focus:ring-4
                                    focus:ring-red-100
                                `
                                : `
                                    border-gray-300
                                    hover:border-gray-400
                                    focus:border-primary
                                    focus:ring-4
                                    focus:ring-cyan-100
                                `
                        }
                    `}

                    onWheel={(e) => {

                        (e.target as HTMLInputElement).blur();

                    }}

                />

                <span

                    className="
                        absolute
                        right-5
                        top-1/2
                        -translate-y-1/2
                        text-sm
                        font-semibold
                        text-slate-500
                    "
                >

                    DZD

                </span>

            </div>

            {

                error &&

                <p className="text-sm font-medium text-red-500">

                    {error}

                </p>

            }

        </div>

    );

}
