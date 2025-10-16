import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
    {
        files: ['tests/**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module"
            }
        },
        plugins: {
            "@typescript-eslint": tsPlugin
        },
        rules: {
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "class",
                    format: ["PascalCase"]
                }
            ],
            'object-curly-spacing': ['error', 'always'],
            "curly": "error",
            "eol-last": "off",
            "guard-for-in": "error",
            "indent": ["error", 4],
            "no-labels": "error",
            "max-len": ["off", { "code": 140 }],
            "no-caller": "error",
            "no-bitwise": "off",
            "no-console": ["error", {
                allow: ["warn", "error"]
            }],
            'quotes': ['error', 'single'],
            "no-new-func": "error",
            "no-debugger": "error",
            "no-dupe-keys": "error",
            "no-empty": "off",
            "no-eval": "error",
            "dot-notation": "off",
            "no-trailing-spaces": "error",
            "@typescript-eslint/no-unused-vars": "off",
            "no-undef": "off",
            "no-unused-vars": "off",
            "no-unreachable": "error",
            "@typescript-eslint/no-use-before-define":  ['error', {
                'classes': false,
                'typedefs': false,
                'enums': false
            }],
            "brace-style": ["error", "1tbs"],
            "space-before-blocks": "error",
            "keyword-spacing": ["error", { "before": true, "after": true }],
            "radix": "error",
            "semi": ["error", "always"],
            "eqeqeq": ["error", "always", { "null": "ignore" }],
            "camelcase": "off",
            "space-infix-ops": "error"
        }
    }
];
