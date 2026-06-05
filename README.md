<div align="center">

<!-- Animated SVG Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=250&section=header&text=Gip'z%20Space&fontSize=70&fontAlignY=35&animation=twinkling&fontColor=ffffff&desc=Personal%20Portfolio%20Website&descSize=20&descAlignY=55" width="100%"/>

<br/>

<!-- Tech Badges -->
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 🚀 About The Project

**Gip'z Space** is a modern, dark-themed personal portfolio website built with **Next.js 14** and the **App Router**. It serves as a central hub to showcase my developer journey, skills, and projects as a Data Science student and AI enthusiast. The project features smooth scroll animations, a fully responsive design, and an integrated, serverless contact form.

---

## ✨ Features

- **🎨 Modern Dark Theme**: Elegant dark gray-950 background with customized purple accent branding.
- **✨ Smooth Motion & Transitions**: Page elements animate dynamically using Framer Motion as you scroll.
- **📱 Fully Responsive Design**: Designed mobile-first with a custom hamburger navigation menu.
- **📬 Serverless Contact Form**: Integrated with the Web3Forms API for instant email notifications of submissions.
- **🛠️ Optimized SEO & Fonts**: Uses Google Fonts (Inter) via Next.js Font Optimization and proper meta tags.

---

## 📁 Project Structure

Here is a quick overview of the codebase organization:

```text
├── app/                  # Next.js App Router root
│   ├── globals.css       # Core Tailwind CSS imports
│   ├── layout.jsx        # Root layout with navbar and footer
│   ├── page.jsx          # Hero page combining sections
│   └── projects/         # Project routes and details
├── components/           # Reusable UI components
│   ├── data/             # Static UI data configuration
│   │   ├── navLinks.js
│   │   └── projectsData.js
│   ├── about.jsx         # About Me section
│   ├── footer.jsx        # Footer with links and animations
│   ├── get-in-touch.jsx  # Contact form component
│   ├── hero.jsx          # Hero banner with writing animation
│   ├── navbar.jsx        # Header nav menu with responsive drawer
│   ├── projects.jsx      # Grid of featured projects
│   └── skills.jsx        # Tech skills grid
├── public/               # Static assets (images, icons, etc.)
└── tailwind.config.js    # Customized theme colors and patterns
```

---

## 📦 Tech Stack & Dependencies

For details on all libraries used in this project:

<details>
<summary>🔽 <strong>Click to expand dependencies</strong></summary>

<br/>

|    Category    |         Technology         |          Purpose           |
| :------------: | :------------------------: | :------------------------: |
| **Framework**  |         Next.js 14         |    App Router, SSR/SSG     |
| **UI Library** |          React 18          |     Component-based UI     |
|  **Styling**   |      Tailwind CSS 3.4      |     Utility-first CSS      |
| **Animation**  |       Framer Motion        | Page transitions & reveals |
|   **Icons**    | Lucide React + React Icons |       UI iconography       |
|    **Form**    |       Web3Forms API        |  Serverless form handling  |
|    **Font**    |    Inter (Google Fonts)    |     Modern typography      |
| **Analytics**  |      Vercel Analytics      |      Traffic insights      |
| **Deployment** |           Vercel           |    Edge network hosting    |

</details>

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

* Node.js (v18.x or higher recommended)
* npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Givaro-Ananta/Gip-Space.git
   ```

2. **Navigate to project directory**
   ```bash
   cd Gip-Space
   ```

3. **Install npm packages**
   ```bash
   npm install
   ```

4. **Set up Environment Variables**
   Create a `.env.local` file in the root folder and add your Web3Forms access key:
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your-web3forms-access-key-here
   ```
   *(You can obtain a free key at [web3forms.com](https://web3forms.com))*

5. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🌐 Deployment

This project is optimized for deployment on the [Vercel Platform](https://vercel.com). The easiest way to deploy is to import your repository on Vercel, which will automatically configure Next.js builds. Remember to add the `NEXT_PUBLIC_WEB3FORMS_KEY` environment variable in your Vercel Project Settings!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer" width="100%"/>

<br/>

**Built with 💜 by [Givaro Ananta](https://github.com/Givaro-Ananta)**

<br/>

<a href="#top">
  <img src="https://img.shields.io/badge/⬆️_Back_to_Top-A855F7?style=for-the-badge" alt="Back to Top"/>
</a>

</div>
