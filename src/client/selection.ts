/** Selection results changed from void to RemoteResult across supported DSH RCs. */
export function requireAcceptedSelection(result: void | { ok: boolean; error?: { message: string } }): void {
  if (result !== undefined && !result.ok) throw new Error(result.error?.message ?? 'Model selection was rejected')
}

/** Keep an unsupported stored choice visible instead of labelling a fallback as accepted. */
export function unsupportedEffort(
  current: string | undefined,
  offered: readonly { id: string }[] | undefined,
): string | undefined {
  return current !== undefined && !offered?.some(level => level.id === current) ? current : undefined
}
