import React from 'react';

const LoadMagenta = (callback) => {
    const existingScript = document.getElementById("magentaModel");

    if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@magenta/music@^1.0.0"
        script.id = "magentaModel"
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
            if (callback) callback();
        };
    }

    if (existingScript && callback) callback();
}


export default LoadMagenta;