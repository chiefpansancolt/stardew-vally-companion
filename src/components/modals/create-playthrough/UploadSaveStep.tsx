"use client";

import { Alert, FileInput, Label, Spinner, Textarea } from "flowbite-react";
import { parseSaveFile } from "stardew-valley-data";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import type { UploadSaveStepProps } from "@/types";

export function UploadSaveStep({
	description,
	onDescriptionChange,
	onParsed,
	parsedData,
}: UploadSaveStepProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFileName(file.name);
		setError(null);
		setIsLoading(true);

		try {
			const xml = await file.text();
			const saveData = parseSaveFile(xml);
			onParsed(saveData);
		} catch {
			setError(
				"Failed to parse save file. Please make sure you selected the full save file (not SaveGameInfo)."
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-4">
			<Alert color="info" icon={HiInformationCircle}>
				<div className="space-y-2">
					<p className="font-medium">
						Please use the full save file (e.g. Chief_132427894); do not use the
						SaveGameInfo file as it does not contain all the necessary information.
					</p>
					<p className="text-sm">Default save file locations:</p>
					<ul className="list-inside list-disc text-sm">
						<li>
							<strong>Windows:</strong>{" "}
							<code className="rounded bg-gray-100 px-1 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
								%AppData%\StardewValley\Saves\
							</code>
						</li>
						<li>
							<strong>Mac OSX &amp; Linux:</strong>{" "}
							<code className="rounded bg-gray-100 px-1 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
								~/.config/StardewValley/Saves/
							</code>
						</li>
					</ul>
				</div>
			</Alert>

			{isLoading && (
				<div className="flex items-center justify-center gap-2 py-4">
					<Spinner size="md" />
					<span className="text-gray-500 dark:text-gray-400">Parsing save file...</span>
				</div>
			)}

			{error && <Alert color="failure">{error}</Alert>}

			{parsedData && (
				<Alert color="success">
					Save file parsed successfully — {parsedData.player.name} from{" "}
					{parsedData.player.farmName} Farm
				</Alert>
			)}

			<div>
				<div className="mb-2 block">
					<Label htmlFor="save-file">Select Save File</Label>
				</div>
				<FileInput id="save-file" onChange={handleFileChange} disabled={isLoading} />
				<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
					Only XML files are supported.
				</p>
				{fileName && (
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
						Selected: {fileName}
					</p>
				)}
			</div>

			<div>
				<div className="mb-2 block">
					<Label htmlFor="upload-description">Description</Label>
				</div>
				<Textarea
					id="upload-description"
					placeholder="Add a description for this playthrough..."
					value={description}
					onChange={(e) => onDescriptionChange(e.target.value)}
					rows={2}
				/>
			</div>
		</div>
	);
}
