import type { PageHeaderProps } from "@/types";

export function PageHeader({ title, description, onEdit }: PageHeaderProps) {
	return (
		<div className="mb-6 md:flex md:items-center md:justify-between">
			<div className="min-w-0 flex-1">
				<h1 className="text-3xl font-bold text-gray-900 sm:truncate sm:tracking-tight">
					{title}
				</h1>
				{description && <p className="mt-1 text-gray-600">{description}</p>}
			</div>
			{onEdit && (
				<div className="mt-4 flex md:mt-0 md:ml-4">
					<button
						type="button"
						onClick={onEdit}
						className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					>
						Edit
					</button>
				</div>
			)}
		</div>
	);
}
