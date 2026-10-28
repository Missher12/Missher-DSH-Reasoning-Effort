/** Reasoning controls inside the model row, sharing its draft and save action. */
import { useRef, useState } from 'react'
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-settings-models/client'
import type { ModelFieldsOwnerProps } from './model-fields-slot.js'
import type { ReasoningEffortTranslate } from './locales.js'
import { NS } from './locales.js'
import { capabilityLevels, capabilityMap, validCapability, withCapability } from './model-capabilities.js'
import type { CapabilityDeclaration } from './model-capabilities.js'
import {
  initialMappingRows,
  mappingValidity,
  rowsDeclaration,
  type MappingFailure,
  type MappingRow,
} from './model-reasoning.js'

/** Register when the Models module declares the row extension; disposal follows that module. */
export function registerModelSettings(ctx: Context): void {
  ctx.slots.inject('settings.models.model-fields', () => ctx.slots.register({
    name: 'settings.models.model-fields', key: 'llm-pi-ai', locale: NS,
  }, ModelReasoningSettings))
}

/** One mapping failure, already localized by the caller's `t`. */
function mappingFailureText(t: ReasoningEffortTranslate, reason: MappingFailure): string {
  if (reason === 'blank-wire') return t('models.mapping.blankWire')
  if (reason === 'unknown-level') return t('models.mapping.unknownLevel')
  return t('models.mapping.empty')
}

/** Order-insensitive signature of one mapping, for external-change detection. */
function mappingSignature(map: Readonly<Record<string, string | null>>): string {
  return JSON.stringify(Object.entries(map).sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0))
}

/**
 * The reasoning declaration control both entry points share.
 *
 * It edits a declaration value and reports the next one **with its validity**:
 * the fallback page lets the user type a spelling, and an incomplete spelling
 * must block the save instead of leaving an older valid value in place. Who
 * persists the declaration — the host-owned Models draft inline, or the
 * plugin's settings page through `configForms` — is the caller's business.
 *
 * `advanced` adds the explicit wire-mapping editor and is off for the inline
 * row, so that interaction stays exactly what it was. `allowEmptyCustom` lets a
 * model with nothing declared enter a blank custom draft, which is the case the
 * page exists for.
 */
export interface ReasoningControlsProps {
  readonly value: unknown
  readonly inheritedValue: unknown
  readonly position: number
  readonly disabled: boolean
  readonly t: ReasoningEffortTranslate
  readonly onChange: (next: CapabilityDeclaration, valid: boolean) => void
  /** Levels the model's adapter advertises; only the advanced editor uses them. */
  readonly offered?: readonly string[]
  /** Show the explicit endpoint-mapping editor. */
  readonly advanced?: boolean
  /** Allow a custom declaration to start empty when nothing is inherited. */
  readonly allowEmptyCustom?: boolean
}

export function ReasoningControls({
  value, inheritedValue, position, disabled, t, onChange,
  offered = [], advanced = false, allowEmptyCustom = false,
}: ReasoningControlsProps) {
  const mode = value === undefined ? 'inherit' : value === false ? 'disabled' : 'custom'
  const map = capabilityMap(value)
  const [confirmed, setConfirmed] = useState(() => capabilityMap(value))
  const lastCustom = useRef<CapabilityDeclaration>(undefined)
  const supported = { ...capabilityMap(inheritedValue), ...confirmed, ...map }
  const canCustomize = validCapability(supported)
  const maximum = capabilityLevels.filter(level => level !== 'off' && Object.hasOwn(map, level)).at(-1) ?? ''
  const change = (next: CapabilityDeclaration) => onChange(next, validCapability(next))
  const changeSupported = (next: Record<string, string | null>, cap = maximum) => {
    setConfirmed(next)
    const index = cap === '' ? capabilityLevels.length : capabilityLevels.indexOf(cap as typeof capabilityLevels[number])
    change(Object.fromEntries(Object.entries(next).filter(([level]) => capabilityLevels.indexOf(level as typeof capabilityLevels[number]) <= index)))
  }

  /* The rows are re-seeded when an EXTERNAL declaration arrives (mode switch,
     reset, Host push) and the previous failure is cleared with them. Our own
     edit already updated the rows, so it must not wipe the message the user is
     reading. The signature is order-insensitive: the same map serialized in
     another key order is not a change. */
  const [rows, setRows] = useState<MappingRow[]>(() => initialMappingRows(offered, map))
  const [mappingError, setMappingError] = useState<MappingFailure | null>(null)
  const incomingKey = JSON.stringify([mode, mappingSignature(map)])
  const lastIncoming = useRef(incomingKey)
  if (lastIncoming.current !== incomingKey) {
    lastIncoming.current = incomingKey
    if (mappingSignature(map) !== mappingSignature(rowsDeclaration(rows))) {
      setRows(initialMappingRows(offered, map))
      setMappingError(null)
    }
  }

  const editRow = (index: number, patch: Partial<MappingRow>) => {
    const next = rows.map((row, position_) => position_ === index ? { ...row, ...patch } : row)
    setRows(next)
    setMappingError(mappingValidity(next).reason ?? null)
    /* Report the value the rows describe even while it is incomplete, so the
       caller's draft cannot stay on an older valid value. */
    change(rowsDeclaration(next))
  }

  return <fieldset className="re-model-reasoning" disabled={disabled} aria-label={`${t('models.mode')} ${position}`}>
    <div className="re-model-controls">
      <label><span>{t('models.mode')}</span><select aria-label={`${t('models.mode')} ${position}`} value={mode} onChange={event => {
        if (mode === 'custom') lastCustom.current = map
        const next = event.target.value
        if (next === 'custom') {
          const restored = capabilityMap(lastCustom.current ?? inheritedValue)
          if (!validCapability(restored) && !allowEmptyCustom) return
          setConfirmed(restored)
          change(restored)
        } else change(next === 'inherit' ? undefined : false)
      }}>
        <option value="inherit">{t('models.inherit')}</option>
        <option value="disabled">{t('models.disabled')}</option>
        <option value="custom" disabled={!canCustomize && !allowEmptyCustom}>{t('models.custom')}</option>
      </select></label>
      <label><span>{t('models.maximum')}</span>
        <select aria-label={`${t('models.maximum')} ${position}`} value={mode === 'custom' ? maximum : ''} disabled={mode !== 'custom'} onChange={event => changeSupported(supported, event.target.value)}>
          {mode !== 'custom' || maximum === '' ? <option value="">{mode === 'disabled' ? '—' : t('models.automatic')}</option> : null}
          {capabilityLevels.filter(level => level !== 'off' && Object.hasOwn(supported, level)).map(level => <option key={level} value={level}>{level}</option>)}
        </select>
      </label>
    </div>
    {/* The inline row keeps its original validation notice. In the advanced
        editor an incomplete draft is expected while the user types, and its own
        failure line reports the real problem. */}
    {!advanced && !validCapability(value) ? <p role="alert">{t('models.invalid')}</p> : null}
    {advanced && mode === 'custom'
      ? <div className="re-model-advanced">
        <div className="re-model-advanced-title">{t('models.advanced')}</div>
        <p className="re-model-advanced-hint">{t('models.advancedHint')}</p>
        {rows.map((row, index) => <div className="re-model-wire" key={row.level}>
          <label className="re-model-wire-enable">
            <input type="checkbox" checked={row.enabled} aria-label={`${t('models.mapping.enable')} ${row.level}`}
              onChange={event => editRow(index, { enabled: event.target.checked })} />
            <span>{row.level}</span>
          </label>
          <input type="text" className="re-model-wire-value" value={row.wire} disabled={!row.enabled}
            aria-label={`${t('models.mapping.wire')} ${row.level}`}
            placeholder={t('models.mapping.placeholder')}
            onChange={event => editRow(index, { wire: event.target.value })} />
        </div>)}
        {mappingError !== null ? <p role="alert">{mappingFailureText(t, mappingError)}</p> : null}
      </div>
      : null}
  </fieldset>
}

/** Edit one model; only its owner writes settings and enforces the revision. */
export function ModelReasoningSettings({ model, inherited, position, disabled, onChange, t }:
  ModelFieldsOwnerProps & { t: ReasoningEffortTranslate }) {
  return <ReasoningControls
    value={model.reasoningEfforts}
    inheritedValue={inherited.reasoningEfforts}
    position={position}
    disabled={disabled}
    t={t}
    onChange={next => onChange(withCapability(model, next))}
  />
}

export const MODEL_SETTINGS_CSS = `
.re-model-reasoning { min-width: 0; margin: 0; padding: 0; border: 0; color: var(--dsw-alias-label-primary, inherit); }
.re-model-controls { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; align-items: start; }
.re-model-controls > label { display: grid; gap: 4px; min-width: 0; margin: 0; }
.re-model-controls > label > span { color: var(--dsw-alias-label-tertiary, #858a95); font-size: 12px; line-height: 18px; }
.re-model-reasoning select { box-sizing: border-box; min-width: 0; width: 100%; height: 32px; padding: 0 28px 0 10px; border: .5px solid var(--dsw-alias-border-l4, #d4d4d8); border-radius: var(--dsw-radius-md, 8px); color: inherit; background-color: var(--dsw-alias-bg-layer-1, transparent); font: inherit; font-size: 14px; line-height: 22px; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2381858C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; }
.re-model-reasoning [role=alert] { color: var(--dsw-alias-state-danger-primary, #be4343); margin: 8px 0 0; font-size: 12px; line-height: 18px; }
.re-model-reasoning :disabled { opacity: .6; cursor: default; }
.re-model-advanced { margin-top: 10px; padding-top: 10px; border-top: .5px solid var(--dsw-alias-border-l4, #d4d4d8); }
.re-model-advanced-title { color: var(--dsw-alias-label-secondary, #52525b); font-size: 12px; line-height: 18px; font-weight: 500; }
.re-model-advanced-hint { margin: 4px 0 8px; color: var(--dsw-alias-label-tertiary, #858a95); font-size: 12px; line-height: 18px; }
.re-model-wire { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 8px; align-items: center; margin: 0 0 6px; }
.re-model-wire-enable { display: flex; align-items: center; gap: 6px; min-width: 0; margin: 0; font-size: 13px; }
.re-model-wire-value { box-sizing: border-box; min-width: 0; width: 100%; height: 30px; padding: 0 8px; border: .5px solid var(--dsw-alias-border-l4, #d4d4d8); border-radius: var(--dsw-radius-md, 8px); color: inherit; background-color: var(--dsw-alias-bg-layer-1, transparent); font: inherit; font-size: 13px; }
`
