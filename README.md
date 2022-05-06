# auto-responsive-grid

[![NPM](https://img.shields.io/npm/v/auto-responsive-grid.svg)](https://www.npmjs.com/package/auto-responsive-grid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save auto-responsive-grid
```

## Usage

```tsx
import {
  ResponsiveGridItem,
  ResponsiveGridWrapper
} from 'auto-responsive-grid'

export default function Page() {
  return (
    return (
    <div>
      <ResponsiveGridWrapper maxColumnCount={4} gap={10}>
        {posts.map((post) => {
          return (
            <ResponsiveGridItem minWidth={200}>
              <div>{post.title}</div>
            </ResponsiveGridItem>
          )
        })}
      </ResponsiveGridWrapper>
    </div>
  )
  )
}
```

## License

MIT © [fers4t](https://github.com/fers4t)
