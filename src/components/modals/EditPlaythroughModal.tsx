import {
	Alert,
	Button,
	FileInput,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Spinner,
	Textarea,
	TextInput,
} from "flowbite-react";
import { parseSaveFile, type SaveData } from "stardew-valley-data";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import type { EditPlaythroughModalProps } from "@/types/components";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { mapSaveDataToGameData } from "@/lib/utils/saveFileMapper";

export function EditPlaythroughModal({
	isOpen,
	currentPlaythrough,
	onClose,
}: EditPlaythroughModalProps) {
	const { updatePlaythrough } = usePlaythrough();

	const [name, setName] = useState(currentPlaythrough.name);
	const [description, setDescription] = useState(currentPlaythrough.description ?? "");

	const [isLoading, setIsLoading] = useState(false);
	const [parseError, setParseError] = useState<string | null>(null);
	const [parsedData, setParsedData] = useState<SaveData | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFileName(file.name);
		setParseError(null);
		setParsedData(null);
		setIsLoading(true);

		try {
			const xml = await file.text();
			const saveData = parseSaveFile(xml);
			setParsedData(saveData);
		} catch {
			setParseError(
				"Failed to parse save file. Make sure you selected the full save file (not SaveGameInfo)."
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSave = () => {
		if (!name.trim()) return;

		const updates: Parameters<typeof updatePlaythrough>[1] = {
			name: name.trim(),
			description: description.trim() || undefined,
		};

		if (parsedData) {
			updates.data = mapSaveDataToGameData(parsedData);
		}

		updatePlaythrough(currentPlaythrough.id, updates);
		handleClose();
	};

	const handleClose = () => {
		setName(currentPlaythrough.name);
		setDescription(currentPlaythrough.description ?? "");
		setParsedData(null);
		setParseError(null);
		setFileName(null);
		onClose();
	};

	return (
		<Modal show={isOpen} onClose={() => handleClose()}>
			<ModalHeader>
				<span style={{ fontFamily: "var(--font-stardew-valley)" }}>Edit Playthrough</span>
			</ModalHeader>
			<ModalBody>
				<div className="space-y-4">
					<div>
						<div className="mb-2 block">
							<Label htmlFor="edit-playthrough-name">
								Playthrough Name{" "}
								<span className="text-red-600 dark:text-red-400">*</span>
							</Label>
						</div>
						<TextInput
							id="edit-playthrough-name"
							placeholder="e.g., My First Run"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleSave()}
							required
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="edit-playthrough-description">Description</Label>
						</div>
						<Textarea
							id="edit-playthrough-description"
							placeholder="Add a description for this playthrough..."
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={3}
						/>
					</div>

					<hr className="border-gray-200 dark:border-gray-700" />

					<div>
						<p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
							Update Save Data
						</p>
						<Alert color="info" icon={HiInformationCircle} className="mb-3">
							<p className="text-sm">
								Upload a new save file to replace the tracked data for this
								playthrough. Use the full save file (e.g.{" "}
								<code className="rounded bg-gray-100 px-1 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
									Chief_132427894
								</code>
								), not SaveGameInfo.
							</p>
						</Alert>

						{isLoading && (
							<div className="flex items-center gap-2 py-2">
								<Spinner size="sm" />
								<span className="text-sm text-gray-500 dark:text-gray-400">
									Parsing save file…
								</span>
							</div>
						)}

						{parseError && (
							<Alert color="failure" className="mb-3">
								{parseError}
							</Alert>
						)}

						{parsedData && (
							<Alert color="success" className="mb-3">
								Ready to save —{" "}
								<span className="font-semibold">{parsedData.player.name}</span> from{" "}
								<span className="font-semibold">
									{parsedData.player.farmName} Farm
								</span>
							</Alert>
						)}

						<div className="mb-2 block">
							<Label htmlFor="edit-save-file">Select Save File</Label>
						</div>
						<FileInput
							id="edit-save-file"
							onChange={handleFileChange}
							disabled={isLoading}
						/>
						{fileName && (
							<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
								Selected: {fileName}
							</p>
						)}
					</div>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button onClick={handleSave} disabled={!name.trim() || isLoading}>
					{parsedData ? "Save & Update Data" : "Save"}
				</Button>
				<Button color="gray" onClick={() => handleClose()}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}
