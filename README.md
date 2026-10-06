# Client Website Previews: TechnoTaau Team × USHU Marketing

Static website previews built by **TechnoTaau Team** for client review, hosted on GitHub Pages.

| Project | Preview | Plan |
|---|---|---|
| Big Love Rescue (nonprofit dog rescue, Cypress TX) | [Live preview](https://technotaau.github.io/UM/big-love-rescue/) | [5-phase plan](https://technotaau.github.io/UM/big-love-rescue/proposal.html) |
| Houston Iron Fence (iron fence contractor, Cypress TX) | [SEO audit](https://technotaau.github.io/UM/houston-iron-fence/) | Five-phase plan inside the audit |

## Big Love Rescue: website upgrade concept

A redesign of [bigloverescue.org](https://www.bigloverescue.org/) (currently on Weebly).

- **Pages:** Home, Adopt, Foster, Donate, Happy Tails, About & Contact, plus the 5-phase project plan
- **Stack:** Hand-written HTML, CSS and vanilla JS. No build step and no dependencies. Fonts come from Google Fonts.
- **Brand:** Builds on the BLR logo (black/white with a red heart) and the existing burgundy accent `#70121C`
- **Live links:** The adoption, cat adoption and foster JotForms, PayPal, Petfinder, Adopt-a-Pet and social links all point to BLR's real accounts
- **Placeholders:** Theo is a real BLR dog. Other dog cards and Happy Tails stories are labelled samples and use Unsplash photos (Unsplash License).
- Every page carries `noindex` so the preview never competes with the live site in search results.

### The five phases
1. Discovery & Brand Audit
2. UX Strategy & Design System
3. Website Design & Build (this preview)
4. Integrations, Content & SEO (Petfinder feed, embedded forms, recurring donations)
5. Launch, Training & Growth (domain move from Weebly, volunteer training, care plan)

### Run locally
```bash
python3 -m http.server 8000
# open http://localhost:8000/big-love-rescue/
```

### Publishing on GitHub Pages
Settings → Pages → *Deploy from a branch* → pick this branch and `/ (root)`.
The site will be at `https://technotaau.github.io/UM/big-love-rescue/`.
