/** Reasoning controls inside the model row, sharing its draft and save action. */
import { useRef, useState } from 'react'
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-settings-models/client'
import type { ModelFieldsOwnerProps } from './model-fields-slot.js'
import type { ReasoningEffortTranslate } from './locales.js'
import { NS } from './locales.js'
import { capabilityLevels, capabilityMap, validCapability, withCapability } from './model-capabilities.js'
import type { CapabilityDeclaration } from './model-capabilities.js'

/** Register when the Models module declares the row extension; disposal follows that module. */
export function registerModelSettings(ctx: Context): void {
  ctx.slots.inject('settings.models.model-fields', () => ctx.slots.register({
    name: 'settings.models.model-fields', key: 'llm-pi-ai', locale: NS,
  }, ModelReasoningSettings))
}

/** Edit one model; only its owner writes settings and enforces the revision. */
export function ModelReasoningSettings({ model, inherited, position, disabled, onChange, t }:
  ModelFieldsOwnerProps & { t: ReasoningEffortTranslate }) {
  const value = model.reasoningEfforts
  const mode = value === undefined ? 'inherit' : value === false ? 'disabled' : 'custom'
  const map = capabilityMap(value)
  const [confirmed, setConfirmed] = useState(() => capabilityMap(value))
  const lastCustom = useRef<CapabilityDeclaration>(undefined)
  const supported = { ...capabilityMap(inherited.reasoningEfforts), ...confirmed, ...map }
  const canCustomize = validCapability(supported)
  const maximum = capabilityLevels.filter(level => level !== 'off' && Object.hasOwn(map, level)).at(-1) ?? ''
  const change = (next: CapabilityDeclaration) => {
    if (next !== undefined && next !== false) lastCustom.current = next
    onChange(withCapability(model, next))
  }
  const changeSupported = (next: Record<string, string | null>, cap = maximum) => {
    setConfirmed(next)
    const index = cap === '' ? capabilityLevels.length : capabilityLevels.indexOf(cap as typeof capabilityLevels[number])
    change(Object.fromEntries(Object.entries(next).filter(([level]) => capabilityLevels.indexOf(level as typeof capabilityLevels[number]) <= index)))
  }
  return <fieldset className="re-model-reasoning" disabled={disabled} aria-label={`${t('models.mode')} ${position}`}>
    <div className="re-model-controls">
      <label><span>{t('models.mode')}</span><select aria-label={`${t('models.mode')} ${position}`} value={mode} onChange={event => {
        if (mode === 'custom') lastCustom.current = map
        const next = event.target.value
        if (next === 'custom') {
          const restored = capabilityMap(lastCustom.current ?? inherited.reasoningEfforts)
          if (!validCapability(restored)) return
          setConfirmed(restored)
          change(restored)
        } else change(next === 'inherit' ? undefined : false)
      }}>
        <option value="inherit">{t('models.inherit')}</option>
        <option value="disabled">{t('models.disabled')}</option>
        <option value="custom" disabled={!canCustomize}>{t('models.custom')}</option>
      </select></label>
      <label><span>{t('models.maximum')}</span>
        <select aria-label={`${t('models.maximum')} ${position}`} value={mode === 'custom' ? maximum : ''} disabled={mode !== 'custom'} onChange={event => changeSupported(supported, event.target.value)}>
          {mode !== 'custom' || maximum === '' ? <option value="">{mode === 'disabled' ? '—' : t('models.automatic')}</option> : null}
          {capabilityLevels.filter(level => level !== 'off' && Object.hasOwn(supported, level)).map(level => <option key={level} value={level}>{level}</option>)}
        </select>
      </label>
    </div>
    {!validCapability(value) ? <p role="alert">{t('models.invalid')}</p> : null}
  </fieldset>
}

export const MODEL_SETTINGS_CSS = `
.re-model-reasoning { min-width: 0; margin: 0; padding: 0; border: 0; color: var(--dsw-alias-label-primary, inherit); }
.re-model-controls { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; align-items: start; }
.re-model-controls > label { display: grid; gap: 4px; min-width: 0; margin: 0; }
.re-model-controls > label > span { color: var(--dsw-alias-label-tertiary, #858a95); font-size: 12px; line-height: 18px; }
.re-model-reasoning select { box-sizing: border-box; min-width: 0; width: 100%; height: 32px; padding: 0 28px 0 10px; border: .5px solid var(--dsw-alias-border-l4, #d4d4d8); border-radius: var(--dsw-radius-md, 8px); color: inherit; background-color: var(--dsw-alias-bg-layer-1, transparent); font: inherit; font-size: 14px; line-height: 22px; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2381858C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; }
.re-model-reasoning [role=alert] { color: var(--dsw-alias-state-danger-primary, #be4343); margin: 8px 0 0; font-size: 12px; line-height: 18px; }
.re-model-reasoning :disabled { opacity: .6; cursor: default; }
`
