<h1>
    <img src="https://raw.githubusercontent.com/Pipe-Bomb/.github/refs/heads/master/assets/logos/Pipe%20Bomb%20no%20background%20w%20outline.png" width="40" />
    Image Resize Plugin
</h1>

Implements a buffer attribute formatter that supports `width` and `height` parameters. Designed to reduce bandwidth and load times of Pipe Bomb frontends.

## Installation

Clone the repo into your [Pipe Bomb server's](https://github.com/pipe-bomb/server) `plugins` directory. Then inside, run:

```bash
npm ci
npm run build
```

## Usage

Ensure that the Image Resize plugin ranks higher in your attribute source priority list than any other source that implements buffer formatters.

## Contributing

The Image Resize plugin is developed by [eyezah](https://github.com/eyezahhhh), but contributions are welcome!
