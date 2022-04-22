1. FULL SCREEN (lg:max-w-6xl)
-onLoad moram nek content dat v Offers, ker je blank
-onClick (zbrisi city in datum, namesto loading - animacija)
2. 1024px
-zbrisi crte in pike vodoravno
3. 768px
-zbrisi crte in pike navpicno (bi moralo zginit tudi ko se wrapa)
-hideSearch logika (button)
4. aktiviraj TABS (city[z veliko zacetnico], datum, active)
5. OFFERS sort gumbi
6. REQUIRED (mesto, datum in SPELLING)

1. npm i react-placeholder-loading --save
1. npm install react-router-dom@5.2.0
2. npm install react-router@5.2.0
3. npm i react-query
/Index.js
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />



4. npm i bootstrap-icons
4. /index.js
import 'bootstrap-icons/font/bootstrap-icons.css';

5. npm install -D tailwindcss postcss autoprefixer

6. npx tailwindcss init
6. /tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
6. /index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

/App.css
body {
  height: 100vh;
  padding: 0;
  margin: 0;
  font-family: sans-serif;
  overflow-y: hidden;
}

#root {
  height: 100vh;
  overflow-y: scroll;
}


7. 