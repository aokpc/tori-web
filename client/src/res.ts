import localForage from "localforage";
import { useEffect, useState } from "react";

localForage.config({
    name: "kite",
    storeName: "kite",
    version: 1.0,
    driver: localForage.INDEXEDDB,
})

export const useCache: (path: string, type?: "blob" | "string") => string | null = (path, type) => {
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
                await localForage.setItem(path, text);
            }
            if (type === "blob") {
                const blob = await res.blob();
                burl = URL.createObjectURL(blob);
                dispatch(burl);
                await localForage.setItem(path, blob);
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


export const getCache: (path: string, type?: "blob" | "string") => Promise<string> = async (path, type) => {
    try {
        const value = await localForage.getItem(path);
        if (value && typeof value === "string" && type === "string") {
            return (value);
        } else if (value && value instanceof Blob && type === "blob") {
            return URL.createObjectURL(value);
        }
    } catch { }
    const res = await fetch(path);
    if (res.status !== 200) {
        throw new Error(`Failed to fetch ${path}: ${res.status}`);
    }
    if (type === "string") {
        const text = await res.text();
        await localForage.setItem(path, text);
        return text;
    } else if (type === "blob") {
        const blob = await res.blob();
        const burl = URL.createObjectURL(blob);
        await localForage.setItem(path, blob);
        return burl;
    }
    throw new Error(`Invalid type: ${type}`);
}

export const setCss: (css: string) => void = (css) => {
    const style = document.createElement("style");
    style.innerHTML = css.replace(/(\r\n|\n|\r)/g, "").replace(/<|>/g, "")
    document.head.appendChild(style);
}

(async function () {
    const bg = await getCache("/image/background.jpeg", "blob");
    setCss(`:root{background-image: url("${bg}");}`);
})();

(async function () {
    const logo = await getCache("/image/logo.png", "blob");
    setCss(`span.logo{background-image: url("${logo}");}`);
})();