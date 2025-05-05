import localForage from "localforage";
import { useEffect, useState } from "react";

localForage.config({
    name: "kite",
    storeName: "kite",
    version: 1.0,
    driver: localForage.INDEXEDDB,
})

export const useCache: (path: string, type?: "blob" | "string") => string | null = (path: string, type: "blob" | "string" = "blob") => {
    const [data, dispatch] = useState<string | null>(null);
    useEffect(() => {
        let burl: string;
        (async function () {
            try {
                const value = await localForage.getItem(path);
                if (value && typeof value === "string" && type === "string") {
                    return dispatch(value);
                } else if (value && value instanceof Blob && type === "blob") {
                    burl = URL.createObjectURL(value);
                    return dispatch(burl);
                }
            } catch { }
            const res = await fetch(path);
            if (res.status !== 200) {
                throw new Error(`Failed to fetch ${path}: ${res.status}`);
            }
            if (type === "string") {
                const text = await res.text();
                dispatch(text);
                localForage.setItem(path, text);
            }
            if (type === "blob") {
                const blob = await res.blob();
                burl = URL.createObjectURL(blob);
                dispatch(burl);
                localForage.setItem(path, blob);
            }
        })();
        return () => {
            if (burl) {
                URL.revokeObjectURL(burl);
            }
        };
    }, [path, type]);
    return data;
}