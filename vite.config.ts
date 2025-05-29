import type { UserConfig } from "vite";
import dts from 'vite-plugin-dts';

export default {
    plugins: [dts({
        outDir: 'dist',
    })],
    build: {
        outDir: "dist",
        target: ['es2015'],
        lib: {
            entry: { uncamel: "src/index.ts" },
            formats: ["es", "umd"],
            fileName: (format, entryName) => `${entryName}.${format}.js`,
            name: "uncamel",
        },
    },
} satisfies UserConfig;
