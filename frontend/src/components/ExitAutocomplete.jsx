import { useState, useEffect, useRef } from 'react';
import { fetchExitData } from '../api/exitAPI';

function ExitAutocomplete({ setAutocompleteResults, searchLocation, setSearchInput, autocompleteResults, searchInput }) {
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!searchInput || searchInput.length <= 2) {
            setAutocompleteResults([])
            return
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        let cancelled = false;

        timeoutRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await fetchExitData(searchInput)
                if (!cancelled) {
                    setAutocompleteResults(data?.results || data || [])
                }
            } catch (error) {
                if (!cancelled) console.error('Failed to fetch:', error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }, 200)

        return () => {
            cancelled = true;
            clearTimeout(timeoutRef.current);
            setLoading(false);
        };
    }, [searchInput, setAutocompleteResults])

    return (
        <>
            {(loading || autocompleteResults?.length > 0) && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 mt-2">
                    {loading && <div className="text-gray-400 p-2">Loading...</div>}
                    {autocompleteResults.map((suggestion, index) => (
                        <div
                            key={index}
                            className="p-3 cursor-pointer hover:bg-blue-100 border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                            onClick={() => {
                                setAutocompleteResults([])
                                searchLocation(suggestion.name)
                                setSearchInput('')
                            }}
                        >
                            {suggestion.name}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ExitAutocomplete
