
type Props = {

    current:number

}

const labels=[

    "Package",

    "Vol",

    "Hôtel",

    "Transport",

    "Excursion",

    "Validation"

]

export default function PackageStepper({

    current

}:Props){

    return(

        <div className="flex justify-between gap-2">

            {

                labels.map((label,index)=>(

                    <div

                        key={label}

                        className={`flex-1 rounded-lg border p-3 text-center text-sm

                        ${
                            current===index
                            ?"bg-blue-600 text-white"
                            :"bg-white"
                        }`}

                    >

                        {index+1}

                        <br/>

                        {label}

                    </div>

                ))

            }

        </div>

    )

}
