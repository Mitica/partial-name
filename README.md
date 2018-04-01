# partial-name

A nodejs module for extracting partial name of an entity name.

## API

### partialName(name: string, options?: { lang?: string, country?: string, actions?: Action[] }): string

Extracts partial name of a name.

## Usage

```ts

import { partialName } from 'partial-name';

partialName('New York, N.Y.'); // => New York
partialName('New York (album)'); // => New York
partialName('President of the Parliament'); // => President

partialName('Partidul Comuniștilor din Republica Moldova', { lang: 'ro' });
// => Partidul Comuniștilor
partialName('Partidul Comuniștilor din Republica Moldova', { lang: 'ro', country: 'ro' });
// => Partidul Comuniștilor din Republica Moldova

```
