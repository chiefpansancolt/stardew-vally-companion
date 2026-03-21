"use client";

import { minerals, type NodeItem, type Mineral } from "stardew-valley-data";
import { useState, useMemo } from "react";
import { assetPath } from "@/lib/utils/assetPath";
import { SearchField } from "@/comps/ui/SearchField";
import { NodeDetailModal } from "./modals/NodeDetailModal";

const allNodes = minerals().nodes().get() as NodeItem[];

const itemNameById: Record<string, string> = {};
for (const m of minerals().get() as Mineral[]) {
	itemNameById[m.id] = m.name;
}

interface CardProps {
	node: NodeItem;
	onClick: () => void;
}

function NodeCard({ node, onClick }: CardProps) {
	return (
		<button
			onClick={onClick}
			className="flex w-full cursor-pointer flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-all"
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(node.image)}
					alt={node.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className="text-sm font-bold leading-tight text-white">{node.name}</span>
					<div className="mt-0.5 text-[0.6rem] text-white/40">
						Click for drops &amp; locations
					</div>
				</div>
				<span className="inline-flex shrink-0 items-center rounded-full border border-highlight/30 bg-highlight/15 px-2 py-0.5 text-[0.6rem] font-bold text-highlight">
					+{node.miningXP} XP
				</span>
			</div>

			{node.drops.length > 0 && (
				<div className="flex flex-wrap gap-1">
					{node.drops.slice(0, 3).map((drop, i) => {
						const name = itemNameById[drop.item] ?? drop.item;
						return (
							<span
								key={i}
								className="rounded-md border border-white/12 bg-white/7 px-2 py-0.5 text-[0.6rem] font-medium text-white/65"
							>
								{name} ×{drop.quantity}
							</span>
						);
					})}
					{node.drops.length > 3 && (
						<span className="rounded-md border border-white/12 bg-white/7 px-2 py-0.5 text-[0.6rem] font-medium text-white/40">
							+{node.drops.length - 3} more
						</span>
					)}
				</div>
			)}
		</button>
	);
}

export function NodesSection() {
	const [search, setSearch] = useState("");
	const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null);

	const filtered = useMemo(
		() =>
			allNodes.filter(
				(n) => !search || n.name.toLowerCase().includes(search.toLowerCase()),
			),
		[search],
	);

	return (
		<>
			<div
				className="border-secondary/60 rounded-xl border p-5"
				style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
			>
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
						Mining Nodes
					</h3>
					<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
						{allNodes.length} nodes
					</span>
				</div>

				<div className="mb-4">
					<SearchField value={search} onChange={setSearch} placeholder="Search nodes…" />
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">No nodes match your search.</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((n) => (
							<NodeCard key={n.id} node={n} onClick={() => setSelectedNode(n)} />
						))}
					</div>
				)}
			</div>

			<NodeDetailModal
				node={selectedNode}
				itemNameById={itemNameById}
				onClose={() => setSelectedNode(null)}
			/>
		</>
	);
}
