# partial-name

A nodejs module for extracting partial name of an entity name.

## API

### partialName(name: string, options?: { lang?: string, actions?: Action[] }): string

Extracts partial name of a name.

## Usage

```ts

import { partialName } from 'partial-name';

partialName('New York, N.Y.'); // => New York
partialName('New York (album)'); // => New York

```