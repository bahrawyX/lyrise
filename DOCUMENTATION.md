# 📖 Lyrise - AI Quote Generator Documentation

Hey there! Welcome to the Lyrise documentation. This guide will help you understand how everything works in this project - from the tech stack to how quotes are generated using AI.

---

## 🎯 What is Lyrise?

Lyrise is a beautiful, AI-powered quote generator landing page. Users can click a category (like "Romantic" or "Inspirational"), and our system generates a unique, never-before-seen quote using AI automation through n8n webhooks. It's like having a personal wisdom generator at your fingertips!

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** with **React 19** - The foundation of our app
- **TypeScript** - Because we like type safety
- **Tailwind CSS v4** - For all that beautiful styling
- **Framer Motion** - Smooth animations that make everything feel alive
- **shadcn/ui** - Pre-built, customizable components
- **Lucide Icons** - Clean, modern icons
- **Sonner** - Toast notifications that actually look good

### Backend & APIs
- **Next.js API Routes** - Server-side logic
- **n8n Webhooks** - The brain behind quote generation
- **Axios** - HTTP requests made easy

### Typography
- **Montserrat** - Primary font (clean and professional)
- **Space Grotesk** - Secondary font (used with `.space` class for headings)

### Styling Extras
- **Lenis** - Smooth scrolling library
- **Custom background pattern** - That subtle grid you see

---

## 🏗️ Project Structure

```
lyrise/
├── app/
│   ├── api/
│   │   └── generate-quote/
│   │       └── route.ts          # API endpoint for n8n webhook
│   ├── globals.css               # Global styles & theme
│   ├── layout.tsx                # Root layout with fonts & providers
│   └── page.tsx                  # Main landing page
├── components/
│   ├── Hero.tsx                  # Landing hero section
│   ├── QuoteGenerator.tsx        # Main quote generation logic
│   ├── QuoteCard.tsx             # Individual quote display
│   ├── SavedQuotesFolder.tsx     # Floating folder for saved quotes
│   ├── Features.tsx              # Feature showcase section
│   ├── CallToAction.tsx          # CTA section
│   ├── Navbar.tsx                # Navigation bar
│   ├── Footer.tsx                # Footer
│   └── ui/                       # shadcn/ui components
├── providers/
│   ├── quotes-provider.tsx       # Quote state management
│   └── theme-provider.tsx        # Dark/light mode
└── lib/
    └── quotes.json               # Category definitions
```

---

## 🎨 How It Works

### The Quote Generation Flow

1. **User clicks a category** (e.g., "Inspirational")
2. **Frontend sends request** to `/api/generate-quote` with category
3. **Next.js API route** forwards request to n8n webhook
4. **n8n workflow**:
   - Receives category
   - Calls AI (probably GPT/Claude)
   - Returns JSON: `{ "quote": "...", "author": "..." }`
5. **API parses response** and sends back structured data
6. **Frontend displays quote** with smooth animations
7. **User can save or reject** the quote

### The Code (Simplified)

**API Route** (`app/api/generate-quote/route.ts`):
```typescript
// User clicks "Romantic" →
const { data } = await axios.post(N8N_WEBHOOK_URL, {
  category: "romantic",
  role: "user"
});

// n8n returns: { "quote": "Love is...", "author": "Jane Doe" }
const quoteData = JSON.parse(data.content?.parts?.[0]?.text || "{}");

// Send back to frontend
return {
  id: "romantic_1234567890",
  text: quoteData.quote,
  author: quoteData.author,
  category: { id: "romantic", name: "Romantic", color: "rose" }
}
```

**Frontend** (`components/QuoteGenerator.tsx`):
```typescript
// When button clicked
const response = await fetch("/api/generate-quote", {
  method: "POST",
  body: JSON.stringify({ category: "romantic" })
});

const quote = await response.json();
setCurrentQuote(quote); // Display the quote
```

That's it! Simple and clean.

---

## 🎭 Categories

We support 6 quote categories, each with a unique color theme:

| Category       | Color   | Use Case                    |
|----------------|---------|------------------------------|
| Romantic       | Rose    | Love, relationships          |
| Inspirational  | Blue    | Motivation, dreams           |
| Motivational   | Orange  | Action, hustle               |
| Wisdom         | Purple  | Deep thoughts, philosophy    |
| Success        | Emerald | Achievement, goals           |
| Life           | Cyan    | General life advice          |

---

## 🌈 Design System

### Colors
The app uses a custom OKLCH color system for better color accuracy:
- **Background**: Dark (#111111) with subtle grid pattern
- **Primary**: Near-white in dark mode
- **Accents**: Category-specific colors (rose, blue, orange, etc.)

### Fonts
```css
/* Primary (default) */
font-family: var(--font-montserrat);

/* Secondary (with .space class) */
font-family: var(--font-space-grotesk);
```

### Background Pattern
```css
.bg-image {
  background-image: url('/background.png');
  background-size: 8px;
  background-attachment: fixed;
}
```

---

## 🔌 n8n Webhook Integration

### Webhook Details
- **URL**: `https://sensei07.app.n8n.cloud/webhook/get-quote`
- **Method**: POST
- **Content-Type**: application/json

### Request Format
```json
{
  "category": "inspirational",
  "role": "user"
}
```

### Response Format
```json
{
  "content": {
    "parts": [
      {
        "text": "{\"quote\": \"Your dreams are valid.\", \"author\": \"Luna Star\"}"
      }
    ],
    "role": "model"
  },
  "finishReason": "STOP",
  "index": 0
}
```

The API extracts: `data.content.parts[0].text` and parses the JSON inside.

---

## 💾 State Management

### Quotes Provider (`providers/quotes-provider.tsx`)
Manages:
- **Current quote** being displayed
- **Saved quotes** (localStorage)
- **Daily generation count** (localStorage)

```typescript
const {
  currentQuote,          // Quote currently shown
  savedQuotes,           // Array of saved quotes
  quotesGeneratedToday,  // Counter (resets daily)
  addSavedQuote,         // Save a quote
  removeSavedQuote,      // Remove from saved
  incrementGeneratedCount // Track daily usage
} = useQuotes();
```

### Theme Provider
Handles dark/light mode switching (defaults to dark).

---

## ✨ Animations

### Framer Motion Patterns

**Page Load**:
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

**Quote Card Entrance**:
```typescript
initial={{ opacity: 0, y: 40, scale: 0.95 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
transition={{ duration: 0.5 }}
```

**Quote Card Exit (Reject)**:
```typescript
animate={{ x: 1000, rotate: 45, opacity: 0 }}
transition={{ duration: 0.5 }}
```

---

## 🎯 Key Features

### 1. Smooth Scrolling
Click "Start Creating" → Smoothly scrolls to quote generator
```typescript
const scrollToGenerator = () => {
  document.getElementById("quote-generator")
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
};
```

### 2. Save/Reject System
- **Save**: Adds to localStorage, shows in floating folder
- **Reject**: Slides away with animation

### 3. Daily Counter
Tracks how many quotes you've generated today (resets at midnight).

### 4. Random Quote
Picks a random category and generates a quote from it.

### 5. Toast Notifications
- Loading: "AI is crafting something special for you"
- Success: "Quote generated! A [category] quote just for you"
- Error: "Oops! Something went wrong"

---

## 🚀 Running the Project

### Development
```bash
npm install
npm run dev
```
Opens at `http://localhost:3000`

### Build
```bash
npm run build
npm start
```

---

## 🔧 Environment Setup

No `.env` file needed! The n8n webhook URL is hardcoded in `app/api/generate-quote/route.ts`:

```typescript
const N8N_WEBHOOK_URL = "https://sensei07.app.n8n.cloud/webhook/get-quote";
```

If you need to change it, just update that constant.

---

## 📱 Responsive Design

The app is fully responsive:
- **Mobile**: Single column, touch-friendly buttons
- **Tablet**: Adjusted spacing, optimized layout
- **Desktop**: Full experience with animations

Breakpoints (Tailwind):
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px

---

## 🎨 Customization Guide

### Change Fonts
Edit `app/layout.tsx`:
```typescript
import { YourFont, AnotherFont } from "next/font/google";

const yourFont = YourFont({
  variable: "--font-your-font",
  subsets: ["latin"],
});
```

### Add New Category
1. Add to `lib/quotes.json`:
```json
{
  "id": "philosophical",
  "name": "Philosophical",
  "color": "indigo"
}
```

2. Add color mapping in `route.ts`:
```typescript
const colorMap = {
  philosophical: "indigo",
  // ...
};
```

3. Add CSS color classes if needed.

### Change Background
Replace `/public/background.png` with your pattern image.

---

## 🐛 Troubleshooting

### Quote shows "Unknown" author
- Check n8n response format
- Make sure it returns: `{ "quote": "...", "author": "..." }`

### Webhook failing
- Check n8n workflow is active
- Verify webhook URL is correct
- Check browser console for error details

### Animations not working
- Make sure Framer Motion is installed: `npm i framer-motion`
- Check for JavaScript errors in console

### Fonts not loading
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

---

## 📦 Dependencies

```json
{
  "next": "16.0.0",
  "react": "19.2.0",
  "framer-motion": "^12.23.24",
  "axios": "^1.x",
  "sonner": "^2.0.7",
  "next-themes": "^0.4.6",
  "lucide-react": "^0.548.0",
  "lenis": "^1.3.11"
}
```

---

## 🎓 Learning Resources

- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion/)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **n8n**: [n8n.io/docs](https://docs.n8n.io/)

---

## 💡 Pro Tips

1. **Test locally first**: Before deploying, test quote generation thoroughly
2. **Monitor n8n**: Keep an eye on your n8n workflow execution count
3. **Cache quotes**: Consider adding a cache layer if you hit rate limits
4. **Error boundaries**: Add React error boundaries for better error handling
5. **Analytics**: Add analytics to track which categories are most popular

---

## 🤝 Contributing

Want to improve Lyrise? Here's how:

1. **Fork the repo**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit**: `git commit -m "Add amazing feature"`
6. **Push**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

---

## 📝 License

This project is open source. Feel free to use it, modify it, and build upon it!

---

## 🙏 Credits

Built with ❤️ using:
- Next.js
- n8n
- AI (for quote generation)
- Coffee ☕

---

## 📞 Need Help?

If you're stuck or have questions:
1. Check this documentation first
2. Look at the code comments
3. Check browser console for errors
4. Review n8n workflow logs
5. Create an issue on GitHub

---

**Happy coding! May your quotes be wise and your bugs be few.** 🚀✨
