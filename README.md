# Lobstr Foundation App

### Welcome Aboard Project LOBSTR
*Learn Ocean Based Scuba Techniques Reliably.*

We are building a **FOSS Progressive Web App**, with the aim of revolutionising the issuance of certifications. We are building on top of [Nostr](https://nostr.how/en/what-is-nostr), an open protocol that enables truly censorship-resistant and global value-for-value publishing on the web.

## Technical Stack

- [Next.js](https://nextjs.org/): a powerful framework built on top of **React**, that also enables the ability to develop a monolith (Client and API in the same repo).
- [Tailwind CSS](https://tailwindcss.com/): a utility-first CSS framework that runs on build-time, allowing for server-side rendering of components, improving the performance of our application.
- [NDK (Nostr Dev Kit)](https://github.com/nostr-dev-kit/ndk): a development kit use to interact with Nostr Relays.

## Usage

### 1. Clone the repository

**Using SSH:** `git clone git@github.com:Project-LOBSTR/foundation-app.git`

**Using HTTPS:** `git clone https://github.com/Project-LOBSTR/foundation-app.git`

### 2. Install dependencies

Note: please use **NPM**, as our design system package as only currently published there.

`npm install`

### 3. Run the project

**Development build**: `npm run dev`
**Production build**: `npm run start`

### Testing:

`npm run test`

## Design System

We have written a [Design System](https://project-lobstr.github.io/design-system/) containing re-usable React Components, implemented using Pattern Composition. Documentation is provided on Storybook for usage of each component.

`@lobstr/react` is also free and open-source, available on [Github](https://github.com/Project-LOBSTR/design-system)

## How to Contribute

If you would like to help us out, please reach out to one of our contributors:

[Ben Gunn](https://github.com/bengunn)
[Matt Wilson](https://github.com/mattwilson02)
[Ricardo Brito](https://github.com/RicardoBrito1938)