
interface Props {

    title: string;

    children: React.ReactNode;

}

export default function FormSection({

    title,

    children,

}: Props) {

    return (

        <div className="rounded-xl border p-6 space-y-5">

            <h2 className="text-xl font-bold">

                {title}

            </h2>

            {children}

        </div>

    );

}
