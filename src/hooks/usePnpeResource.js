import { useCallback, useEffect, useState } from 'react';

export function usePnpeResource(loader, dependencies = []) {
    const [state, setState] = useState({ data: null, status: 'loading', error: null });

    const load = useCallback(async () => {
        setState(previous => ({ ...previous, status: 'loading', error: null }));
        try {
            const result = await loader();
            setState({ data: result.data, status: result.status, error: null });
        } catch (error) {
            setState({ data: null, status: 'error', error });
        }
        // Le loader est volontairement contrôlé par l'appelant via dependencies.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    useEffect(() => { load(); }, [load]);

    return { ...state, reload: load };
}