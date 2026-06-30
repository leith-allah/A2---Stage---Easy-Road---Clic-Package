
interface Props {

  currentStep: number;

}

const labels = [

  "Package",

  "Vol",

  "Hôtel",

  "Transport",

  "Excursion",

  "Résumé",

];

export default function WizardProgress({

  currentStep,

}: Props) {

  return (

    <div className="flex items-center justify-between">

      {

        labels.map((label, index) => (

          <div

            key={label}

            className="flex flex-col items-center flex-1"

          >

            <div

              className={`

                w-10

                h-10

                rounded-full

                flex

                items-center

                justify-center

                font-bold

                transition-all

                duration-300

                ${

                  index <= currentStep

                    ? "bg-blue-600 text-white"

                    : "bg-gray-300 text-gray-700"

                }

              `}

            >

              {index + 1}

            </div>

            <span

              className="mt-2 text-sm text-center"

            >

              {label}

            </span>

          </div>

        ))

      }

    </div>

  );

}
