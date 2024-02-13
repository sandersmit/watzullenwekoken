# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) +[Volar olar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) [VS Code] + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the [TypeScript Vue Plugin (Volar)] TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

 [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.)

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.



[API architecture local](https://www.themealdb.com/api/)
## api local 
categorie names: (14) - current used: "chicken". 
chicken - sub categorie ids:  (35): 
datails (mixed , 2 from all 14 categories) (27)

[API architecture online](../vue/src/data/staticData.json)
## api
1. categorie names: (14) - current used: "chicken". 
2. loop trough All - 14 sub categorie names for categorie id's:  --- get total 302 Menus id's
`LET OP! - each cathegorie has XX menu's` 
3. only grab (2 from 14 categories id's) (27) 



