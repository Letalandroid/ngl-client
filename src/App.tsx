import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/Home/Home'

function App() {
  return (
		<BrowserRouter>
			<Routes>
				<Route path="/:username/confessions" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App
