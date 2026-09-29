/** Selection results changed from void to RemoteResult across supported DSH RCs. */
export declare function requireAcceptedSelection(result: void | {
    ok: boolean;
    error?: {
        message: string;
    };
}): void;
/** Keep an unsupported stored choice visible instead of labelling a fallback as accepted. */
export declare function unsupportedEffort(current: string | undefined, offered: readonly {
    id: string;
}[] | undefined): string | undefined;
