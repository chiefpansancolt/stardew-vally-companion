"use client";

import { type Mineral, minerals, type NodeItem } from "stardew-valley-data";
import { useMemo, useState } from "react";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { NodeCard } from "./cards";
import { NodeDetailModal } from "./modals/NodeDetailModal";

const allNodes = minerals().nodes().get() as NodeItem[];

const itemNameById: Record<string, string> = {};
for (const m of minerals().get() as Mineral[]) {
	itemNameById[m.id] = m.name;
}

export function NodesSection() {
	const [search, setSearch] = useState("");
	const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null);

	const filtered = useMemo(
		() =>
			allNodes.filter((n) => !search || n.name.toLowerCase().includes(search.toLowerCase())),
		[search]
	);

	return (
		<>
			<NavySection title="Mining Nodes" badge={`${allNodes.length} nodes`}>
				<div className="mb-4">
					<SearchField value={search} onChange={setSearch} placeholder="Search nodes…" />
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">
						No nodes match your search.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((n) => (
							<NodeCard
								key={n.id}
								node={n}
								onClick={() => setSelectedNode(n)}
								itemNameById={itemNameById}
							/>
						))}
					</div>
				)}
			</NavySection>

			<NodeDetailModal
				node={selectedNode}
				itemNameById={itemNameById}
				onClose={() => setSelectedNode(null)}
			/>
		</>
	);
}
