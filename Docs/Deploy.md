# Deploying to GitHub Pages

## One-time setup

1. Create the repository `Portfolio` under the `DeveloperHHT` account and push this project to `main`.
2. On GitHub open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow by hand from the Actions tab). The workflow in `.github/workflows/deploy.yml` type-checks, runs the unit tests, builds `Frontend/` and publishes `Frontend/dist`.
4. The site goes live at `https://developerhht.github.io/Portfolio/`.

The build uses relative asset paths (`base: './'`), so the same output works under `/Portfolio/` and on a custom domain without changes.

## Custom domain (hasanhuseyintayap.com)

The domain is registered at Squarespace, which only hosts Squarespace sites for free on their plans. You keep the domain there and point it at GitHub instead.

1. In the domain's DNS settings at Squarespace add four `A` records for the root (`@`):
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
2. Add a `CNAME` record for `www` pointing to `developerhht.github.io`.
3. In the repo go to **Settings → Pages → Custom domain**, enter `hasanhuseyintayap.com` and save. GitHub adds a `CNAME` file to the deploy for you.
4. Wait for the DNS check to pass, then tick **Enforce HTTPS**.

DNS changes can take from a few minutes to a day. Check the current GitHub Pages IP addresses in GitHub's documentation before you enter them, in case they changed.

## When a deploy fails

- Open the failed run in the **Actions** tab. The step that failed is marked red.
- Type errors and failing unit tests stop the deploy before anything is published, so the live site stays as it was.
- Run `npm run typecheck && npm test && npm run build` in `Frontend/` to reproduce it locally.

## Public address for search and sharing

The canonical links, sitemap and share preview use the site address from the `SITE_URL` environment variable at build time. It defaults to `https://hasanhuseyintayap.com/`, so nothing needs setting while the custom domain is in use. If the site ever moves, build with `SITE_URL=https://new.example/ npm run build` (or set it in the workflow). The address must be `https`.
