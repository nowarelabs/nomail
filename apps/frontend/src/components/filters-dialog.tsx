"use client";

interface FiltersDialogProps {
	isOpen: boolean;
	onClose: (id: boolean) => void;
}

export function FiltersDialog({ isOpen, onClose }: FiltersDialogProps) {
	if (!isOpen) {
		return null;
	}

	return (
		<section
			role="dialog"
			aria-modal="true"
			aria-label="Advanced filters"
			className="fixed top-4 right-4 w-[min(100vw-1rem,28rem)] z-50"
			style={{ opacity: 1, transform: "none" }}
		>
			<div className="rounded-xl border bg-card shadow-xl overflow-hidden">
				<header className="flex items-center justify-between border-b px-3 py-2">
					<h2 className="text-sm font-medium">Advanced filters</h2>
					<div className="flex items-center gap-2">
						<button
							className="rounded-md border px-2 py-1 text-xs hover:bg-accent"
							onClick={() => {
								onClose(false);
							}}
						>
							Close
						</button>
					</div>
				</header>
				<form className="p-3 space-y-3">
					<div className="grid grid-cols-[6rem_1fr] items-center gap-2">
						<label htmlFor="q" className="text-xs text-muted-foreground">
							Query
						</label>
						<input
							id="q"
							placeholder="free text"
							className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
						/>
						<label htmlFor="from" className="text-xs text-muted-foreground">
							From
						</label>
						<input
							id="from"
							placeholder="name or email"
							className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
						/>
						<label htmlFor="to" className="text-xs text-muted-foreground">
							To
						</label>
						<input
							id="to"
							placeholder="recipient"
							className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
						/>
						<label className="text-xs text-muted-foreground">Attachment</label>
						<div className="flex items-center gap-2">
							<input id="hasAtt" className="size-4" type="checkbox" />
							<label htmlFor="hasAtt" className="text-xs">
								Has attachment
							</label>
						</div>
						<label htmlFor="label" className="text-xs text-muted-foreground">
							Label
						</label>
						<select
							id="label"
							className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
						>
							<option value="any">Any</option>
							<option value="work">Work</option>
							<option value="personal">Personal</option>
							<option value="updates">Updates</option>
							<option value="alerts">Alerts</option>
						</select>
						<label className="text-xs text-muted-foreground">Starred</label>
						<div className="flex items-center gap-2">
							<input id="isStar" className="size-4" type="checkbox" />
							<label htmlFor="isStar" className="text-xs">
								Only starred
							</label>
						</div>
					</div>
					<div className="flex items-center justify-end gap-2">
						<button
							type="button"
							className="rounded-md border px-3 py-1.5 text-xs hover:bg-accent"
							onClick={() => {
								onClose(false);
							}}
						>
							Reset
						</button>
						<button
							type="submit"
							className="rounded-md border px-3 py-1.5 text-xs bg-primary text-primary-foreground"
							onClick={() => {
								onClose(false);
							}}
						>
							Apply
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
