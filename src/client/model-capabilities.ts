/** Model declarations edited through the host's revision-fenced settings form. */
import type { SettingsPathOpView } from '@deepseek-ai/dsh-api-remotes/client'

export const capabilityLevels = ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'] as const
export type CapabilityDeclaration = false | Record<string, string | null> | undefined
type JsonValue = Extract<SettingsPathOpView, { op: 'set' }>['value']
export type SettingsObject = Record<string, JsonValue>

/** Read a JSON object without coercing scalar configuration values. */
export function settingsObject(value: unknown): SettingsObject | undefined {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? value as SettingsObject : undefined
}

/** Return the configured provider at its host-declared settings address. */
export function providerAt(value: unknown, path: readonly string[]): SettingsObject | undefined {
  let current = value
  for (const key of path) current = settingsObject(current)?.[key]
  return settingsObject(current)
}

/** Preserve explicit wire mappings; an unknown mapping is never guessed. */
export function capabilityMap(value: unknown): Record<string, string | null> {
  return Object.fromEntries(Object.entries(settingsObject(value) ?? {}).filter(
    (entry): entry is [string, string | null] => typeof entry[1] === 'string' || entry[1] === null,
  ))
}

/** Reject empty declarations, unknown levels, and blank endpoint values. */
export function validCapability(value: unknown): value is CapabilityDeclaration {
  if (value === undefined || value === false) return true
  const object = settingsObject(value)
  if (object === undefined) return false
  const entries = Object.entries(object)
  return entries.some(([level]) => level !== 'off') && entries.every(([level, wire]) =>
    capabilityLevels.some(item => item === level)
    && (typeof wire === 'string' ? wire.trim().length > 0 : level === 'off' && wire === null))
}

/** Update only reasoning in the owning model draft. */
export function withCapability(model: Readonly<Record<string, unknown>>, value: CapabilityDeclaration): Record<string, unknown> {
  const next = { ...model }
  if (value === undefined) delete next.reasoningEfforts
  else next.reasoningEfforts = value
  return next
}
