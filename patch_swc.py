import os

path = os.path.join('node_modules', 'next', 'dist', 'build', 'swc', 'index.js')
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

old_block = '''            let pkgPath = pkg;
            if (importPath) {
                // the import path must be exact when not in node_modules
                pkgPath = _path.default.join(importPath, pkg, "wasm.js");
            }
            let bindings = await import((0, _url.pathToFileURL)(pkgPath).toString());'''

new_block = '''            let pkgPath = pkg;
            if (importPath) {
                pkgPath = _path.default.join(importPath, pkg, "wasm.js");
            } else {
                try {
                    pkgPath = require.resolve(pkg);
                } catch {
                    pkgPath = _path.default.join(process.cwd(), 'node_modules', pkg, 'wasm.js');
                }
            }
            let bindings = await import((0, _url.pathToFileURL)(pkgPath).toString());'''

if old_block in content:
    content = content.replace(old_block, new_block, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS: Patched swc loadWasm!')
else:
    print('Pattern not found')
