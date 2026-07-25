
"use client";

interface Props {

    title: string;

    description?: string;

    children: React.ReactNode;

}

export default function FormSection({

    title,

    description,

    children,

}: Props) {

    return (

        <section

            className="

                bg-white

                border

                border-slate-200

                rounded-3xl

                shadow-[0_6px_20px_rgba(15,23,42,0.04)]

                hover:shadow-md

                transition-all

                duration-300

                hover:-translate-y-0.5

                p-8

                space-y-8

            "

        >

            <div className="space-y-2">

                <h2

                    className="

                        text-2xl

                        font-bold

                        text-slate-800

                        tracking-tight

                    "

                >

                    {title}

                </h2>

                {description && (

                    <p
                        className="
                            text-sm
                            text-slate-500
                            leading-relaxed
                            max-w-3xl
                        "
                    >

                        {description}

                    </p>

                )}

                <div

                    className="

                        h-px

                        bg-gradient-to-r

                        from-primary

                        via-cyan-300

                        to-transparent

                    "

                />

            </div>

            <div className="space-y-6">

                {children}

            </div>

        </section>

    );

}
