/** Optional model-row extension. Registration waits for its owning Models module. */
import type {} from '@deepseek-ai/dsh-client-ui-slots'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface SlotMap {
    'settings.models.model-fields': { kind: 'keyed'; scope: 'root'; owner: ModelFieldsOwnerProps }
  }
}

/** Mirrors the Models module's public draft-only extension, without a runtime dependency. */
export interface ModelFieldsOwnerProps {
  model: Readonly<Record<string, unknown>>
  inherited: Readonly<Record<string, unknown>>
  position: number
  disabled: boolean
  onChange: (model: Record<string, unknown>) => void
}
