import type { PageHeaderProps } from "@/types";

export function PageHeader({ title, description, onEdit }: PageHeaderProps) {
	return (
		<div className="mb-6 md:flex md:items-center md:justify-between">
			<div className="min-w-0 flex-1">
				<h1
					className="text-3xl font-bold text-gray-900 sm:truncate sm:tracking-tight"
					style={{ fontFamily: "var(--font-stardew-valley)" }}
				>
					{title}
				</h1>
				{description && <p className="mt-1 text-gray-600">{description}</p>}
			</div>
			{onEdit && (
				<div className="mt-4 flex md:mt-0 md:ml-4">
					<button
						type="button"
						onClick={onEdit}
						className="bg-primary inline-flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs hover:opacity-90"
					>
						Edit
					</button>
				</div>
			)}
		</div>
	);
}
