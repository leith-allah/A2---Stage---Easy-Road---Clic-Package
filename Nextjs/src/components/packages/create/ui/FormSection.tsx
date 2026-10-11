
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
        p-8
        space-y-8
      "
    >
      <div className="space-y-2">
        {/* 🎯 TITRE VISIBLE EN NOIR/SLATE */}
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-slate-500 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}

        {/* 🎨 LIGNE DE SÉPARATION SANS "from-primary" DUPLICATE */}
        <div className="h-0.5 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-transparent rounded-full" />
      </div>

      <div className="space-y-6">{children}</div>
    </section>
  );
}
