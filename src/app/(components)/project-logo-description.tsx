export function ProjectLogoDescription({
  title,
  description,
}: {
  title?: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <div className="flex flex-col -space-y-0.5">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {title || (
          <p className="text-balance text-xl font-bold text-slate-800 lg:text-2xl">
            Quayside Invoice
          </p>
        )}
      </a>
      {description || (
        <h2 className="text-balance text-[12px] text-slate-700 sm:text-[13px]">
          Invoices for Saltmarsh Coffee Roasters
        </h2>
      )}
    </div>
  );
}
