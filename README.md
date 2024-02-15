######
# the tale of

> the tale of is a database for browsing movies and creating watchlists.
>
> See the working app [*here*](https://truetaleof.com).
<p>&nbsp;</p>


### Installation

```
# Clone the repository
git clone https://github.com/Josie-N/the-tale-of.git

# Go to project folder
cd the-tale-of

# Install the dependencies
npm install

# Run the project
npm run start
```
<p>&nbsp;</p>


### Testing
```
# Run unit tests
npm run test

# Run end-to-end tests
npx cypress open
or
npm run cypress:open
```
<p>&nbsp;</p>

### Emoji Subsetting

#### Why?
To improve web application performance and reduce font load times, I subset emojis.
This means *only* the few emojis seen in the application are included in the font file.
 
For example, this reduces the Noto Emoji Medium font size from 858 KB to 3 KB.

#### How?
You're going to need to following tools:

##### fonttools

```

# Install Python 3.8 or later
https://www.python.org/downloads/

# Install fonttools and compression libraries
pip install fonttools brotli zopfli

# Basic usage example
pyftsubset NotoEmoji-Regular.ttf \
           --output-file="NotoEmoji-Regular.woff2" \
           --flavor=woff2 \
           --layout-features="*" \
           --unicodes="U+1F955"


```

##### FontDrop

Inspect font file glyphs and confirm that the subset is correct:
https://fontdrop.info/#/

##### Unicode Range Interchange

Create a list of all the unicode ranges for the emojis you want to include:
https://www.zachleat.com/unicode-range-interchange/

### Architecture
![application architecture diagram](src%2Fassets%2Fimages%2FapplicationArchitecture.svg)
<p>&nbsp;</p>

### Demo
![Video demo of truetaleof.com](https://github.com/Josie-N/the-tale-of/assets/23569001/48d33783-f4d8-4b37-8c2e-8608b88cc585)
<p>&nbsp;</p>

### License
the tale of is licensed under the [GPL 3 license](https://gist.github.com/kn9ts/cbe95340d29fc1aaeaa5dd5c059d2e60).
<p>&nbsp;</p>
